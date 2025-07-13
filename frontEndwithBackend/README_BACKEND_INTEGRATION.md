# NestJS Backend Integration Guide

This guide will help you integrate your NestJS backend with this React frontend.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in your React project root:

```env
# TODO: Replace with your NestJS backend URL
REACT_APP_API_URL=http://localhost:3000

# TODO: Add other environment variables your backend needs
REACT_APP_SOCKET_URL=ws://localhost:3001
REACT_APP_UPLOAD_URL=http://localhost:3000/upload
```

### 2. Update API Configuration

Edit `src/config/api.ts`:

```typescript
// TODO: Update these endpoints to match your NestJS routes
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    // Update these paths to match your NestJS controllers
    AUTH: {
      LOGIN: '/auth/login',        // → YourAuthController.login()
      REGISTER: '/auth/register',  // → YourAuthController.register()
      // ... add more endpoints
    }
  }
}
```

## 📁 File Structure

```
src/
├── config/
│   └── api.ts              # API configuration & endpoints
├── services/
│   ├── api.service.ts      # Base API service with interceptors
│   ├── auth.service.ts     # Authentication methods
│   ├── restaurant.service.ts # Restaurant CRUD operations
│   └── order.service.ts    # Order management
├── types/
│   └── api.types.ts        # TypeScript types matching your DTOs
├── hooks/
│   └── useApi.ts           # Custom hooks for API calls
├── utils/
│   └── storage.ts          # Local storage utilities
└── context/
    └── AuthContext.tsx     # Updated auth context with backend calls
```

## 🔧 Integration Steps

### Step 1: Match Your NestJS DTOs

Update `src/types/api.types.ts` to match your NestJS DTOs:

```typescript
// TODO: Replace with your actual User entity structure
export interface UserDto {
  id: string;
  email: string;
  name: string;
  // Add fields from your NestJS User entity
}
```

### Step 2: Update API Endpoints

In `src/config/api.ts`, update endpoints to match your NestJS controllers:

```typescript
// Example: If your auth controller is at '/api/auth'
AUTH: {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
}
```

### Step 3: Configure Authentication

Update `src/services/auth.service.ts`:

```typescript
// TODO: Match your NestJS login response structure
static async login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await apiService.post<AuthResponse>(
    API_CONFIG.ENDPOINTS.AUTH.LOGIN,
    credentials
  );
  
  // TODO: Handle your specific token structure
  localStorage.setItem('token', response.token);
  return response;
}
```

### Step 4: Update Request/Response Handling

In `src/services/api.service.ts`:

```typescript
// TODO: Update token format if different
config.headers.Authorization = `Bearer ${token}`;

// TODO: Handle your specific error response format
if (error.response?.status === 401) {
  // Handle unauthorized access
}
```

## 🔐 Authentication Flow

### Current Implementation:
1. User logs in → `AuthService.login()`
2. Token stored in localStorage
3. Token added to all API requests
4. Auto-redirect on 401 errors

### To Integrate:
1. Update login/register endpoints in `api.ts`
2. Match response structure in `auth.service.ts`
3. Update token handling if needed
4. Test authentication flow

## 📊 Data Flow Example

### Restaurant List Page:
```typescript
// 1. Component calls hook
const { data: restaurants, loading } = useApi(() => 
  RestaurantService.getAllRestaurants()
);

// 2. Service calls API
static async getAllRestaurants(): Promise<Restaurant[]> {
  return await apiService.get<Restaurant[]>('/restaurants');
}

// 3. API service adds auth headers and makes request
// 4. Response mapped to Restaurant[] type
// 5. Component renders data
```

## 🛠️ Customization Points

### 1. Error Handling
Update error handling in `api.service.ts`:

```typescript
// TODO: Match your NestJS exception filter response
if (error.response?.status === 401) {
  // Handle your specific error format
}
```

### 2. Request Interceptors
Add custom headers or modify requests:

```typescript
this.api.interceptors.request.use((config) => {
  // TODO: Add any custom headers your backend needs
  config.headers['X-Custom-Header'] = 'value';
  return config;
});
```

### 3. Response Transformation
Transform responses to match frontend expectations:

```typescript
this.api.interceptors.response.use((response) => {
  // TODO: Transform response if needed
  return response.data; // If your backend wraps responses
});
```

## 🧪 Testing Integration

### 1. Test Authentication
```bash
# Start your NestJS backend
npm run start:dev

# Start React frontend
npm start

# Test login flow
```

### 2. Check Network Tab
- Verify API calls are made to correct endpoints
- Check request headers include auth token
- Verify response format matches expectations

### 3. Error Scenarios
- Test with invalid credentials
- Test with expired tokens
- Test network failures

## 📝 Common Issues & Solutions

### Issue: CORS Errors
**Solution:** Configure CORS in your NestJS app:
```typescript
// In your NestJS main.ts
app.enableCors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true,
});
```

### Issue: Token Format Mismatch
**Solution:** Update token handling in `api.service.ts`:
```typescript
// If your backend expects different format
config.headers.Authorization = `Token ${token}`;
```

### Issue: Response Structure Mismatch
**Solution:** Update response handling or add transformers:
```typescript
// If your backend wraps responses
return response.data.data; // Extract nested data
```

## 🚀 Next Steps

1. **Update Environment Variables**: Set your backend URL
2. **Match DTOs**: Update TypeScript types to match your entities
3. **Test Endpoints**: Verify all API calls work correctly
4. **Add Error Handling**: Implement proper error messages
5. **Add Loading States**: Ensure good UX during API calls
6. **Implement Real-time Features**: Add WebSocket for live updates

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify network requests in DevTools
3. Ensure your NestJS backend is running
4. Check CORS configuration
5. Verify JWT token format

The frontend is designed to be backend-agnostic, so you can easily adapt it to your specific NestJS implementation!