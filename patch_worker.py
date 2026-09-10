import re
with open('src/components/BookReader.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;",
    "pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();"
)

with open('src/components/BookReader.tsx', 'w') as f:
    f.write(content)
