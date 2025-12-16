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
      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">📚</span>
            <span>ReadTrack</span>
          </Link>
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Books
            </Link>
            <Link 
              to="/add" 
              className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}
            >
              Add Book
            </Link>
          </nav>
        </div>
      </header>
      <main className="page">
        <div className="container">
          {children}
        </div>
      </main>
      <Toast />
    </>
  );
};

export default Layout;
