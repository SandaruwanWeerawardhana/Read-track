/**
 * EditBookPage Component
 * 
 * Page for editing existing books with:
 * - Book data loading from URL params
 * - Pre-filled form with current book data
 * - Error handling and validation
 * - Loading states
 * - Not found handling
 * 
 * @module pages/EditBookPage
 */

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import BookForm from "../components/BookForm";
import type { BookFormData } from "../types/book";

/**
 * EditBookPage Component
 * 
 * Handles book editing:
 * - Fetches book data by ID from URL params
 * - Pre-fills form with existing data
 * - Validates and updates book
 * - Navigates to detail page on success
 * - Shows loading and error states
 * 
 * @returns {JSX.Element} Edit book page with pre-filled form
 */
const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const getBook = useBookStore((state) => state.getBook);
  const updateBook = useBookStore((state) => state.updateBook);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const clearError = useBookStore((state) => state.clearError);
  const books = useBookStore((state) => state.books);
  const loading = useBookStore((state) => state.loading);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const numericId = id ? parseInt(id, 10) : undefined;
  const book = numericId ? getBook(numericId) : undefined;

  /**
   * Effect: Fetch books if not already loaded
   * Ensures book data is available for editing
   */
  useEffect(() => {
    if (books.length === 0) {
      fetchBooks();
    }
  }, [books.length, fetchBooks]);

  /**
   * Handles form submission for updating book
   * 
   * @param {BookFormData} data - Validated form data from BookForm
   */
  const handleSubmit = async (data: BookFormData) => {
    if (numericId) {
      setIsSubmitting(true);
      setSubmitError(null);
      clearError();
      
      try {
        await updateBook(numericId, data);
        navigate(`/book/${id}`);
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Failed to update book. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading && books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4 animate-pulse">📚</div>
        <p className="text-text-muted">Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <>

        <Link to="/home" className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-accent-primary transition-colors duration-150">
          ← Back to Books
        </Link>
        <div className="text-center py-12 bg-bg-secondary/80 border border-dashed border-white/10 rounded-xl">
          <div className="text-6xl mb-6 opacity-50">📖</div>
          <h3 className="text-2xl font-semibold mb-2 text-text-primary">Book not found</h3>
          <p className="text-text-muted mb-8">
            The book you're looking for doesn't exist or has been deleted.
          </p>
          <Link to="/home" className="btn btn-primary btn-lg">
            Go to Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Link to={`/book/${id}`} className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-accent-primary transition-colors duration-150">
        ← Back to Book Details
      </Link>
      
      <div className="max-w-xl mx-auto">
        <div className="bg-bg-secondary/80 border border-white/10 rounded-xl p-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-8">
            Edit Book
          </h1>
          
          {submitError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-xl">⚠️</span>
                <div className="flex-1">
                  <p className="text-red-400 font-medium">Failed to update book</p>
                  <p className="text-red-400/80 text-sm mt-1">{submitError}</p>
                </div>
                <button 
                  onClick={() => setSubmitError(null)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                  aria-label="Dismiss error"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          
          <BookForm
            initialData={{
              title: book.title,
              author: book.author,
              description: book.description || "",
            }}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </>
  );
};

export default EditBookPage;
