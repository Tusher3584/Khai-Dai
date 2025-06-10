import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './features/user/pages/LoginPage';
import RegisterPage from './features/user/pages/RegisterPage';
import HomePage from './features/home/pages/HomePage';
import RestaurantListPage from './features/restaurant/pages/RestaurantListPage';
import RestaurantDetailPage from './features/restaurant/pages/RestaurantDetailPage';
import RestaurantFormPage from './features/restaurant/pages/RestaurantFormPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/restaurants" element={<RestaurantListPage />} />
          <Route path="/restaurants/new" element={<RestaurantFormPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          <Route path="/restaurants/:id/edit" element={<RestaurantFormPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
