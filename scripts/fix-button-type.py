#!/usr/bin/env python3
"""Fix button-has-type: add type="button" to <button> elements missing explicit type."""
import re
import sys
from pathlib import Path

# Match <button without type=
BUTTON_NO_TYPE = re.compile(r'<button(?!\s[^>]*\btype=)(\s)', re.MULTILINE)

def process_file(path: Path) -> int:
    text = path.read_text(encoding='utf-8')
    new_text, count = BUTTON_NO_TYPE.subn(r'<button type="button"\1', text)
    if count:
        path.write_text(new_text, encoding='utf-8')
    return count

def main():
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
    extensions = {'.tsx', '.jsx'}
    skip_dirs = {'node_modules', '.next', 'dist', '.git', 'animate-ui', 'base', 'foundations', 'components/ui'}
    
    total_files = 0
    total_count = 0
    for path in root.rglob('*'):
        if path.is_file() and path.suffix in extensions:
            # Skip UI component library files
            parts = set(path.parts)
            if parts & skip_dirs:
                continue
            # Also skip specific ui dir
            if 'components/ui' in str(path):
                continue
            count = process_file(path)
            if count:
                total_files += 1
                total_count += count
                print(f'  ✓ {path.relative_to(root)} ({count} replacements)')
    
    print(f'\nTotal: {total_count} buttons fixed across {total_files} files')

if __name__ == '__main__':
    main()
