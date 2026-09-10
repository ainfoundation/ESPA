import re

with open('src/pages/LibraryDashboard.tsx', 'r') as f:
    content = f.read()

# Replace handleSaveBook
new_save_book = """
  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook?.title || !editingBook?.author) return;
    
    const newBook: Book = {
      id: editingBook.id || Math.random().toString(36).substr(2, 9),
      title: editingBook.title,
      author: editingBook.author,
      category: editingBook.category || CATEGORIES[0],
      coverUrl: editingBook.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
      content: editingBook.content || 'No content provided.',
      uploadDate: editingBook.uploadDate || new Date().toISOString().split('T')[0]
    };
    
    saveBook(newBook);
    setBooks(getBooks());
    setShowAdminForm(false);
    setEditingBook(null);
  };
"""
content = re.sub(
    r'const handleSaveBook =.*?setEditingBook\(null\);\s*};',
    new_save_book.strip(),
    content,
    flags=re.DOTALL
)

# Remove the GDrive warning
content = re.sub(
    r'<div className="mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex gap-4">.*?</div>',
    '',
    content,
    flags=re.DOTALL
)

# Replace Drive link input with textarea
drive_input_regex = r'<div>\s*<label className="block text-sm font-semibold mb-2">Google Drive Share Link</label>.*?</div>'
textarea = """
                <div>
                  <label className="block text-sm font-semibold mb-2">Book Content (Text)</label>
                  <textarea rows={6} required placeholder="Paste the text of the book here..." value={editingBook?.content || ''} onChange={e => setEditingBook({...editingBook, content: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-white focus:ring-2 focus:ring-[#004B36] outline-none text-sm" />
                  <p className="text-xs text-[#004B36]/60 mt-2">Paste the full text of the book. It will be automatically paginated in the reader.</p>
                </div>
"""
content = re.sub(drive_input_regex, textarea.strip(), content, flags=re.DOTALL)

with open('src/pages/LibraryDashboard.tsx', 'w') as f:
    f.write(content)
