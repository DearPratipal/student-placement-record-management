import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { loginApi } from '../services/authApi';
// import { apiService } from '../services/apiService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate checking for existing session
  useEffect(() => {
    const storedUser = localStorage.getItem('mmdu_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  /*
  const login = async (email: string, _password: string): Promise<boolean> => {
    // In a real app, password would be hashed and sent to backend
    const foundUser = await apiService.login(email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('mmdu_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };
  */

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await loginApi(email, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('mmdu_user', JSON.stringify(data.user));

      setUser(data.user);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mmdu_user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};