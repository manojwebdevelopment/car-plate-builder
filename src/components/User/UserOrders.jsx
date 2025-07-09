// src/components/User/UserOrders.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const UserOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchOrders();
    fetchOrderStats();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/orders/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching order stats:', error);
    }
  };

  const handleViewOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setSelectedOrder(data.data);
        setShowOrderModal(true);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-success';
      case 'shipped':
        return 'bg-info';
      case 'processing':
        return 'bg-warning text-dark';
      case 'pending':
        return 'bg-secondary';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-success';
      case 'pending':
        return 'bg-warning text-dark';
      case 'failed':
        return 'bg-danger';
      case 'refunded':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      if (filterStatus === 'all') return true;
      return order.orderStatus?.toLowerCase() === filterStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.dates.ordered) - new Date(a.dates.ordered);
        case 'oldest':
          return new Date(a.dates.ordered) - new Date(b.dates.ordered);
        case 'amount-high':
          return (b.pricing?.total || 0) - (a.pricing?.total || 0);
        case 'amount-low':
          return (a.pricing?.total || 0) - (b.pricing?.total || 0);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col">
            <h2 className="fw-bold text-dark">My Orders</h2>
            <p className="text-muted">Track and manage your number plate orders</p>
          </div>
        </div>

        {/* Order Statistics */}
        {stats && (
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body text-center">
                  <div className="text-warning mb-2">
                    <i className="bi bi-bag-check fs-1"></i>
                  </div>
                  <h4 className="fw-bold">{stats.totalOrders}</h4>
                  <p className="text-muted mb-0">Total Orders</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body text-center">
                  <div className="text-success mb-2">
                    <i className="bi bi-currency-pound fs-1"></i>
                  </div>
                  <h4 className="fw-bold">{formatCurrency(stats.totalSpent)}</h4>
                  <p className="text-muted mb-0">Total Spent</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body text-center">
                  <div className="text-info mb-2">
                    <i className="bi bi-truck fs-1"></i>
                  </div>
                  <h4 className="fw-bold">{stats.ordersByStatus.shipped || 0}</h4>
                  <p className="text-muted mb-0">Shipped Orders</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body text-center">
                  <div className="text-secondary mb-2">
                    <i className="bi bi-clock fs-1"></i>
                  </div>
                  <h4 className="fw-bold">{stats.ordersByStatus.pending || 0}</h4>
                  <p className="text-muted mb-0">Pending Orders</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Sort */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="d-flex gap-2">
              <select 
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Highest Amount</option>
                <option value="amount-low">Lowest Amount</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 text-end">
            <button 
              className="btn btn-outline-warning"
              onClick={() => {
                fetchOrders();
                fetchOrderStats();
              }}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Refresh
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="row">
          <div className="col">
            {filteredOrders.length === 0 ? (
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body text-center py-5">
                  <i className="bi bi-bag text-muted fs-1 mb-3"></i>
                  <h4 className="text-muted">No Orders Found</h4>
                  <p className="text-muted">
                    {filterStatus === 'all' 
                      ? "You haven't placed any orders yet." 
                      : `No orders found with status: ${filterStatus}`
                    }
                  </p>
                  <button 
                    className="btn btn-warning"
                    onClick={() => window.location.href = '/platebuilder'}
                  >
                    Start Building a Plate
                  </button>
                </div>
              </div>
            ) : (
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="border-0 py-3 ps-4">Order</th>
                          <th className="border-0 py-3">Items</th>
                          <th className="border-0 py-3">Amount</th>
                          <th className="border-0 py-3">Order Status</th>
                          <th className="border-0 py-3">Payment</th>
                          <th className="border-0 py-3">Date</th>
                          <th className="border-0 py-3 pe-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="ps-4 py-3">
                              <div>
                                <div className="fw-semibold">{order.orderId}</div>
                                {order.trackingNumber && (
                                  <small className="text-muted">
                                    Tracking: {order.trackingNumber}
                                  </small>
                                )}
                              </div>
                            </td>
                            <td className="py-3">
                              <div>
                                <div className="fw-semibold">
                                  {order.items?.length || 0} item(s)
                                </div>
                                {order.items?.[0] && (
                                  <small className="text-muted">
                                    {order.items[0].name}
                                    {order.items.length > 1 && ` +${order.items.length - 1} more`}
                                  </small>
                                )}
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="fw-semibold">
                                {formatCurrency(order.pricing?.total || 0)}
                              </div>
                            </td>
                            <td className="py-3">
                              <span className={`badge ${getStatusBadgeClass(order.orderStatus)}`}>
                                {order.orderStatus || 'Unknown'}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className={`badge ${getPaymentStatusBadge(order.paymentStatus)}`}>
                                {order.paymentStatus || 'Unknown'}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="fw-semibold">
                                {formatDate(order.dates?.ordered)}
                              </div>
                            </td>
                            <td className="py-3 pe-4">
                              <button
                                className="btn btn-sm btn-outline-warning"
                                onClick={() => handleViewOrder(order.orderId)}
                              >
                                <i className="bi bi-eye me-1"></i>
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Details Modal */}
        {showOrderModal && selectedOrder && (
          <OrderDetailsModal 
            order={selectedOrder}
            onClose={() => {
              setShowOrderModal(false);
              setSelectedOrder(null);
            }}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
            getStatusBadgeClass={getStatusBadgeClass}
            getPaymentStatusBadge={getPaymentStatusBadge}
          />
        )}
      </div>
    </div>
  );
};

// Order Details Modal Component
const OrderDetailsModal = ({ 
  order, 
  onClose, 
  formatDate, 
  formatCurrency, 
  getStatusBadgeClass, 
  getPaymentStatusBadge 
}) => {
  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content rounded-4">
          <div className="modal-header border-0 bg-warning">
            <h5 className="modal-title fw-bold text-dark">
              Order Details - {order.orderId}
            </h5>
            <button 
              type="button" 
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {/* Order Status */}
            <div className="row mb-4">
              <div className="col-md-6">
                <h6 className="fw-bold">Order Status</h6>
                <span className={`badge ${getStatusBadgeClass(order.orderStatus)} fs-6`}>
                  {order.orderStatus || 'Unknown'}
                </span>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold">Payment Status</h6>
                <span className={`badge ${getPaymentStatusBadge(order.paymentStatus)} fs-6`}>
                  {order.paymentStatus || 'Unknown'}
                </span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-4">
              <h6 className="fw-bold">Customer Information</h6>
              <div className="bg-light p-3 rounded">
                <div className="row">
                  <div className="col-md-6">
                    <strong>Name:</strong> {order.customer?.firstName} {order.customer?.lastName}<br />
                    <strong>Email:</strong> {order.customer?.email}<br />
                    <strong>Phone:</strong> {order.customer?.phone}
                  </div>
                  <div className="col-md-6">
                    <strong>Address:</strong><br />
                    {order.customer?.address}<br />
                    {order.customer?.city}, {order.customer?.postcode}<br />
                    {order.customer?.country}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h6 className="fw-bold">Order Items</h6>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="bg-light">
                    <tr>
                      <th>Item</th>
                      <th>Configuration</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{item.name}</strong><br />
                          <small className="text-muted">{item.type}</small>
                        </td>
                        <td>
                          {item.plateConfiguration && (
                            <div>
                              <small>
                                <strong>Text:</strong> {item.plateConfiguration.text}<br />
                                <strong>Style:</strong> {item.plateConfiguration.plateStyle?.label}<br />
                                <strong>Size:</strong> {item.plateConfiguration.size?.label}
                              </small>
                            </div>
                          )}
                        </td>
                        <td>{item.quantity}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{formatCurrency(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="mb-4">
              <h6 className="fw-bold">Pricing Breakdown</h6>
              <div className="bg-light p-3 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(order.pricing?.subtotal || 0)}</span>
                </div>
                {order.pricing?.discount > 0 && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Discount ({order.pricing?.discountCode}):</span>
                    <span className="text-success">-{formatCurrency(order.pricing.discount)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>{formatCurrency(order.pricing?.shipping || 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>{formatCurrency(order.pricing?.tax || 0)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span>{formatCurrency(order.pricing?.total || 0)}</span>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="mb-4">
              <h6 className="fw-bold">Order Timeline</h6>
              <div className="timeline">
                {order.dates?.ordered && (
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Order Placed</span>
                    <span>{formatDate(order.dates.ordered)}</span>
                  </div>
                )}
                {order.dates?.paid && (
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Payment Confirmed</span>
                    <span>{formatDate(order.dates.paid)}</span>
                  </div>
                )}
                {order.dates?.processing && (
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Processing Started</span>
                    <span>{formatDate(order.dates.processing)}</span>
                  </div>
                )}
                {order.dates?.shipped && (
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Shipped</span>
                    <span>{formatDate(order.dates.shipped)}</span>
                  </div>
                )}
                {order.dates?.delivered && (
                  <div className="d-flex justify-content-between py-2">
                    <span>Delivered</span>
                    <span>{formatDate(order.dates.delivered)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            {(order.trackingNumber || order.notes) && (
              <div className="mb-4">
                <h6 className="fw-bold">Additional Information</h6>
                <div className="bg-light p-3 rounded">
                  {order.trackingNumber && (
                    <div className="mb-2">
                      <strong>Tracking Number:</strong> {order.trackingNumber}
                    </div>
                  )}
                  {order.notes && (
                    <div>
                      <strong>Notes:</strong> {order.notes}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer border-0">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-warning"
              onClick={() => window.print()}
            >
              <i className="bi bi-printer me-2"></i>
              Print Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;