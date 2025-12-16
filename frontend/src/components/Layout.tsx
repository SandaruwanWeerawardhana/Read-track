import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">📚</span>
            <span>ReadTrack</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-8 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
