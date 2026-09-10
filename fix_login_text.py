import re

content = open('src/pages/LibraryLogin.tsx').read()
content = content.replace(
    '<h1 className="text-white text-5xl font-semibold leading-tight tracking-tight mt-12 max-w-xl">\n                 Digital Library\n               </h1>',
    '<h1 className="text-white text-5xl font-semibold leading-tight tracking-tight mt-12 max-w-xl">\n                 Welcome to<br/>Digital Library\n               </h1>'
)

# Replace placeholders to have grey color
content = content.replace('className="w-full px-4 py-3.5 text-center tracking-[1em] font-mono text-2xl bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all"', 'className="w-full px-4 py-3.5 text-center tracking-[1em] font-mono text-2xl bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all placeholder-stone-400"')
content = content.replace('className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm"', 'className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm placeholder-stone-400"')
content = content.replace('className="w-full pl-11 pr-12 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm"', 'className="w-full pl-11 pr-12 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm placeholder-stone-400"')

open('src/pages/LibraryLogin.tsx', 'w').write(content)

content2 = open('src/components/ManagementPortal.jsx').read()
content2 = content2.replace(
    '<h1 className="text-white text-5xl font-semibold leading-tight tracking-tight mt-12 max-w-xl">\n                 Management Portal\n               </h1>',
    '<h1 className="text-white text-5xl font-semibold leading-tight tracking-tight mt-12 max-w-xl">\n                 Welcome to<br/>Management Portal\n               </h1>'
)
content2 = content2.replace('className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm"', 'className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm placeholder-stone-400"')
content2 = content2.replace('className="w-full pl-11 pr-12 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm"', 'className="w-full pl-11 pr-12 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm placeholder-stone-400"')

open('src/components/ManagementPortal.jsx', 'w').write(content2)
