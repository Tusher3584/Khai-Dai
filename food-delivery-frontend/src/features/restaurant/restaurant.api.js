import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // backend URL

export const getRestaurants = () => axios.get(`${API_BASE}/restaurants`);
export const getRestaurant = id => axios.get(`${API_BASE}/restaurants/${id}`);
export const createRestaurant = data => axios.post(`${API_BASE}/restaurants`, data);
export const updateRestaurant = (id, data) => axios.put(`${API_BASE}/restaurants/${id}`, data);
export const deleteRestaurant = id => axios.delete(`${API_BASE}/restaurants/${id}`);