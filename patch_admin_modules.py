import os
import glob

files = glob.glob('src/frontend/pages/admin/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r') as f:
        content = f.read()
        
    if "PlaceholderModule" in content:
        new_content = content.replace("PlaceholderModule", "GenericAdminModule")
        new_content = new_content.replace("@/components/admin/placeholder-module", "@/components/admin/generic-admin-module")
        
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Patched {file}")

