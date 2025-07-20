// Updated AdminDashboard.jsx with all fixes

import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);
  
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Brown', email: 'alice@example.com', phone: '+91-9876543210', message: 'Inquiry about products' },
    { id: 2, name: 'Bob Wilson', email: 'bob@example.com', phone: '+91-9876543211', message: 'Support request' }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    title: 'My E-commerce Store',
    description: 'Best online shopping experience with quality products',
    canonical: 'https://mystore.com'
  });

  const [editingContact, setEditingContact] = useState(null);

  // Toast notification component
  const Toast = ({ message, type, onClose }) => (
    <div 
      className={`position-fixed top-0 end-0 m-3 alert alert-${type} alert-dismissible`} 
      style={{ zIndex: 9999 }}
    >
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Format date to "Jun 01, 2025" format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount, currency = 'GBP') => {
    if (!amount) return '£0.00';
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : currency;
    return `${symbol}${parseFloat(amount).toFixed(2)}`;
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/order-details');
      const result = await response.json();
      
      if (result.success) {
        setOrders(result.data);
      } else {
        showToast('Failed to fetch orders: ' + result.error, 'danger');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      showToast('Network error: Unable to fetch orders', 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Fetch single order details for modal
  const fetchOrderDetails = async (orderId) => {
    setLoadingOrderDetails(true);
    try {
      const response = await fetch(`http://localhost:5000/order-details/${orderId}`);
      const result = await response.json();
      
      if (result.success) {
        setViewingOrder(result.data);
      } else {
        showToast('Failed to fetch order details: ' + result.error, 'danger');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      showToast('Network error: Unable to fetch order details', 'danger');
    } finally {
      setLoadingOrderDetails(false);
    }
  };

  const handleViewOrder = (order) => {
    fetchOrderDetails(order.orderId);
  };

  // Fetch orders when component mounts or when orders tab is selected
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      setOrders(orders.filter(order => order.id !== id));
      showToast('Order deleted successfully', 'success');
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    showToast('Contact deleted successfully', 'success');
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = (updatedContact) => {
    setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
    setEditingContact(null);
    showToast('Contact updated successfully', 'success');
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    if (!status) return 'bg-secondary';
    
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'paid':
      case 'confirmed':
        return 'bg-success';
      case 'pending':
      case 'processing':
        return 'bg-warning text-dark';
      case 'shipped':
        return 'bg-info';
      case 'cancelled':
      case 'failed':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  // Enhanced ViewOrderModal Component - using the one we created earlier
  const ViewOrderModal = ({ order, onClose, loading }) => {
    if (!order && !loading) return null;

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-warning text-dark">
              <h5 className="modal-title">
                <i className="bi bi-receipt me-2"></i>
                Order Details
              </h5>
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
                  {/* Left Column - Order Information */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header bg-primary text-white">
                        <h6 className="mb-0">
                          <i className="bi bi-info-circle me-2"></i>
                          Order Information
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <strong>Order ID:</strong>
                          <div className="mt-1">
                            <span className="badge bg-light text-dark font-monospace">
                              {order.orderId || 'N/A'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <strong>Customer:</strong>
                          <div className="mt-1">
                            {order.customer?.firstName && order.customer?.lastName ? 
                              `${order.customer.firstName} ${order.customer.lastName}` :
                              order.customer || order.customerName || 'Unknown Customer'}
                          </div>
                        </div>

                        <div className="mb-3">
                          <strong>Email:</strong>
                          <div className="mt-1">
                            <span className="text-muted">
                              {order.customer?.email || 'N/A'}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <strong>Phone:</strong>
                          <div className="mt-1">
                            <span className="text-muted">
                              {order.customer?.phone || 'N/A'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <strong>Order Status:</strong>
                          <div className="mt-1">
                            <span className={`badge ${getStatusBadgeClass(order.orderStatus || order.status)}`}>
                              {order.orderStatus || order.status || 'Unknown'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <strong>Order Date:</strong>
                          <div className="mt-1">
                            <span className="text-muted">
                              {formatDate(order.dates?.ordered || order.date || order.createdAt)}
                            </span>
                          </div>
                        </div>

                        {order.items && order.items.length > 0 && (
                          <div className="mb-3">
                            <strong>Items:</strong>
                            <div className="mt-1">
                              <span className="badge bg-info">
                                {order.items.length} plate(s)
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Payment & Shipping */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header bg-success text-white">
                        <h6 className="mb-0">
                          <i className="bi bi-credit-card me-2"></i>
                          Payment & Shipping
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <strong>Amount:</strong>
                          <div className="mt-1">
                            <span className="h5 text-success mb-0">
                              {formatCurrency(order.pricing?.total || order.amount, order.currency)}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <strong>Payment Status:</strong>
                          <div className="mt-1">
                            <span className={`badge ${getStatusBadgeClass(order.paymentStatus)}`}>
                              {order.paymentStatus || 'Unknown'}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <strong>Payment Method:</strong>
                          <div className="mt-1">
                            <span className="badge bg-primary">
                              PayPal
                            </span>
                          </div>
                        </div>

                        {order.paypalPaymentId && (
                          <div className="mb-3">
                            <strong>Transaction ID:</strong>
                            <div className="mt-1">
                              <small className="font-monospace text-muted">
                                {order.paypalPaymentId}
                              </small>
                            </div>
                          </div>
                        )}

                        {/* Shipping Address */}
                        <div className="mb-3">
                          <strong>Shipping Address:</strong>
                          <div className="mt-2">
                            {order.shippingAddress || order.customer?.address ? (
                              <div className="border p-3 rounded bg-light">
                                {order.shippingAddress?.street || order.customer?.address ? (
                                  <div className="mb-1">
                                    <small><strong>Street:</strong> {order.shippingAddress?.street || order.customer?.address}</small>
                                  </div>
                                ) : null}
                                
                                {order.shippingAddress?.city || order.customer?.city ? (
                                  <div className="mb-1">
                                    <small><strong>City:</strong> {order.shippingAddress?.city || order.customer?.city}</small>
                                  </div>
                                ) : null}
                                
                                {order.shippingAddress?.postcode || order.customer?.postcode ? (
                                  <div className="mb-1">
                                    <small><strong>Postcode:</strong> {order.shippingAddress?.postcode || order.customer?.postcode}</small>
                                  </div>
                                ) : null}
                                
                                {order.shippingAddress?.country || order.customer?.country ? (
                                  <div className="mb-1">
                                    <small><strong>Country:</strong> {order.shippingAddress?.country || order.customer?.country}</small>
                                  </div>
                                ) : null}
                              </div>
                            ) : (
                              <div className="alert alert-info mb-0">
                                <small>
                                  <i className="bi bi-info-circle me-1"></i>
                                  No shipping address available
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  No order details available
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <i className="bi bi-x-circle me-2"></i>
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => window.open(`http://localhost:5000/admin/print-order/${order?.orderId}`, '_blank')}
                disabled={!order}
              >
                <i className="bi bi-printer me-2"></i>
                Print Details
              </button>
              <button 
                type="button" 
                className="btn btn-success"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = `http://localhost:5000/api/admin/orders/${order?.orderId}/pdf`;
                  link.target = '_blank';
                  link.click();
                }}
                disabled={!order}
              >
                <i className="bi bi-download me-2"></i>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactModal = ({ contact, onSave, onClose }) => {
    const [formData, setFormData] = useState(contact);

    const handleSubmit = () => {
      onSave(formData);
    };

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Contact</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      {toastMessage && (
        <Toast 
          message={toastMessage.message} 
          type={toastMessage.type} 
          onClose={() => setToastMessage(null)} 
        />
      )}

      <div className="sidebar">
        <div className="logo">
          <h3>Admin Panel</h3>
        </div>
        <nav className="nav-menu">
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            <i className="bi bi-basket3"></i>
            Orders
            <span className="badge bg-warning ms-2">Total Orders: {orders.length}</span>
          </button>
          <button 
            className={activeTab === 'contacts' ? 'active' : ''} 
            onClick={() => setActiveTab('contacts')}
          >
            <i className="bi bi-people"></i>
            Contacts
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            <i className="bi bi-gear"></i>
            Site Settings
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <h1>
            {activeTab === 'orders' && 'Order Management'}
            {activeTab === 'contacts' && 'Contact Management'}
            {activeTab === 'settings' && 'Site Settings'}
          </h1>
        </header>

        <div className="content">
          {activeTab === 'orders' && (
            <div className="orders-section">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Recent Orders</h2>
                <button 
                  className="btn btn-primary"
                  onClick={fetchOrders}
                  disabled={loading}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-warning">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <span className="font-monospace small">{order.orderId}</span>
                          </td>
                          <td>{order.customer}</td>
                          <td>{order.product}</td>
                          <td>
                            <span className="fw-bold text-success">
                              {formatCurrency(order.amount)}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{formatDate(order.date)}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => handleViewOrder(order)}
                                title="View Details"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button 
                                className="btn btn-outline-success"
                                onClick={() => window.open(`http://localhost:5000/admin/print-order/${order.orderId}`, '_blank')}
                                title="Print Details"
                              >
                                <i className="bi bi-printer"></i>
                              </button>
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = `http://localhost:5000/api/admin/orders/${order.orderId}/pdf`;
                                  link.target = '_blank';
                                  link.click();
                                }}
                                title="Download PDF"
                              >
                                <i className="bi bi-download"></i>
                              </button>
                              <button 
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteOrder(order.id)}
                                title="Delete Order"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  No orders found. Orders will appear here once customers make purchases.
                </div>
              )}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="contacts-section">
              <h2>Contact Messages</h2>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-warning">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>
                          <span className="text-truncate d-inline-block" style={{maxWidth: '200px'}}>
                            {contact.message}
                          </span>
                        </td>
                       <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-primary" 
                              onClick={() => handleViewOrder(order)}
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button 
                              className="btn btn-outline-success"
                              onClick={() => window.open(`http://localhost:5000/admin/print-order/${order.orderId}`, '_blank')}
                              title="Print Details"
                            >
                              <i className="bi bi-printer"></i>
                            </button>
                            <button 
                              className="btn btn-outline-info"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = `http://localhost:5000/api/admin/orders/${order.orderId}/pdf`;
                                link.target = '_blank';
                                link.click();
                              }}
                              title="Download PDF"
                            >
                              <i className="bi bi-download"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2>Site Settings</h2>
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h5>General Settings</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Site Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={siteSettings.title}
                          onChange={(e) => setSiteSettings({...siteSettings, title: e.target.value})}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Site Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={siteSettings.description}
                          onChange={(e) => setSiteSettings({...siteSettings, description: e.target.value})}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Canonical URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={siteSettings.canonical}
                          onChange={(e) => setSiteSettings({...siteSettings, canonical: e.target.value})}
                        />
                      </div>
                      <button className="btn btn-primary">
                        <i className="bi bi-check-circle me-2"></i>
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {viewingOrder && (
        <ViewOrderModal
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
          loading={loadingOrderDetails}
        />
      )}

      {editingContact && (
        <ContactModal
          contact={editingContact}
          onSave={handleSaveContact}
          onClose={() => setEditingContact(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;