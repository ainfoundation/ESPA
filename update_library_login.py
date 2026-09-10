import re

content = open('src/pages/LibraryLogin.tsx').read()

imports = """import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle, BookOpen, CheckCircle2 } from 'lucide-react';
import { AINLogo, FontStyles } from '../components/ManagementPortal';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
"""

content = re.sub(r'import React.*from \'react-router-dom\';', imports.strip(), content, flags=re.DOTALL)

state_vars = """
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // OTP and Recaptcha states
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [expectedOtp, setExpectedOtp] = useState('');
"""

content = re.sub(r'const \[isSignUp, setIsSignUp\].*const navigate = useNavigate\(\);', state_vars.strip(), content, flags=re.DOTALL)

auth_logic = """
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    const usersStr = window.localStorage.getItem("ain_users");
    let users = [];
    if (usersStr) {
      try { users = JSON.parse(usersStr); } catch (e) {}
    }

    if (isSignUp) {
      if (!recaptchaVerified) {
        setError('Please complete the reCAPTCHA');
        return;
      }
      
      if (users.find((u: any) => u.email.toLowerCase() === loginEmail.toLowerCase())) {
        setError('Email already exists');
        return;
      }
      
      // Simulate sending OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setExpectedOtp(generatedOtp);
      setShowOtpScreen(true);
      setError('');
      toast.success(`OTP sent to ${loginEmail}: ${generatedOtp}`, { duration: 5000 }); // Simulate email receipt
      return;
    } else {
      const user = users.find((u: any) => 
        (u.email.toLowerCase() === loginEmail.toLowerCase() || 
         (u.username && u.username.toLowerCase() === loginEmail.toLowerCase())) && 
        u.password === loginPassword && u.active !== false
      );

      if (user) {
        window.localStorage.setItem("ain_currentUser", JSON.stringify(user));
        window.dispatchEvent(new Event('ain_user_changed'));
        navigate('/library/dashboard');
      } else {
        setError('Invalid credentials');
      }
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== expectedOtp) {
      setError('Invalid OTP code');
      return;
    }
    
    // Complete Sign Up
    const usersStr = window.localStorage.getItem("ain_users");
    let users = [];
    if (usersStr) {
      try { users = JSON.parse(usersStr); } catch (e) {}
    }
    
    const newUser = {
      id: 'LIB' + Date.now(),
      name: signupName,
      email: loginEmail,
      role: 'libraryReader',
      password: loginPassword,
      active: true,
      bookmarks: [] // Add bookmarks array
    };
    users.push(newUser);
    window.localStorage.setItem("ain_users", JSON.stringify(users));
    
    window.localStorage.setItem("ain_currentUser", JSON.stringify(newUser));
    window.dispatchEvent(new Event('ain_user_changed'));
    toast.success('Successfully registered!');
    navigate('/library/dashboard');
  };
"""

content = re.sub(r'const handleAuth = \(e: React.FormEvent\) => \{.*?\};', auth_logic.strip(), content, flags=re.DOTALL)

# Add OTP and Recaptcha UI elements
form_ui = """
            {showOtpScreen ? (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">Verification Code</label>
                  <p className="text-sm text-stone-500 mb-4">We've sent a 6-digit code to {loginEmail}</p>
                  <input 
                    type="text" 
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3.5 text-center tracking-[1em] font-mono text-2xl bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all"
                    placeholder="••••••"
                    required
                  />
                </div>
                
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}
                
                <button type="submit" className="w-full py-3.5 bg-[#004B36] text-[#FDFCFB] rounded-xl font-bold hover:bg-[#003828] transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 text-sm mt-8">
                  Verify & Create Account
                </button>
                
                <button 
                  type="button" 
                  onClick={() => { setShowOtpScreen(false); setOtpCode(''); setError(''); }}
                  className="w-full mt-4 text-sm font-semibold text-stone-500 hover:text-stone-700"
                >
                  Back to Sign Up
                </button>
              </form>
            ) : (
              <form onSubmit={handleAuth} className="space-y-6">
                {isSignUp && (
"""

content = content.replace('<form onSubmit={handleAuth} className="space-y-6">', form_ui.strip(), 1)
content = content.replace('              {isSignUp && (', '{isSignUp && (', 1)

# Add Recaptcha component logic
recaptcha_ui = """
                {isSignUp && (
                  <div className="border border-stone-200 bg-stone-50 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-colors ${recaptchaVerified ? 'bg-[#004B36] border-[#004B36]' : 'bg-white border-stone-300'}`}
                        onClick={() => setRecaptchaVerified(true)}
                      >
                        {recaptchaVerified && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                      <span className="text-sm font-medium text-stone-700">I'm not a robot</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1">reCAPTCHA</span>
                    </div>
                  </div>
                )}

              {error && (
"""

content = content.replace('              {error && (', recaptcha_ui.strip(), 1)

# close the parenthesis for showOtpScreen
content = content.replace("""              <div className="text-center mt-6">
                <button 
                  type="button"
                  onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                  className="text-[#004B36] text-sm font-semibold hover:underline"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>""", """              <div className="text-center mt-6">
                <button 
                  type="button"
                  onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                  className="text-[#004B36] text-sm font-semibold hover:underline"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>
            )}""")

open('src/pages/LibraryLogin.tsx', 'w').write(content)
