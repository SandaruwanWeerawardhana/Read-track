/**
 * Layout Component
 * 
 * Provides the main application layout structure with:
 * - Sticky header with branding and authentication
 * - User profile display when authenticated
 * - Login/Logout functionality
 * - Consistent page structure for child components
 * 
 * @module components/Layout
 */

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * LayoutProps Interface
 * 
 * @interface LayoutProps
 * @property {ReactNode} children - Child components to render in the main content area
 */
interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component
 * 
 * Wraps page content with consistent header and structure.
 * Integrates Auth0 for authentication state and actions.
 * 
 * @param {LayoutProps} props - Component props
 * @returns {JSX.Element} Rendered layout with header and content area
 * 
 */
const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  /**
   * Initiates Auth0 login flow
   * Redirects user to Auth0 hosted login page
   */
  const handleLogin = () => {
    loginWithRedirect();
  };

  /**
   * Logs out the current user
   * Redirects back to application origin after logout
   */
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: globalThis.location.origin } });
  };

  return (
    <>
      <header className="bg-bg-primary/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-17.5">
          <Link to="/home" className="flex items-center gap-2 text-2xl font-bold logo-gradient">
            <span className="text-3xl">📚</span>
            <span>ReadTrack</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <img 
                  src={user.picture} 
                  alt={user.name || 'User'} 
                  className="w-8 h-8 rounded-full border-2 border-accent-primary/50"
                />
                <span className="text-sm text-text-secondary hidden sm:block">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-medium text-white bg-accent-primary/20 hover:bg-accent-primary/30 border border-accent-primary/50 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent-primary/20"
              >
                Login
              </button>
            )}
          </div>
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
