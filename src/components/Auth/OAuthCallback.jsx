// src/components/Auth/OAuthCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const error = urlParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        navigate('/login?error=oauth_failed');
        return;
      }

      if (token) {
        localStorage.setItem('userToken', token);
        // Clear URL parameters
        window.history.replaceState({}, document.title, '/');
        // Redirect to home page
        navigate('/');
      } else {
        navigate('/login?error=no_token');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-warning mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4>Completing Sign In...</h4>
        <p className="text-muted">Please wait while we finish setting up your account.</p>
      </div>
    </div>
  );
};

export default OAuthCallback;