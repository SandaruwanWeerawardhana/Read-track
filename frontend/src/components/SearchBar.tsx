import { useBookStore } from '../store/bookStore';

const SearchBar = () => {
  const searchQuery = useBookStore((state) => state.searchQuery);
  const setSearchQuery = useBookStore((state) => state.setSearchQuery);

  return (
    <div className="relative max-w-md">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        className="search-input"
        placeholder="Search books by title, author..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search books"
      />
      {searchQuery && (
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary hover:bg-white/10 rounded-full transition-all duration-150"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
