// src/components/LoginScreen.jsx - Fixed without styled-jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

const LoginScreen = ({ onLogin, loading, toast, onHideToast }) => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onLogin(loginForm);
    // Handle login result
  };

  const handleRegisterRedirect = () => {
    navigate('/admin/register');
  };

  // Inline styles
  const cardStyle = {
    border: 'none',
    borderRadius: '12px'
  };

  const cardHeaderStyle = {
    borderRadius: '12px 12px 0 0'
  };

  const inputGroupTextStyle = {
    backgroundColor: '#f8f9fa',
    borderColor: '#ced4da'
  };

  const dividerStyle = {
    margin: '0.5rem 0'
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={onHideToast} 
        />
      )}
      <div className="card shadow" style={{ maxWidth: '400px', width: '100%', ...cardStyle }}>
        <div className="card-header bg-warning text-center" style={cardHeaderStyle}>
          <h4 className="mb-0 text-dark">
            <i className="bi bi-shield-lock me-2"></i>
            Admin Login
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text" style={inputGroupTextStyle}>
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="Enter your username"
                  required
                  style={{
                    borderColor: '#ced4da'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ffc107';
                    e.target.style.boxShadow = '0 0 0 0.2rem rgba(255, 193, 7, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ced4da';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text" style={inputGroupTextStyle}>
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                  style={{
                    borderColor: '#ced4da'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ffc107';
                    e.target.style.boxShadow = '0 0 0 0.2rem rgba(255, 193, 7, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ced4da';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-warning w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center mb-3">
            <hr className="my-3" style={dividerStyle} />
            <small className="text-muted bg-light px-2">Don't have an admin account?</small>
          </div>

          {/* Register Button */}
          <button 
            type="button"
            className="btn btn-outline-warning w-100"
            onClick={handleRegisterRedirect}
            disabled={loading}
            style={{
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ffc107';
              e.target.style.borderColor = '#ffc107';
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#ffc107';
              e.target.style.color = '#ffc107';
            }}
          >
            <i className="bi bi-person-plus me-2"></i>
            Create Admin Account
          </button>

          {/* Additional Info */}
          <div className="text-center mt-3">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Only authorized personnel can create admin accounts
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;