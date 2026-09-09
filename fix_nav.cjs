const fs = require('fs');

let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

// Replace desktop dropdown with just a simple Link
const desktopReplacement = `{isAuthenticated ? (
            <Link 
              to={user?.role?.includes("library") ? "/library/dashboard" : "/management"}
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

content = content.replace(/\{isAuthenticated \? \([\s\S]*?\) : \(/, desktopReplacement);

// Replace mobile dropdown with just a simple Link
const mobileReplacement = `{isAuthenticated ? (
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

content = content.replace(/\{isAuthenticated \? \([\s\S]*?\) : \(/, mobileReplacement);

// Remove the modal since it's moved to Management Portal or we just don't need it on Navigation anymore
// Actually wait! The user might want the modal in the Management Portal where the logout button now is.
// But we still need logout functionality? If it's removed from Navigation, we don't need the modal here.
content = content.replace(/\{\/\* Logout Confirmation Modal \*\/\}[\s\S]*?<\/nav>/, "</nav>");
content = content.replace(/const \[isLogoutModalOpen, setIsLogoutModalOpen\] = useState\(false\);/, "");
content = content.replace(/, AlertCircle/, ""); // From lucide-react imports

fs.writeFileSync('src/components/Navigation.tsx', content);
