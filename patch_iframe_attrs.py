import re
with open('src/components/BookReader.tsx', 'r') as f:
    content = f.read()

content = content.replace('allow="autoplay"', 'allow="autoplay; fullscreen" allowFullScreen')

with open('src/components/BookReader.tsx', 'w') as f:
    f.write(content)
