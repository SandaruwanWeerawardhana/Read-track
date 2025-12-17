/**
 * BookDetailsPage Component
 * 
 * Detailed view of a single book with:
 * - Full book information display
 * - Edit and delete actions
 * - Delete confirmation modal
 * - Loading and error states
 * - Not found handling
 * 
 * @module pages/BookDetailsPage
 */

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import Modal from "../components/Modal";

/**
 * BookDetailsPage Component
 * 
 * Displays full details of a single book:
 * - Fetches book by ID from URL params
 * - Shows title, author, and full description
 * - Provides edit and delete actions
 * - Handles delete with confirmation modal
 * - Shows loading and not found states
 * 
 * @returns {JSX.Element} Book details page
 */
const BookDetailsPage = () => {
  // Get book ID from URL params
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Local state for delete operation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Store selectors
  const getBook = useBookStore((state) => state.getBook);
  const deleteBook = useBookStore((state) => state.deleteBook);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const books = useBookStore((state) => state.books);
  const loading = useBookStore((state) => state.loading);

  const numericId = id ? parseInt(id, 10) : undefined;
  const book = numericId ? getBook(numericId) : undefined;

  /**
   * Effect: Fetch books if not already loaded
   * Ensures book data is available for display
   */
  useEffect(() => {
    if (books.length === 0) {
      fetchBooks();
    }
  }, [books.length, fetchBooks]);

  /**
   * Handles book deletion
   * 
   * Deletes the book and navigates to home on success.
   * Shows error message on failure.
   */
  const handleDelete = async () => {
    if (numericId) {
      setIsDeleting(true);
      setDeleteError(null);
      
      try {
        await deleteBook(numericId);
        navigate("/home");
      } catch (error) {
        setDeleteError(error instanceof Error ? error.message : "Failed to delete book");
        setIsDeleting(false);
      }
    }
  };

  /**
   * Closes delete modal and resets error state
   */
  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setDeleteError(null);
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
      <Link
        to="/home"
        className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-accent-primary transition-colors duration-150"
      >
        ← Back to Books
      </Link>
      <div className="text-center py-12 bg-bg-secondary/80 border border-dashed border-white/10 rounded-xl">
        <div className="text-6xl mb-6 opacity-50">📖</div>
        <h3 className="text-2xl font-semibold mb-2 text-text-primary">
          Book not found
        </h3>
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
      <Link
        to="/home"
        className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-accent-primary transition-colors duration-150"
      >
        ← Back to Books
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-6 mb-8 flex-col md:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {book.title}
            </h1>
            <p className="text-lg text-text-secondary flex items-center gap-2">
              <span>✍️</span>
              {book.author}
            </p>
          </div>
          <div className="flex gap-4">
            <Link to={`/book/${id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>

        {book.description && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">Description</h2>
            <p className="text-lg leading-relaxed text-text-secondary">{book.description}</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        title="Delete Book"
      >
        {deleteError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span>⚠️</span>
              {deleteError}
            </p>
          </div>
        )}
        
        <p className="mb-6 text-text-secondary">
          Are you sure you want to delete <strong className="text-text-primary">"{book.title}"</strong>? This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-4">
          <button 
            className="btn btn-secondary" 
            onClick={handleCloseModal}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BookDetailsPage;
