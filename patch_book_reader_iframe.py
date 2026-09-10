import re
with open('src/components/BookReader.tsx', 'r') as f:
    content = f.read()

new_logic = """
  if (!textContent && book.driveLink) {
    let iframeSrc = book.driveLink;
    if (!iframeSrc.startsWith('http') && !iframeSrc.includes('/')) {
      iframeSrc = `https://drive.google.com/file/d/${iframeSrc}/preview`;
    } else {
      const driveMatch = iframeSrc.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || iframeSrc.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (driveMatch) {
        iframeSrc = `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
      } else {
        const docsMatch = iframeSrc.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
        if (docsMatch) {
          iframeSrc = `https://docs.google.com/document/d/${docsMatch[1]}/preview`;
        }
      }
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-stone-100">
        <iframe 
          src={iframeSrc}
          className="w-full h-full border-0"
          allow="autoplay"
        />
      </div>
    );
  }
"""

content = re.sub(
    r'if \(!textContent && book\.driveLink\) \{.*?return \([\s\S]*?</div>\s*\);\s*\}',
    new_logic.strip(),
    content,
    flags=re.DOTALL
)

with open('src/components/BookReader.tsx', 'w') as f:
    f.write(content)
