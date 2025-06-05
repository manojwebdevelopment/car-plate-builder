// src/components/modals/ConfirmationDialog.jsx
import React from 'react';

const ConfirmationDialog = ({ config, onConfirm, onCancel, newPrice }) => {
  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Price Update</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <h6 className="text-muted">Item Details</h6>
                <p><strong>Name:</strong> {config.label}</p>
                <p><strong>Type:</strong> {config.type}</p>
              </div>
              <div className="col-md-6">
                <h6 className="text-muted">Price Change</h6>
                <div className="d-flex align-items-center">
                  <span className="badge bg-danger me-2">OLD: £{config.price}</span>
                  <span>→</span>
                  <span className="badge bg-success ms-2">NEW: £{newPrice}</span>
                </div>
                <div className="mt-2">
                  <small className="text-muted">
                    Change: £{(newPrice - config.price).toFixed(2)}
                  </small>
                </div>
              </div>
            </div>
            <div className="alert alert-warning mt-3">
              <i className="bi bi-exclamation-triangle"></i>
              <strong>Warning:</strong> This action cannot be undone. Are you sure you want to update this price?
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-warning" onClick={onConfirm}>
              Confirm Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;