import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../user.api';
import '../user.css';
import logo from '../../../assets/khai-dai-high-resolution-logo-transparent.png';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return {};
  }
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      // Decode and store the role
      const { token } = res.data;
      const payload = parseJwt(token);
      localStorage.setItem('role', payload.role);
      localStorage.setItem('token', token);
      setMessage('Login successful!');
      setTimeout(() => {
        navigate('/restaurants');
      }, 1000);
    } catch (err) {
      setMessage('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="page-bg">
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