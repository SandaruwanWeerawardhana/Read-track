import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import BookCard from "../components/BookCard";

const HomePage = () => {
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const loading = useBookStore((state) => state.loading);
  const books = useBookStore((state) => state.books);
  const error = useBookStore((state) => state.error);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);


  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
        <div className="flex gap-4">
          <Link to="/add" className="btn btn-primary btn-lg">
            + Add New Book
          </Link>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-6 mb-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-red-400">Error: {error}</p>
          <button
            onClick={() => fetchBooks()}
            className="mt-4 btn btn-secondary"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4 animate-pulse">📚</div>
          <p className="text-text-muted">Loading books...</p>
        </div>
      )}

      {/* Book Grid */}
      {!loading && books.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && books.length === 0 && (
        <div className="text-center py-12 bg-bg-secondary/80 border border-dashed border-white/10 rounded-xl">
          <div className="text-6xl mb-6 opacity-50">📚</div>
          <h3 className="text-2xl font-semibold mb-2 text-text-primary">
            No books yet
          </h3>
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
