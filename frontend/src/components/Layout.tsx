import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <header className="bg-bg-primary/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-17.5">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold logo-gradient">
            <span className="text-3xl">📚</span>
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
