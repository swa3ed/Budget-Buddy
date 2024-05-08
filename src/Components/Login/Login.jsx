import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../services/authService';

const Login = () => {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(admin, password);
            if (response) {
                localStorage.setItem('userToken', response);
                setRedirectToDashboard(true);
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    useEffect(() => {
        document.body.classList.add('login-body');
        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);

    if (redirectToDashboard) {
        return <Navigate to="/"/>;
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Smart Fleet</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="User name"
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
