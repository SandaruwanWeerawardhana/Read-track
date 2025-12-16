import { useBookStore } from '../store/bookStore';

const SearchBar = () => {
  const searchQuery = useBookStore((state) => state.searchQuery);
  const setSearchQuery = useBookStore((state) => state.setSearchQuery);

  return (
    <div className="search-container">
      <span className="search-icon" aria-hidden="true">🔍</span>
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
          className="search-clear"
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
