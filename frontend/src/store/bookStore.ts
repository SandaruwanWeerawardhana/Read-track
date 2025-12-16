import { create } from 'zustand';
import type { Book, BookFormData } from '../types/book';

const API_BASE_URL = 'http://localhost:5184/api/books';

interface BookStore {
  books: Book[];
  loading: boolean;
  error: string | null;
  
  
  fetchBooks: () => Promise<void>;
  addBook: (data: BookFormData) => Promise<void>;
  getBook: (id: number) => Book | undefined;
  updateBook: (id: number, data: BookFormData) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
}

export const useBookStore = create<BookStore>()((set, get) => ({
  books: [],
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
      set({ error: (error as Error).message, loading: false });
      console.error(error);
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
   
    } catch (error) {
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
    
    } catch (error) {
      console.error(error);     
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
    } catch (error) { 
      console.error(error);     
      throw error;
    }
  }, 
}));
