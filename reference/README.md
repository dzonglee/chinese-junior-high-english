# reference/: the research corpus (read-only for the app)

Public access ≠ commercial permission. Everything here is research and reference material. The
app never ships passages, audio, questions, answers or rubrics copied from it. No paywalls, logins,
captchas or copy protection are bypassed. Binaries go through Git LFS (`.gitattributes`).

```
reference/
  source-register/
    resource-schema.json     the record shapes (source, file, coverage_cell) and enums
    cities/roster.json       56 priority cities and the unit that researches each
    curriculum/ editions/ north/ east/ south/ central-west/
    listening-speaking/ vocabulary/ writing/ rights/
                             one folder per Stage 1 unit: sources.json, download_manifest.json,
                             coverage.json, research.md (+ unit-specific JSON, e.g. structures.json)
    integration/             R-INT's merged layer (master-sources.json, priority-city-exam-map.json, …)
  files/<unit>/              downloaded files, named <city>-<year>-<kind>.<ext>
```

Validate with `node scripts/check-register.mjs reference/source-register/<folder>`.

## Sample records

`sources.json` (an array):

```json
{
  "source_id": "R-SOUTH::001",
  "title": "2025年广州市初中学业水平考试英语试题",
  "url": "https://…",
  "publisher": "广州市招生考试委员会办公室",
  "publication_date": "2025-06",
  "retrieval_date": "2026-10-16",
  "jurisdiction": "广州市",
  "cities": ["广东-广州"],
  "years": [2025],
  "grades": [9],
  "cohort": "2025届",
  "resource_type": "exam_paper",
  "format": "pdf",
  "authority": "official_exam_authority",
  "verification": "verified_original_document",
  "download_status": "downloaded_sha256_verified",
  "rights": "reference_only",
  "commercial_reuse_approved": false,
  "facts": ["满分 120 分，考试时间 120 分钟（p.1 卷首说明）", "听说考试另行组织（p.1）"],
  "caveats": ["听力音频未随试卷公布"]
}
```

`download_manifest.json` (an array):

```json
{
  "file_id": "R-SOUTH-001",
  "source_id": "R-SOUTH::001",
  "download_url": "https://…/2025yy.pdf",
  "relative_path": "files/south/广州-2025-paper.pdf",
  "retrieved": "2026-10-16",
  "bytes": 1834221,
  "sha256": "…64 hex…",
  "opened_check": "广州 2025 中考英语 试题卷 12 页，完整；不含答案；听说部分不在本卷"
}
```

`coverage.json` (an array, one cell per city × year × resource):

```json
{ "city_id": "广东-广州", "year": 2025, "resource": "listening_audio", "status": "not_found", "source_ids": ["R-SOUTH::001"], "note": "考试院页面只发布试卷与答案" }
```

The example values are illustrative only: verify every fact yourself before recording it.
