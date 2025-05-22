# Khai-Dai - A Food Delivery App

A full-stack food delivery application built with **React** (frontend) and **NestJS** (backend).  
The project follows **Clean Architecture** principles for modularity, scalability, and maintainability.

---

## Features

### 1. User Management
- User registration & login via email/password and Google OAuth  
- Profile creation and editing  
- Role-based users: Customer, Delivery Person, Admin  

### 2. Restaurant & Menu Management
- Browse restaurants with filtering and sorting options  
- View detailed restaurant profiles and menus  
- Admin/restaurant owners can add, edit, and delete restaurants and menu items  

### 3. Cart & Order Management
- Add, modify, or remove items in the cart  
- Place orders with delivery address  
- Track order status through stages: Pending → Accepted → Out for Delivery → Delivered  
- Order history for users  

### 4. Payment Integration
- Dummy payment system integration (Stripe/PayPal sandbox)  
- Payment status updates reflected in order status  

### 5. Delivery System
- Assign delivery personnel to orders (manual or automatic)  
- Delivery persons can view assigned orders and mark them as delivered  

### 6. Notifications
- Email or in-app alerts for order confirmation, status updates, and delivery assignments  

### 7. Admin Dashboard
- Manage users, orders, restaurants, and delivery agents  
- View system statistics such as user counts, order numbers, and revenue  

### 8. Search & Filter
- Search for restaurants or food items  
- Filter by rating, delivery time, cuisine type, and more  

### 9. Ratings & Reviews
- Customers can rate and review restaurants and food items  
- View average ratings and detailed reviews  

### 10. Security & Validation
- Input validation on client and server  
- JWT-based authentication and role-based access control  
- Secure password hashing  

---

## Technology Stack

- Frontend: React  
- Backend: NestJS (Node.js)  
- Database: (Your choice, e.g., PostgreSQL, MongoDB)  
- API communication: RESTful API  
- Architecture: Clean Architecture (Domain, Application, Infrastructure, Interfaces layers)  

---

## Project Structure

- `food-delivery-frontend/` – React frontend code  
- `food-delivery-backend/` – NestJS backend following Clean Architecture principles  

---

## Getting Started

### Backend

```bash
cd food-delivery-backend
npm install
npm run start:dev
