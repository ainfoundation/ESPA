import re
with open('src/components/BookReader.tsx', 'r') as f:
    content = f.read()

content = content.replace('const textContent = book.content;', 'const textContent = book.content?.trim();')

with open('src/components/BookReader.tsx', 'w') as f:
    f.write(content)
