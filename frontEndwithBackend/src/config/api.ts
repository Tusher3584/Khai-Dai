// API Configuration for NestJS Backend Integration
export const API_CONFIG = {
  // TODO: Replace with your NestJS backend URL
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  
  // API Endpoints - Update these to match your NestJS routes
  ENDPOINTS: {
    // Authentication endpoints
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
    },
    
    // User management endpoints
    USERS: {
      BASE: '/users',
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
      CHANGE_PASSWORD: '/users/change-password',
      UPLOAD_AVATAR: '/users/avatar',
    },
    
    // Restaurant endpoints
    RESTAURANTS: {
      BASE: '/restaurants',
      BY_ID: (id: string) => `/restaurants/${id}`,
      MENU: (id: string) => `/restaurants/${id}/menu`,
      SEARCH: '/restaurants/search',
      NEARBY: '/restaurants/nearby',
    },
    
    // Menu items endpoints
    MENU: {
      BASE: '/menu',
      BY_ID: (id: string) => `/menu/${id}`,
      BY_RESTAURANT: (restaurantId: string) => `/menu/restaurant/${restaurantId}`,
      CATEGORIES: '/menu/categories',
    },
    
    // Order endpoints
    ORDERS: {
      BASE: '/orders',
      BY_ID: (id: string) => `/orders/${id}`,
      USER_ORDERS: '/orders/user',
      RESTAURANT_ORDERS: '/orders/restaurant',
      RIDER_ORDERS: '/orders/rider',
      CREATE: '/orders',
      UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
    },
    
    // Cart endpoints (if you store cart on backend)
    CART: {
      BASE: '/cart',
      ADD_ITEM: '/cart/add',
      REMOVE_ITEM: '/cart/remove',
      UPDATE_QUANTITY: '/cart/update',
      CLEAR: '/cart/clear',
    },
    
    // Payment endpoints
    PAYMENTS: {
      BASE: '/payments',
      PROCESS: '/payments/process',
      METHODS: '/payments/methods',
      ADD_METHOD: '/payments/methods',
      REMOVE_METHOD: (id: string) => `/payments/methods/${id}`,
    },
    
    // Delivery/Rider endpoints
    DELIVERY: {
      BASE: '/delivery',
      ASSIGN: '/delivery/assign',
      UPDATE_LOCATION: '/delivery/location',
      COMPLETE: (id: string) => `/delivery/${id}/complete`,
    },
    
    // File upload endpoints
    UPLOAD: {
      AVATAR: '/upload/avatar',
      RESTAURANT_IMAGE: '/upload/restaurant',
      MENU_IMAGE: '/upload/menu',
    },
  },
  
  // Request timeout
  TIMEOUT: 10000,
  
  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};