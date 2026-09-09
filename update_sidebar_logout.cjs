const fs = require('fs');
let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

const oldProfileBlock = `
        <div className="p-4 border-t border-stone-100 shrink-0 bg-stone-50">
          <div className={\`flex items-center \$\{isSidebarOpen ? 'justify-between' : 'justify-center'\}\`}>
            {isSidebarOpen && (
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-[#004B36] text-white flex items-center justify-center font-bold text-sm shrink-0 border-2 border-white shadow-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="truncate pr-2">
                  <p className="text-sm font-bold text-stone-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-stone-500 font-medium truncate">{currentUser.role}</p>
                </div>
              </div>
            )}
            <button onClick={handleLogout} className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>`;

const newProfileBlock = `
        <div className="p-4 border-t border-stone-100 shrink-0 bg-stone-50">
          <button onClick={handleLogout} className={\`w-full flex items-center \$\{isSidebarOpen ? 'justify-center px-4 gap-3' : 'justify-center px-0'\} py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-semibold shadow-sm border border-rose-100 bg-white\`}>
            <LogOut size={18} />
            {isSidebarOpen && <span>Log Out</span>}
          </button>
        </div>`;

if(content.includes(oldProfileBlock)) {
    content = content.replace(oldProfileBlock, newProfileBlock);
    fs.writeFileSync('src/components/ManagementPortal.jsx', content);
    console.log("Success");
} else {
    console.log("Not found");
}
