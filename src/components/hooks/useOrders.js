// hooks/useOrders.js
import { useState } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/order-details');
      const result = await response.json();
      
      if (result.success) {
        setOrders(result.data);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      return { success: false, error: 'Network error: Unable to fetch orders' };
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
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      return { success: false, error: 'Network error: Unable to fetch order details' };
    } finally {
      setLoadingOrderDetails(false);
    }
  };

  const handleViewOrder = async (order) => {
    const result = await fetchOrderDetails(order.orderId);
    return result;
  };

  const closeOrderView = () => {
    setViewingOrder(null);
    setLoadingOrderDetails(false);
  };

  return {
    orders,
    loading,
    viewingOrder,
    loadingOrderDetails,
    fetchOrders,
    handleViewOrder,
    closeOrderView
  };
};