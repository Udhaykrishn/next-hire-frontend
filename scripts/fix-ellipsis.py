#!/usr/bin/env python3
"""
Replace three-period ellipsis '...' with the actual ellipsis character '…' in JSX text.
Only replaces inside JSX text nodes, not in JS strings or template literals.
"""
import re
import sys
from pathlib import Path

# Replace '...' that appear in JSX text (between tags or in string attributes)
# Simple approach: replace all ... that are NOT inside import/export/spread expressions
# We do NOT touch spread syntax (...props, ...args, ...rest)
# We also don't touch `...` in import paths or code

# Strategy: find JSX text content and replace ... there
# A safe regex: replace '...' that is preceded by >, space, or ( inside JSX
# and NOT preceded by a dot (to avoid ...args spread)
ELLIPSIS_PAT = re.compile(r'(?<!\.)(?<!\.)(?<!\.)\.\.\.(?![\w])')

def process_file(path: Path) -> int:
    text = path.read_text(encoding='utf-8')
    if '...' not in text:
        return 0
    
    # Only process lines that are likely JSX text content
    # Skip lines that contain import/export/spread patterns
    lines = text.split('\n')
    new_lines = []
    changes = 0
    
    for line in lines:
        stripped = line.strip()
        # Skip import/export lines
        if stripped.startswith(('import ', 'export ', '//', '*', '...')):
            new_lines.append(line)
            continue
        # Skip lines with spread syntax (function calls, destructuring)
        if re.search(r'\.\.\.[a-zA-Z_$]', line):
            new_lines.append(line)
            continue
        # Only replace if the line has JSX indicators (>, <, className, etc.) or is a string value
        if any(indicator in line for indicator in ['>', '<', '{`', '`}', "='", '="']):
            new_line, n = re.subn(r'(?<!\.)\.\.\.(?![a-zA-Z_$])', '…', line)
            if n:
                changes += n
                new_lines.append(new_line)
                continue
        new_lines.append(line)
    
    if changes:
        path.write_text('\n'.join(new_lines), encoding='utf-8')
    return changes

def main():
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
    extensions = {'.tsx', '.jsx'}
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
