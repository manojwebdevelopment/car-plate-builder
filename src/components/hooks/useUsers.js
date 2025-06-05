// hooks/useUsers.js
import { useState } from 'react';
import { apiCall } from '../utils/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    postcode: '',
    role: 'customer',
    isActive: true,
    marketingEmails: false
  });
  const [userFormErrors, setUserFormErrors] = useState({});

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await apiCall('/admin/users');
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return { success: false, error: 'Error fetching users' };
    } finally {
      setLoadingUsers(false);
    }
  };

  const validateUserForm = () => {
    const errors = {};

    if (!userFormData.firstName.trim()) errors.firstName = 'First name is required';
    if (!userFormData.lastName.trim()) errors.lastName = 'Last name is required';
    
    if (!userFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!userFormData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(userFormData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!editingUser && !userFormData.password) {
      errors.password = 'Password is required';
    } else if (userFormData.password && userFormData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (userFormData.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(userFormData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!editingUser && userFormData.password !== userFormData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!userFormData.address.trim()) errors.address = 'Address is required';
    if (!userFormData.city.trim()) errors.city = 'City is required';
    
    if (!userFormData.postcode.trim()) {
      errors.postcode = 'Postcode is required';
    } else if (!/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i.test(userFormData.postcode)) {
      errors.postcode = 'Please enter a valid UK postcode';
    }

    setUserFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddUser = async () => {
    if (!validateUserForm()) return { success: false };

    try {
      const response = await apiCall('/admin/users', {
        method: 'POST',
        body: JSON.stringify(userFormData)
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchUsers();
        setShowAddUser(false);
        resetUserForm();
        return { success: true, message: 'User created successfully!' };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: 'Error creating user' };
    }
  };

  const handleUpdateUser = async () => {
    if (!validateUserForm()) return { success: false };

    try {
      const updateData = { ...userFormData };
      if (!updateData.password) {
        delete updateData.password;
        delete updateData.confirmPassword;
      }

      const response = await apiCall(`/admin/users/${editingUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchUsers();
        setEditingUser(null);
        resetUserForm();
        return { success: true, message: 'User updated successfully!' };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: 'Error updating user' };
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await apiCall(`/admin/users/${userId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchUsers();
        return { success: true, message: 'User deleted successfully!' };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: 'Error deleting user' };
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const response = await apiCall(`/admin/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !currentStatus })
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchUsers();
        return { success: true, message: `User ${!currentStatus ? 'activated' : 'deactivated'} successfully!` };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      return { success: false, error: 'Error updating user status' };
    }
  };

  const resetUserForm = () => {
    setUserFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      address: '',
      city: '',
      postcode: '',
      role: 'customer',
      isActive: true,
      marketingEmails: false
    });
    setUserFormErrors({});
  };

  const handleEditUser = (user) => {
    setUserFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      password: '',
      confirmPassword: '',
      address: user.address || '',
      city: user.city || '',
      postcode: user.postcode || '',
      role: user.role || 'customer',
      isActive: user.isActive !== undefined ? user.isActive : true,
      marketingEmails: user.marketingEmails || false
    });
    setEditingUser(user);
    setUserFormErrors({});
  };

  return {
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
    fetchUsers,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    handleToggleUserStatus,
    handleEditUser,
    resetUserForm,
    validateUserForm
  };
};