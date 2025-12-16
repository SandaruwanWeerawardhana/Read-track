import { create } from 'zustand';
import type { Book, BookFormData } from '../types/book';

const API_BASE_URL = 'http://localhost:5184/api/books';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

interface BookStore {
  books: Book[];
  searchQuery: string;
  toast: ToastState;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchBooks: () => Promise<void>;
  addBook: (data: BookFormData) => Promise<void>;
  getBook: (id: number) => Book | undefined;
  updateBook: (id: number, data: BookFormData) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  getFilteredBooks: () => Book[];
  showToast: (message: string, type: ToastState['type']) => void;
  hideToast: () => void;
}

export const useBookStore = create<BookStore>()((set, get) => ({
  books: [],
  searchQuery: '',
  loading: false,
  error: null,
  toast: {
    message: '',
    type: 'info',
    isVisible: false,
  },

  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const books = await response.json();
      set({ books, loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch books';
      set({ error: message, loading: false });
      get().showToast(message, 'error');
    }
  },

  addBook: async (data: BookFormData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      
      const newBook = await response.json();
      set((state) => ({
        books: [...state.books, newBook],
        loading: false,
      }));
      get().showToast('Book added successfully!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add book';
      set({ error: message, loading: false });
      get().showToast(message, 'error');
      throw error;
    }
  },

  getBook: (id: number) => {
    return get().books.find((book) => book.id === id);
  },

  updateBook: async (id: number, data: BookFormData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      
      set((state) => ({
        books: state.books.map((book) =>
          book.id === id ? { ...book, ...data } : book
        ),
        loading: false,
      }));
      get().showToast('Book updated successfully!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update book';
      set({ error: message, loading: false });
      get().showToast(message, 'error');
      throw error;
    }
  },

  deleteBook: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      
      set((state) => ({
        books: state.books.filter((book) => book.id !== id),
        loading: false,
      }));
      get().showToast('Book deleted successfully!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete book';
      set({ error: message, loading: false });
      get().showToast(message, 'error');
      throw error;
    }
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
}));
