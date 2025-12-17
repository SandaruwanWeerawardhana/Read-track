/**
 * HomePage Component
 * 
 * Main landing page that displays the book collection.
 * Handles authentication checks, book fetching, and displays:
 * - Authentication gate for non-logged-in users
 * - Loading states during data fetching
 * - Error messages with retry functionality
 * - Grid of book cards
 * - Empty state when no books exist
 * 
 * @module pages/HomePage
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useBookStore } from "../store/bookStore";
import BookCard from "../components/BookCard";

/**
 * HomePage Component
 * 
 * Primary view for authenticated users to see their book collection.
 * Automatically fetches books on mount if user is authenticated.
 * 
 * @returns {JSX.Element} Rendered homepage with book grid or auth prompt
 * 
 */
const HomePage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const loading = useBookStore((state) => state.loading);
  const books = useBookStore((state) => state.books);
  const error = useBookStore((state) => state.error);

  /**
   * Fetch books on component mount if user is authenticated
   * Dependency array ensures fetch only happens when auth state changes
   */
  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [fetchBooks, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-bg-primary/50 backdrop-blur-xl border border-white/10 p-12 rounded-2xl max-w-2xl w-full text-center shadow-2xl">
          <div className="text-8xl mb-8 animate-bounce">📚</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 logo-gradient">
            Welcome to ReadTrack
          </h1>
          <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-lg mx-auto">
            Your personal sanctuary for tracking books. Organize your reading journey, manage your collection, and never lose track of a good story again.
          </p>
          <button
            onClick={() => loginWithRedirect()}
            className="btn btn-primary btn-xl text-lg px-8 py-4 shadow-lg shadow-accent-primary/20 hover:scale-105 transition-transform"
          >
            Login to Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
        <div className="flex gap-4">
          <Link to="/add" className="btn btn-primary btn-lg">
            + Add New Book
          </Link>
        </div>
      </div>

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

      {loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4 animate-pulse">📚</div>
          <p className="text-text-muted">Loading books...</p>
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

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
