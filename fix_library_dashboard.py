import re

content = open('src/pages/LibraryDashboard.tsx').read()

imports = """import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getBooks, saveBook, deleteBook, extractDriveId, Book, CATEGORIES } from '../lib/library';
import { Search, Grid, List, BookOpen, Plus, X, Edit, Trash2, AlertCircle, Bookmark, Download, FileText } from 'lucide-react';"""

content = re.sub(r'import \{ Helmet \}.*?import \{ Search.*?from \'lucide-react\';', imports.strip(), content, flags=re.DOTALL)

state_vars = """
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeTab, setActiveTab] = useState<'catalog' | 'resources'>('catalog');
  
  // Bookmarks logic
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  useEffect(() => {
    if (user?.bookmarks) {
      setBookmarks(user.bookmarks);
    }
  }, [user]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newBookmarks = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    setBookmarks(newBookmarks);
    
    // update user in localStorage
    const usersStr = window.localStorage.getItem("ain_users");
    if (usersStr) {
      try {
        const users = JSON.parse(usersStr);
        const userIndex = users.findIndex((u: any) => u.id === user.id);
        if (userIndex >= 0) {
          users[userIndex].bookmarks = newBookmarks;
          window.localStorage.setItem("ain_users", JSON.stringify(users));
          
          const updatedUser = { ...user, bookmarks: newBookmarks };
          window.localStorage.setItem("ain_currentUser", JSON.stringify(updatedUser));
          window.dispatchEvent(new Event('ain_user_changed'));
        }
      } catch (e) {}
    }
  };

  // Resources Mock
  const mockResources = [
    { id: '1', title: 'Curriculum Guide 2024', type: 'PDF', size: '2.4 MB' },
    { id: '2', title: 'Student Evaluation Template', type: 'Template', size: '150 KB' },
    { id: '3', title: 'Classroom Activities Packet', type: 'PDF', size: '5.1 MB' },
  ];
"""

content = re.sub(r'const \[selectedBook, setSelectedBook\] = useState<Book \| null>\(null\);', state_vars.strip(), content)

filter_logic = """
  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' ? true : (selectedCategory === 'Bookmarks' ? bookmarks.includes(b.id) : b.category === selectedCategory);
    return matchesSearch && matchesCat;
  });
  
  const filteredResources = mockResources.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));
"""

content = re.sub(r'const filteredBooks = books.filter.*?return matchesSearch && matchesCat;\n \}\);', filter_logic.strip(), content, flags=re.DOTALL)

controls_ui = """
        <div className="flex bg-stone-100 p-1 rounded-xl w-fit mb-6">
          <button 
            onClick={() => setActiveTab('catalog')} 
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'catalog' ? 'bg-white shadow-sm text-[#004B36]' : 'text-stone-500 hover:text-stone-700'}`}
          >
            Catalog
          </button>
          <button 
            onClick={() => setActiveTab('resources')} 
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'resources' ? 'bg-white shadow-sm text-[#004B36]' : 'text-stone-500 hover:text-stone-700'}`}
          >
            Resources
          </button>
        </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004B36]/50" size={20} />
          <input 
            type="text" 
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#004B36]/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#004B36] transition-shadow"
          />
        </div>
        
        {activeTab === 'catalog' && (
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white border border-[#004B36]/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#004B36] cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Bookmarks">My Bookmarks</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
"""

content = re.sub(r'\{/\* Controls \*/\}.*?<option value="All">All Categories</option>\n \{CATEGORIES.map\(c => <option key=\{c\} value=\{c\}>\{c\}</option>\)\}\n </select>', controls_ui.strip(), content, flags=re.DOTALL)

# Add bookmark button to grid view
grid_bookmark = """
            {isLibraryAdmin && (
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={(e) => openEdit(book, e)} className="p-2 bg-white/90 text-[#004B36] rounded-lg hover:bg-white shadow-sm backdrop-blur-sm"><Edit size={14} /></button>
                <button onClick={(e) => handleDelete(book.id, e)} className="p-2 bg-white/90 text-red-600 rounded-lg hover:bg-white shadow-sm backdrop-blur-sm"><Trash2 size={14} /></button>
              </div>
            )}
            
            <button 
              onClick={(e) => toggleBookmark(book.id, e)} 
              className={`absolute top-2 ${isLibraryAdmin ? 'left-2' : 'right-2'} p-2 rounded-lg backdrop-blur-sm shadow-sm transition-all z-10 ${bookmarks.includes(book.id) ? 'bg-[#004B36] text-white opacity-100' : 'bg-white/90 text-stone-400 hover:text-[#004B36] opacity-0 group-hover:opacity-100'}`}
            >
              <Bookmark size={16} fill={bookmarks.includes(book.id) ? "currentColor" : "none"} />
            </button>
"""
content = re.sub(r'\{isLibraryAdmin && \(\n <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">\n <button onClick=\{\(e\) => openEdit\(book, e\)\} className="p-2 bg-white/90 text-\[\#004B36\] rounded-lg hover:bg-white shadow-sm backdrop-blur-sm"><Edit size=\{14\} /></button>\n <button onClick=\{\(e\) => handleDelete\(book.id, e\)\} className="p-2 bg-white/90 text-red-600 rounded-lg hover:bg-white shadow-sm backdrop-blur-sm"><Trash2 size=\{14\} /></button>\n </div>\n \)\}', grid_bookmark.strip(), content, flags=re.DOTALL)

# Add bookmark button to list view
list_bookmark = """
              {isLibraryAdmin && (
                <div className="flex gap-2 px-2 shrink-0">
                  <button onClick={(e) => openEdit(book, e)} className="p-2 text-[#004B36]/50 hover:text-[#004B36] transition-colors"><Edit size={18} /></button>
                  <button onClick={(e) => handleDelete(book.id, e)} className="p-2 text-[#004B36]/50 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
              )}
              
              <button 
                onClick={(e) => toggleBookmark(book.id, e)} 
                className={`p-2 rounded-lg transition-colors shrink-0 ${bookmarks.includes(book.id) ? 'text-[#004B36]' : 'text-stone-300 hover:text-[#004B36]'}`}
              >
                <Bookmark size={20} fill={bookmarks.includes(book.id) ? "currentColor" : "none"} />
              </button>
"""
content = re.sub(r'\{isLibraryAdmin && \(\n <div className="flex gap-2 px-2 shrink-0">\n <button onClick=\{\(e\) => openEdit\(book, e\)\} className="p-2 text-\[\#004B36\]/50 hover:text-\[\#004B36\] :text-white transition-colors"><Edit size=\{18\} /></button>\n <button onClick=\{\(e\) => handleDelete\(book.id, e\)\} className="p-2 text-\[\#004B36\]/50 hover:text-red-500 transition-colors"><Trash2 size=\{18\} /></button>\n </div>\n \)\}', list_bookmark.strip(), content, flags=re.DOTALL)


# Add resources view
resources_view = """
      {/* Catalog & Resources View */}
      {activeTab === 'catalog' ? (
        filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#004B36]/10 ">
            <BookOpen size={48} className="mx-auto text-[#004B36]/40 mb-4" />
            <h3 className="text-xl font-bold mb-2">No books found</h3>
            <p className="text-[#004B36]/60">Try adjusting your search or category filter.</p>
          </div>
        ) : viewMode === 'grid' ? (
"""
content = content.replace('{/* Catalog */} {filteredBooks.length === 0 ? ( <div className="text-center py-20 bg-white rounded-3xl border border-[#004B36]/10 "> <BookOpen size={48} className="mx-auto text-[#004B36]/40 mb-4" /> <h3 className="text-xl font-bold mb-2">No books found</h3> <p className="text-[#004B36]/60">Try adjusting your search or category filter.</p> </div> ) : viewMode === \'grid\' ? (', resources_view.strip())


# Close activeTab condition
end_resources = """
        )
      ) : (
        <div className="bg-white rounded-3xl border border-[#004B36]/10 p-6 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map(resource => (
              <div key={resource.id} className="p-5 border border-stone-100 rounded-2xl hover:border-[#004B36]/30 transition-colors flex flex-col group bg-stone-50/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    <FileText className="text-[#004B36]" size={24} />
                  </div>
                  <span className="text-xs font-bold text-stone-500 bg-stone-200/50 px-2.5 py-1 rounded-md">{resource.type}</span>
                </div>
                <h3 className="font-bold text-stone-900 mb-1">{resource.title}</h3>
                <p className="text-sm font-medium text-stone-500 mb-6">{resource.size}</p>
                <button className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 hover:text-[#004B36] hover:border-[#004B36]/30 transition-colors group-hover:shadow-sm">
                  <Download size={16} /> Download
                </button>
              </div>
            ))}
            {filteredResources.length === 0 && (
              <div className="col-span-full py-12 text-center text-stone-500 font-medium">
                No resources found matching your search.
              </div>
            )}
          </div>
        </div>
      )}
"""
content = content.replace("""</div> )} </main>""", """</div> )} """ + end_resources.strip() + "\n      </main>")

open('src/pages/LibraryDashboard.tsx', 'w').write(content)
