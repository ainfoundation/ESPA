import re

content = open('src/components/Navigation.tsx').read()

to_find = """          {!isAuthenticated && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>"""
            
to_replace = """          {(!isAuthenticated || (user?.role && user.role !== "libraryReader")) && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>"""
            
content = content.replace(to_find, to_replace)

open('src/components/Navigation.tsx', 'w').write(content)
