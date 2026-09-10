import re
with open('src/components/BookReader.tsx', 'r') as f:
    content = f.read()

# 1. Remove the fallback error message and make iframe bg white
fallback_regex = r'<div className="w-full h-full flex flex-col bg-stone-100">\s*<div className="bg-rose-50[^>]*>.*?</div>\s*<div className="flex-1 w-full flex items-center justify-center">\s*<iframe[^>]*/>\s*</div>\s*</div>'
new_fallback = """<div className="w-full h-full flex flex-col bg-white">
           <div className="flex-1 w-full flex items-center justify-center">
            <iframe 
              src={iframeSrc}
              className="w-full h-full border-0 bg-white"
              allow="autoplay; fullscreen" allowFullScreen
            />
           </div>
        </div>"""
content = re.sub(fallback_regex, new_fallback, content, flags=re.DOTALL)

# 2. Update PDF mode wrapper
content = content.replace(
    '<div className="w-full h-full flex flex-col bg-[#f5f5f0] text-stone-800">',
    '<div className="w-full h-full flex flex-col bg-white text-[#004B36]">'
)

content = content.replace(
    '<div className="flex-grow overflow-y-auto p-4 md:p-8 flex items-center justify-center bg-neutral-200/50">',
    '<div className="flex-grow overflow-y-auto p-4 md:p-8 flex items-center justify-center bg-white">'
)

# 3. Update Text mode wrapper
content = content.replace(
    '<p className="text-justify leading-relaxed text-lg font-serif whitespace-pre-wrap">',
    '<p className="text-justify leading-relaxed text-lg font-serif whitespace-pre-wrap text-[#004B36]">'
)

with open('src/components/BookReader.tsx', 'w') as f:
    f.write(content)
