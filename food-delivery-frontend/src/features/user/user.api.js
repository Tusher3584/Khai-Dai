import axios from 'axios';

export const registerUser = (data) =>
  axios.post('http://localhost:3000/user/register', data);

export const loginUser = (data) =>
  axios.post('http://localhost:3000/user/login', data);