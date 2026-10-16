#!/usr/bin/env node
// Validate retained R-VOC data and provenance; this does not replace visual source review.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const UNIT = import.meta.dirname
const REF = resolve(UNIT, '../..')
const errors = []
const requireThat = (ok, message) => { if (!ok) errors.push(message) }
const json = (path) => JSON.parse(readFileSync(path, 'utf8'))
const unit = (name) => json(resolve(UNIT, name))
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex')
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const counts = (items) => Object.fromEntries([...new Set(items)].sort().map((item) => [item, items.filter((x) => x === item).length]))
const sorted = (obj) => Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)))
function pinned(path, bytes, sha) {
  const buffer = readFileSync(path)
  requireThat(!buffer.subarray(0, 50).toString().startsWith('version https://git-lfs.github.com/'), `${path}: unresolved LFS pointer`)
  if (bytes !== undefined) requireThat(buffer.length === bytes, `${path}: byte count mismatch`)
  requireThat(hash(buffer) === sha, `${path}: SHA-256 mismatch`)
}

const registration = unit('audit-registration.json')
for (const item of registration.datasets) pinned(resolve(UNIT, item.path), item.bytes, item.sha256)
const sources = unit('sources.json')
const sourceIds = new Set(sources.map((s) => s.source_id))
const manifests = unit('download_manifest.json')
const manifestIds = new Set(manifests.map((m) => m.file_id))
requireThat(sourceIds.size === sources.length, 'duplicate source IDs')
requireThat(manifestIds.size === manifests.length, 'duplicate manifest IDs')
requireThat(sources.every((s) => s.commercial_reuse_approved === false), 'source reuse approval must remain explicit and false')
for (const item of manifests) {
  requireThat(sourceIds.has(item.source_id), `${item.file_id}: unknown source`)
  pinned(resolve(REF, item.relative_path), item.bytes, item.sha256)
}

const national = unit('national-wordlist.json')
const nationalIndex = unit('national-list-index.json')
const entries = national.entries
const headwords = new Set(entries.map((e) => e.headword))
const review = entries.filter((e) => e.level2_review)
requireThat(entries.length === national.entry_count && entries.length === registration.national_headwords, 'national entry count mismatch')
requireThat(new Set(entries.map((e) => e.entry_id)).size === entries.length, 'duplicate national entry IDs')
requireThat(headwords.size === entries.length, 'duplicate national headwords')
requireThat(review.length === national.level2_subset_count && review.length === registration.level2_subset, 'level-two count mismatch')
requireThat(entries.length - review.length === national.additional_level3_count, 'additional level-three count mismatch')
for (const entry of entries) {
  requireThat(entry.commercial_reuse_approved === false && entry.local_exam_equivalence_verified === false && entry.edition_unit_assignment_verified === false, `${entry.entry_id}: unsupported reuse or applicability`)
  requireThat(same(entry.source_occurrences.map((o) => o.source_id).sort(), national.versions.map((v) => v.source_id).sort()), `${entry.entry_id}: missing or duplicate version provenance`)
  for (const occurrence of [...entry.source_occurrences, ...entry.level2_occurrences]) {
    requireThat(sourceIds.has(occurrence.source_id) && Number.isInteger(occurrence.pdf_page) && occurrence.pdf_page > 0, `${entry.entry_id}: invalid source/page`)
  }
}
for (const item of [...nationalIndex.main_lists, ...nationalIndex.supplemental_tables]) {
  const path = resolve(REF, item.path)
  pinned(path, undefined, item.sha256)
  const data = json(path)
  requireThat((Array.isArray(data) ? data : data.entries).length === item.entries, `${item.path}: entry count mismatch`)
  if (item.kind) {
    const subset = item.kind === 'combined' ? entries : entries.filter((e) => item.kind === 'level2' ? e.level2_review : !e.level2_review)
    requireThat(same(data.map((e) => e.headword), subset.map((e) => e.headword)), `${item.path}: national headword sequence differs`)
    if (item.kind === 'combined') {
      for (let i = 0; i < Math.min(data.length, entries.length); i++) {
        const recorded = entries[i].source_occurrences.find((o) => o.source_id === item.source_id)
        requireThat(recorded && ['pdf_page', 'printed_page', 'column'].every((key) => recorded[key] === data[i][key]) && recorded.row === data[i].entry_row_in_column, `${entries[i].entry_id}: ${item.version} page/position differs from audited curriculum`)
      }
    }
  }
}

const bookIndex = unit('edition-wordlist-index.json')
const books = bookIndex.books
let occurrences = 0
for (const book of books) {
  const path = resolve(REF, book.curated_dataset)
  pinned(path, book.dataset_bytes, book.dataset_sha256)
  const data = json(path)
  const rows = data.entries
  occurrences += rows.length
  requireThat(sourceIds.has(book.source_id) && data.source_id === book.source_id, `${book.source_id}: unknown or inconsistent book source`)
  requireThat(rows.length === book.headword_phrase_occurrences && rows.length === data.entry_count, `${book.source_id}: occurrence count mismatch`)
  const groups = counts(rows.map((e) => e.unit_label ?? e.module))
  requireThat(same(sorted(groups), sorted(book.literal_group_counts)), `${book.source_id}: literal unit/module counts differ`)
  requireThat(Object.keys(groups).length === book.literal_group_count, `${book.source_id}: group count mismatch`)
  requireThat(book.manifest_file_ids.every((id) => manifestIds.has(id)), `${book.source_id}: unknown retained artifact`)
  requireThat(book.commercial_reuse_approved === false && book.city_adoption_verified === false && book.local_exam_equivalence_verified === false, `${book.source_id}: unsupported reuse or applicability`)
  const identity = data.book_identity ?? data.identity
  requireThat(identity.isbn === book.book_identity.isbn, `${book.source_id}: inconsistent ISBN`)
  if (identity.identity_limits) requireThat(same(identity.identity_limits, book.book_identity.identity_limits), `${book.source_id}: inconsistent identity caveats`)
  if (identity.isbn) {
    const digits = identity.isbn.replaceAll('-', '')
    requireThat(/^\d{13}$/.test(digits) && [...digits].reduce((sum, digit, i) => sum + Number(digit) * (i % 2 ? 3 : 1), 0) % 10 === 0, `${book.source_id}: invalid ISBN-13 checksum`)
  }
  for (const row of rows) {
    requireThat(row.source_id === book.source_id && row.commercial_reuse_approved === false, `${book.source_id}: invalid entry source or reuse`)
    requireThat((row.label_as_printed ?? row.headword)?.trim().length > 0, `${book.source_id}: empty lexical label`)
    requireThat(Number.isInteger(row.parent_pdf_page ?? row.source_pdf_page) && (row.parent_pdf_page ?? row.source_pdf_page) > 0, `${book.source_id}: invalid entry page`)
    requireThat((row.pronunciation ?? row.ipa) == null && (row.chinese_gloss ?? row.gloss_zh) == null, `${book.source_id}: unexpected unaudited IPA/gloss`)
  }
}
requireThat(books.length === registration.legacy_books && occurrences === registration.legacy_headword_phrase_occurrences, 'legacy book/occurrence totals differ')
requireThat(books.length === bookIndex.book_count && occurrences === bookIndex.total_headword_phrase_occurrences && books.reduce((sum, b) => sum + b.literal_group_count, 0) === bookIndex.total_literal_groups, 'book index aggregate totals differ')

const coverage = unit('coverage.json')
const roster = json(resolve(REF, 'source-register/cities/roster.json')).cities
const expected = new Set(roster.flatMap((c) => [2022, 2023, 2024, 2025, 2026].map((year) => `${c.city_id}:${year}`)))
const actual = coverage.map((c) => `${c.city_id}:${c.year}`)
requireThat(actual.length === expected.size && new Set(actual).size === actual.length && actual.every((key) => expected.has(key)), 'annual city/year grid has duplicates, omissions or out-of-scope cells')
requireThat(coverage.every((c) => c.resource === 'vocabulary_list' && c.source_ids.every((id) => sourceIds.has(id))), 'invalid coverage resource/source')
requireThat(coverage.filter((c) => c.status === 'not_searched').length === registration.local_not_searched, 'unsearched coverage count differs')
requireThat(coverage.filter((c) => c.status !== 'not_searched').length === nationalIndex.local_cells_searched, 'searched coverage count differs')
requireThat(sources.length === registration.sources && manifests.length === registration.retained_asset_records, 'registered source/artifact totals differ')

if (errors.length) {
  console.error(`vocabulary audit failed (${errors.length}):\n  ${errors.slice(0, 100).join('\n  ')}`)
  process.exit(1)
}
console.log(`vocabulary audit passed: ${entries.length} national entries, ${books.length} legacy books / ${occurrences} occurrences, ${manifests.length} hydrated artifacts, ${coverage.length} annual cells; ${registration.local_not_searched} remain unsearched`)
console.log('Recorded visual audits are retained evidence; this command does not repeat visual review or establish local applicability, licensing, or unit completion.')
