// src/components/AdminRegister.jsx - Simplified to fix infinite render
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // Toast component
  const Toast = ({ message, type, onClose }) => (
    <div 
      className={`position-fixed top-0 end-0 m-3 alert alert-${type} alert-dismissible`} 
      style={{ zIndex: 9999 }}
    >
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );

  const showToast = (message, type = 'danger') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Memoize validation to prevent infinite renders
  const isFormValid = useMemo(() => {
    return (
      formData.username.length >= 3 &&
      /^[a-zA-Z0-9_]+$/.test(formData.username) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password.length >= 8 &&
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password) &&
      formData.password === formData.confirmPassword
    );
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        showToast('Admin registered successfully! Redirecting to login...', 'success');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        showToast(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Network error during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/dashboard');
  };

  // Memoized password strength calculation
  const passwordStrength = useMemo(() => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;

    const strengthLevels = [
      { strength: 0, label: 'Very Weak', color: 'danger' },
      { strength: 1, label: 'Weak', color: 'danger' },
      { strength: 2, label: 'Fair', color: 'warning' },
      { strength: 3, label: 'Good', color: 'info' },
      { strength: 4, label: 'Strong', color: 'success' },
      { strength: 5, label: 'Very Strong', color: 'success' }
    ];

    return strengthLevels[score];
  }, [formData.password]);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="card shadow" style={{ maxWidth: '500px', width: '100%', border: 'none', borderRadius: '12px' }}>
        <div className="card-header bg-warning text-center" style={{ borderRadius: '12px 12px 0 0' }}>
          <div className="d-flex justify-content-between align-items-center">
            <button 
              className="btn btn-sm btn-outline-dark"
              onClick={handleBackToLogin}
              disabled={loading}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Back to Login
            </button>
            <h4 className="mb-0 text-dark">
              <i className="bi bi-person-plus me-2"></i>
              Admin Registration
            </h4>
            <div style={{ width: '100px' }}></div>
          </div>
        </div>
        <div className="card-body">
          {success && (
            <div className="alert alert-success" role="alert">
              <i className="bi bi-check-circle me-2"></i>
              <strong>Success!</strong> Admin account created successfully. Redirecting to login...
              <div className="mt-2">
                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                <small>Redirecting in 2 seconds...</small>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Username *
                <small className="text-muted ms-2">(letters, numbers, underscores only)</small>
              </label>
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="Enter username"
                  required
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address *</label>
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter email address"
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password *</label>
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Enter password"
                  required
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="d-flex justify-content-between small">
                    <span>Password Strength:</span>
                    <span className={`text-${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="progress" style={{ height: '4px' }}>
                    <div 
                      className={`progress-bar bg-${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password *</label>
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-1">
                  {formData.password === formData.confirmPassword ? (
                    <small className="text-success">
                      <i className="bi bi-check-circle me-1"></i>
                      Passwords match
                    </small>
                  ) : (
                    <small className="text-danger">
                      <i className="bi bi-x-circle me-1"></i>
                      Passwords do not match
                    </small>
                  )}
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="mb-3">
              <small className="text-muted">
                <strong>Password Requirements:</strong>
                <ul className="mb-0 mt-1" style={{ fontSize: '0.875rem' }}>
                  <li className={formData.password.length >= 8 ? 'text-success' : ''}>
                    <i className={`bi ${formData.password.length >= 8 ? 'bi-check' : 'bi-x'} me-1`}></i>
                    At least 8 characters
                  </li>
                  <li className={/[a-z]/.test(formData.password) ? 'text-success' : ''}>
                    <i className={`bi ${/[a-z]/.test(formData.password) ? 'bi-check' : 'bi-x'} me-1`}></i>
                    One lowercase letter
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? 'text-success' : ''}>
                    <i className={`bi ${/[A-Z]/.test(formData.password) ? 'bi-check' : 'bi-x'} me-1`}></i>
                    One uppercase letter
                  </li>
                  <li className={/\d/.test(formData.password) ? 'text-success' : ''}>
                    <i className={`bi ${/\d/.test(formData.password) ? 'bi-check' : 'bi-x'} me-1`}></i>
                    One number
                  </li>
                </ul>
              </small>
            </div>

            <button 
              type="submit" 
              className="btn btn-warning w-100"
              disabled={loading || !isFormValid || success}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Creating Account...
                </>
              ) : success ? (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Account Created Successfully
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus me-2"></i>
                  Create Admin Account
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account? 
              <button 
                className="btn btn-link btn-sm p-0 ms-1"
                onClick={handleBackToLogin}
                disabled={loading}
                style={{ textDecoration: 'none', color: '#ffc107' }}
              >
                Back to Login
              </button>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;