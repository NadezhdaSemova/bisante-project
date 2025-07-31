// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';
import {API_BASE_URL} from '../../src/config'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admins/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setAdmin(data.admin);
        localStorage.setItem('isAdmin', 'true');
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Грешка при вход' };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'Сървърна грешка' };
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

