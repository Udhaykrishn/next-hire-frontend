#!/usr/bin/env python3
"""Fix design-no-redundant-padding-axes: px-N py-N → p-N when both match."""
import re
import sys
from pathlib import Path

PADDING_UNITS = r'(?:0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|\[[\w.%+-]+\])'

PXY_PATTERN = re.compile(
    r'\bpx-(' + PADDING_UNITS + r')\s+py-\1\b'
    r'|'
    r'\bpy-(' + PADDING_UNITS + r')\s+px-\2\b'
)

def replace_match(m):
    val = m.group(1) or m.group(2)
    return f'p-{val}'

def process_file(path: Path) -> int:
    text = path.read_text(encoding='utf-8')
    new_text, count = PXY_PATTERN.subn(replace_match, text)
    if count:
        path.write_text(new_text, encoding='utf-8')
    return count

def main():
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
    extensions = {'.tsx', '.ts', '.jsx', '.js'}
    skip_dirs = {'node_modules', '.next', 'dist', '.git', 'animate-ui', 'base', 'foundations'}
    
    total = 0
    files_changed = 0
    for path in root.rglob('*'):
        if path.is_file() and path.suffix in extensions:
            parts = set(path.parts)
            if parts & skip_dirs:
                continue
            count = process_file(path)
            if count:
                files_changed += 1
                total += count
                print(f'  ✓ {path.relative_to(root)} ({count} replacements)')
    
    print(f'\nTotal: {total} replacements across {files_changed} files')

if __name__ == '__main__':
    main()
