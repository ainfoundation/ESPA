with open('src/pages/LibraryDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('            <div className="p-6 overflow-y-auto flex-grow">\n              \n              </div>\n              <form id="book-form"', '            <div className="p-6 overflow-y-auto flex-grow">\n              <form id="book-form"')

with open('src/pages/LibraryDashboard.tsx', 'w') as f:
    f.write(content)
