import re

espa_svg = """<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><g clipPath="url(#clip0_350_59)"><path d="M188.9 99.9202V203.487H21.8804V299.761H188.9V412.08H0V512H313.618V0H0V99.9202H188.9Z" fill="currentColor"/><path d="M512.211 0V99.9202H303.618V207.863H459.698V304.866H303.618V512H251.001L251 0H512.211Z" fill="currentColor"/></g><defs><clipPath id="clip0_350_59"><rect width="512.211" height="512" fill="white"/></clipPath></defs></svg>"""

for filepath in ['src/pages/LibraryLogin.tsx', 'src/components/ManagementPortal.jsx']:
    with open(filepath, 'r') as f:
        content = f.read()

    # The existing AINLogo component definition
    pattern = r'export const AINLogo = \(\{ className = "" \}\) => \(\s*<svg[^>]*>.*?</svg>\s*\);'
    
    # Replacement string
    replacement = f'export const AINLogo = ({{ className = "" }}) => (\n  {espa_svg}\n);'
    
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(content)
