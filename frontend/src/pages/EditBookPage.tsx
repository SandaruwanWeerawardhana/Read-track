import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';
import BookForm from '../components/BookForm';
import type { BookFormData } from '../types/book';

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getBook = useBookStore((state) => state.getBook);
  const updateBook = useBookStore((state) => state.updateBook);

  const book = id ? getBook(id) : undefined;

  const handleSubmit = (data: BookFormData) => {
    if (id) {
      updateBook(id, data);
      navigate(`/book/${id}`);
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
      <Link to={`/book/${id}`} className="back-link">
        ← Back to Book Details
      </Link>
      
      <div className="form-container">
        <div className="form-card">
          <h1 className="page-title" style={{ marginBottom: 'var(--space-xl)' }}>
            Edit Book
          </h1>
          <BookForm 
            initialData={{
              title: book.title,
              author: book.author,
              description: book.description || '',
            }}
            onSubmit={handleSubmit} 
            submitLabel="Save Changes" 
          />
        </div>
      </div>
    </>
  );
};

export default EditBookPage;
