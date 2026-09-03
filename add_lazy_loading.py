import os
import re

src_dir = 'src'

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find <img or <motion.img
    # Add loading="lazy" decoding="async" if not present
    new_content = re.sub(r'<((?:motion\.)?img)(?![^>]*loading="lazy")', r'<\1 loading="lazy" decoding="async"', content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
