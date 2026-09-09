const fs = require('fs');

let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

// The current bad desktop section looks like this:
//          {isAuthenticated ? (
//              <Link 
//                 to={user?.role?.includes("library") ? "/library/dashboard" : "/management"} 
// ...

const badDesktop = `{isAuthenticated ? (
              <Link 
                to={user?.role?.includes("library") ? "/library/dashboard" : "/management"} 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.localStorage.removeItem('ain_activeTab');
                  }
                  setIsMobileMenuOpen(false);
                }} 
                className="text-sm font-medium text-[#004B36] bg-white border border-[#004B36] px-4 py-3 rounded-xl hover:bg-[#004B36]/5 transition-colors text-center"
              >
                {user?.name ? user.name.split(' ')[0] + "'s Dashboard" : "Dashboard"}
              </Link>
            ) : (`;

const goodDesktop = `{isAuthenticated ? (
            <Link 
              to={user?.role?.includes("library") ? "/library/dashboard" : "/dashboard"}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.localStorage.removeItem('ain_activeTab');
                }
              }}
              className="hidden md:flex text-sm font-medium tracking-wide text-[#004B36] bg-white border border-[#004B36] px-5 py-2.5 rounded-full hover:bg-[#004B36]/5 transition-colors items-center gap-2"
            >
              {user?.name ? user.name.split(' ')[0] : "Dashboard"}
            </Link>
          ) : (`;

content = content.replace(badDesktop, goodDesktop);

// And the mobile link:
content = content.replace(
  /<Link to=\{user\?\.role\?\.includes\("library"\) \? "\/library\/dashboard" : "\/management"\} onClick=\{\(\) => setIsMobileMenuOpen\(false\)\} className="text-sm font-medium text-\[#004B36\] bg-white border border-\[#004B36\] px-4 py-3 rounded-xl hover:bg-\[#004B36\]\/5 transition-colors text-center">/,
  `<Link to={user?.role?.includes("library") ? "/library/dashboard" : "/dashboard"} onClick={() => { setIsMobileMenuOpen(false); if (typeof window !== 'undefined') window.localStorage.removeItem('ain_activeTab'); }} className="text-sm font-medium text-[#004B36] bg-white border border-[#004B36] px-4 py-3 rounded-xl hover:bg-[#004B36]/5 transition-colors text-center">`
);

fs.writeFileSync('src/components/Navigation.tsx', content);
