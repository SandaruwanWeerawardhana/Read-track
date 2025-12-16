import { Link } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const getFilteredBooks = useBookStore((state) => state.getFilteredBooks);
  const searchQuery = useBookStore((state) => state.searchQuery);
  
  const filteredBooks = getFilteredBooks();
  return (
    <>
      
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
        <SearchBar />
        <div className="flex gap-4">
          <Link to="/add" className="btn btn-primary btn-lg">
            + Add New Book
          </Link>
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : searchQuery ? (
        <div className="text-center py-12 bg-bg-secondary/80 border border-dashed border-white/10 rounded-xl">
          <div className="text-6xl mb-6 opacity-50">🔍</div>
          <h3 className="text-2xl font-semibold mb-2 text-text-primary">No books found</h3>
          <p className="text-text-muted mb-8">
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
        <div className="text-center py-12 bg-bg-secondary/80 border border-dashed border-white/10 rounded-xl">
          <div className="text-6xl mb-6 opacity-50">📚</div>
          <h3 className="text-2xl font-semibold mb-2 text-text-primary">No books yet</h3>
          <p className="text-text-muted mb-8">
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
