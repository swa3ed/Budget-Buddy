import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Audience from './Dashboard/Audience';
import Vehicles from './Dashboard/Vehicles';
import Mission from './Dashboard/Mission';
import Statistics from './Dashboard/Stats';
//import Login from './Components/Login/Login';
//import Logout from './Components/Logout/Logout';
import 'leaflet/dist/leaflet.css';
import "./App.css";

function App() {
  const [sidebarState, setSidebarState] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(process.env.REACT_APP_BYPASS_LOGIN === 'true');

  useEffect(() => {
    if (!isAuthenticated && process.env.REACT_APP_BYPASS_LOGIN !== 'true') {
      // Check token presence only if not bypassing login
      const token = localStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    }
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setSidebarState(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login"></Route>
        <Route path="/Logout"></Route>
        <Route path="/dashboard" element={ <Dashboard sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
        <Route path="/audience" element={ <Audience sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
        <Route path="/vehicles" element={<Vehicles sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
        <Route path="/form" element={ <Mission sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
        <Route path="/stats" element={ <Statistics sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
