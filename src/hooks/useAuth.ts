import { useState, useEffect } from 'react';
import { authAPI } from '../lib/api';

interface User {
  id: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const data = await authAPI.signUp(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.response?.data?.error || 'Sign up failed' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await authAPI.signIn(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.response?.data?.error || 'Sign in failed' } };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    return { error: null };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
};