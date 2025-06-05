// hooks/useConfigurations.js
import { useState } from 'react';
import { apiCall } from '../utils/api';

export const useConfigurations = () => {
  const [configurations, setConfigurations] = useState({});
  const [loadingConfigs, setLoadingConfigs] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const [bulkOperation, setBulkOperation] = useState({
    isActive: false,
    selectedIds: [],
    operation: 'fixed_increase',
    value: 0,
    percentage: 0
  });
  const [confirmDialog, setConfirmDialog] = useState(null);

  const fetchConfigurations = async () => {
    setLoadingConfigs(true);
    try {
      const response = await apiCall('/admin/configurations');
      const result = await response.json();
      
      if (result.success) {
        setConfigurations(result.data);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error fetching configurations:', error);
      return { success: false, error: 'Error fetching configurations' };
    } finally {
      setLoadingConfigs(false);
    }
  };

  const updateConfiguration = async (id, updates) => {
    try {
      const response = await apiCall(`/admin/configurations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchConfigurations(); // Refresh data
        return { 
          success: true, 
          message: `Updated successfully! Price changed from £${result.previous.price} to £${result.updated.price}`,
          previous: result.previous,
          updated: result.updated
        };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error updating configuration:', error);
      return { success: false, error: 'Error updating configuration' };
    }
  };

  const bulkUpdateConfigurations = async () => {
    try {
      const response = await apiCall('/admin/configurations/bulk', {
        method: 'PUT',
        body: JSON.stringify({
          ids: bulkOperation.selectedIds,
          updateType: bulkOperation.operation,
          value: bulkOperation.value,
          percentage: bulkOperation.percentage
        })
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchConfigurations();
        setBulkOperation({ ...bulkOperation, isActive: false, selectedIds: [] });
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error in bulk update:', error);
      return { success: false, error: 'Error in bulk update' };
    }
  };

  const toggleBulkMode = () => {
    setBulkOperation({
      ...bulkOperation, 
      isActive: !bulkOperation.isActive,
      selectedIds: []
    });
  };

  const updateBulkSelection = (configId, isChecked) => {
    if (isChecked) {
      setBulkOperation({
        ...bulkOperation,
        selectedIds: [...bulkOperation.selectedIds, configId]
      });
    } else {
      setBulkOperation({
        ...bulkOperation,
        selectedIds: bulkOperation.selectedIds.filter(id => id !== configId)
      });
    }
  };

  const selectAllInType = (configs, isChecked) => {
    const typeIds = configs.map(c => c._id);
    if (isChecked) {
      setBulkOperation({
        ...bulkOperation,
        selectedIds: [...new Set([...bulkOperation.selectedIds, ...typeIds])]
      });
    } else {
      setBulkOperation({
        ...bulkOperation,
        selectedIds: bulkOperation.selectedIds.filter(id => !typeIds.includes(id))
      });
    }
  };

  return {
    configurations,
    loadingConfigs,
    editingConfig,
    setEditingConfig,
    bulkOperation,
    setBulkOperation,
    confirmDialog,
    setConfirmDialog,
    fetchConfigurations,
    updateConfiguration,
    bulkUpdateConfigurations,
    toggleBulkMode,
    updateBulkSelection,
    selectAllInType
  };
};