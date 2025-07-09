// src/components/User/AddressManager.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const AddressManager = ({ onAddressSelect, selectedAddress, showAddressForm = true }) => {
  const { user, token } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'both',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    country: 'GB',
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    if (user?.addresses) {
      setAddresses(user.addresses);
      // Auto-select default address if no address is selected
      if (!selectedAddress && user.addresses.length > 0) {
        const defaultAddr = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
        onAddressSelect?.(defaultAddr);
      }
    }
  }, [user, selectedAddress, onAddressSelect]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
    } else if (!/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i.test(formData.postcode.replace(/\s/g, ''))) {
      newErrors.postcode = 'Please enter a valid UK postcode';
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
    try {
      const url = editingAddress 
        ? `${API_BASE_URL}/api/user/addresses/${editingAddress._id}`
        : `${API_BASE_URL}/api/user/addresses`;
      
      const method = editingAddress ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        // Update addresses in local state
        setAddresses(data.addresses);
        setShowForm(false);
        setEditingAddress(null);
        resetForm();
        
        // If this is the first/default address, auto-select it
        if (formData.isDefault || addresses.length === 0) {
          const newAddress = data.addresses.find(addr => 
            addr.address === formData.address && 
            addr.postcode === formData.postcode
          );
          onAddressSelect?.(newAddress);
        }
      } else {
        setErrors({ submit: data.error });
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setErrors({ submit: 'Failed to save address. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      type: address.type || 'both',
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      address: address.address || '',
      city: address.city || '',
      postcode: address.postcode || '',
      country: address.country || 'GB',
      isDefault: address.isDefault || false
    });
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (addressId) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setAddresses(data.addresses);
        // If deleted address was selected, clear selection
        if (selectedAddress?._id === addressId) {
          onAddressSelect?.(null);
        }
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'both',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      address: '',
      city: '',
      postcode: '',
      country: 'GB',
      isDefault: false
    });
    setErrors({});
    setEditingAddress(null);
  };

  return (
    <div className="address-manager">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Delivery Address</h6>
        {showAddressForm && (
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={() => {
              setShowForm(true);
              resetForm();
            }}
          >
            <i className="bi bi-plus me-1"></i>
            Add Address
          </button>
        )}
      </div>

      {/* Existing Addresses */}
      {addresses.length > 0 && (
        <div className="saved-addresses mb-3">
          <div className="row">
            {addresses.map((address) => (
              <div key={address._id} className="col-md-6 mb-3">
                <div 
                  className={`card border ${selectedAddress?._id === address._id ? 'border-warning' : 'border-light'} cursor-pointer`}
                  onClick={() => onAddressSelect?.(address)}
                >
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="selectedAddress"
                            checked={selectedAddress?._id === address._id}
                            onChange={() => onAddressSelect?.(address)}
                          />
                          <label className="form-check-label">
                            <strong>{address.firstName} {address.lastName}</strong>
                            {address.isDefault && (
                              <span className="badge bg-warning text-dark ms-2">Default</span>
                            )}
                          </label>
                        </div>
                        <div className="mt-2 small">
                          {address.address}<br />
                          {address.city}, {address.postcode}<br />
                          {address.country}
                        </div>
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(address);
                              }}
                            >
                              <i className="bi bi-pencil me-2"></i>Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(address._id);
                              }}
                            >
                              <i className="bi bi-trash me-2"></i>Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Address Form */}
      {showForm && (
        <div className="card border-warning">
          <div className="card-header bg-warning">
            <h6 className="mb-0 text-dark">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Address Type */}
              <div className="mb-3">
                <label className="form-label">Address Type</label>
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="both">Billing & Shipping</option>
                  <option value="billing">Billing Only</option>
                  <option value="shipping">Shipping Only</option>
                </select>
              </div>

              {/* Name Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label">Address *</label>
                <input
                  type="text"
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House number and street name"
                  required
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>

              {/* City and Postcode */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Postcode *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.postcode ? 'is-invalid' : ''}`}
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="e.g. SW1A 1AA"
                    required
                  />
                  {errors.postcode && (
                    <div className="invalid-feedback">{errors.postcode}</div>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="mb-3">
                <label className="form-label">Country</label>
                <select
                  className="form-select"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="GB">United Kingdom</option>
                  <option value="IE">Ireland</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
              </div>

              {/* Default Address */}
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">
                    Set as default address
                  </label>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="alert alert-danger">
                  {errors.submit}
                </div>
              )}

              {/* Form Actions */}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-warning"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    editingAddress ? 'Update Address' : 'Save Address'
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* No addresses message */}
      {addresses.length === 0 && !showForm && (
        <div className="text-center py-4">
          <i className="bi bi-house text-muted fs-1"></i>
          <p className="text-muted mt-2">No saved addresses</p>
          {showAddressForm && (
            <button
              className="btn btn-warning"
              onClick={() => {
                setShowForm(true);
                resetForm();
              }}
            >
              Add Your First Address
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressManager;