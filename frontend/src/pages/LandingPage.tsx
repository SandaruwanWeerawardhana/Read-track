/**
 * LandingPage Component
 * 
 * Public landing page for unauthenticated users with:
 * - Hero section with branding
 * - Auth0 login flow
 * - Feature highlights
 * - Auto-redirect for authenticated users
 * 
 * @module pages/LandingPage
 */

import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

/**
 * LandingPage Component
 * 
 * First page users see when visiting the application:
 * - Displays product branding and features
 * - Provides "Get Started" button for login
 * - Automatically redirects authenticated users to /home
 * - Shows loading state during Auth0 initialization
 * 
 * @returns {JSX.Element} Landing page with login or redirect
 */
const LandingPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  /**
   * Auto-redirect authenticated users to home page
   * Prevents authenticated users from seeing landing page
   */
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  /**
   * Initiates Auth0 login flow
   * Redirects to Auth0 Universal Login page
   */
  const handleGetStarted = () => {
    loginWithRedirect();
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 animate-bounce">
          <span className="text-8xl">📚</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 logo-gradient">
          ReadTrack
        </h1>

        <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mb-4">
          Your personal library management system
        </p>

        <p className="text-lg text-text-muted max-w-xl mb-12">
          Organize, track, and manage your book collection with ease. Keep track
          of what you've read, what you're reading, and what's next.
        </p>

        {isLoading ? (
          <div className="w-12 h-12 rounded-full border-4 border-accent-primary/30 border-t-accent-primary animate-spin" />
        ) : (
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-accent-primary to-purple-500 hover:from-accent-primary/90 hover:to-purple-500/90 rounded-xl transition-all duration-300 shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40 hover:scale-105"
          >
            Get Started
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl">
          <div className="p-6 bg-bg-secondary/50 border border-white/10 rounded-xl">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Track Your Books
            </h3>
            <p className="text-text-muted text-sm">
              Add and organize all your books in one place
            </p>
          </div>

          <div className="p-6 bg-bg-secondary/50 border border-white/10 rounded-xl">
            <div className="text-4xl mb-4">✏️</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Easy Management
            </h3>
            <p className="text-text-muted text-sm">
              Edit, update, and manage your collection effortlessly
            </p>
          </div>

          <div className="p-6 bg-bg-secondary/50 border border-white/10 rounded-xl">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Secure Access
            </h3>
            <p className="text-text-muted text-sm">
              Your library is protected with secure authentication
            </p>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-text-muted text-sm border-t border-white/10">
        <p>© 2025 ReadTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
