import re

with open('src/lib/library.ts', 'r') as f:
    content = f.read()

# Replace driveLink with content
content = content.replace("driveLink: string;", "content?: string;\n  driveLink?: string;")
content = content.replace("driveLink: '1bN1_Tf6D0T3uR-fJ5qTzH_nF_QyM-zJk'", "content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\\n\\n'.repeat(50)")

with open('src/lib/library.ts', 'w') as f:
    f.write(content)
