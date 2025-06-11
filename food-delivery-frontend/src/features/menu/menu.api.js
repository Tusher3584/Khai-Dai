import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export const getMenuItems = (restaurantId) =>
  axios.get(`${API_BASE}/restaurants/${restaurantId}/menu-items`);

export const getMenuItem = (restaurantId, menuItemId) =>
  axios.get(`${API_BASE}/restaurants/${restaurantId}/menu-items/${menuItemId}`);

export const createMenuItem = (restaurantId, data) =>
  axios.post(`${API_BASE}/restaurants/${restaurantId}/menu-items`, data);

export const updateMenuItem = (restaurantId, menuItemId, data) =>
  axios.put(`${API_BASE}/restaurants/${restaurantId}/menu-items/${menuItemId}`, data);

export const deleteMenuItem = (restaurantId, menuItemId) =>
  axios.delete(`${API_BASE}/restaurants/${restaurantId}/menu-items/${menuItemId}`);