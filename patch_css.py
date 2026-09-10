import re
with open('src/components/BookReader.tsx', 'r') as f:
    content = f.read()

content = content.replace("react-pdf/dist/esm/Page/AnnotationLayer.css", "react-pdf/dist/Page/AnnotationLayer.css")
content = content.replace("react-pdf/dist/esm/Page/TextLayer.css", "react-pdf/dist/Page/TextLayer.css")

with open('src/components/BookReader.tsx', 'w') as f:
    f.write(content)
