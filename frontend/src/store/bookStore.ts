import { create } from "zustand";
import type { Book, BookFormData } from "../types/book";

/** Base URL for the Books API endpoint */
const API_BASE_URL = "http://localhost:5184/api/books";

/**
 * BookStore Interface
 * 
 * Defines the shape of the book store including state and actions.
 */
interface BookStore {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>
  addBook: (data: BookFormData) => Promise<void>;

  getBook: (id: number) => Book | undefined;
  updateBook: (id: number, data: BookFormData) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  clearError: () => void;
}

/**
 * Handles API error responses and extracts user-friendly error messages
 * 
 * Attempts to parse JSON error response from the server. Falls back to
 * HTTP status text if parsing fails.
 * 
 * @param response - Fetch API Response object
 * @returns Promise resolving to error message string
 */
const handleApiError = async (response: Response): Promise<string> => {
  try {
    const errorData = await response.json();
    return (
      errorData.message ||
      errorData.title ||
      `Error: ${response.status} ${response.statusText}`
    );
  } catch {
    
    return `Error: ${response.status} ${response.statusText}`;
  }
};

/**
 * Determines appropriate error message based on error type
 * 
 * Provides user-friendly error messages for different error scenarios:
 * - Network failures (connection issues)
 * - Standard Error objects
 * - Unknown errors
 * 
 * @param error - Unknown error object from catch block
 * @returns User-friendly error message string
 * 
 */
const getNetworkErrorMessage = (error: unknown): string => {
  
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return "Unable to connect to server. Please check your internet connection or try again later.";
  }
  
  
  if (error instanceof Error) {
    return error.message;
  }
  
  
  return "An unexpected error occurred";
};

/**
 * Book Store Hook
 * 
 * Zustand store providing global state management for books.
 * 
 */
export const useBookStore = create<BookStore>()((set, get) => ({
  
  books: [],
  loading: false,
  error: null,

  /**
   * Clear Error Action
   * Resets the error state to null
   */
  clearError: () => set({ error: null }),

  /**
   * Fetch Books Action
   * 
   * Retrieves all books from the API and updates the store.
   * Handles various response formats (array, wrapped object with $values, etc.)
   * Sets loading state during fetch and error state if operation fails.
   */
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

  /**
   * Add Book Action
   * 
   * Creates a new book via POST request and adds it to the store.
   * Optimistically updates the UI after successful creation.
   * 
   * @throws {Error} Re-throws error for component-level handling
   */
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

  /**
   * Get Book Action
   * 
   * Retrieves a single book from the store by ID.
   * This is a synchronous operation that searches the existing books array.
   * 
   * @param id - Book ID to search for
   * @returns Book object or undefined if not found
   */
  getBook: (id: number) => {
    return get().books.find((book) => book.id === id);
  },

  /**
   * Update Book Action
   * 
   * Updates an existing book via PUT request.
   * Optimistically updates the book in the store after successful update.
   * 
   * @throws {Error} Re-throws error for component-level handling
   */
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

  /**
   * Delete Book Action
   * 
   * Deletes a book via DELETE request.
   * Removes the book from the store after successful deletion.
   * 
   * @throws {Error} Re-throws error for component-level handling
   */
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
