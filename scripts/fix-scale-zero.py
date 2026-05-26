#!/usr/bin/env python3
"""
Fix scale: 0 → scale: 0.95 in framer-motion initial/animate/exit props.
Applies to both object notation and JSX prop notation.
"""
import re
import sys
from pathlib import Path

# Match scale: 0 (not scale: 0.something) in motion initial/animate/exit props
SCALE_ZERO = re.compile(r'\bscale:\s*0\b(?!\.)')

def process_file(path: Path) -> int:
    text = path.read_text(encoding='utf-8')
    if 'scale' not in text or ('motion' not in text and 'm.' not in text):
        return 0
    
    new_text, count = SCALE_ZERO.subn('scale: 0.95', text)
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
