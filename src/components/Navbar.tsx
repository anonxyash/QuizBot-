import { Link, useLocation } from 'react-router-dom';
import { Infinity } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const location = useLocation();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between bg-neutral-900 bg-opacity-60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <Link to="/" className="flex items-center gap-2 text-white font-semibold text-lg">
            <Infinity className="w-5 h-5 text-primary" />
            QuizBot
          </Link>
          
          <div className="hidden md:flex items-center gap-x-5 lg:gap-x-7">
            <Link
              to="/"
              className={`text-sm transition-colors ${
                isActive('/') ? 'text-white font-semibold' : 'text-neutral-300 hover:text-white font-normal'
              }`}
            >
              Home
            </Link>
            <Link
              to="/chat"
              className={`text-sm transition-colors ${
                isActive('/chat') ? 'text-white font-semibold' : 'text-neutral-300 hover:text-white font-normal'
              }`}
            >
              Chat
            </Link>
            <Link
              to="/quiz" // Updated path
              className={`text-sm transition-colors ${
                isActive('/quiz') ? 'text-white font-semibold' : 'text-neutral-300 hover:text-white font-normal' // Updated path check
              }`}
            >
              Quiz Generator
            </Link>
            <Link
              to="/paper"
              className={`text-sm transition-colors ${
                isActive('/paper') ? 'text-white font-semibold' : 'text-neutral-300 hover:text-white font-normal'
              }`}
            >
              Sample Paper
            </Link>
            <button
              onClick={handleSignOut}
              className="text-sm text-neutral-300 hover:text-white font-normal transition-colors"
            >
              Sign Out
            </button>
          </div>
          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            {/* You can add a hamburger button here for mobile view */}
          </div>
        </div>
      </div>
    </nav>
  );
}