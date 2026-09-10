import sys
content = open('src/components/Navigation.tsx').read()

to_find = """          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <Link to="/about" className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/60 transition-colors flex items-center gap-1 py-2">
              About Us
            </Link>
          </motion.div>"""

to_add = """
          {!isAuthenticated && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
              <Link to="/library/login" className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/60 transition-colors flex items-center gap-1 py-2">
                Digital Library
              </Link>
            </motion.div>
          )}"""

content = content.replace(to_find, to_find + to_add)

open('src/components/Navigation.tsx', 'w').write(content)
