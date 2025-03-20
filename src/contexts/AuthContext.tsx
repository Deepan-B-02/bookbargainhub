
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  memberSince: string;
  booksListed: number;
  booksSold: number;
  booksPurchased: number;
  avatar: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Format today's date as "Month Year"
const formatMemberSince = (): string => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for stored user data on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('bookbay_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Sign up function
  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would make an API call to create the user in a database
      // For now, we'll simulate the creation with localStorage
      
      // Check if email already exists
      const users = JSON.parse(localStorage.getItem('bookbay_users') || '[]');
      if (users.some((user: any) => user.email === email)) {
        toast.error('Email already in use');
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`, // Generate a simple unique ID
        name,
        email,
        memberSince: formatMemberSince(),
        booksListed: 0,
        booksSold: 0,
        booksPurchased: 0,
        avatar: null,
      };
      
      // Store in "database" (localStorage)
      users.push({...newUser, password}); // In a real app, password would be hashed
      localStorage.setItem('bookbay_users', JSON.stringify(users));
      
      // Set as current user
      setCurrentUser(newUser);
      localStorage.setItem('bookbay_user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error('An error occurred during sign up');
      return false;
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would verify against a database
      const users = JSON.parse(localStorage.getItem('bookbay_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        toast.error('Invalid email or password');
        return false;
      }
      
      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('bookbay_user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error("Error during sign in:", error);
      toast.error('An error occurred during sign in');
      return false;
    }
  };

  // Sign out function
  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('bookbay_user');
    toast.success('Successfully logged out');
  };

  const value = {
    currentUser,
    isLoading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
