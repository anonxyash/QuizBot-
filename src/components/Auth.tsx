import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, Mail, Lock, ArrowRight, Loader } from 'lucide-react';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signup' | 'login'>('login');
  const [success, setSuccess] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (error) throw error;
        setSuccess('Check your email for the confirmation link!');
      } else {
        // Add more detailed error handling for sign in
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password
          });

          if (error) throw error;
        } catch (signInError) {
          console.error('Detailed sign in error:', signInError);
          // Check if it's a network error
          if (signInError instanceof Error && signInError.message.includes('fetch')) {
            throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
          }
          throw signInError;
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      console.error('Authentication error:', error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-3xl -z-10" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl rounded-3xl border border-primary/20" />

        {/* Content */}
        <div className="relative z-10 p-8 animate-fadeIn">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/20 p-3 rounded-2xl animate-bounce">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover">
            Welcome to QuizBot
          </h2>
          <p className="text-gray-400 text-center mb-8">
            {mode === 'signup' ? 'Create your account' : 'Sign in to your account'}
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 animate-fadeIn">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary animate-fadeIn">
              {success}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-primary/20 rounded-xl 
                           text-white focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-primary/20 rounded-xl 
                           text-white focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-black font-medium py-3 px-4 
                       rounded-xl flex items-center justify-center gap-2 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                <>
                  {mode === 'signup' ? 'Create account' : 'Sign in'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}