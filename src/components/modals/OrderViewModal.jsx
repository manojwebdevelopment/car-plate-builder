// src/components/modals/OrderViewModal.jsx
import React from 'react';
import { formatDate } from '../utils/formatters';

const OrderViewModal = ({ order, onClose, loading }) => {
  if (!order && !loading) return null;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success';
      case 'Pending':
        return 'bg-warning text-dark';
      case 'Shipped':
        return 'bg-info';
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading order details...</p>
              </div>
            ) : order ? (
              <div className="row">
                <div className="col-md-6">
                  <h6 className="text-warning mb-3">Order Information</h6>
                  <div className="mb-3">
                    <strong>Order ID:</strong> 
                    <span className="ms-2 font-monospace">{order.orderId}</span>
                  </div>
                  <div className="mb-3">
                    <strong>Customer Name:</strong> 
                    <span className="ms-2">{order.customer}</span>
                  </div>
                  <div className="mb-3">
                    <strong>Product:</strong> 
                    <span className="ms-2">{order.product}</span>
                  </div>
                  <div className="mb-3">
                    <strong>Amount:</strong> 
                    <span className="ms-2 fw-bold text-success">₹{order.amount}</span>
                  </div>
                  <div className="mb-3">
                    <strong>Payment Status:</strong> 
                    <span className={`badge ms-2 ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Order Date:</strong> 
                    <span className="ms-2">{formatDate(order.date)}</span>
                  </div>
                  {order.notes && (
                    <div className="mb-3">
                      <strong>Notes:</strong>
                      <div className="mt-1 p-2 bg-light rounded">
                        {order.notes}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="col-md-6">
                  <h6 className="text-warning mb-3">Shipping Address</h6>
                  {order.shippingAddress ? (
                    <div className="border p-3 rounded bg-light">
                      <div className="mb-2">
                        <strong>Street:</strong> 
                        <span className="ms-2">{order.shippingAddress.street}</span>
                      </div>
                      <div className="mb-2">
                        <strong>City:</strong> 
                        <span className="ms-2">{order.shippingAddress.city}</span>
                      </div>
                      <div className="mb-2">
                        <strong>State:</strong> 
                        <span className="ms-2">{order.shippingAddress.state}</span>
                      </div>
                      <div className="mb-2">
                        <strong>Pincode:</strong> 
                        <span className="ms-2 font-monospace">{order.shippingAddress.pincode}</span>
                      </div>
                      <div className="mb-2">
                        <strong>Country:</strong> 
                        <span className="ms-2">{order.shippingAddress.country}</span>
                      </div>
                      <div className="mb-2">
                        <strong>Phone:</strong> 
                        <span className="ms-2 font-monospace">{order.shippingAddress.phone}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle"></i>
                      No shipping address available
                    </div>
                  )}

                  {order.items && order.items.length > 0 && (
                    <div className="mt-4">
                      <h6 className="text-warning mb-3">Order Items</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Qty</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="alert alert-warning">
                <i className="bi bi-exclamation-triangle"></i>
                No order details available
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            {order && (
              <button type="button" className="btn btn-outline-warning">
                Print Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderViewModal;