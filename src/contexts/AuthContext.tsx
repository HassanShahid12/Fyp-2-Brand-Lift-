import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { AuthUser } from '../types/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key';
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const useMockAuth = !isSupabaseConfigured();
  
  // Initialize user state from localStorage if in mock mode
  const getInitialUser = (): AuthUser | null => {
    if (useMockAuth && typeof window !== 'undefined') {
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        try {
          return JSON.parse(mockUser);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  };

  const [user, setUser] = useState<AuthUser | null>(getInitialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (useMockAuth) {
      // Mock mode - check localStorage for existing session (double-check on mount)
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        try {
          setUser(JSON.parse(mockUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
      return;
    }

    // Real Supabase mode
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata,
          });
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          user_metadata: session.user.user_metadata,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, [useMockAuth]);

  const signUp = async (email: string, password: string, fullName: string) => {
    if (useMockAuth) {
      // Mock sign up - just create a mock user
      const mockUser: AuthUser = {
        id: `mock-${Date.now()}`,
        email,
        user_metadata: { full_name: fullName },
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    if (useMockAuth) {
      // Mock sign in - allow "a" and "1" for testing
      if (email === 'a' && password === '1') {
        const mockUser: AuthUser = {
          id: 'mock-user-123',
          email: 'a',
          user_metadata: { full_name: 'Test User' },
        };
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        setUser(mockUser);
        return;
      } else {
        throw new Error('Invalid credentials. Use email: "a" and password: "1" for testing.');
      }
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your internet connection or Supabase configuration.');
      }
      throw error;
    }
  };

  const signOut = async () => {
    if (useMockAuth) {
      localStorage.removeItem('mockUser');
      setUser(null);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
