import re
with open('src/pages/LibraryDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace("const driveId = extractDriveId(editingBook.driveLink || '');", "")
content = content.replace("driveLink: driveId || editingBook.driveLink || undefined,", "driveLink: editingBook.driveLink || undefined,")

with open('src/pages/LibraryDashboard.tsx', 'w') as f:
    f.write(content)
