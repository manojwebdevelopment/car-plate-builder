// src/components/User/UserProfile.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    marketingEmails: user?.marketingEmails || false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const result = await updateProfile(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditing(false);
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    
    setLoading(false);
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 5000);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      marketingEmails: user?.marketingEmails || false
    });
    setErrors({});
    setEditing(false);
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold text-dark">My Profile</h2>
              {!editing && (
                <button 
                  className="btn btn-warning fw-semibold"
                  onClick={() => setEditing(true)}
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Profile
                </button>
              )}
            </div>

            {/* Message Alert */}
            {message.text && (
              <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible`}>
                <i className={`bi ${message.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                {message.text}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMessage({ type: '', text: '' })}
                ></button>
              </div>
            )}

            <div className="row">
              {/* Profile Information */}
              <div className="col-md-8">
                <div className="card shadow-sm border-0 rounded-4">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-4">Personal Information</h5>
                    
                    <form onSubmit={handleSubmit}>
                      {/* Name Fields */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">First Name</label>
                          {editing ? (
                            <input
                              type="text"
                              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="First name"
                            />
                          ) : (
                            <p className="form-control-plaintext fw-semibold">{user?.firstName}</p>
                          )}
                          {errors.firstName && (
                            <div className="invalid-feedback">
                              {errors.firstName}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Last Name</label>
                          {editing ? (
                            <input
                              type="text"
                              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Last name"
                            />
                          ) : (
                            <p className="form-control-plaintext fw-semibold">{user?.lastName}</p>
                          )}
                          {errors.lastName && (
                            <div className="invalid-feedback">
                              {errors.lastName}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Email Field (Read Only) */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-envelope"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control bg-light"
                            value={user?.email || ''}
                            disabled
                          />
                        </div>
                        <small className="text-muted">Email cannot be changed</small>
                      </div>

                      {/* Phone Field */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Phone Number</label>
                        {editing ? (
                          <div className="input-group">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-telephone"></i>
                            </span>
                            <input
                              type="tel"
                              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Enter phone number"
                            />
                          </div>
                        ) : (
                          <div className="input-group">
                            <span className="input-group-text bg-light">
                              <i className="bi bi-telephone"></i>
                            </span>
                            <p className="form-control-plaintext fw-semibold mb-0 ps-3">
                              {user?.phone || 'Not provided'}
                            </p>
                          </div>
                        )}
                        {errors.phone && (
                          <div className="invalid-feedback d-block">
                            {errors.phone}
                          </div>
                        )}
                      </div>

                      {/* Marketing Emails */}
                      <div className="mb-4">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="marketingEmails"
                            name="marketingEmails"
                            checked={editing ? formData.marketingEmails : user?.marketingEmails}
                            onChange={handleInputChange}
                            disabled={!editing}
                          />
                          <label className="form-check-label fw-semibold" htmlFor="marketingEmails">
                            Receive promotional emails and special offers
                          </label>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {editing && (
                        <div className="d-flex gap-2">
                          <button
                            type="submit"
                            className="btn btn-warning fw-semibold"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Saving...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-lg me-2"></i>
                                Save Changes
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleCancel}
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              {/* Account Summary */}
              <div className="col-md-4">
                <div className="card shadow-sm border-0 rounded-4">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-4">Account Summary</h5>
                    
                    <div className="d-flex align-items-center mb-3">
                      <div 
                        className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-3"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <span className="fw-bold text-dark fs-5">
                          {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">{user?.firstName} {user?.lastName}</h6>
                        <small className="text-muted">Customer</small>
                      </div>
                    </div>

                    <hr />

                    <div className="mb-3">
                      <small className="text-muted">Member Since</small>
                      <p className="fw-semibold mb-0">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted">Email Verified</small>
                      <p className="mb-0">
                        {user?.isEmailVerified ? (
                          <span className="badge bg-success">
                            <i className="bi bi-check-circle me-1"></i>
                            Verified
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            Not Verified
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="d-grid">
                      <button className="btn btn-outline-warning fw-semibold">
                        <i className="bi bi-key me-2"></i>
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;