// API Response Types - Match these with your NestJS DTOs

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
  // TODO: Match this with your NestJS response wrapper
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  // TODO: Match this with your NestJS pagination DTO
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
  timestamp: string;
  path: string;
  // TODO: Match this with your NestJS exception filter
}

// Authentication Types
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'customer' | 'restaurant' | 'rider';
  // TODO: Add more fields based on your NestJS CreateUserDto
}

export interface AuthResponseDto {
  user: UserDto;
  token: string;
  refreshToken?: string;
  expiresIn: number;
  // TODO: Match this with your NestJS AuthResponseDto
}

// User Types
export interface UserDto {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'customer' | 'restaurant' | 'rider';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // TODO: Match this with your NestJS User entity
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
  avatar?: string;
  // TODO: Add more fields based on your NestJS UpdateUserDto
}

// Restaurant Types
export interface RestaurantDto {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  address: string;
  phone: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  // TODO: Match this with your NestJS Restaurant entity
}

export interface CreateRestaurantDto {
  name: string;
  description: string;
  cuisine: string[];
  address: string;
  phone: string;
  deliveryFee: number;
  minimumOrder: number;
  // TODO: Match this with your NestJS CreateRestaurantDto
}

// Menu Item Types
export interface MenuItemDto {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
  // TODO: Match this with your NestJS MenuItem entity
}

export interface CreateMenuItemDto {
  name: string;
  description: string;
  price: number;
  category: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  // TODO: Match this with your NestJS CreateMenuItemDto
}

// Order Types
export interface OrderDto {
  id: string;
  customerId: string;
  restaurantId: string;
  riderId?: string;
  items: OrderItemDto[];
  totalAmount: number;
  deliveryAddress: AddressDto;
  paymentMethod: string;
  status: OrderStatus;
  specialInstructions?: string;
  estimatedDeliveryTime: string;
  createdAt: string;
  updatedAt: string;
  // TODO: Match this with your NestJS Order entity
}

export interface OrderItemDto {
  id: string;
  menuItemId: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
  // TODO: Match this with your NestJS OrderItem entity
}

export interface CreateOrderDto {
  restaurantId: string;
  items: CreateOrderItemDto[];
  deliveryAddress: CreateAddressDto;
  paymentMethod: string;
  specialInstructions?: string;
  // TODO: Match this with your NestJS CreateOrderDto
}

export interface CreateOrderItemDto {
  menuItemId: string;
  quantity: number;
  specialInstructions?: string;
}

export interface AddressDto {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  // TODO: Match this with your NestJS Address entity
}

export interface CreateAddressDto {
  street: string;
  city: string;
  postalCode: string;
  phone: string;
}

export type OrderStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'picked_up' 
  | 'delivered' 
  | 'cancelled';

// Payment Types
export interface PaymentMethodDto {
  id: string;
  type: 'card' | 'bkash' | 'nagad' | 'cash';
  details: any; // Card details, mobile number, etc.
  isDefault: boolean;
  userId: string;
  // TODO: Match this with your NestJS PaymentMethod entity
}

export interface CreatePaymentMethodDto {
  type: 'card' | 'bkash' | 'nagad' | 'cash';
  details: any;
  isDefault?: boolean;
}

// File Upload Types
export interface FileUploadDto {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  // TODO: Match this with your NestJS file upload response
}