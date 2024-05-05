import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const [admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Your authentication logic here
    try {
      // Simulate a successful login
      const response = await fetch('your-authentication-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: admin, password: password })
      });
      if (response.ok) {
        setRedirectToDashboard(true);
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (redirectToDashboard) {
    return <Navigate to="/"/>;
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>SmartFleet</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Admin"
            required
            value={admin}
            onChange={e => setAdmin(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
