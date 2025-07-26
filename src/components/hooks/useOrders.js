// hooks/useOrders.js - Enhanced version with server-side operations
import { useState, useMemo, useCallback, useEffect } from 'react';

export const useOrders = () => {
  // Core data state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);
  const [error, setError] = useState(null);

  // Filter state
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    customStartDate: '',
    customEndDate: '',
    customer: '',
    product: '',
    amountMin: '',
    amountMax: '',
    paymentMethod: 'all'
  });

  // Pagination and sorting state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5, // Default to 5 as requested
    sortBy: 'date',
    sortOrder: 'desc',
    totalPages: 0,
    totalOrders: 0
  });

  // Export state
  const [exporting, setExporting] = useState(false);

  // Get admin token for API calls
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Fetch orders from API with server-side filtering, sorting, pagination
  const fetchOrders = useCallback(async (customFilters = null, customPagination = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const currentFilters = customFilters || filters;
      const currentPagination = customPagination || pagination;
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: currentPagination.currentPage,
        limit: currentPagination.itemsPerPage,
        sortBy: currentPagination.sortBy,
        sortOrder: currentPagination.sortOrder,
        ...currentFilters
      });

      // Remove empty filter values
      for (let [key, value] of queryParams.entries()) {
        if (!value || value === 'all' || value === '') {
          queryParams.delete(key);
        }
      }

      const response = await fetch(`http://localhost:5000/admin/orders?${queryParams.toString()}`, {
        headers: getAuthHeaders()
      });
      
      const result = await response.json();
      
      if (result.success) {
        setOrders(result.data || []);
        setPagination(prev => ({
          ...prev,
          totalPages: result.pagination?.totalPages || 0,
          totalOrders: result.pagination?.totalOrders || 0
        }));
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      const errorMessage = 'Network error: Unable to fetch orders';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [filters, pagination]);

  // Fetch single order details for modal
  const fetchOrderDetails = useCallback(async (orderId) => {
    setLoadingOrderDetails(true);
    try {
      const response = await fetch(`http://localhost:5000/order-details/${orderId}`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      
      if (result.success) {
        setViewingOrder(result.data);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      return { success: false, error: 'Network error: Unable to fetch order details' };
    } finally {
      setLoadingOrderDetails(false);
    }
  }, []);

  // Update order status (for quick actions)
  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/orders/${orderId}/quick-status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ newStatus })
      });

      const result = await response.json();
      
      if (result.success) {
        // Update the specific order in local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.orderId === orderId ? result.data : order
          )
        );
        return { 
          success: true, 
          message: result.message,
          data: result.data
        };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: 'Error updating order status' };
    }
  }, []);

  // Export orders
  const exportOrders = useCallback(async (exportType = 'current') => {
    setExporting(true);
    try {
      // Build query parameters for export
      const queryParams = new URLSearchParams({
        exportType, // 'current', 'filtered', 'all'
        format: 'csv',
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        sortBy: pagination.sortBy,
        sortOrder: pagination.sortOrder,
        ...filters
      });

      // Remove empty filter values
      for (let [key, value] of queryParams.entries()) {
        if (!value || value === 'all' || value === '') {
          queryParams.delete(key);
        }
      }

      const response = await fetch(`http://localhost:5000/admin/orders/export?${queryParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        // Handle file download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Extract filename from response headers or create default
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition 
          ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') 
          : `orders-export-${new Date().toISOString().split('T')[0]}.csv`;
        
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
        
        return { success: true, message: 'Orders exported successfully!' };
      } else {
        const errorResult = await response.json();
        return { success: false, error: errorResult.error || 'Export failed' };
      }
    } catch (error) {
      console.error('Error exporting orders:', error);
      return { success: false, error: 'Error exporting orders' };
    } finally {
      setExporting(false);
    }
  }, [filters, pagination]);

  // Handle view order
  const handleViewOrder = useCallback(async (order) => {
    const result = await fetchOrderDetails(order.orderId);
    return result;
  }, [fetchOrderDetails]);

  // Close order view modal
  const closeOrderView = useCallback(() => {
    setViewingOrder(null);
    setLoadingOrderDetails(false);
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page when filtering
  }, []);

  // Update pagination
  const updatePagination = useCallback((newPagination) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      status: 'all',
      dateRange: 'all',
      customStartDate: '',
      customEndDate: '',
      customer: '',
      product: '',
      amountMin: '',
      amountMax: '',
      paymentMethod: 'all'
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  // Refresh orders
  const refreshOrders = useCallback(async () => {
    const result = await fetchOrders();
    return result;
  }, [fetchOrders]);

  // Handle sorting
  const handleSort = useCallback((field) => {
    setPagination(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
      currentPage: 1
    }));
  }, []);

  // Calculate statistics from current orders
  const orderStatistics = useMemo(() => {
    return {
      total: pagination.totalOrders,
      completed: orders.filter(o => o.status === 'Completed').length,
      pending: orders.filter(o => o.status === 'Pending').length,
      shipped: orders.filter(o => o.status === 'Shipped').length,
      cancelled: orders.filter(o => o.status === 'Cancelled').length,
      failed: orders.filter(o => o.status === 'Failed').length,
      processing: orders.filter(o => o.status === 'Processing').length,
      totalValue: orders.reduce((sum, order) => sum + (parseFloat(order.amount) || 0), 0)
    };
  }, [orders, pagination.totalOrders]);

  // Auto-fetch when filters or pagination change
  useEffect(() => {
    fetchOrders();
  }, [filters, pagination.currentPage, pagination.itemsPerPage, pagination.sortBy, pagination.sortOrder]);

  // Return all the necessary data and functions
  return {
    // Data
    orders,
    viewingOrder,
    orderStatistics,
    
    // State
    loading,
    loadingOrderDetails,
    exporting,
    error,
    filters,
    pagination,
    
    // Filter functions
    updateFilters,
    clearFilters,
    
    // Pagination functions
    updatePagination,
    handleSort,
    
    // CRUD operations
    fetchOrders,
    refreshOrders,
    handleViewOrder,
    closeOrderView,
    updateOrderStatus,
    
    // Export functions
    exportOrders
  };
};