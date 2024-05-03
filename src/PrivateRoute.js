// PrivateRoute.js

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setIsAuthenticated(!!token);
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
