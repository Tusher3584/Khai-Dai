import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import logo from '../assets/khai-dai-high-resolution-logo-transparent.png';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/user/login', form);
      setMessage('Login successful! Token: ' + res.data.token);
    } catch (err) {
      setMessage('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
  <div className = "page-bg">  
    <div className="form-container">
      <img src={logo} alt="Logo" className="form-logo" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <div className="message">{message}</div>
    </div>
  </div>  
  );
}