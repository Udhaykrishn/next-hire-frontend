#!/usr/bin/env python3
"""Replace motion imports with LazyMotion + m for bundle size reduction."""
import re
import sys
from pathlib import Path

# Match: import { motion, AnimatePresence, ... } from "framer-motion"
IMPORT_PAT = re.compile(
    r'^(import\s*\{)([^}]+)(\}\s*from\s*["\']framer-motion["\'];?)',
    re.MULTILINE
)

def transform_import(m):
    before = m.group(1)
    symbols = [s.strip() for s in m.group(2).split(',') if s.strip()]
    after = m.group(3)
    
    has_motion = 'motion' in symbols
    if not has_motion:
        return m.group(0)  # nothing to change
    
    # Replace 'motion' with 'm', add LazyMotion and domAnimation
    new_symbols = []
    for s in symbols:
        if s == 'motion':
            pass  # drop bare motion, we'll add m and LazyMotion
        else:
            new_symbols.append(s)
    
    # Add m and LazyMotion if not already present
    if 'm' not in new_symbols:
        new_symbols = ['m'] + new_symbols
    if 'LazyMotion' not in new_symbols:
        new_symbols = ['LazyMotion'] + new_symbols
    if 'domAnimation' not in new_symbols:
        new_symbols = new_symbols + ['domAnimation']
    
    symbol_str = ', '.join(new_symbols)
    return f'{before} {symbol_str} {after}'

MOTION_JSX_PAT = re.compile(r'<motion\.(\w+)', )
MOTION_JSX_CLOSE_PAT = re.compile(r'</motion\.(\w+)')

def process_file(path: Path) -> int:
    text = path.read_text(encoding='utf-8')
    
    # Only process files that import motion
    if 'framer-motion' not in text or 'motion' not in text:
        return 0
    
    # Check if already uses LazyMotion + m pattern
    if 'LazyMotion' in text:
        return 0
    
    new_text = IMPORT_PAT.sub(transform_import, text)
    
    # Replace <motion.X with <m.X and </motion.X with </m.X
    new_text = MOTION_JSX_PAT.sub(lambda m: f'<m.{m.group(1)}', new_text)
    new_text = MOTION_JSX_CLOSE_PAT.sub(lambda m: f'</m.{m.group(1)}', new_text)
    
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        return 1
    return 0

def main():
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
    extensions = {'.tsx', '.ts', '.jsx', '.js'}
    skip_dirs = {'node_modules', '.next', 'dist', '.git', 'animate-ui', 'base', 'foundations'}
    
    total = 0
    for path in root.rglob('*'):
        if path.is_file() and path.suffix in extensions:
            parts = set(path.parts)
            if parts & skip_dirs:
                continue
            count = process_file(path)
            if count:
                total += 1
                print(f'  ✓ {path.relative_to(root)}')
    
    print(f'\nTotal: {total} files updated')

if __name__ == '__main__':
    main()
