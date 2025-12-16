import { Link } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const books = useBookStore((state) => state.books);
  const getFilteredBooks = useBookStore((state) => state.getFilteredBooks);
  const searchQuery = useBookStore((state) => state.searchQuery);
  
  const filteredBooks = getFilteredBooks();
  const totalBooks = books.length;

  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Your Book Collection</h1>
        <p className="hero-subtitle">
          Manage your personal library with ease. Add, edit, and organize your favorite books all in one place.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-value">{totalBooks}</div>
            <div className="stat-label">Total Books</div>
          </div>
        </div>
      </section>

      <div className="page-header">
        <SearchBar />
        <div className="page-actions">
          <Link to="/add" className="btn btn-primary btn-lg">
            + Add New Book
          </Link>
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : searchQuery ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No books found</h3>
          <p className="empty-state-description">
            No books match your search "{searchQuery}". Try a different search term.
          </p>
          <button 
            className="btn btn-secondary"
            onClick={() => useBookStore.getState().setSearchQuery('')}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3 className="empty-state-title">No books yet</h3>
          <p className="empty-state-description">
            Start building your library by adding your first book.
          </p>
          <Link to="/add" className="btn btn-primary btn-lg">
            + Add Your First Book
          </Link>
        </div>
      )}
    </>
  );
};

export default HomePage;
