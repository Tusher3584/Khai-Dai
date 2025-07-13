import { apiService } from './api.service';
import { API_CONFIG } from '../config/api';
import { User } from '../types';

// Authentication Service - Connect to your NestJS Auth Module
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'customer' | 'restaurant' | 'rider';
  // TODO: Add additional fields based on your NestJS User entity
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  // TODO: Match this with your NestJS AuthResponse DTO
}

export class AuthService {
  // Login user
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // TODO: Replace with your NestJS login endpoint response structure
      const response = await apiService.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Register user
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // TODO: Replace with your NestJS register endpoint response structure
      const response = await apiService.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        userData
      );
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Get current user profile
  static async getProfile(): Promise<User> {
    try {
      // TODO: Replace with your NestJS profile endpoint response structure
      return await apiService.get<User>(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      // TODO: Replace with your NestJS update profile endpoint
      return await apiService.put<User>(
        API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE,
        userData
      );
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  }

  // Change password
  static async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      // TODO: Replace with your NestJS change password endpoint
      await apiService.post(API_CONFIG.ENDPOINTS.USERS.CHANGE_PASSWORD, {
        oldPassword,
        newPassword,
      });
    } catch (error) {
      console.error('Change password failed:', error);
      throw error;
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      // TODO: Call your NestJS logout endpoint if you have one
      await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Refresh token
  static async refreshToken(): Promise<string> {
    try {
      // TODO: Replace with your NestJS refresh token endpoint
      const response = await apiService.post<{ token: string }>(
        API_CONFIG.ENDPOINTS.AUTH.REFRESH
      );
      
      localStorage.setItem('token', response.token);
      return response.token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // TODO: Add token validation logic if needed
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Get stored user data
  static getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }
}