import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurant } from '../restaurant.api';
import { getMenuItems } from '../../menu/menu.api';
import MenuItemCard from '../../menu/components/MenuItemCard';
import '../restaurant.css';
import '../../menu/menu.css';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const isAdmin = localStorage.getItem('role') === 'Admin'; 

  useEffect(() => {
    getRestaurant(id).then(res => setRestaurant(res.data));
    getMenuItems(id).then(res => setMenuItems(res.data));
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="restaurant-detail-bg">
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <p>{restaurant.address}</p>
      <p>Rating: {restaurant.rating}</p>
      {isAdmin && (
        <button onClick={() => navigate(`/restaurants/${id}/edit`)}>Edit Restaurant</button>
      )}
      <h3>Menu</h3>
      {isAdmin && (
        <button onClick={() => setEditingMenuItem({})}>Add Menu Item</button>
      )}
      <div className="menu-list">
        {menuItems.map(item => (
          <MenuItemCard
            key={item.id}
            item={item}
            isAdmin={isAdmin}
            onEdit={setEditingMenuItem}
          />
        ))}
      </div>
      {/* You can show a modal or inline form for editing/adding menu items */}
    </div>
  );
}