// AdminDashboard.js - Main Component
import React, { useState, useEffect } from 'react';
import './styles/AdminDashboard.css';

// Import all components
import Sidebar from './Sidebar.jsx';
import Toast from './Toast';
import LoginScreen from './LoginScreen';
import OrdersTab from './OrdersTab.jsx';
import PricingTab from './PricingTab.jsx';
import UsersTab from './UsersTab';
import ContactsTab from './ContactsTab.jsx';
import SettingsTab from './SettingsTab.jsx';

// Import hooks
import { useAuth } from './hooks/useAuth';
import { useToast } from './hooks/useToast';
import { useOrders } from './hooks/useOrders';
import { useUsers } from './hooks/useUsers';
import { useConfigurations } from './hooks/useConfigurations';

const AdminDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('orders');
  
  // Custom hooks
  const { isAuthenticated, login, logout, loginLoading } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  
  // Tab-specific hooks
  const ordersHook = useOrders();
  const usersHook = useUsers();
  const configurationsHook = useConfigurations();

  // Static data (should be moved to API later)
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Brown', email: 'alice@example.com', phone: '+91-9876543210', message: 'Inquiry about products' },
    { id: 2, name: 'Bob Wilson', email: 'bob@example.com', phone: '+91-9876543211', message: 'Support request' }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    title: 'My E-commerce Store',
    description: 'Best online shopping experience with quality products',
    canonical: 'https://mystore.com'
  });

  // Fetch data when tab changes
  useEffect(() => {
    if (!isAuthenticated) return;

    switch (activeTab) {
      case 'orders':
        ordersHook.fetchOrders();
        break;
      case 'pricing':
        configurationsHook.fetchConfigurations();
        break;
      case 'users':
        usersHook.fetchUsers();
        break;
      default:
        break;
    }
  }, [activeTab, isAuthenticated]);

  // Contact handlers (temporary - should be moved to custom hook)
  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    showToast('Contact deleted successfully', 'success');
  };

  const handleEditContact = (contact) => {
    // This should be handled by ContactsTab component
  };

  // Render login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginScreen 
        onLogin={login}
        loading={loginLoading}
        toast={toast}
        onHideToast={hideToast}
      />
    );
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={logout}
      />

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid">
          
          {/* Tab Content */}
          {activeTab === 'orders' && (
            <OrdersTab 
              {...ordersHook}
              showToast={showToast}
            />
          )}

          {activeTab === 'pricing' && (
            <PricingTab 
              {...configurationsHook}
              showToast={showToast}
            />
          )}

          {activeTab === 'users' && (
            <UsersTab 
              {...usersHook}
              showToast={showToast}
            />
          )}

          {activeTab === 'contacts' && (
            <ContactsTab 
              contacts={contacts}
              onDeleteContact={handleDeleteContact}
              onEditContact={handleEditContact}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab 
              settings={siteSettings}
              onUpdateSettings={setSiteSettings}
              showToast={showToast}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;