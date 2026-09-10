with open('src/lib/library.ts', 'r') as f:
    content = f.read()

import re
content = re.sub(r"content: 'Lorem.*?'\.repeat\(50\)", "content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\\\\n\\\\n'.repeat(50)", content, flags=re.DOTALL)

with open('src/lib/library.ts', 'w') as f:
    f.write(content)
