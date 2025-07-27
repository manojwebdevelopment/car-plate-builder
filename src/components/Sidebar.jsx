// components/Sidebar.js
import React from "react";

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: "orders", icon: "📦", label: "Orders" },
    { id: "plate-configurations", icon: "💰", label: "Plate Configurations" },
    // { id: 'users', icon: '👥', label: 'User Management' },
    // { id: 'contacts', icon: '📞', label: 'Contacts' },
    // { id: 'settings', icon: '⚙️', label: 'Site Settings' }
  ];

  return (
    <div
      className="sidebar"
      style={{
        width: "250px",
        backgroundColor: "#ffc107",
        minHeight: "100vh",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="text-dark mb-0">Admin Panel</h4>
          <button className="btn btn-sm btn-outline-dark" onClick={onLogout}>
            Logout
          </button>
        </div>
        <nav className="nav flex-column">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link btn text-start mb-2 ${
                activeTab === item.id ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
