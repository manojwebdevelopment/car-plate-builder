// src/components/modals/UserViewModal.jsx
import React from 'react';
import { formatDate } from '../utils/formatters';

const UserViewModal = ({ user, onClose }) => {
  if (!user) return null;

  const getRoleBadgeClass = (role) => {
    return role === 'admin' ? 'bg-danger' : 'bg-info';
  };

  const getStatusBadgeClass = (isActive) => {
    return isActive ? 'bg-success' : 'bg-secondary';
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <h6 className="text-warning mb-3">Personal Information</h6>
                <div className="card border-0 bg-light p-3">
                  <div className="mb-2">
                    <strong>Full Name:</strong>
                    <div className="ms-2">{user.firstName} {user.lastName}</div>
                  </div>
                  <div className="mb-2">
                    <strong>Email:</strong>
                    <div className="ms-2">
                      <a href={`mailto:${user.email}`} className="text-decoration-none">
                        {user.email}
                      </a>
                    </div>
                  </div>
                  <div className="mb-2">
                    <strong>Phone:</strong>
                    <div className="ms-2">
                      <a href={`tel:${user.phone}`} className="text-decoration-none font-monospace">
                        {user.phone}
                      </a>
                    </div>
                  </div>
                  <div className="mb-2">
                    <strong>Role:</strong>
                    <div className="ms-2">
                      <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <strong>Account Status:</strong>
                    <div className="ms-2">
                      <span className={`badge ${getStatusBadgeClass(user.isActive)}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <h6 className="text-warning mb-3">Address Information</h6>
                <div className="card border-0 bg-light p-3">
                  <div className="mb-2">
                    <strong>Address:</strong>
                    <div className="ms-2">{user.address || 'Not provided'}</div>
                  </div>
                  <div className="mb-2">
                    <strong>City:</strong>
                    <div className="ms-2">{user.city || 'Not provided'}</div>
                  </div>
                  <div className="mb-2">
                    <strong>Postcode:</strong>
                    <div className="ms-2 font-monospace">{user.postcode || 'Not provided'}</div>
                  </div>
                  <div className="mb-2">
                    <strong>Marketing Emails:</strong>
                    <div className="ms-2">
                      <span className={`badge ${user.marketingEmails ? 'bg-success' : 'bg-secondary'}`}>
                        {user.marketingEmails ? 'Subscribed' : 'Not Subscribed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <h6 className="text-warning mb-3">Account Information</h6>
                <div className="card border-0 bg-light p-3">
                  <div className="row">
                    <div className="col-md-4">
                      <strong>User ID:</strong>
                      <div className="font-monospace text-muted">
                        #{user._id ? user._id.slice(-8) : user.id}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <strong>Registration Date:</strong>
                      <div className="text-muted">
                        {user.createdAt ? formatDate(user.createdAt) : 'Not available'}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <strong>Last Updated:</strong>
                      <div className="text-muted">
                        {user.updatedAt ? formatDate(user.updatedAt) : 'Not available'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional information section */}
            {(user.lastLogin || user.totalOrders || user.totalSpent) && (
              <div className="row mt-4">
                <div className="col-12">
                  <h6 className="text-warning mb-3">Activity Summary</h6>
                  <div className="card border-0 bg-light p-3">
                    <div className="row">
                      {user.lastLogin && (
                        <div className="col-md-4">
                          <strong>Last Login:</strong>
                          <div className="text-muted">{formatDate(user.lastLogin)}</div>
                        </div>
                      )}
                      {user.totalOrders && (
                        <div className="col-md-4">
                          <strong>Total Orders:</strong>
                          <div className="text-muted">{user.totalOrders}</div>
                        </div>
                      )}
                      {user.totalSpent && (
                        <div className="col-md-4">
                          <strong>Total Spent:</strong>
                          <div className="text-muted">£{user.totalSpent.toFixed(2)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-outline-warning">
              Edit User
            </button>
            <button type="button" className="btn btn-outline-info">
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewModal;