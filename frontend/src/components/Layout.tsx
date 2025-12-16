import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Toast from '../components/Toast';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <>
      <header className="bg-bg-primary/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[70px]">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold logo-gradient">
            <span className="text-3xl">📚</span>
            <span>ReadTrack</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-150 ${
                location.pathname === '/' 
                  ? 'text-accent-primary bg-accent-primary/15' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-accent-primary/10'
              }`}
            >
              Books
            </Link>
            <Link 
              to="/add" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-150 ${
                location.pathname === '/add' 
                  ? 'text-accent-primary bg-accent-primary/15' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-accent-primary/10'
              }`}
            >
              Add Book
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-8 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6">
          {children}
        </div>
      </main>
      <Toast />
    </>
  );
};

export default Layout;
