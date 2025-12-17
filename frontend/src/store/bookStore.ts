import { create } from "zustand";
import type { Book, BookFormData } from "../types/book";

const API_BASE_URL = "http://localhost:5184/api/books";

interface BookStore {
  books: Book[];
  loading: boolean;
  error: string | null;

  fetchBooks: () => Promise<void>;
  addBook: (data: BookFormData) => Promise<void>;
  getBook: (id: number) => Book | undefined;
  updateBook: (id: number, data: BookFormData) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  clearError: () => void;
}

// Helper function to handle API errors
const handleApiError = async (response: Response): Promise<string> => {
  try {
    const errorData = await response.json();
    return errorData.message || errorData.title || `Error: ${response.status} ${response.statusText}`;
  } catch {
    return `Error: ${response.status} ${response.statusText}`;
  }
};

// Helper function to handle network errors
const getNetworkErrorMessage = (error: unknown): string => {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return 'Unable to connect to server. Please check your internet connection or try again later.';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const useBookStore = create<BookStore>()((set, get) => ({
  books: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const books = Array.isArray(data)
        ? data
        : data.books || data.data || data.$values || [];
      set({ books, loading: false });
    } catch (error) {
      const message = getNetworkErrorMessage(error);
      set({ error: message, loading: false });
      console.error("Fetch error:", error);
    }
  },

  addBook: async (data: BookFormData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }

      const newBook = await response.json();
      set((state) => ({
        books: [...state.books, newBook],
        loading: false,
        error: null,
      }));
    } catch (error) {
      const message = getNetworkErrorMessage(error);
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  getBook: (id: number) => {
    return get().books.find((book) => book.id === id);
  },

  updateBook: async (id: number, data: BookFormData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...data }),
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }

      set((state) => ({
        books: state.books.map((book) =>
          book.id === id ? { ...book, ...data } : book
        ),
        loading: false,
        error: null,
      }));
    } catch (error) {
      const message = getNetworkErrorMessage(error);
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  deleteBook: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }

      set((state) => ({
        books: state.books.filter((book) => book.id !== id),
        loading: false,
        error: null,
      }));
    } catch (error) {
      const message = getNetworkErrorMessage(error);
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));
