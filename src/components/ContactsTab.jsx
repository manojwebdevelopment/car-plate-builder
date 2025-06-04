// src/components/ContactsTab.jsx
import React, { useState } from 'react';
import ContactModal from './modals/ContactModal';
import { truncateText } from './utils/formatters';

const ContactsTab = ({ 
  contacts, 
  onDeleteContact, 
  onEditContact, 
  showToast 
}) => {
  const [editingContact, setEditingContact] = useState(null);
  const [viewingMessage, setViewingMessage] = useState(null);

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = (updatedContact) => {
    onEditContact(updatedContact);
    setEditingContact(null);
    showToast('Contact updated successfully', 'success');
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      onDeleteContact(contactId);
      showToast('Contact deleted successfully', 'success');
    }
  };

  const handleViewMessage = (contact) => {
    setViewingMessage(contact);
  };

  const MessageViewModal = ({ contact, onClose }) => {
    if (!contact) return null;

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Message from {contact.name}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <strong>From:</strong> {contact.name}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> 
                <a href={`mailto:${contact.email}`} className="ms-2 text-decoration-none">
                  {contact.email}
                </a>
              </div>
              <div className="mb-3">
                <strong>Phone:</strong> 
                <a href={`tel:${contact.phone}`} className="ms-2 text-decoration-none">
                  {contact.phone}
                </a>
              </div>
              <div className="mb-3">
                <strong>Message:</strong>
                <div className="mt-2 p-3 bg-light rounded">
                  {contact.message}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-outline-primary"
                onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your inquiry&body=Hi ${contact.name},%0D%0A%0D%0A`)}
              >
                Reply via Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contact Management</h2>
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-warning text-dark fs-6">
            Total Contacts: {contacts.length}
          </span>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          {contacts.length === 0 ? (
            <div className="text-center p-4">
              <div className="mb-3">
                <i className="bi bi-person-lines-fill text-muted" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="text-muted">No contacts found</h5>
              <p className="text-muted">Contact messages will appear here when customers reach out.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-warning">
                  <tr>
                    <th style={{ width: '80px' }}>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th style={{ width: '300px' }}>Message</th>
                    <th style={{ width: '200px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact.id}>
                      <td>
                        <span className="badge bg-secondary">#{contact.id}</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle bg-warning text-dark me-2">
                            {contact.name.charAt(0).toUpperCase()}
                          </div>
                          {contact.name}
                        </div>
                      </td>
                      <td>
                        <a 
                          href={`mailto:${contact.email}`} 
                          className="text-decoration-none"
                          title="Send email"
                        >
                          {contact.email}
                        </a>
                      </td>
                      <td>
                        <a 
                          href={`tel:${contact.phone}`} 
                          className="text-decoration-none font-monospace"
                          title="Call number"
                        >
                          {contact.phone}
                        </a>
                      </td>
                      <td>
                        <div className="message-preview">
                          {truncateText(contact.message, 50)}
                          {contact.message.length > 50 && (
                            <button 
                              className="btn btn-link btn-sm p-0 ms-1"
                              onClick={() => handleViewMessage(contact)}
                            >
                              Read more
                            </button>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() => handleViewMessage(contact)}
                            title="View full message"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditContact(contact)}
                            title="Edit contact"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your inquiry&body=Hi ${contact.name},%0D%0A%0D%0A`)}
                            title="Reply via email"
                          >
                            <i className="bi bi-reply"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteContact(contact.id)}
                            title="Delete contact"
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
          )}
        </div>
      </div>

      {/* Contact Statistics Card */}
      {contacts.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card bg-light">
              <div className="card-body text-center">
                <h5 className="card-title text-warning">📧 Total Messages</h5>
                <h3 className="text-dark">{contacts.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-light">
              <div className="card-body text-center">
                <h5 className="card-title text-info">📝 Avg Message Length</h5>
                <h3 className="text-dark">
                  {Math.round(contacts.reduce((sum, c) => sum + c.message.length, 0) / contacts.length)} chars
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-light">
              <div className="card-body text-center">
                <h5 className="card-title text-success">👥 Unique Contacts</h5>
                <h3 className="text-dark">
                  {new Set(contacts.map(c => c.email)).size}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {editingContact && (
        <ContactModal
          contact={editingContact}
          onSave={handleSaveContact}
          onClose={() => setEditingContact(null)}
        />
      )}

      {viewingMessage && (
        <MessageViewModal
          contact={viewingMessage}
          onClose={() => setViewingMessage(null)}
        />
      )}

      <style jsx>{`
        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        .message-preview {
          font-size: 0.9rem;
          line-height: 1.3;
        }
        .btn-group .btn {
          border-radius: 4px !important;
          margin-right: 2px;
        }
        .btn-group .btn:last-child {
          margin-right: 0;
        }
      `}</style>
    </div>
  );
};

export default ContactsTab;