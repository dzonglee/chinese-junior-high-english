#!/usr/bin/env python3
"""Package the checked local/native development builds and verify every archived byte.

Run npm run build:local and the relevant checks first. This never uploads a package.
"""
import hashlib
import json
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parent.parent
local = ROOT / 'dist/local'
assert (local / 'index.html').is_file(), 'Run npm run build:local first.'
packages = [
    ('local-english-app.zip', [(p, p.name) for p in local.iterdir() if p.is_file()]),
    ('english-wechat-development.zip', [
        (p, p.relative_to(ROOT).as_posix())
        for p in (ROOT / 'miniprogram').rglob('*') if p.is_file()
    ] + [(ROOT / 'project.config.json', 'project.config.json')]),
]
reports = []
for name, entries in packages:
    target = ROOT / 'dist' / name
    with zipfile.ZipFile(target, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for source, destination in sorted(entries, key=lambda entry: entry[1]):
            archive.write(source, destination)
    with zipfile.ZipFile(target) as archive:
        assert archive.testzip() is None, name
        assert set(archive.namelist()) == {destination for _, destination in entries}, name
        for source, destination in entries:
            assert archive.read(destination) == source.read_bytes(), destination
    reports.append({'path': 'dist/' + name, 'bytes': target.stat().st_size,
                    'sha256': hashlib.sha256(target.read_bytes()).hexdigest(),
                    'entries': len(entries), 'crc': 'pass', 'exactSourceComparison': 'pass'})
(ROOT / 'dist/upgrade-archives.json').write_text(json.dumps(reports, indent=2) + '\n')
print(json.dumps(reports, indent=2))
