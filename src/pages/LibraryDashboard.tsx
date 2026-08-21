import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import { getBooks, saveBook, deleteBook, extractDriveId, Book, CATEGORIES } from '../lib/library';
import { Search, Grid, List, BookOpen, Plus, X, Edit, Trash2, AlertCircle } from 'lucide-react';

export default function LibraryDashboard() {
 const { isAuthenticated, user } = useAuth();
 const navigate = useNavigate();
 const isLibraryAdmin = user?.role === 'libraryAdmin' || user?.role === 'admin';

 const [books, setBooks] = useState<Book[]>([]);
 const [search, setSearch] = useState('');
 const [selectedCategory, setSelectedCategory] = useState<string>('All');
 const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
 
 const [selectedBook, setSelectedBook] = useState<Book | null>(null);
 
 // Admin form state
 const [showAdminForm, setShowAdminForm] = useState(false);
 const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);

 useEffect(() => {
 if (!isAuthenticated || (user?.role !== 'libraryAdmin' && user?.role !== 'libraryReader' && user?.role !== 'admin')) {
 navigate('/library/login');
 } else {
 setBooks(getBooks());
 }
 }, [isAuthenticated, user, navigate]);

 const filteredBooks = books.filter(b => {
 const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
 const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
 return matchesSearch && matchesCat;
 });

 const handleSaveBook = (e: React.FormEvent) => {
 e.preventDefault();
 if (!editingBook?.title || !editingBook?.author || !editingBook?.driveLink) return;
 
 const driveId = extractDriveId(editingBook.driveLink);
 
 const newBook: Book = {
 id: editingBook.id || Math.random().toString(36).substr(2, 9),
 title: editingBook.title,
 author: editingBook.author,
 category: editingBook.category || CATEGORIES[0],
 coverUrl: editingBook.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
 driveLink: driveId || editingBook.driveLink,
 uploadDate: editingBook.uploadDate || new Date().toISOString().split('T')[0]
 };
 
 saveBook(newBook);
 setBooks(getBooks());
 setShowAdminForm(false);
 setEditingBook(null);
 };

 const handleDelete = (id: string, e: React.MouseEvent) => {
 e.stopPropagation();
 if (confirm('Are you sure you want to remove this book?')) {
 deleteBook(id);
 setBooks(getBooks());
 }
 };

 const openEdit = (book: Book, e: React.MouseEvent) => {
 e.stopPropagation();
 setEditingBook(book);
 setShowAdminForm(true);
 };

 return (
    <div className="w-full text-[#004B36] transition-colors duration-300">
      <Helmet>
        <title>LibraryDashboard | ESPA Foundation</title>
        <meta name="description" content="LibraryDashboard for ESPA Foundation." />
      </Helmet>
 
 
 <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
 <div>
 <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">Digital Library</h1>
 <p className="text-[#004B36]/70 text-lg">Browse and read our collection of educational resources.</p>
 </div>
 
 {isLibraryAdmin && (
 <button 
 onClick={() => { setEditingBook({}); setShowAdminForm(true); }}
 className="bg-[#004B36] hover:bg-[#003828] text-white px-6 py-3 rounded-full font-bold transition-colors flex items-center gap-2 shadow-sm"
 >
 <Plus size={18} /> Add Book
 </button>
 )}
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
 <select 
 value={selectedCategory}
 onChange={(e) => setSelectedCategory(e.target.value)}
 className="px-4 py-3 bg-white border border-[#004B36]/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#004B36] cursor-pointer"
 >
 <option value="All">All Categories</option>
 {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
 </select>
 <div className="flex bg-white border border-[#004B36]/10 rounded-2xl p-1 shrink-0">
 <button 
 onClick={() => setViewMode('grid')}
 className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-[#004B36]/5 text-[#004B36] ' : 'text-[#004B36]/50 hover:text-[#004B36] :text-white'}`}
 >
 <Grid size={20} />
 </button>
 <button 
 onClick={() => setViewMode('list')}
 className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-[#004B36]/5 text-[#004B36] ' : 'text-[#004B36]/50 hover:text-[#004B36] :text-white'}`}
 >
 <List size={20} />
 </button>
 </div>
 </div>

 {/* Catalog */}
 {filteredBooks.length === 0 ? (
 <div className="text-center py-20 bg-white rounded-3xl border border-[#004B36]/10 ">
 <BookOpen size={48} className="mx-auto text-[#004B36]/40 mb-4" />
 <h3 className="text-xl font-bold mb-2">No books found</h3>
 <p className="text-[#004B36]/60">Try adjusting your search or category filter.</p>
 </div>
 ) : viewMode === 'grid' ? (
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
 {filteredBooks.map((book) => (
 <div 
 key={book.id}
 className="group relative cursor-pointer"
 onClick={() => setSelectedBook(book)}
 >
 <div className="aspect-[2/3] w-full bg-neutral-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 border border-[#004B36]/10 relative">
 <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
 <div className="absolute inset-0 bg-[#004B36]/0 group-hover:bg-[#004B36]/20 transition-colors" />
 </div>
 <div className="mt-4">
 <h3 className="font-bold text-sm leading-tight mb-1 group-hover:text-[#004B36] :text-indigo-400 transition-colors">{book.title}</h3>
 <p className="text-xs text-[#004B36]/60">{book.author}</p>
 </div>
 {isLibraryAdmin && (
 <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
 <button onClick={(e) => openEdit(book, e)} className="p-2 bg-white/90 text-[#004B36] rounded-lg hover:bg-white shadow-sm backdrop-blur-sm"><Edit size={14} /></button>
 <button onClick={(e) => handleDelete(book.id, e)} className="p-2 bg-white/90 text-red-600 rounded-lg hover:bg-white shadow-sm backdrop-blur-sm"><Trash2 size={14} /></button>
 </div>
 )}
 </div>
 ))}
 </div>
 ) : (
 <div className="flex flex-col gap-4">
 {filteredBooks.map((book) => (
 <div 
 key={book.id}
 onClick={() => setSelectedBook(book)}
 className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-[#004B36]/10 cursor-pointer hover:border-[#004B36]/50 transition-colors group"
 >
 <div className="w-16 h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-200 ">
 <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
 </div>
 <div className="flex-grow">
 <h3 className="font-bold text-lg mb-1 group-hover:text-[#004B36] :text-indigo-400 transition-colors">{book.title}</h3>
 <p className="text-[#004B36]/60 text-sm mb-2">{book.author}</p>
 <span className="text-xs font-bold bg-[#004B36]/5 px-2 py-1 rounded-md">{book.category}</span>
 </div>
 <div className="text-right hidden sm:block px-4">
 <p className="text-xs text-[#004B36]/50 uppercase tracking-wider mb-1">Added</p>
 <p className="text-sm font-medium">{book.uploadDate}</p>
 </div>
 {isLibraryAdmin && (
 <div className="flex gap-2 px-2 shrink-0">
 <button onClick={(e) => openEdit(book, e)} className="p-2 text-[#004B36]/50 hover:text-[#004B36] :text-white transition-colors"><Edit size={18} /></button>
 <button onClick={(e) => handleDelete(book.id, e)} className="p-2 text-[#004B36]/50 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
 </div>
 )}
 </div>
 ))}
 </div>
 )}
 </main>

 {/* Book Preview Reader Modal */}
 
 {selectedBook && (
 <div
 className="fixed inset-0 z-[100] bg-[#004B36]/90 flex flex-col backdrop-blur-md"
 >
 <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
 <div className="text-white">
 <h3 className="font-bold text-lg">{selectedBook.title}</h3>
 <p className="text-sm text-white/60">{selectedBook.author}</p>
 </div>
 <button 
 onClick={() => setSelectedBook(null)}
 className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
 >
 <X size={20} />
 </button>
 </div>
 <div className="flex-grow w-full h-full p-2 md:p-8 flex justify-center">
 <div className="w-full max-w-5xl h-full bg-[#004B36] rounded-xl overflow-hidden shadow-2xl relative">
 {selectedBook.driveLink ? (
 <iframe 
 src={`https://drive.google.com/file/d/${selectedBook.driveLink}/preview`}
 className="w-full h-full border-0"
 allow="autoplay"
 />
 ) : (
 <div className="flex items-center justify-center h-full text-white/50 flex-col gap-4">
 <AlertCircle size={48} />
 <p>Invalid document link.</p>
 </div>
 )}
 </div>
 </div>
 </div>
 )}
 

 {/* Admin Upload Modal */}
 
 {showAdminForm && isLibraryAdmin && (
 <div
 className="fixed inset-0 z-[100] bg-[#004B36]/60 flex items-center justify-center p-4 backdrop-blur-sm"
 >
 <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
 <div className="p-6 border-b border-[#004B36]/10 flex justify-between items-center shrink-0">
 <h2 className="font-bold text-xl">{editingBook?.id ? 'Edit Book' : 'Add New Book'}</h2>
 <button onClick={() => setShowAdminForm(false)} className="text-[#004B36]/60 hover:text-[#004B36] :text-white"><X size={24} /></button>
 </div>
 
 <div className="p-6 overflow-y-auto flex-grow">
 <div className="mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex gap-4">
 <AlertCircle className="text-yellow-600 shrink-0" size={20} />
 <div className="text-sm text-yellow-800 ">
 <strong className="block mb-1">Important: File Permissions</strong>
 Ensure the Google Drive file is set to "Anyone with the link can view". Otherwise, the preview will not load for readers.
 </div>
 </div>

 <form id="book-form" onSubmit={handleSaveBook} className="flex flex-col gap-5">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 <div>
 <label className="block text-sm font-semibold mb-2">Title</label>
 <input type="text" required value={editingBook?.title || ''} onChange={e => setEditingBook({...editingBook, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-white focus:ring-2 focus:ring-[#004B36] outline-none" />
 </div>
 <div>
 <label className="block text-sm font-semibold mb-2">Author</label>
 <input type="text" required value={editingBook?.author || ''} onChange={e => setEditingBook({...editingBook, author: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-white focus:ring-2 focus:ring-[#004B36] outline-none" />
 </div>
 </div>
 
 <div>
 <label className="block text-sm font-semibold mb-2">Category</label>
 <select required value={editingBook?.category || CATEGORIES[0]} onChange={e => setEditingBook({...editingBook, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-white focus:ring-2 focus:ring-[#004B36] outline-none">
 {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
 </select>
 </div>

 <div>
 <label className="block text-sm font-semibold mb-2">Google Drive Share Link</label>
 <input type="text" required placeholder="https://drive.google.com/file/d/..." value={editingBook?.driveLink || ''} onChange={e => setEditingBook({...editingBook, driveLink: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-white focus:ring-2 focus:ring-[#004B36] outline-none font-mono text-sm" />
 <p className="text-xs text-[#004B36]/60 mt-2">Paste the full shareable link. The system will automatically extract the File ID.</p>
 </div>

 <div>
 <label className="block text-sm font-semibold mb-2">Cover Image URL (Thumbnail)</label>
 <input type="text" placeholder="https://..." value={editingBook?.coverUrl || ''} onChange={e => setEditingBook({...editingBook, coverUrl: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-white focus:ring-2 focus:ring-[#004B36] outline-none font-mono text-sm" />
 </div>
 </form>
 </div>

 <div className="p-6 border-t border-[#004B36]/10 flex justify-end gap-3 shrink-0">
 <button onClick={() => setShowAdminForm(false)} className="px-6 py-3 rounded-xl font-bold hover:bg-[#004B36]/5 :bg-[#003828] transition-colors">Cancel</button>
 <button type="submit" form="book-form" className="px-6 py-3 rounded-xl font-bold bg-[#004B36] text-white hover:bg-[#003828] :bg-neutral-200 transition-colors shadow-sm">Save Book</button>
 </div>
 </div>
 </div>
 )}
 

 </div>
 );
}
