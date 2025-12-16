import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';
import BookForm from '../components/BookForm';
import type { BookFormData } from '../types/book';

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getBook = useBookStore((state) => state.getBook);
  const updateBook = useBookStore((state) => state.updateBook);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const books = useBookStore((state) => state.books);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numericId = id ? parseInt(id, 10) : undefined;
  const book = numericId ? getBook(numericId) : undefined;

  // Fetch books if not loaded
  useEffect(() => {
    if (books.length === 0) {
      fetchBooks();
    }
  }, [books.length, fetchBooks]);

  const handleSubmit = async (data: BookFormData) => {
    if (numericId) {
      setIsSubmitting(true);
      try {
        await updateBook(numericId, data);
        navigate(`/book/${id}`);
      } catch {
        // Error is handled in the store
      } finally {
        setIsSubmitting(false);
      }
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
      <Link to={`/book/${id}`} className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-accent-primary transition-colors duration-150">
        ← Back to Book Details
      </Link>
      
      <div className="max-w-xl mx-auto">
        <div className="bg-bg-secondary/80 border border-white/10 rounded-xl p-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-8">
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
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </>
  );
};

export default EditBookPage;
