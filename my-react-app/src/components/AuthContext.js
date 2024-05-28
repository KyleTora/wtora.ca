import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const initialAuthState = {
  authenticated: false,
  login: () => {},
  logout: () => {}
};

export const AuthContext = createContext(initialAuthState);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(initialAuthState.authenticated);

  useEffect(() => {
    // Check if user is already authenticated on mount
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthenticated(true);
    } catch (error) {
      console.error('Error signing in:', error);
      window.alert("Incorrect email or password");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAuthenticated = () => {
    return authenticated;
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
