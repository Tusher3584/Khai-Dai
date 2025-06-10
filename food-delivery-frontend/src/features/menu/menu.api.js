import axios from 'axios';

export const getMenuItems = (restaurantId) =>
  axios.get(`/restaurants/${restaurantId}/menu-items`);

export const getMenuItem = (restaurantId, menuItemId) =>
  axios.get(`/restaurants/${restaurantId}/menu-items/${menuItemId}`);

export const createMenuItem = (restaurantId, data) =>
  axios.post(`/restaurants/${restaurantId}/menu-items`, data);

export const updateMenuItem = (restaurantId, menuItemId, data) =>
  axios.put(`/restaurants/${restaurantId}/menu-items/${menuItemId}`, data);

export const deleteMenuItem = (restaurantId, menuItemId) =>
  axios.delete(`/restaurants/${restaurantId}/menu-items/${menuItemId}`);