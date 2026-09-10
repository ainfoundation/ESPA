import re
with open('src/pages/LibraryLogin.tsx', 'r') as f:
    content = f.read()

ain_logo = """
export const AINLogo = ({ className = "" }) => (
  <svg width="184" height="71" viewBox="0 0 184 71" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M55.691 57.8002H29.491L25.291 70.2002H7.39102L32.791 0.000193119H52.591L77.991 70.2002H59.891L55.691 57.8002ZM51.291 44.6002L42.591 18.9002L33.991 44.6002H51.291ZM99.8215 0.000193119V70.2002H82.7215V0.000193119H99.8215ZM172.014 70.2002H154.914L126.314 26.9002V70.2002H109.214V0.000193119H126.314L154.914 43.5002V0.000193119H172.014V70.2002Z" fill="currentColor"/>
  </svg>
);
export const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    :root {
      --font-main: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .font-main { font-family: var(--font-main) !important; scrollbar-width: none; -ms-overflow-style: none; }
    ::-webkit-scrollbar { display: none; }
  `}} />
);
"""

# Replace the AINLogo in LibraryLogin
content = re.sub(
    r'const AINLogo = \(\{ className \}: \{ className\?: string \}\) => \((.*?)\);',
    ain_logo.strip(),
    content,
    flags=re.DOTALL
)

return_replacement = """
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FDFCFB] flex font-main">
      <Helmet>
        <title>Login | ESPA Digital Library</title>
      </Helmet>
      <FontStyles />
      
      <div className="hidden lg:flex w-1/2 bg-[#004B36] relative overflow-hidden flex-col justify-between p-12">
          <div className="relative z-10">
              <AINLogo className="text-white w-48 mb-8" />
              <h1 className="text-white text-5xl font-semibold leading-tight tracking-tight mt-12 max-w-xl">
                Welcome to<br/>Digital Library
              </h1>
          </div>
          
          <div className="relative z-10 flex gap-4 text-white/60 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-[#005c42] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-[10%] -left-[20%] w-[50%] h-[50%] bg-[#003828] rounded-full blur-[100px] pointer-events-none"></div>
      </div>
      
      <div className="w-full lg:w-[70%] flex items-center justify-center p-8 lg:p-24 relative bg-[#FDFCFB]">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden mb-12 flex justify-center">
              <AINLogo className="text-[#004B36] w-40" />
          </div>
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">{isSignUp ? 'Sign Up' : 'Login'}</h2>
            <p className="text-stone-500 mt-2 text-sm font-medium">
              {isSignUp ? 'Create a Digital Library account.' : 'Please enter your details to sign in.'}
            </p>
          </div>
"""

content = re.sub(
    r'  return \(\n    <div className="min-h-screen bg-\[\#FDFCFB\] flex flex-col font-\[\'Plus_Jakarta_Sans\'\]">.*?<div className="mb-10 text-center lg:text-left">\n              <h2 className="text-3xl font-bold text-stone-900 tracking-tight">\{isSignUp \? \'Sign Up\' : \'Login\'\}</h2>\n              <p className="text-stone-500 mt-2 text-sm font-medium">\n                \{isSignUp \? \'Create a Digital Library account\.\' : \'Please enter your details to sign in\.\'\}\n              </p>\n            </div>',
    return_replacement,
    content,
    flags=re.DOTALL
)

# Fix the end tags because we removed `flex-col` wrapper and changed div nesting.
# Let's just remove one `</div>` at the end
content = content.replace("          </div>\n        </div>\n      </div>\n    </div>\n  );\n}", "          </div>\n        </div>\n    </div>\n  );\n}")

with open('src/pages/LibraryLogin.tsx', 'w') as f:
    f.write(content)
