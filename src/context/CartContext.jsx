// Enhanced Cart Context - Database Integration
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [syncPending, setSyncPending] = useState(false);
  
  const { user, isAuthenticated, token } = useAuth() || {};
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Generate session ID for guests
  const generateSessionId = useCallback(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    localStorage.setItem('guestSessionId', newSessionId);
    return newSessionId;
  }, []);

  // Get session ID for guests
  const getSessionId = useCallback(() => {
    if (isAuthenticated) return null; // No session ID for authenticated users
    
    if (sessionId) return sessionId;
    
    // Try to get from localStorage
    const savedSessionId = localStorage.getItem('guestSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      return savedSessionId;
    }
    
    // Generate new one
    return generateSessionId();
  }, [sessionId, isAuthenticated, generateSessionId]);

  // Get auth headers
  const getHeaders = useCallback(() => {
    const headers = { 'Content-Type': 'application/json' };
    
    if (isAuthenticated && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }, [isAuthenticated, token]);

  // Load cart from database
  const loadCartFromDatabase = useCallback(async () => {
    try {
      console.log('🔄 Loading cart from database...');
      setSyncPending(true);
      
      const currentSessionId = getSessionId();
      const url = isAuthenticated 
        ? `${API_URL}/api/cart`
        : `${API_URL}/api/cart?sessionId=${currentSessionId}`;

      console.log("Fetching cart from:", url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders()
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Cart loaded from database:', result.data);
        setCart(result.data.items || []);
        // Update global state for backward compatibility
        window.__CART_STATE__ = {
          items: result.data.items || [],
          itemCount: (result.data.items || []).reduce((sum, item) => sum + (item.quantity || 0), 0),
          total: (result.data.items || []).reduce((sum, item) => sum + (item.subtotal || 0), 0)
        };
        
        // Update session ID if provided
        if (result.data.sessionId && !isAuthenticated) {
          setSessionId(result.data.sessionId);
          localStorage.setItem('guestSessionId', result.data.sessionId);
        }
      } else {
        console.error('❌ Failed to load cart:', result.error);
        setCart([]);
      }
      
    } catch (error) {
      console.error('💥 Error loading cart from database:', error);
      setCart([]);
    } finally {
      setSyncPending(false);
      setLoading(false);
      setInitialized(true);
    }
  }, [isAuthenticated, getSessionId, getHeaders, API_URL]);

  // Initialize cart
  useEffect(() => {
    console.log('🚀 CartProvider initializing...');
    loadCartFromDatabase();
  }, [loadCartFromDatabase]);

  // Handle authentication changes
  useEffect(() => {
    if (initialized && isAuthenticated && sessionId) {
      // User just logged in, merge cart
      mergeGuestCartToUser();
    }
  }, [isAuthenticated, initialized, sessionId]);

  // Merge guest cart to user cart when user logs in
  const mergeGuestCartToUser = useCallback(async () => {
    if (!sessionId || !isAuthenticated) return;
    
    try {
      console.log('🔄 Merging guest cart to user cart...');
      setSyncPending(true);
      
      const response = await fetch(`${API_URL}/api/cart/merge`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ sessionId })
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Cart merged successfully:', result.data);
        setCart(result.data.items || []);
        // Update global state for backward compatibility
        window.__CART_STATE__ = {
          items: result.data.items || [],
          itemCount: (result.data.items || []).reduce((sum, item) => sum + (item.quantity || 0), 0),
          total: (result.data.items || []).reduce((sum, item) => sum + (item.subtotal || 0), 0)
        };
        
        // Clear guest session
        setSessionId(null);
        localStorage.removeItem('guestSessionId');
      } else {
        console.error('❌ Failed to merge cart:', result.error);
      }
      
    } catch (error) {
      console.error('💥 Error merging cart:', error);
    } finally {
      setSyncPending(false);
    }
  }, [sessionId, isAuthenticated, getHeaders, API_URL]);

  // Add item to cart
  const addToCart = useCallback(async (item) => {
    try {
      console.log('➕ Adding item to cart:', item);
      setSyncPending(true);
      
      const requestBody = {
        item,
        sessionId: getSessionId()
      };
      
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(requestBody)
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Item added to cart successfully:', result.data);
        setCart(result.data.items || []);
        // Update global state for backward compatibility
        window.__CART_STATE__ = {
          items: result.data.items || [],
          itemCount: (result.data.items || []).reduce((sum, item) => sum + (item.quantity || 0), 0),
          total: (result.data.items || []).reduce((sum, item) => sum + (item.subtotal || 0), 0)
        };
        
        // Update session ID if provided
        if (result.data.sessionId && !isAuthenticated) {
          setSessionId(result.data.sessionId);
          localStorage.setItem('guestSessionId', result.data.sessionId);
        }
        
        // Dispatch event for navbar update
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
        return { success: true, message: 'Item added to cart successfully!' };
      } else {
        console.error('❌ Failed to add item:', result.error);
        return { success: false, error: result.error };
      }
      
    } catch (error) {
      console.error('💥 Error adding item to cart:', error);
      return { success: false, error: 'Failed to add item to cart' };
    } finally {
      setSyncPending(false);
    }
  }, [getSessionId, getHeaders, API_URL, isAuthenticated]);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId) => {
    try {
      console.log('🗑️ Removing item from cart:', itemId);
      setSyncPending(true);
      
      const currentSessionId = getSessionId();
      const url = isAuthenticated 
        ? `${API_URL}/api/cart/${itemId}`
        : `${API_URL}/api/cart/${itemId}?sessionId=${currentSessionId}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Item removed successfully:', result.data);
        setCart(result.data.items || []);
        // Update global state for backward compatibility
        window.__CART_STATE__ = {
          items: result.data.items || [],
          itemCount: (result.data.items || []).reduce((sum, item) => sum + (item.quantity || 0), 0),
          total: (result.data.items || []).reduce((sum, item) => sum + (item.subtotal || 0), 0)
        };
        
        // Dispatch event for navbar update
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      } else {
        console.error('❌ Failed to remove item:', result.error);
      }
      
    } catch (error) {
      console.error('💥 Error removing item from cart:', error);
    } finally {
      setSyncPending(false);
    }
  }, [getSessionId, getHeaders, API_URL, isAuthenticated]);

  // Update item quantity
  const updateQuantity = useCallback(async (itemId, newQuantity) => {
    try {
      console.log('🔢 Updating quantity for item:', itemId, 'to:', newQuantity);
      setSyncPending(true);
      
      const requestBody = {
        quantity: newQuantity,
        sessionId: getSessionId()
      };
      
      const response = await fetch(`${API_URL}/api/cart/${itemId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(requestBody)
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Quantity updated successfully:', result.data);
        setCart(result.data.items || []);
        // Update global state for backward compatibility
        window.__CART_STATE__ = {
          items: result.data.items || [],
          itemCount: (result.data.items || []).reduce((sum, item) => sum + (item.quantity || 0), 0),
          total: (result.data.items || []).reduce((sum, item) => sum + (item.subtotal || 0), 0)
        };
        
        // Dispatch event for navbar update
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      } else {
        console.error('❌ Failed to update quantity:', result.error);
      }
      
    } catch (error) {
      console.error('💥 Error updating quantity:', error);
    } finally {
      setSyncPending(false);
    }
  }, [getSessionId, getHeaders, API_URL]);

  // Clear entire cart
  const clearCart = useCallback(async () => {
    try {
      console.log('🧹 Clearing cart');
      setSyncPending(true);
      
      const currentSessionId = getSessionId();
      const url = isAuthenticated 
        ? `${API_URL}/api/cart`
        : `${API_URL}/api/cart?sessionId=${currentSessionId}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Cart cleared successfully');
        setCart([]);
        
        // Dispatch event for navbar update
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      } else {
        console.error('❌ Failed to clear cart:', result.error);
      }
      
    } catch (error) {
      console.error('💥 Error clearing cart:', error);
    } finally {
      setSyncPending(false);
    }
  }, [getSessionId, getHeaders, API_URL, isAuthenticated]);

  // Get cart total
  const getCartTotal = useCallback(() => {
    const total = cart.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    return total;
  }, [cart]);

  // Get cart item count
  const getCartItemCount = useCallback(() => {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    return count;
  }, [cart]);

  // Force reload cart from database
  const reloadCart = useCallback(() => {
    console.log('🔄 Force reloading cart...');
    setInitialized(false);
    setLoading(true);
    loadCartFromDatabase();
  }, [loadCartFromDatabase]);

  // Debug cart state
  const debugCart = useCallback(() => {
    console.log('🔍 === DATABASE CART DEBUG INFO ===');
    console.log('Cart state:', cart);
    console.log('Cart length:', cart.length);
    console.log('Initialized:', initialized);
    console.log('Loading:', loading);
    console.log('Sync pending:', syncPending);
    console.log('Is authenticated:', isAuthenticated);
    console.log('Session ID:', sessionId);
    console.log('Cart total:', getCartTotal());
    console.log('Cart count:', getCartItemCount());
    console.log('====================================');
  }, [cart, initialized, loading, syncPending, isAuthenticated, sessionId, getCartTotal, getCartItemCount]);

  const value = {
    cart,
    loading,
    initialized,
    syncPending,
    sessionId,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    reloadCart,
    debugCart
  };

  // Debug on every render
  console.log('🔄 CartProvider render - Cart length:', cart.length, 'Initialized:', initialized, 'Sync pending:', syncPending);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};