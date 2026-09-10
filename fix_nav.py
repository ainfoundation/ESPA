import re

content = open('src/components/Navigation.tsx').read()

content = content.replace('{!isAuthenticated && (', '{(!isAuthenticated || (user?.role && user.role !== "libraryReader")) && (')

open('src/components/Navigation.tsx', 'w').write(content)
