import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  const syncUser = () => {
    try {
      const stored = window.localStorage.getItem('ain_currentUser');
      if (stored && stored !== 'null') {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    syncUser();
    window.addEventListener('storage', syncUser);
    window.addEventListener('ain_user_changed', syncUser);
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('ain_user_changed', syncUser);
    };
  }, []);

  const isAuthenticated = !!user;

  const login = async (email: string, pass: string) => {
    // Legacy API login (mostly unused now)
    return false;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('ain_currentUser');
    window.dispatchEvent(new Event('ain_user_changed'));
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
