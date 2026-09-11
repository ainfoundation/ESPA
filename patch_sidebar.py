import re

with open('src/components/ManagementPortal.jsx', 'r') as f:
    content = f.read()

# Remove isSidebarOpen state
content = re.sub(r'const \[isSidebarOpen, setIsSidebarOpen\] = useState\(true\);\n', '', content)

# Replace the sidebar classes to always be w-64
content = content.replace(
    "${isSidebarOpen ? 'w-64' : 'w-20'}",
    "w-64"
)

# Find the header section of the sidebar:
header_regex = r'<div className="h-16 flex items-center justify-center border-b border-stone-100 hidden lg:flex shrink-0 group relative w-full">.*?</div>          \)}        </div>'
# I need a more reliable regex or just simple replacement.
