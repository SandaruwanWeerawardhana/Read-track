import { Link } from 'react-router-dom';
import type { Book } from '../types/book';
import { useBookStore } from '../store/bookStore';
import { useState } from 'react';
import Modal from '../components/Modal';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteBook = useBookStore((state) => state.deleteBook);

  const handleDelete = () => {
    deleteBook(book.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <article className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">{book.title}</h3>
            <p className="card-subtitle">by {book.author}</p>
          </div>
        </div>
        {book.description && (
          <p className="card-body">{book.description}</p>
        )}
        <div className="card-actions">
          <Link to={`/book/${book.id}`} className="btn btn-secondary flex-1">
            View
          </Link>
          <Link to={`/book/${book.id}/edit`} className="btn btn-secondary flex-1">
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
        <p style={{ marginBottom: 'var(--space-lg)' }}>
          Are you sure you want to delete <strong>"{book.title}"</strong>? This action cannot be undone.
        </p>
        <div className="modal-footer" style={{ padding: 0, borderTop: 'none' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BookCard;
