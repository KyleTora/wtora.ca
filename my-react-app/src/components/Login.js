import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Login.css';

function LoginPage() {
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        login(password);
        navigate('/newBlog');
    };

    return (
        <div className="login-container">
            <div className="container login-form col-12 col-lg-3">
                <h2>Login</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default LoginPage;
