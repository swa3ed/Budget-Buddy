// PrivateRoute.js

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from './services/authService';  // Make sure this path is correct

function PrivateRoute({ children }) {
    const [isChecking, setIsChecking] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('userToken');
            if (!token) {
                setIsValidToken(false);
                setIsChecking(false);
                return;
            }

            try {
                // Call the verifyToken function and await its response
                const valid = await verifyToken(token);
                setIsValidToken(valid);
            } catch (error) {
                console.error('Token verification failed:', error);
                setIsValidToken(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkToken();
    }, []);

    // While checking the token, you might want to render nothing or a loading spinner
    if (isChecking) {
        return <div>Loading...</div>;  // or any other loading indicator
    }

    // If the token is valid, render the children components
    return isValidToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
