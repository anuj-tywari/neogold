'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

export type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  requireAuth: (redirectUrl?: string) => boolean;
};

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/transactions'
];

// Routes that require transaction capability but still show content without login
// User will be prompted to login when attempting transaction actions
const transactionRoutes = [
  '/buy',
  '/sell'
  // '/redeem' - Removed from transaction routes to allow browsing without authentication
];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuthStatus = async () => {
      try {
        // Here you would typically make an API call to verify the session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Redirect to login if accessing a protected route without authentication
  useEffect(() => {
    if (!loading && !user && protectedRoutes.includes(pathname)) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, pathname, router]);

  const requireAuth = useCallback((redirectUrl?: string): boolean => {
    // If user is authenticated, return true
    if (user) return true;
    
    // If not authenticated and this function is called (from a component), redirect to login
    if (redirectUrl) {
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    } else if (pathname) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      router.push('/login');
    }
    
    return false;
  }, [user, router, pathname]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // This is a mock implementation for now
      // In a real application, you would call an API endpoint
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user response
      const mockUser = {
        id: "1",
        name: "John Doe",
        email: email
      };
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (err) {
      console.error("Failed to login. Please check your credentials.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // This is a mock implementation for now
      // In a real application, you would call an API endpoint
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user response
      const mockUser = {
        id: "1",
        name: name,
        email: email
      };
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (err) {
      console.error("Failed to register. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Redirect to home page after logout
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, requireAuth }}>
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