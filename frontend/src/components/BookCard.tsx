import { useState } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../types/book";
import { useBookStore } from "../store/bookStore";
import Modal from "../components/Modal";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const deleteBook = useBookStore((state) => state.deleteBook);

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteBook(book.id);
      setShowDeleteModal(false);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Failed to delete book");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setDeleteError(null);
  };

  return (
    <>
      <article className="card">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary line-clamp-2">{book.title}</h3>
            <p className="text-sm text-text-muted mt-1">by {book.author}</p>
          </div>
        </div>
        {book.description && (
          <p className="text-text-secondary text-[0.9375rem] leading-relaxed line-clamp-3">{book.description}</p>
        )}
        <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
          <Link to={`/book/${book.id}`} className="btn btn-secondary flex-1">
            View
          </Link>
          <Link
            to={`/book/${book.id}/edit`}
            className="btn btn-secondary flex-1"
          >
            Edit
          </Link>
          <button
            className="btn btn-ghost"
            onClick={() => setShowDeleteModal(true)}
            aria-label="Delete book"
          >
            🗑️
          </button>
        </div>
      </article>

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

export default BookCard;
