import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Login.css';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      if (authenticated) {
        navigate('/newBlog');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  
  if (isAuthenticated()) {
    navigate('/newBlog');
    return null;
  }

  return (
    <div className="login-container">
      <div className="container login-form col-12 col-lg-3">
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
