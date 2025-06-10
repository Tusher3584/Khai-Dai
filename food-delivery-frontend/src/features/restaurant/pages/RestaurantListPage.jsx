import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../restaurant.api';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import '../restaurant.css';

export default function RestaurantListPage() {
  const [restaurants, setRestaurants] = useState([]);
  const isAdmin = true; // Replace with real auth check
  const navigate = useNavigate();

  useEffect(() => {
    getRestaurants().then(res => setRestaurants(res.data));
  }, []);

  return (
    <div className="restaurant-list-bg">
      <div className="restaurant-list-header">
        <h2>Restaurants</h2>
        {isAdmin && (
          <button onClick={() => navigate('/restaurants/new')}>Create Restaurant</button>
        )}
      </div>
      <div className="restaurant-list">
        {restaurants.map(r => (
          <RestaurantCard key={r.id} restaurant={r} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}