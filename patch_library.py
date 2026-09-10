import re

with open('src/pages/LibraryDashboard.tsx', 'r') as f:
    content = f.read()

# I want to add driveLink input back.
drive_input = """
                <div>
                  <label className="block text-sm font-semibold mb-2">Book Content (Text)</label>
                  <textarea rows={6} placeholder="Paste the text of the book here..." value={editingBook?.content || ''} onChange={e => setEditingBook({...editingBook, content: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-white focus:ring-2 focus:ring-[#004B36] outline-none text-sm" />
                  <p className="text-xs text-[#004B36]/60 mt-2">Optional: Paste the full text of the book for the native reader.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Book URL / Drive Link</label>
                  <input type="text" placeholder="https://..." value={editingBook?.driveLink || ''} onChange={e => setEditingBook({...editingBook, driveLink: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-white focus:ring-2 focus:ring-[#004B36] outline-none font-mono text-sm" />
                  <p className="text-xs text-[#004B36]/60 mt-2">Provide a URL if the book is hosted externally.</p>
                </div>
"""

# Replace the text area with the combination
content = re.sub(
    r'<div>\s*<label className="block text-sm font-semibold mb-2">Book Content \(Text\)</label>.*?</div>',
    drive_input.strip(),
    content,
    flags=re.DOTALL
)

# Also fix the handleSaveBook to use driveLink
new_save = """
  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook?.title || !editingBook?.author) return;
    
    const driveId = extractDriveId(editingBook.driveLink || '');
    
    const newBook: Book = {
      id: editingBook.id || Math.random().toString(36).substr(2, 9),
      title: editingBook.title,
      author: editingBook.author,
      category: editingBook.category || CATEGORIES[0],
      coverUrl: editingBook.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
      content: editingBook.content || undefined,
      driveLink: driveId || editingBook.driveLink || undefined,
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
    new_save.strip(),
    content,
    flags=re.DOTALL
)

with open('src/pages/LibraryDashboard.tsx', 'w') as f:
    f.write(content)
