// Core types for the food delivery app
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'restaurant' | 'rider';
  avatar?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  address: string;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  items: CartItem[];
  totalAmount: number;
  deliveryAddress: string;
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDeliveryTime: Date;
  riderId?: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}