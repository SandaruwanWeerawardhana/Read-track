import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';
import Modal from '../components/Modal';

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const getBook = useBookStore((state) => state.getBook);
  const deleteBook = useBookStore((state) => state.deleteBook);

  const book = id ? getBook(id) : undefined;

  const handleDelete = () => {
    if (id) {
      deleteBook(id);
      navigate('/');
    }
  };

  if (!book) {
    return (
      <>
        <Link to="/" className="back-link">
          ← Back to Books
        </Link>
        <div className="empty-state">
          <div className="empty-state-icon">📖</div>
          <h3 className="empty-state-title">Book not found</h3>
          <p className="empty-state-description">
            The book you're looking for doesn't exist or has been deleted.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Go to Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Link to="/" className="back-link">
        ← Back to Books
      </Link>
      
      <div className="book-detail">
        <div className="book-detail-header">
          <div>
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">
              <span>✍️</span>
              {book.author}
            </p>
          </div>
          <div className="page-actions">
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
          <div className="book-detail-section">
            <h2 className="book-detail-section-title">Description</h2>
            <p className="book-detail-description">{book.description}</p>
          </div>
        )}
      </div>

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

export default BookDetailsPage;
