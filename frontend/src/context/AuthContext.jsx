// Auth context setup placeholder
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const loginUser = (token, role) => {
    setToken(token);
    setRole(role);
  };

  return (
    <AuthContext.Provider value={{ token, role, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
