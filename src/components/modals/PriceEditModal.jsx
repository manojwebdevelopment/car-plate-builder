// src/components/modals/PriceEditModal.jsx
import React, { useState } from 'react';

const PriceEditModal = ({ config, onSave, onClose, showConfirmDialog }) => {
  const [formData, setFormData] = useState({
    price: config.price,
    label: config.label,
    isActive: config.isActive
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.label.trim()) {
      newErrors.label = 'Name is required';
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Price must be a positive number';
    }

    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      newErrors.price = 'Please enter a valid price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newPrice = Math.round(parseFloat(formData.price) * 100) / 100;
    
    // Show confirmation dialog if price is changing significantly
    const priceChange = Math.abs(newPrice - config.price);
    const percentageChange = (priceChange / config.price) * 100;
    
    if (priceChange > 10 || percentageChange > 20) {
      showConfirmDialog({
        config,
        newPrice,
        formData,
        onConfirm: () => onSave(formData)
      });
    } else {
      onSave(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const priceChange = parseFloat(formData.price) - config.price;
  const percentageChange = config.price > 0 ? ((priceChange / config.price) * 100) : 0;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Configuration</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className={`form-control ${errors.label ? 'is-invalid' : ''}`}
                  value={formData.label}
                  onChange={(e) => handleChange('label', e.target.value)}
                />
                {errors.label && <div className="invalid-feedback">{errors.label}</div>}
              </div>
              
              <div className="mb-3">
                <label className="form-label">Price (£) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                
                {/* Price change indicator */}
                {formData.price && formData.price !== config.price && (
                  <div className="mt-2">
                    <small className={`text-${priceChange >= 0 ? 'success' : 'danger'}`}>
                      {priceChange >= 0 ? '↗' : '↘'} Change: £{priceChange.toFixed(2)} ({percentageChange.toFixed(1)}%)
                    </small>
                  </div>
                )}
              </div>
              
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="isActive">
                  Active
                </label>
                <div className="form-text">
                  Inactive items will not be displayed to customers
                </div>
              </div>

              {/* Current vs New comparison */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="mb-2">Summary</h6>
                <div className="row">
                  <div className="col-6">
                    <small className="text-muted">Current Price:</small>
                    <div className="fw-bold">£{config.price}</div>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">New Price:</small>
                    <div className="fw-bold text-warning">£{formData.price || '0.00'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-warning">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PriceEditModal;