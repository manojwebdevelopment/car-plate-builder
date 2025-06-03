import React, { useState } from 'react';
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', product: 'Laptop', amount: 999, status: 'Pending', date: '2025-06-01' },
    { id: 2, customer: 'Jane Smith', product: 'Phone', amount: 599, status: 'Completed', date: '2025-06-02' },
    { id: 3, customer: 'Mike Johnson', product: 'Tablet', amount: 399, status: 'Shipped', date: '2025-06-03' }
  ]);

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Brown', email: 'alice@example.com', phone: '+91-9876543210', message: 'Inquiry about products' },
    { id: 2, name: 'Bob Wilson', email: 'bob@example.com', phone: '+91-9876543211', message: 'Support request' }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    title: 'My E-commerce Store',
    description: 'Best online shopping experience with quality products',
    canonical: 'https://mystore.com'
  });

  const [editingOrder, setEditingOrder] = useState(null);
  const [editingContact, setEditingContact] = useState(null);

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
  };

  const handleSaveOrder = (updatedOrder) => {
    setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
    setEditingOrder(null);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = (updatedContact) => {
    setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
    setEditingContact(null);
  };

  const OrderModal = ({ order, onSave, onClose }) => {
    const [formData, setFormData] = useState(order);

    const handleSubmit = () => {
      onSave(formData);
    };

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Order</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Customer</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.customer}
                    onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value)})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="button" className="btn btn-warning" onClick={handleSubmit}>Save Changes</button>
              </div>
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
            <div>
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
                <button type="button" className="btn btn-warning" onClick={handleSubmit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ 
        width: '250px', 
        backgroundColor: '#ffc107', 
        minHeight: '100vh',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}>
        <div className="p-3">
          <h4 className="text-dark mb-4">Admin Panel</h4>
          <nav className="nav flex-column">
            <button
              className={`nav-link btn text-start mb-2 ${activeTab === 'orders' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Orders
            </button>
            <button
              className={`nav-link btn text-start mb-2 ${activeTab === 'contacts' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setActiveTab('contacts')}
            >
              📞 Contacts
            </button>
            <button
              className={`nav-link btn text-start mb-2 ${activeTab === 'settings' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Site Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid">
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Order Management</h2>
                <span className="badge bg-warning text-dark fs-6">Total Orders: {orders.length}</span>
              </div>
              
              <div className="card">
                <div className="card-body">
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
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.product}</td>
                            <td>₹{order.amount}</td>
                            <td>
                              <span className={`badge ${
                                order.status === 'Completed' ? 'bg-success' :
                                order.status === 'Pending' ? 'bg-warning text-dark' :
                                order.status === 'Shipped' ? 'bg-info' : 'bg-secondary'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td>{order.date}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEditOrder(order)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteOrder(order.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Contact Management</h2>
                <span className="badge bg-warning text-dark fs-6">Total Contacts: {contacts.length}</span>
              </div>
              
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-warning">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Message</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map(contact => (
                          <tr key={contact.id}>
                            <td>#{contact.id}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.message.substring(0, 50)}...</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-info me-2"
                                onClick={() => alert(`Full message: ${contact.message}`)}
                              >
                                View
                              </button>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEditContact(contact)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteContact(contact.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="mb-4">Site Settings</h2>
              
              <div className="card">
                <div className="card-header bg-warning">
                  <h5 className="mb-0 text-dark">SEO & Site Configuration</h5>
                </div>
                <div className="card-body">
                  <div onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Site Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={siteSettings.title}
                        onChange={(e) => setSiteSettings({...siteSettings, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Site Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={siteSettings.description}
                        onChange={(e) => setSiteSettings({...siteSettings, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Canonical URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={siteSettings.canonical}
                        onChange={(e) => setSiteSettings({...siteSettings, canonical: e.target.value})}
                      />
                    </div>
                    
                    <button type="button" className="btn btn-warning">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="card mt-4">
                <div className="card-header bg-warning">
                  <h5 className="mb-0 text-dark">Theme Settings</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Primary Color</label>
                      <div className="d-flex align-items-center">
                        <div className="color-preview me-3" style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: '#ffc107',
                          border: '2px solid #000',
                          borderRadius: '5px'
                        }}></div>
                        <span className="badge bg-warning text-dark">Yellow Theme Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {editingOrder && (
        <OrderModal
          order={editingOrder}
          onSave={handleSaveOrder}
          onClose={() => setEditingOrder(null)}
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