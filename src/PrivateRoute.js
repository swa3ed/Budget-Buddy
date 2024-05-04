import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Use jwt-decode for decoding the token
import { verifyToken } from './services/authService';  // Make sure this path is correct

function PrivateRoute({ children, allowedRoles }) {
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuthorization = async () => {
            const token = localStorage.getItem('userToken');
            if (!token) {
                setIsAuthorized(false);
                setIsChecking(false);
                return;
            }

            try {
                const valid = await verifyToken(token);
                if (valid) {
                    const decodedToken = jwtDecode(token);
                    const userRole = decodedToken.role;
                    setIsAuthorized(allowedRoles.includes(userRole));
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                setIsAuthorized(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkAuthorization();
    }, [allowedRoles]);

    // While checking the token, you might want to render nothing or a loading spinner
    if (isChecking) {
        return <div>Loading...</div>;  // or any other loading indicator
    }

    // If the token is valid and user is authorized, render the children components
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
