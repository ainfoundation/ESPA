import re

content = open('src/pages/LibraryDashboard.tsx').read()

sidebar_html = """
      <div className="pt-24 max-w-7xl mx-auto px-6 pb-20 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#004B36]/10 sticky top-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#004B36]/10 text-[#004B36] rounded-full flex items-center justify-center font-bold text-xl">
                {user?.name?.charAt(0) || 'L'}
              </div>
              <div>
                <h3 className="font-bold text-base">{user?.name || 'Library User'}</h3>
                <p className="text-xs text-[#004B36]/60">{user?.email}</p>
              </div>
            </div>
            
            <nav className="flex flex-col gap-2">
              <button onClick={() => setActiveTab('catalog')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'catalog' ? 'bg-[#004B36]/5 text-[#004B36] border-l-4 border-[#004B36]' : 'text-[#004B36]/70 hover:bg-stone-50'}`}>
                <BookOpen size={18} /> Catalog
              </button>
              <button onClick={() => setActiveTab('resources')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'resources' ? 'bg-[#004B36]/5 text-[#004B36] border-l-4 border-[#004B36]' : 'text-[#004B36]/70 hover:bg-stone-50'}`}>
                <FileText size={18} /> Resources
              </button>
              <button onClick={() => { window.localStorage.removeItem('ain_currentUser'); window.dispatchEvent(new Event('ain_user_changed')); navigate('/library/login'); }} className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-[#004B36]/70 hover:text-red-600 rounded-xl font-medium transition-colors text-left mt-4">
                <X size={18} /> Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow flex flex-col gap-8">
"""

# replace <main className="..."> with the sidebar_html
content = re.sub(r'<main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">', sidebar_html, content)

# remove the old active tab buttons
content = re.sub(r'<div className="flex bg-stone-100 p-1 rounded-xl w-fit mb-6">.*?</div>', '', content, flags=re.DOTALL)

# add closing div for the flex container at the end
content = re.sub(r'</main>', '</main>\n      </div>', content)

open('src/pages/LibraryDashboard.tsx', 'w').write(content)
