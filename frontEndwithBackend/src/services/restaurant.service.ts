import { apiService } from './api.service';
import { API_CONFIG } from '../config/api';
import { Restaurant, MenuItem } from '../types';

// Restaurant Service - Connect to your NestJS Restaurant Module
export interface RestaurantSearchParams {
  query?: string;
  cuisine?: string;
  location?: string;
  minRating?: number;
  maxDeliveryTime?: number;
  isOpen?: boolean;
  // TODO: Add more search parameters based on your NestJS implementation
}

export interface NearbyRestaurantsParams {
  latitude: number;
  longitude: number;
  radius?: number; // in kilometers
}

export class RestaurantService {
  // Get all restaurants
  static async getAllRestaurants(): Promise<Restaurant[]> {
    try {
      // TODO: Replace with your NestJS restaurant endpoint response structure
      return await apiService.get<Restaurant[]>(API_CONFIG.ENDPOINTS.RESTAURANTS.BASE);
    } catch (error) {
      console.error('Get restaurants failed:', error);
      throw error;
    }
  }

  // Get restaurant by ID
  static async getRestaurantById(id: string): Promise<Restaurant> {
    try {
      // TODO: Replace with your NestJS restaurant by ID endpoint
      return await apiService.get<Restaurant>(
        API_CONFIG.ENDPOINTS.RESTAURANTS.BY_ID(id)
      );
    } catch (error) {
      console.error('Get restaurant by ID failed:', error);
      throw error;
    }
  }

  // Search restaurants
  static async searchRestaurants(params: RestaurantSearchParams): Promise<Restaurant[]> {
    try {
      // TODO: Replace with your NestJS restaurant search endpoint
      return await apiService.get<Restaurant[]>(
        API_CONFIG.ENDPOINTS.RESTAURANTS.SEARCH,
        { params }
      );
    } catch (error) {
      console.error('Search restaurants failed:', error);
      throw error;
    }
  }

  // Get nearby restaurants
  static async getNearbyRestaurants(params: NearbyRestaurantsParams): Promise<Restaurant[]> {
    try {
      // TODO: Replace with your NestJS nearby restaurants endpoint
      return await apiService.get<Restaurant[]>(
        API_CONFIG.ENDPOINTS.RESTAURANTS.NEARBY,
        { params }
      );
    } catch (error) {
      console.error('Get nearby restaurants failed:', error);
      throw error;
    }
  }

  // Get restaurant menu
  static async getRestaurantMenu(restaurantId: string): Promise<MenuItem[]> {
    try {
      // TODO: Replace with your NestJS restaurant menu endpoint
      return await apiService.get<MenuItem[]>(
        API_CONFIG.ENDPOINTS.RESTAURANTS.MENU(restaurantId)
      );
    } catch (error) {
      console.error('Get restaurant menu failed:', error);
      throw error;
    }
  }

  // Restaurant owner methods (if applicable)
  
  // Update restaurant info (for restaurant owners)
  static async updateRestaurant(id: string, data: Partial<Restaurant>): Promise<Restaurant> {
    try {
      // TODO: Replace with your NestJS update restaurant endpoint
      return await apiService.put<Restaurant>(
        API_CONFIG.ENDPOINTS.RESTAURANTS.BY_ID(id),
        data
      );
    } catch (error) {
      console.error('Update restaurant failed:', error);
      throw error;
    }
  }

  // Add menu item (for restaurant owners)
  static async addMenuItem(restaurantId: string, menuItem: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    try {
      // TODO: Replace with your NestJS add menu item endpoint
      return await apiService.post<MenuItem>(
        API_CONFIG.ENDPOINTS.MENU.BY_RESTAURANT(restaurantId),
        menuItem
      );
    } catch (error) {
      console.error('Add menu item failed:', error);
      throw error;
    }
  }

  // Update menu item (for restaurant owners)
  static async updateMenuItem(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
    try {
      // TODO: Replace with your NestJS update menu item endpoint
      return await apiService.put<MenuItem>(
        API_CONFIG.ENDPOINTS.MENU.BY_ID(id),
        data
      );
    } catch (error) {
      console.error('Update menu item failed:', error);
      throw error;
    }
  }

  // Delete menu item (for restaurant owners)
  static async deleteMenuItem(id: string): Promise<void> {
    try {
      // TODO: Replace with your NestJS delete menu item endpoint
      await apiService.delete(API_CONFIG.ENDPOINTS.MENU.BY_ID(id));
    } catch (error) {
      console.error('Delete menu item failed:', error);
      throw error;
    }
  }
}