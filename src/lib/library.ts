export interface Book {
 id: string;
 title: string;
 author: string;
 category: string;
 uploadDate: string;
 coverUrl: string;
 driveLink: string;
}

const defaultBooks: Book[] = [
 {
 id: '1',
 title: 'The Great Exploration',
 author: 'Sarah Jenkins',
 category: 'Educational',
 uploadDate: '2023-10-01',
 coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
 driveLink: '1bN1_Tf6D0T3uR-fJ5qTzH_nF_QyM-zJk' // Example ID
 },
 {
 id: '2',
 title: 'Tales of the Northern Mountains',
 author: 'Ali Raza',
 category: "Children's Books",
 uploadDate: '2023-10-15',
 coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
 driveLink: '1bN1_Tf6D0T3uR-fJ5qTzH_nF_QyM-zJk'
 }
];

export function getBooks(): Book[] {
 const raw = localStorage.getItem('library_books');
 if (raw) {
 try {
 return JSON.parse(raw);
 } catch(e) {}
 }
 localStorage.setItem('library_books', JSON.stringify(defaultBooks));
 return defaultBooks;
}

export function saveBook(book: Book) {
 const books = getBooks();
 const existing = books.findIndex(b => b.id === book.id);
 if (existing >= 0) {
 books[existing] = book;
 } else {
 books.unshift(book);
 }
 localStorage.setItem('library_books', JSON.stringify(books));
}

export function deleteBook(id: string) {
 let books = getBooks();
 books = books.filter(b => b.id !== id);
 localStorage.setItem('library_books', JSON.stringify(books));
}

export const CATEGORIES = ["Children's Books", "Educational", "Fiction", "Reference"];

// Helper to extract Drive ID from various share links
export function extractDriveId(link: string): string | null {
 if (!link) return null;
 // match drive.google.com/file/d/ID/...
 const match1 = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
 if (match1) return match1[1];
 // match drive.google.com/open?id=ID
 const match2 = link.match(/[?&]id=([a-zA-Z0-9_-]+)/);
 if (match2) return match2[1];
 return link; // Assume it might already be just the ID
}
