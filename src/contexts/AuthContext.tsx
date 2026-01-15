import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';

interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  address?: string;
  height?: string;
  weight?: string;
  allergies?: string;
  chronicConditions?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  address?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.verify();
        setUser(response.data.user);
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      throw new Error((error as {response?: {data?: {error?: string}}})?.response?.data?.error || message);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      throw new Error((error as {response?: {data?: {error?: string}}})?.response?.data?.error || message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
