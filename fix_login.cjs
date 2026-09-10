const fs = require('fs');
let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

content = content.replace(
  "const [loginPassword, setLoginPassword] = useState('');",
  "const [loginPassword, setLoginPassword] = useState('');\n  const [showLoginPassword, setShowLoginPassword] = useState(false);"
);

const leftSideOld = `<div className="hidden lg:flex lg:w-1/2 bg-[#004B36] p-12 relative flex-col justify-between overflow-hidden">`;
const leftSideNew = `<div className="hidden lg:flex lg:w-[30%] bg-[#004B36] p-12 relative flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 overflow-hidden text-[12px] font-bold text-white/5 opacity-50 break-all leading-tight select-none pointer-events-none z-0">
                {"ESPA ".repeat(2000)}
            </div>`;
content = content.replace(leftSideOld, leftSideNew);

const welcomeOld = `<h1 className="text-white text-5xl font-semibold leading-tight tracking-tight mt-12 max-w-xl">
                 Welcome to the Portal.
               </h1>`;
const welcomeNew = `<h1 className="text-white text-5xl font-semibold leading-tight tracking-tight mt-12 max-w-xl">
                 Welcome to Login Portal
               </h1>`;
content = content.replace(welcomeOld, welcomeNew);

const rightSideOld = `<div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative bg-[#FDFCFB]">
          <div className="absolute top-8 right-8 text-stone-400 text-xs font-semibold tracking-wider">
            V 1.0.1
          </div>`;
const rightSideNew = `<div className="w-full lg:w-[70%] flex items-center justify-center p-8 lg:p-24 relative bg-[#FDFCFB]">`;
content = content.replace(rightSideOld, rightSideNew);

const formOld = `<label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">Email or Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} strokeWidth={1.5} />
                  <input 
                    type="text" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm"
                    placeholder="Enter email or username"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs font-semibold text-[#004B36] hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} strokeWidth={1.5} />
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>`;

const formNew = `<label className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">Email or Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} strokeWidth={1.5} />
                  <input 
                    type="text" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm"
                    placeholder="Enter email or username"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold text-black uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs font-semibold text-black hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} strokeWidth={1.5} />
                  <input 
                    type={showLoginPassword ? "text" : "password"} 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 bg-white border border-stone-200/80 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] transition-all text-sm font-medium shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowLoginPassword(!showLoginPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showLoginPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>`;
content = content.replace(formOld, formNew);

// Sign in button
const buttonOld = `<button 
                type="submit" 
                className="w-full py-3.5 bg-[#004B36] text-white rounded-xl hover:bg-[#003828] transition-colors font-semibold shadow-lg shadow-[#004B36]/20 flex items-center justify-center gap-2"
              >
                Sign In <ArrowRightLeft size={18} />
              </button>`;
const buttonNew = `<button 
                type="submit" 
                className="w-full py-3.5 bg-[#004B36] text-white rounded-xl hover:bg-[#003828] transition-colors font-semibold shadow-lg shadow-[#004B36]/20 flex items-center justify-center gap-2"
              >
                Sign In
              </button>`;
content = content.replace(buttonOld, buttonNew);

fs.writeFileSync('src/components/ManagementPortal.jsx', content);
console.log("Updated Login Page");
