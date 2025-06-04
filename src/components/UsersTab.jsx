// components/UsersTab.js
import React from 'react';
import { formatDate } from './utils/api';
import UserFormModal from './modals/UserFormModal';
import UserViewModal from './modals/UserViewModal';

const UsersTab = ({
  users,
  loadingUsers,
  showAddUser,
  setShowAddUser,
  editingUser,
  setEditingUser,
  viewingUser,
  setViewingUser,
  userFormData,
  setUserFormData,
  userFormErrors,
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
  handleToggleUserStatus,
  handleEditUser,
  resetUserForm,
  fetchUsers,
  showToast
}) => {

  const onAddUser = async () => {
    const result = await handleAddUser();
    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.error || 'Failed to create user');
    }
  };

  const onUpdateUser = async () => {
    const result = await handleUpdateUser();
    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.error || 'Failed to update user');
    }
  };

  const onDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    const result = await handleDeleteUser(userId);
    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.error || 'Failed to delete user');
    }
  };

  const onToggleUserStatus = async (userId, currentStatus) => {
    const result = await handleToggleUserStatus(userId, currentStatus);
    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.error || 'Failed to update user status');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-warning"
            onClick={() => {
              resetUserForm();
              setShowAddUser(true);
            }}
          >
            ➕ Add New User
          </button>
          <button 
            className="btn btn-outline-warning"
            onClick={fetchUsers}
            disabled={loadingUsers}
          >
            {loadingUsers ? 'Refreshing...' : 'Refresh'}
          </button>
          <span className="badge bg-warning text-dark fs-6">Total Users: {users.length}</span>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          {loadingUsers ? (
            <div className="text-center p-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-muted">No users found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-warning">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id || user.id}>
                      <td>#{user._id ? user._id.slice(-6) : user.id}</td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-info'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{user.createdAt ? formatDate(user.createdAt) : 'N/A'}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() => setViewingUser(user)}
                            title="View Details"
                          >
                            👁️
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditUser(user)}
                            title="Edit User"
                          >
                            ✏️
                          </button>
                          <button
                            className={`btn btn-sm ${user.isActive ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => onToggleUserStatus(user._id || user.id, user.isActive)}
                            title={user.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {user.isActive ? '🚫' : '✅'}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDeleteUser(user._id || user.id)}
                            title="Delete User"
                          >
                            🗑️
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

      {/* Modals */}
      {(showAddUser || editingUser) && (
        <UserFormModal
          user={editingUser}
          isEdit={!!editingUser}
          formData={userFormData}
          setFormData={setUserFormData}
          formErrors={userFormErrors}
          onSave={editingUser ? onUpdateUser : onAddUser}
          onClose={() => {
            setShowAddUser(false);
            setEditingUser(null);
            resetUserForm();
          }}
        />
      )}

      {viewingUser && (
        <UserViewModal
          user={viewingUser}
          onClose={() => setViewingUser(null)}
        />
      )}
    </div>
  );
};

export default UsersTab;