import re
with open('src/lib/library.ts', 'r') as f:
    content = f.read()

content = content.replace("laborum.\n\n'.repeat(50)", "laborum.\\n\\n'.repeat(50)")
content = content.replace("laborum.\n\n\n'.repeat(50)", "laborum.\\n\\n'.repeat(50)")

with open('src/lib/library.ts', 'w') as f:
    f.write(content)
