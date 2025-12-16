import { Link, useNavigate } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';
import BookForm from '../components/BookForm';
import type { BookFormData } from '../types/book';

const AddBookPage = () => {
  const navigate = useNavigate();
  const addBook = useBookStore((state) => state.addBook);

  const handleSubmit = (data: BookFormData) => {
    addBook(data);
    navigate('/');
  };

  return (
    <>
      <Link to="/" className="back-link">
        ← Back to Books
      </Link>
      
      <div className="form-container">
        <div className="form-card">
          <h1 className="page-title" style={{ marginBottom: 'var(--space-xl)' }}>
            Add New Book
          </h1>
          <BookForm onSubmit={handleSubmit} submitLabel="Add Book" />
        </div>
      </div>
    </>
  );
};

export default AddBookPage;
