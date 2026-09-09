const fs = require('fs');
let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

// Ensure we import some icons if we want the modal to look nice.
if (!content.includes('AlertCircle')) {
  content = content.replace(/import \{ Menu, X, ChevronDown \} from 'lucide-react';/, "import { Menu, X, ChevronDown, AlertCircle } from 'lucide-react';");
}

// Add state for modal
content = content.replace(
  /const \[isMobileMenuOpen, setIsMobileMenuOpen\] = useState\(false\);/,
  `const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);`
);

// Replace desktop logout logic
content = content.replace(
  /onClick=\{\(\) => \{\s*if \(window\.confirm\("Are you sure you want to log out\?"\)\) \{\s*logout\(\);\s*window\.location\.href = '\/';\s*\}\s*\}\}/,
  `onClick={() => setIsLogoutModalOpen(true)}`
);

// Replace mobile logout logic
content = content.replace(
  /onClick=\{\(\) => \{\s*if \(window\.confirm\("Are you sure you want to log out\?"\)\) \{\s*logout\(\);\s*setIsMobileMenuOpen\(false\);\s*window\.location\.href = '\/';\s*\}\s*\}\}/,
  `onClick={() => { setIsMobileMenuOpen(false); setIsLogoutModalOpen(true); }}`
);

// Add the modal HTML before the closing </nav> tag
const modalHtml = `
      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsLogoutModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Confirm Logout</h3>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Are you sure you want to log out? You will need to sign in again to access your dashboard.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                className="flex-1 px-4 py-3 rounded-xl font-medium text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(/<\/nav>/, `${modalHtml}\n    </nav>`);

fs.writeFileSync('src/components/Navigation.tsx', content);
