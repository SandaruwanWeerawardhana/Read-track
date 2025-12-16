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
  const deleteBook = useBookStore((state) => state.deleteBook);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBook(book.id);
      setShowDeleteModal(false);
    } catch {
    } finally {
      setIsDeleting(false);
    }
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
        onClose={() => setShowDeleteModal(false)}
        title="Delete Book"
      >
        <p className="mb-6 text-text-secondary">
          Are you sure you want to delete <strong className="text-text-primary">"{book.title}"</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowDeleteModal(false)}
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
