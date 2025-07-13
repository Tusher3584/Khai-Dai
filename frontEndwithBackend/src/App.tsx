import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/customer/HomePage';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import RestaurantPage from './pages/customer/RestaurantPage';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import RiderDashboard from './pages/rider/RiderDashboard';
import EditProfilePage from './pages/profile/EditProfilePage';

type Page = 'home' | 'signup' | 'login' | 'checkout' | 'restaurant' | 'restaurant-dashboard' | 'rider-dashboard' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <SignupPage />;
      case 'login':
        return <LoginPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'restaurant':
        return <RestaurantPage />;
      case 'restaurant-dashboard':
        return <RestaurantDashboard />;
      case 'rider-dashboard':
        return <RiderDashboard />;
      case 'profile':
        return <EditProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          {/* Navigation for demo purposes */}
          <div className="fixed bottom-4 right-4 z-50 space-y-2">
            <div className="glass-dark rounded-2xl p-4 space-y-2">
              <p className="text-xs text-gray-400 font-semibold">Demo Navigation</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button onClick={() => setCurrentPage('home')} className="btn-primary py-2 px-3 text-xs">Home</button>
                <button onClick={() => setCurrentPage('signup')} className="btn-secondary py-2 px-3 text-xs">Signup</button>
                <button onClick={() => setCurrentPage('profile')} className="btn-success py-2 px-3 text-xs">Profile</button>
                <button onClick={() => setCurrentPage('login')} className="dark-card text-gray-300 py-2 px-3 rounded-xl hover:bg-white/10">Login</button>
                <button onClick={() => setCurrentPage('checkout')} className="btn-success py-2 px-3 text-xs">Checkout</button>
                <button onClick={() => setCurrentPage('restaurant')} className="dark-card text-gray-300 py-2 px-3 rounded-xl hover:bg-white/10">Restaurant</button>
                <button onClick={() => setCurrentPage('restaurant-dashboard')} className="dark-card text-gray-300 py-2 px-3 rounded-xl hover:bg-white/10">R-Dashboard</button>
                <button onClick={() => setCurrentPage('rider-dashboard')} className="dark-card text-gray-300 py-2 px-3 rounded-xl hover:bg-white/10">Rider</button>
              </div>
            </div>
          </div>
          {renderPage()}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;