import re

with open('src/pages/LibraryDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { Search", "import BookReader from '../components/BookReader';\nimport { Search")

iframe_regex = r'\{selectedBook\.driveLink \? \(\s*<iframe.*?/>\s*\) : \(\s*<div.*?Invalid document link.*?</p>\s*</div>\s*\)\}'
content = re.sub(
    iframe_regex,
    '<BookReader book={selectedBook} />',
    content,
    flags=re.DOTALL
)

with open('src/pages/LibraryDashboard.tsx', 'w') as f:
    f.write(content)
