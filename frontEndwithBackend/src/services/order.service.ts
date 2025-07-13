import { apiService } from './api.service';
import { API_CONFIG } from '../config/api';
import { Order, CartItem } from '../types';

// Order Service - Connect to your NestJS Order Module
export interface CreateOrderRequest {
  restaurantId: string;
  items: CartItem[];
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
  specialInstructions?: string;
  // TODO: Add more fields based on your NestJS Order entity
}

export interface OrderStatusUpdate {
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
  estimatedDeliveryTime?: Date;
  riderId?: string;
}

export class OrderService {
  // Create new order
  static async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      // TODO: Replace with your NestJS create order endpoint response structure
      return await apiService.post<Order>(
        API_CONFIG.ENDPOINTS.ORDERS.CREATE,
        orderData
      );
    } catch (error) {
      console.error('Create order failed:', error);
      throw error;
    }
  }

  // Get order by ID
  static async getOrderById(id: string): Promise<Order> {
    try {
      // TODO: Replace with your NestJS get order by ID endpoint
      return await apiService.get<Order>(
        API_CONFIG.ENDPOINTS.ORDERS.BY_ID(id)
      );
    } catch (error) {
      console.error('Get order by ID failed:', error);
      throw error;
    }
  }

  // Get user's orders
  static async getUserOrders(): Promise<Order[]> {
    try {
      // TODO: Replace with your NestJS get user orders endpoint
      return await apiService.get<Order[]>(
        API_CONFIG.ENDPOINTS.ORDERS.USER_ORDERS
      );
    } catch (error) {
      console.error('Get user orders failed:', error);
      throw error;
    }
  }

  // Get restaurant's orders (for restaurant owners)
  static async getRestaurantOrders(restaurantId?: string): Promise<Order[]> {
    try {
      // TODO: Replace with your NestJS get restaurant orders endpoint
      const url = restaurantId 
        ? `${API_CONFIG.ENDPOINTS.ORDERS.RESTAURANT_ORDERS}?restaurantId=${restaurantId}`
        : API_CONFIG.ENDPOINTS.ORDERS.RESTAURANT_ORDERS;
      
      return await apiService.get<Order[]>(url);
    } catch (error) {
      console.error('Get restaurant orders failed:', error);
      throw error;
    }
  }

  // Get rider's orders (for delivery riders)
  static async getRiderOrders(riderId?: string): Promise<Order[]> {
    try {
      // TODO: Replace with your NestJS get rider orders endpoint
      const url = riderId 
        ? `${API_CONFIG.ENDPOINTS.ORDERS.RIDER_ORDERS}?riderId=${riderId}`
        : API_CONFIG.ENDPOINTS.ORDERS.RIDER_ORDERS;
      
      return await apiService.get<Order[]>(url);
    } catch (error) {
      console.error('Get rider orders failed:', error);
      throw error;
    }
  }

  // Update order status
  static async updateOrderStatus(orderId: string, statusData: OrderStatusUpdate): Promise<Order> {
    try {
      // TODO: Replace with your NestJS update order status endpoint
      return await apiService.patch<Order>(
        API_CONFIG.ENDPOINTS.ORDERS.UPDATE_STATUS(orderId),
        statusData
      );
    } catch (error) {
      console.error('Update order status failed:', error);
      throw error;
    }
  }

  // Cancel order
  static async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    try {
      // TODO: Replace with your NestJS cancel order endpoint
      return await apiService.patch<Order>(
        API_CONFIG.ENDPOINTS.ORDERS.UPDATE_STATUS(orderId),
        { status: 'cancelled', reason }
      );
    } catch (error) {
      console.error('Cancel order failed:', error);
      throw error;
    }
  }

  // Track order (real-time updates)
  static async trackOrder(orderId: string): Promise<Order> {
    try {
      // TODO: Replace with your NestJS track order endpoint
      return await apiService.get<Order>(
        `${API_CONFIG.ENDPOINTS.ORDERS.BY_ID(orderId)}/track`
      );
    } catch (error) {
      console.error('Track order failed:', error);
      throw error;
    }
  }
}