const fs = require('fs');

let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

// Replace desktop button
const desktopButtonReplacement = `
          {isAuthenticated ? (
            <div className="relative group hidden md:block">
              <button className="text-sm font-medium tracking-wide text-[#004B36] bg-white border border-[#004B36] px-5 py-2.5 rounded-full hover:bg-[#004B36]/5 transition-colors flex items-center gap-2">
                {user?.name ? user.name.split(' ')[0] : "Dashboard"}
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#004B36]/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 flex flex-col overflow-hidden z-[100]">
                <Link to={user?.role?.includes("library") ? "/library/dashboard" : "/management"} className="px-4 py-2.5 text-sm hover:bg-[#004B36]/5 transition-colors">Dashboard</Link>
                <button 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to log out?")) {
                      // Note: Assuming logout function exists in context
                      window.localStorage.removeItem('ain_currentUser');
                      window.dispatchEvent(new Event('ain_user_changed'));
                      window.location.href = '/';
                    }
                  }} 
                  className="px-4 py-2.5 text-sm hover:bg-red-50 text-red-600 transition-colors text-left"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex text-sm font-medium tracking-wide text-[#004B36] bg-white border border-[#004B36] px-5 py-2.5 rounded-full hover:bg-[#004B36]/5 transition-colors items-center gap-2">
              Login
            </Link>
          )}
`;

content = content.replace(
  /<Link to={isAuthenticated \? \(user\?\.role\?\.includes\("library"\) \? "\/library\/dashboard" : "\/dashboard"\) : "\/login"\} className="hidden md:flex text-sm font-medium tracking-wide text-\[#004B36\] bg-white border border-\[#004B36\] px-5 py-2\.5 rounded-full hover:bg-\[#004B36\]\/5 transition-colors items-center gap-2">[\s\S]*?<\/Link>/,
  desktopButtonReplacement.trim()
);

// Replace mobile button
const mobileButtonReplacement = `
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link to={user?.role?.includes("library") ? "/library/dashboard" : "/management"} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] bg-white border border-[#004B36] px-4 py-3 rounded-xl hover:bg-[#004B36]/5 transition-colors text-center">
                  {user?.name ? user.name.split(' ')[0] + "'s Dashboard" : "Dashboard"}
                </Link>
                <button 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to log out?")) {
                      window.localStorage.removeItem('ain_currentUser');
                      window.dispatchEvent(new Event('ain_user_changed'));
                      setIsMobileMenuOpen(false);
                      window.location.href = '/';
                    }
                  }}
                  className="text-sm font-medium text-red-600 bg-red-50 px-4 py-3 rounded-xl hover:bg-red-100 transition-colors text-center"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] bg-white border border-[#004B36] px-4 py-3 rounded-xl hover:bg-[#004B36]/5 transition-colors text-center mb-2">
                Login
              </Link>
            )}
`;

content = content.replace(
  /<Link to={isAuthenticated \? \(user\?\.role\?\.includes\("library"\) \? "\/library\/dashboard" : "\/dashboard"\) : "\/login"\} onClick=\{\(\) => setIsMobileMenuOpen\(false\)\} className="text-sm font-medium text-\[#004B36\] bg-white border border-\[#004B36\] px-4 py-3 rounded-xl hover:bg-\[#004B36\]\/5 transition-colors text-center mb-2">[\s\S]*?<\/Link>/,
  mobileButtonReplacement.trim()
);

fs.writeFileSync('src/components/Navigation.tsx', content);
