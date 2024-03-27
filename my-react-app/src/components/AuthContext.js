import React, { createContext, useContext, useState } from 'react';

const initialAuthState = {
    authenticated: localStorage.getItem('authenticated') === 'true',
    login: () => {},
    logout: () => {}
};

export const AuthContext = createContext(initialAuthState);

export const AuthProvider = ({ children }) => 
{
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem('authenticated') === 'true'
    );

    const login = (password) => 
    {
        if (password === 'test') {
            localStorage.setItem('authenticated', 'true');
            setAuthenticated(true);
        } else {
            window.alert("Incorrect password");
        }
    };

    const logout = () => 
    {
        localStorage.removeItem('authenticated');
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 
