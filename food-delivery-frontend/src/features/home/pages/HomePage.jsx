import React from 'react';
import logo from '../../../assets/khai-dai-high-resolution-logo-transparent.png';
import '../home.css';

export default function HomePage() {
  return (
    <div className="home-bg">
      <div className="home-logo-container">
        <img src={logo} alt="Logo" className="home-logo" />
        <h1>Your cravings, delivered. Fast.</h1>
      </div>
    </div>
  );
}