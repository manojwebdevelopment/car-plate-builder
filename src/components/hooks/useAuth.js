// hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials) => {
    setLoginLoading(true);
    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('adminToken', result.token);
        setIsAuthenticated(true);
        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: result.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error during login' };
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
    loginLoading,
    loginForm,
    setLoginForm
  };
};