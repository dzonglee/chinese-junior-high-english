#!/usr/bin/env python3
"""Count an already visually reviewed local transcription without echoing its text.

Usage: python count-reviewed-text.py PATH [--speaker-labels]
The input remains outside the register. See measurement-protocol.md.
"""
import argparse
import hashlib
import json
import re
import unicodedata
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('path', type=Path)
parser.add_argument('--speaker-labels', action='store_true')
args = parser.parse_args()
text = args.path.read_text(encoding='utf-8')
if args.speaker_labels:
    text = re.sub(r'(?m)^(Man|Girl):\s*', '', text)
text = unicodedata.normalize('NFKC', text).replace('’', "'")
text = re.sub(r'(?<=\d)[–—](?=\d)', '-', text)
# The caller must already remove non-body material and visually correct OCR.
text = re.sub(r'\([^)]*\)', ' ', text)
tokens = re.findall(r"[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*(?:[,.][0-9]+)*", text)
numeric = sum(not re.search(r'[A-Za-z]', token) for token in tokens)
print(json.dumps({
    'orthographic_tokens': len(tokens),
    'alphabetic_or_mixed_tokens': len(tokens) - numeric,
    'numeric_tokens': numeric,
    'casefolded_surface_types': len({token.lower() for token in tokens}),
    'normalized_token_stream_sha256': hashlib.sha256(' '.join(tokens).encode()).hexdigest(),
}, indent=2))
