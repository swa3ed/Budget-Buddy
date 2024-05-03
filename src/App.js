import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Audience from './Dashboard/Audience';
import Vehicles from './Dashboard/Vehicles';
import Form from './Dashboard/Form';
import Statistics from './Dashboard/Stats';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import PrivateRoute from './PrivateRoute';
import useResize from './useResize';
import 'leaflet/dist/leaflet.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken'));
    const [sidebarState, setSidebarState] = useResize();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
    };

    return (
        <BrowserRouter>
            {isAuthenticated ? (
                <Routes>
                    <Route path="/" element={<PrivateRoute><Dashboard sidebarState={sidebarState} setSidebarState={setSidebarState} /></PrivateRoute>} />
                    <Route path="/audience" element={<PrivateRoute><Audience sidebarState={sidebarState} setSidebarState={setSidebarState} /></PrivateRoute>} />
                    <Route path="/vehicles" element={<PrivateRoute><Vehicles sidebarState={sidebarState} setSidebarState={setSidebarState} /></PrivateRoute>} />
                    <Route path="/form" element={<PrivateRoute><Form sidebarState={sidebarState} setSidebarState={setSidebarState} /></PrivateRoute>} />
                    <Route path="/stats" element={<PrivateRoute><Statistics sidebarState={sidebarState} setSidebarState={setSidebarState} /></PrivateRoute>} />
                    <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
