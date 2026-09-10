import sys

content = open('src/components/Navigation.tsx').read()

import re

# Insert Digital Library link between About Us and Contact Us for Desktop
desktop_about = """          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <Link to="/about" className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/60 transition-colors flex items-center gap-1 py-2">
              About Us
            </Link>
          </motion.div>"""
          
desktop_library = """          {!isAuthenticated && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
              <Link to="/library/login" className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/60 transition-colors flex items-center gap-1 py-2">
                Digital Library
              </Link>
            </motion.div>
          )}"""
          
if "Digital Library" not in content.split("Contact Us")[0] and desktop_library not in content:
    content = content.replace(desktop_about, desktop_about + "\n" + desktop_library)

# Insert Digital Library link between About Us and Contact Us for Mobile
mobile_about = """            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/80 transition-colors font-bold">About Us</Link>
            </motion.div>"""
            
mobile_library = """            {!isAuthenticated && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.12 }}>
                <Link to="/library/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/80 transition-colors font-bold">Digital Library</Link>
              </motion.div>
            )}"""
            
if mobile_library not in content:
    content = content.replace(mobile_about, mobile_about + "\n" + mobile_library)

# Update Login text to not use split by space if we want full name, but split is fine based on earlier assumption.
# They asked "Make sure their name appears in place of Login". It is currently showing `{user?.name ? user.name.split(' ')[0] : "Dashboard"}` or similar.
content = content.replace("{user?.name ? user.name.split(' ')[0] : \"Dashboard\"}", "{user?.name || \"Dashboard\"}")
content = content.replace("{user?.name ? user.name.split(' ')[0] + \"'s Dashboard\" : \"Dashboard\"}", "{user?.name || \"Dashboard\"}")

open('src/components/Navigation.tsx', 'w').write(content)
