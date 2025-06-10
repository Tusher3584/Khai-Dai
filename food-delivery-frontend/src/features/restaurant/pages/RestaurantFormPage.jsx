import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurant, createRestaurant, updateRestaurant } from '../restaurant.api';
import RestaurantForm from '../components/RestaurantForm';
import '../restaurant.css';

export default function RestaurantFormPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getRestaurant(id).then(res => setInitialData(res.data));
    }
  }, [id]);

  const handleSubmit = async (data) => {
    if (id) {
      await updateRestaurant(id, data);
    } else {
      await createRestaurant(data);
    }
    navigate('/restaurants');
  };

  return (
    <div className="restaurant-form-bg">
      <h2>{id ? 'Edit Restaurant' : 'Create Restaurant'}</h2>
      <RestaurantForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}