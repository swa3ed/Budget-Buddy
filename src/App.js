import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Balance from './Dashboard/Balance';
import Expenses from './Dashboard/Expenses';
import Transactions from './Dashboard/Transactions';
import Subscription from './Dashboard/Subscription';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import Sidebar from './Layouts/Sidebar';
import useResize from './useResize';
import { useEffect } from 'react';

function App() {
    const [sidebarState, setSidebarState] = useResize(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true by default for auto-login
    const handleLogout = () => {
        setIsAuthenticated(false); // Allow logout functionality
    };
    useEffect(() => {
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
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
                <Route path="/" element={ <Sidebar sidebarState={sidebarState} setSidebarState={setSidebarState} isAuthenticated={isAuthenticated} /> } />
                <Route path="/dashboard" element={ <Dashboard sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
                <Route path="/balance" element={ <Balance sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
                <Route path="/expenses" element={<Expenses sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
                <Route path="/transactions" element={ <Transactions sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
                <Route path="/subscription" element={ <Subscription sidebarState={sidebarState} setSidebarState={setSidebarState} /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
