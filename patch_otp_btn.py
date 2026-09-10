import re
with open('src/pages/LibraryLogin.tsx', 'r') as f:
    content = f.read()

# Add isVerifying state
content = content.replace("const [isSending, setIsSending] = useState(false);", "const [isSending, setIsSending] = useState(false);\n  const [isVerifying, setIsVerifying] = useState(false);")

# Update verify button
old_btn = """<button type="submit" className="w-full py-3.5 bg-[#004B36] text-[#FDFCFB] rounded-xl font-bold hover:bg-[#003828] transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 text-sm mt-8">
                  Verify & Create Account
                </button>"""

new_btn = """<button disabled={isVerifying} type="submit" className="w-full py-3.5 bg-[#004B36] text-[#FDFCFB] rounded-xl font-bold hover:bg-[#003828] transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 text-sm mt-8 disabled:opacity-70 disabled:transform-none">
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    'Verify & Create Account'
                  )}
                </button>"""

content = content.replace(old_btn, new_btn)

# Make handleVerifyOtp use isVerifying to add some artificial delay for "visual feedback"
new_verify = """
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');
    
    // Simulate backend verification delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (otpCode !== expectedOtp) {
      setError('Invalid verification code');
      setIsVerifying(false);
      return;
    }
    
    // Complete Sign Up
"""
content = re.sub(
    r'const handleVerifyOtp = \(e: React\.FormEvent\) => \{\s*e\.preventDefault\(\);\s*if \(otpCode !== expectedOtp\) \{\s*setError\(\'Invalid verification code\'\);\s*return;\s*\}\s*// Complete Sign Up',
    new_verify.strip() + '\n        // Complete Sign Up',
    content,
    flags=re.DOTALL
)

with open('src/pages/LibraryLogin.tsx', 'w') as f:
    f.write(content)
