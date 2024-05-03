import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Invalidate the session on the server, if necessary

    // Remove the token or user session from local storage or cookies
    localStorage.removeItem('userToken'); // If you're using localStorage
    // Or if using cookies, remove the cookie that holds the token
    // document.cookie = "token=; max-age=0"; // Example for cookies

    // Update any application state that holds user info or authentication state
    // For example, if using a global context or Redux for state management:
    // dispatch({ type: 'LOGOUT' });

    // Redirect to the login page or home page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondary">
      Logout
    </button>
  );
};

export default LogoutButton;
