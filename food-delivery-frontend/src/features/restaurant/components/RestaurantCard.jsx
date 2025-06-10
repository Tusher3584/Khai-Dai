import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RestaurantCard({ restaurant, isAdmin }) {
  const navigate = useNavigate();
  return (
    <div className="restaurant-card">
      <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
      {isAdmin && (
        <button onClick={() => navigate(`/restaurants/${restaurant.id}/edit`)}>Edit</button>
      )}
    </div>
  );
}