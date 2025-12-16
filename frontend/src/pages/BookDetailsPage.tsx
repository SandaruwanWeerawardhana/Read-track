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
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-accent-primary transition-colors duration-150">
          ← Back to Books
        </Link>
        <div className="text-center py-12 bg-bg-secondary/80 border border-dashed border-white/10 rounded-xl">
          <div className="text-6xl mb-6 opacity-50">📖</div>
          <h3 className="text-2xl font-semibold mb-2 text-text-primary">Book not found</h3>
          <p className="text-text-muted mb-8">
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
      <Link to="/" className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-accent-primary transition-colors duration-150">
        ← Back to Books
      </Link>
      
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-6 mb-8 flex-col md:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">{book.title}</h1>
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
