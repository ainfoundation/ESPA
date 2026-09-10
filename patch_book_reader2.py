import re
with open('src/components/BookReader.tsx', 'r') as f:
    content = f.read()

new_reader = """
export default function BookReader({ book }) {
  const [twoPageView, setTwoPageView] = useState(false);
  const textContent = book.content;
  
  if (!textContent && book.driveLink) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-stone-100">
        <iframe 
          src={`https://drive.google.com/file/d/${book.driveLink}/preview`}
          className="w-full h-full border-0"
          allow="autoplay"
        />
      </div>
    );
  }

  const content = textContent || "No text content provided for this book. Please edit the book and paste the text content to use the reader.";
  
  // Very simplistic page splitting based on character chunks for demo purposes
"""

content = re.sub(
    r'export default function BookReader.*?// Very simplistic page splitting based on character chunks for demo purposes',
    new_reader.strip() + '\n  // Very simplistic page splitting based on character chunks for demo purposes',
    content,
    flags=re.DOTALL
)

with open('src/components/BookReader.tsx', 'w') as f:
    f.write(content)
