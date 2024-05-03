// App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Audience from './Dashboard/Audience';
import Vehicles from './Dashboard/Vehicles';
import Form from './Dashboard/Form';
import Statistics from './Dashboard/Stats';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import Sidebar from './Layouts/Sidebar';
import PrivateRoute from './PrivateRoute';
import useResize from './useResize';
import 'leaflet/dist/leaflet.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken'));
    const [sidebarState, setSidebarState] = useResize(false);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
    };

    return (
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <Dashboard sidebarState={sidebarState} setSidebarState={setSidebarState} />
                    </PrivateRoute>
                } />
                <Route path="/audience" element={
                    <PrivateRoute>
                        <Audience sidebarState={sidebarState} setSidebarState={setSidebarState} />
                    </PrivateRoute>
                } />
                <Route path="/vehicles" element={
                    <PrivateRoute>
                        <Vehicles sidebarState={sidebarState} setSidebarState={setSidebarState}  />
                    </PrivateRoute>
                } />
                <Route path="/form" element={
                    <PrivateRoute>
                        <Form sidebarState={sidebarState} setSidebarState={setSidebarState} setIsAuthenticated={setIsAuthenticated} />
                    </PrivateRoute>
                } />
                <Route path="/stats" element={
                    <PrivateRoute>
                        <Statistics sidebarState={sidebarState} setSidebarState={setSidebarState} />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
