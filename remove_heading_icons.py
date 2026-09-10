import glob
import re

for filepath in glob.glob('src/components/*.jsx'):
    with open(filepath, 'r') as f:
        content = f.read()

    # Look for `<h1 className="text-3xl font-semibold text-stone-900 flex items-center gap-2">` and the icon next to it
    content = re.sub(r'(<h1[^>]*>)\s*<[A-Z][a-zA-Z0-9]* className="text-\[#004B36\]" size=\{28\} \/>\s*', r'\1', content)
    
    with open(filepath, 'w') as f:
        f.write(content)
