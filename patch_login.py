import re
with open('src/pages/LibraryLogin.tsx', 'r') as f:
    content = f.read()

# I need to make handleAuth async and add isSending state
content = content.replace("export default function LibraryLogin() {", "export default function LibraryLogin() {\n  const [isSending, setIsSending] = useState(false);")
content = content.replace("const handleAuth = (e: React.FormEvent) => {", "const handleAuth = async (e: React.FormEvent) => {")

new_otp_logic = """
      // Generate OTP and send via backend
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setExpectedOtp(generatedOtp);
      setIsSending(true);
      setError('');
      try {
        const response = await fetch('/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginEmail, otp: generatedOtp, recaptchaToken })
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to send OTP');
        }
        
        setShowOtpScreen(true);
        toast.success(`OTP sent to ${loginEmail}. Please check your email.`);
      } catch (err: any) {
        setError(err.message || 'Error communicating with server');
        recaptchaRef.current?.reset();
      } finally {
        setIsSending(false);
      }
      return;
"""

content = re.sub(
    r'// Simulate sending OTP.*?return;\n',
    new_otp_logic,
    content,
    flags=re.DOTALL
)

button_logic = """
                <button disabled={isSending} type="submit" className="w-full py-3.5 bg-[#004B36] text-[#FDFCFB] rounded-xl font-bold hover:bg-[#003828] transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 text-sm mt-8 disabled:opacity-70 disabled:transform-none">
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>{isSignUp ? 'Sign Up' : 'Sign In'} <BookOpen size={16} /></>
                  )}
                </button>
"""

content = re.sub(
    r'<button type="submit" className="w-full py-3\.5 bg-\[#004B36].*?\{isSignUp \? \'Sign Up\' : \'Sign In\'\} <BookOpen size=\{16\} />\s*</button>',
    button_logic.strip(),
    content,
    flags=re.DOTALL
)

with open('src/pages/LibraryLogin.tsx', 'w') as f:
    f.write(content)
