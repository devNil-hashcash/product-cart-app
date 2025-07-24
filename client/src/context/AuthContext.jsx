import React, { createContext, useContext, useEffect, useState } from 'react';

// Step 1: Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Step 2: Save token on login
  const login = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  // Step 3: Clear token on logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Step 4: Custom hook for easier access
export const useAuth = () => useContext(AuthContext);
