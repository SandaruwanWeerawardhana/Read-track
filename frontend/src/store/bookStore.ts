import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, BookFormData } from '../types/book';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

interface BookStore {
  books: Book[];
  searchQuery: string;
  toast: ToastState;
  
  // Actions
  addBook: (data: BookFormData) => void;
  getBook: (id: string) => Book | undefined;
  updateBook: (id: string, data: BookFormData) => void;
  deleteBook: (id: string) => void;
  setSearchQuery: (query: string) => void;
  getFilteredBooks: () => Book[];
  showToast: (message: string, type: ToastState['type']) => void;
  hideToast: () => void;
}

// Generate unique ID
const generateId = (): string => {
  return crypto.randomUUID();
};

// Sample books for initial state
const sampleBooks: Book[] = [
  {
    id: generateId(),
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
  },
  {
    id: generateId(),
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
  },
  {
    id: generateId(),
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A novel about racial injustice and the destruction of innocence in the American South.',
  },
];

export const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      books: sampleBooks,
      searchQuery: '',
      toast: {
        message: '',
        type: 'info',
        isVisible: false,
      },

      addBook: (data: BookFormData) => {
        const newBook: Book = {
          id: generateId(),
          ...data,
        };
        set((state) => ({
          books: [...state.books, newBook],
        }));
        get().showToast('Book added successfully!', 'success');
      },

      getBook: (id: string) => {
        return get().books.find((book) => book.id === id);
      },

      updateBook: (id: string, data: BookFormData) => {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? { ...book, ...data } : book
          ),
        }));
        get().showToast('Book updated successfully!', 'success');
      },

      deleteBook: (id: string) => {
        set((state) => ({
          books: state.books.filter((book) => book.id !== id),
        }));
        get().showToast('Book deleted successfully!', 'success');
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      getFilteredBooks: () => {
        const { books, searchQuery } = get();
        if (!searchQuery.trim()) return books;
        
        const lowerQuery = searchQuery.toLowerCase();
        return books.filter(
          (book) =>
            book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery) ||
            (book.description && book.description.toLowerCase().includes(lowerQuery))
        );
      },

      showToast: (message: string, type: ToastState['type']) => {
        set({
          toast: { message, type, isVisible: true },
        });
        // Auto-hide after 3 seconds
        setTimeout(() => {
          get().hideToast();
        }, 3000);
      },

      hideToast: () => {
        set((state) => ({
          toast: { ...state.toast, isVisible: false },
        }));
      },
    }),
    {
      name: 'book-storage',
      partialize: (state) => ({ books: state.books }),
    }
  )
);
