// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const login = async (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setAdmin({ username: 'admin' });
      localStorage.setItem('isAdmin', 'true');
      return { success: true };
    } else {
      return { success: false, message: 'Невалидни данни' };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

