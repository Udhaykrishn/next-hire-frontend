#!/usr/bin/env python3
"""Replace w-N h-N (and h-N w-N) Tailwind pairs with size-N shorthand.
Handles numeric values 0-96 and arbitrary values like [800px].
"""
import re
import sys
import os
from pathlib import Path

# Match w-X h-X OR h-X w-X in className strings where X is the same
SIZE_UNITS = r'(?:0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|full|screen|svh|lvh|dvh|min|max|fit|\[[\w.%+-]+\])'

WH_PATTERN = re.compile(
    r'\b(w-(' + SIZE_UNITS + r'))\s+(h-\2)\b'
    r'|'
    r'\b(h-(' + SIZE_UNITS + r'))\s+(w-\5)\b'
)

def replace_match(m):
    if m.group(1):
        # w-X h-X → size-X
        return f'size-{m.group(2)}'
    else:
        # h-X w-X → size-X
        return f'size-{m.group(5)}'

def process_file(path: Path) -> int:
    text = path.read_text(encoding='utf-8')
    new_text, count = WH_PATTERN.subn(replace_match, text)
    if count:
        path.write_text(new_text, encoding='utf-8')
    return count

def main():
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
    extensions = {'.tsx', '.ts', '.jsx', '.js'}
    
    # Directories to skip
    skip_dirs = {'node_modules', '.next', 'dist', '.git', 'animate-ui', 'base', 'foundations'}
    
    total = 0
    files_changed = 0
    for path in root.rglob('*'):
        if path.is_file() and path.suffix in extensions:
            # skip excluded dirs
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
