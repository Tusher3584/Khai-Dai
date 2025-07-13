import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { AuthService, LoginRequest, RegisterRequest } from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is authenticated
      if (AuthService.isAuthenticated()) {
        const storedUser = AuthService.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
          // TODO: Optionally refresh user data from backend
          // await refreshUser();
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      // Clear invalid auth data
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      
      // TODO: Call your NestJS login endpoint
      const response = await AuthService.login(credentials);
      setUser(response.user);
      
      // TODO: Handle any additional login logic (analytics, etc.)
      console.log('Login successful:', response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      
      // TODO: Call your NestJS register endpoint
      const response = await AuthService.register(userData);
      setUser(response.user);
      
      // TODO: Handle any additional registration logic
      console.log('Registration successful:', response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // TODO: Call your NestJS logout endpoint
      await AuthService.logout();
      setUser(null);
      
      // TODO: Handle any additional logout logic (clear cache, etc.)
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      // Clear user state even if logout request fails
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      // TODO: Call your NestJS update profile endpoint
      const updatedUser = await AuthService.updateProfile(userData);
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      console.log('Profile updated successfully:', updatedUser);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      // TODO: Call your NestJS get profile endpoint
      const refreshedUser = await AuthService.getProfile();
      setUser(refreshedUser);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(refreshedUser));
    } catch (error) {
      console.error('User refresh failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
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