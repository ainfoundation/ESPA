const fs = require('fs');

let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

// 1. Remove "System" header
content = content.replace(
  /\{isSidebarOpen && <div className="px-4 text-\[10px\] font-bold uppercase tracking-widest text-stone-400 mb-2">System<\/div>\}/,
  ''
);

// 2. Hide/Unhide behavior for Sidebar Logo
const oldHeader = `<div className="h-16 flex items-center justify-between px-6 border-b border-stone-100 hidden lg:flex shrink-0">
           {isSidebarOpen ? <div className="w-28 font-bold text-stone-800 text-lg">Management</div> : <div className="w-8 h-8 bg-[#004B36] rounded-lg flex items-center justify-center font-bold text-white text-xs">AIN</div>}
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-stone-400 hover:text-stone-600 p-1">
              {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
           </button>
        </div>`;

const oldHeader2 = `<div className="h-16 flex items-center justify-between px-6 border-b border-stone-100 hidden lg:flex shrink-0">
           {isSidebarOpen ? <div className="w-28 font-bold text-stone-800 text-lg">Management</div> : <div className="w-8 h-8 bg-[#004B36] rounded-lg flex items-center justify-center font-bold text-white text-xs">M</div>}
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-stone-400 hover:text-stone-600 p-1">
              {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
           </button>
        </div>`;

const newHeader = `<div className="h-16 flex items-center justify-center border-b border-stone-100 hidden lg:flex shrink-0 group relative w-full">
          {isSidebarOpen ? (
            <div className="w-full px-6 flex items-center justify-between">
                <div className="w-28 font-bold text-stone-800 text-lg">Management</div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-stone-400 hover:text-stone-600 p-1">
                    <PanelLeftClose size={18} />
                </button>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <div className="w-8 h-8 bg-[#004B36] rounded-lg flex items-center justify-center font-bold text-white text-xs group-hover:hidden transition-all">M</div>
                <button className="text-stone-400 hover:text-stone-600 p-1 hidden group-hover:flex transition-all">
                    <PanelLeft size={20} />
                </button>
            </div>
          )}
        </div>`;

if (content.includes(oldHeader)) {
  content = content.replace(oldHeader, newHeader);
} else if (content.includes(oldHeader2)) {
  content = content.replace(oldHeader2, newHeader);
}

// 3. Re-add Profile & Logout at the bottom
const profileBlock = `
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
        </div>
      </div>
        {isMobileMenuOpen && (`;

content = content.replace(/<\/div>\s*\{isMobileMenuOpen && \(/, profileBlock);

fs.writeFileSync('src/components/ManagementPortal.jsx', content);
