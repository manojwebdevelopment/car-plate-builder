// // cartApiUtils.js - API integration for cart operations

// const API_BASE_URL = 'http://localhost:5000';

// // Generate or get session ID for guest users
// const getSessionId = () => {
//   let sessionId = localStorage.getItem('sessionId');
//   if (!sessionId) {
//     sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
//     localStorage.setItem('sessionId', sessionId);
//   }
//   return sessionId;
// };

// // API Helper function
// const apiCall = async (url, options = {}) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}${url}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//       ...options,
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || 'API request failed');
//     }

//     return data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// // ===============================
// // CART API FUNCTIONS
// // ===============================

// // Get all cart items for current session
// export const getCartItems = async () => {
//   try {
//     const sessionId = getSessionId();
//     const result = await apiCall(`/api/cart/${sessionId}`);
//     return {
//       success: true,
//       cartItems: result.data || []
//     };
//   } catch (error) {
//     console.error('Error fetching cart items:', error);
//     return {
//       success: false,
//       cartItems: [],
//       error: error.message
//     };
//   }
// };

// // Add item to cart
// export const addToCart = async (item) => {
//   try {
//     const sessionId = getSessionId();
//     const itemData = {
//       ...item,
//       sessionId,
//       subtotal: item.price * item.quantity
//     };
    
//     const result = await apiCall('/api/cart', {
//       method: 'POST',
//       body: JSON.stringify(itemData)
//     });

//     // Trigger cart update event
//     window.dispatchEvent(new CustomEvent('cartUpdated'));
    
//     return {
//       success: true,
//       item: result.data
//     };
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// // Update cart item quantity
// export const updateCartItemQuantity = async (itemId, newQuantity) => {
//   try {
//     if (newQuantity < 1) {
//       // If quantity is less than 1, remove the item
//       return await removeFromCart(itemId);
//     }

//     const result = await apiCall(`/api/cart/${itemId}`, {
//       method: 'PUT',
//       body: JSON.stringify({ quantity: newQuantity })
//     });

//     // Trigger cart update event
//     window.dispatchEvent(new CustomEvent('cartUpdated'));
    
//     // Return updated cart items
//     const cartResult = await getCartItems();
//     return {
//       success: true,
//       cartItems: cartResult.cartItems,
//       updatedItem: result.data
//     };
//   } catch (error) {
//     console.error('Error updating cart item:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// // Remove item from cart
// export const removeFromCart = async (itemId) => {
//   try {
//     await apiCall(`/api/cart/${itemId}`, {
//       method: 'DELETE'
//     });

//     // Trigger cart update event
//     window.dispatchEvent(new CustomEvent('cartUpdated'));
    
//     // Return updated cart items
//     const cartResult = await getCartItems();
//     return {
//       success: true,
//       cartItems: cartResult.cartItems
//     };
//   } catch (error) {
//     console.error('Error removing from cart:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// // Clear entire cart
// export const clearCart = async () => {
//   try {
//     const sessionId = getSessionId();
//     await apiCall(`/api/cart/clear/${sessionId}`, {
//       method: 'DELETE'
//     });

//     // Trigger cart update event
//     window.dispatchEvent(new CustomEvent('cartUpdated'));
    
//     return {
//       success: true,
//       cartItems: []
//     };
//   } catch (error) {
//     console.error('Error clearing cart:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// // Get cart summary (total items, subtotal)
// export const getCartSummary = async () => {
//   try {
//     const sessionId = getSessionId();
//     const result = await apiCall(`/api/cart/${sessionId}/summary`);
//     return {
//       success: true,
//       summary: result.data
//     };
//   } catch (error) {
//     console.error('Error fetching cart summary:', error);
//     return {
//       success: false,
//       summary: { itemCount: 0, subtotal: 0, items: [] },
//       error: error.message
//     };
//   }
// };

// // Apply coupon code
// export const applyCoupon = async (couponCode, subtotal) => {
//   try {
//     const result = await apiCall('/api/cart/coupon', {
//       method: 'POST',
//       body: JSON.stringify({ code: couponCode, subtotal })
//     });
    
//     return {
//       success: true,
//       coupon: result.data
//     };
//   } catch (error) {
//     console.error('Error applying coupon:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// // ===============================
// // CHECKOUT API FUNCTIONS
// // ===============================

// // Create PayPal order for checkout
// export const createCheckoutOrder = async (checkoutData) => {
//   try {
//     const sessionId = getSessionId();
//     const orderData = {
//       ...checkoutData,
//       sessionId
//     };
    
//     const result = await apiCall('/api/checkout/create-order', {
//       method: 'POST',
//       body: JSON.stringify(orderData)
//     });
    
//     return {
//       success: true,
//       paypalOrderId: result.data.paypalOrderId,
//       tempOrderId: result.data.tempOrderId,
//       approvalUrl: result.data.approvalUrl
//     };
//   } catch (error) {
//     console.error('Error creating checkout order:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// // Capture PayPal payment
// export const capturePayment = async (paypalOrderId, orderDetails) => {
//   try {
//     const sessionId = getSessionId();
//     const captureData = {
//       ...orderDetails,
//       sessionId
//     };
    
//     const result = await apiCall(`/api/checkout/capture/${paypalOrderId}`, {
//       method: 'POST',
//       body: JSON.stringify(captureData)
//     });
    
//     return {
//       success: true,
//       orderId: result.data.orderId,
//       paymentStatus: result.data.paymentStatus
//     };
//   } catch (error) {
//     console.error('Error capturing payment:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// // ===============================
// // UTILITY FUNCTIONS
// // ===============================

// // Calculate cart totals (client-side calculation that matches backend)
// export const calculateCartTotals = (cartItems, appliedCoupon = null, shippingOption = 'tracked') => {
//   const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  
//   // Calculate discount
//   const discount = appliedCoupon 
//     ? appliedCoupon.type === 'percentage' 
//       ? subtotal * appliedCoupon.discount 
//       : appliedCoupon.discount
//     : 0;
  
//   // Calculate shipping
//   const shippingCost = shippingOption === 'next-day' ? 7.99 : 0;
  
//   // Calculate tax (20% VAT on after-discount amount)
//   const taxRate = 0.20;
//   const afterDiscount = subtotal - discount;
//   const tax = afterDiscount * taxRate;
  
//   // Calculate total
//   const total = afterDiscount + shippingCost + tax;
  
//   return {
//     subtotal: Math.round(subtotal * 100) / 100,
//     discount: Math.round(discount * 100) / 100,
//     shipping: Math.round(shippingCost * 100) / 100,
//     tax: Math.round(tax * 100) / 100,
//     total: Math.round(total * 100) / 100
//   };
// };

// // Get cart item count
// export const getCartItemCount = async () => {
//   try {
//     const summary = await getCartSummary();
//     return summary.success ? summary.summary.itemCount : 0;
//   } catch (error) {
//     console.error('Error getting cart item count:', error);
//     return 0;
//   }
// };

// // Get cart total
// export const getCartTotal = async () => {
//   try {
//     const summary = await getCartSummary();
//     return summary.success ? summary.summary.subtotal : 0;
//   } catch (error) {
//     console.error('Error getting cart total:', error);
//     return 0;
//   }
// };

// // Sync function versions for backward compatibility with existing cart utils
// export const getCartItemsSync = () => {
//   // This is a fallback - the component should use the async version
//   const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
//   return items;
// };

// export const getCartItemCountSync = () => {
//   const items = getCartItemsSync();
//   return items.reduce((sum, item) => sum + item.quantity, 0);
// };

// export const getCartTotalSync = () => {
//   const items = getCartItemsSync();
//   return items.reduce((sum, item) => sum + item.subtotal, 0);
// };

// // Export session ID getter for other components
// export { getSessionId };


// cartApiUtils.js - API integration for cart operations with JWT authentication

const API_BASE_URL = 'http://localhost:5000';

// Helper to get auth headers with JWT token
const getAuthHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    
    // Try multiple possible token storage locations
    const token = localStorage.getItem('authToken') || 
                  localStorage.getItem('token') || 
                  localStorage.getItem('userToken');

    console.log('Using token:', token); // Debugging log
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

// Check if user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem('authToken') || 
                  localStorage.getItem('token') || 
                  localStorage.getItem('userToken');

    console.log('isAuthenticated check, token:', token); // Debugging log
    console.log('isAuthenticated result:', localStorage.getItem('userToken')); // Debugging log
    return !!token;
};

// Generate or get session ID for guest users (only if not authenticated)
const getSessionId = () => {
    if (isAuthenticated()) {
        return null; // No session ID needed for authenticated users
    }
    
    let sessionId = localStorage.getItem('guestSessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('guestSessionId', sessionId);
    }
    return sessionId;
};

// API Helper function with authentication
const apiCall = async (url, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            headers: {
                ...getAuthHeaders(), // Include JWT token
                ...options.headers,
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// ===============================
// CART API FUNCTIONS
// ===============================

// Get all cart items (user or guest)
export const getCartItems = async () => {
  console.log('Fetching cart items... abhishek');
    try {
        let result;
        console.log("isAuthenticated abhishek:", isAuthenticated());
        if (isAuthenticated()) {
            // Get user cart
            result = await apiCall('/api/cart');
        } else {
            // Get guest cart
            const sessionId = getSessionId();
            result = await apiCall(`/api/cart?sessionId=${sessionId}`);
        }
        
        return {
            success: true,
            cartItems: result.data?.items || []
        };
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return {
            success: false,
            cartItems: [],
            error: error.message
        };
    }
};

// Add item to cart
export const addToCart = async (item) => {
    try {
        const requestBody = {
            item,
            sessionId: getSessionId() // Will be null for authenticated users
        };
        
        const result = await apiCall('/api/cart', {
            method: 'POST',
            body: JSON.stringify(requestBody)
        });

        // Trigger cart update event
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
        return {
            success: true,
            item: result.data,
            cartItems: result.data?.items || []
        };
    } catch (error) {
        console.error('Error adding to cart:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Update cart item quantity
export const updateCartItemQuantity = async (itemId, newQuantity) => {
    try {
        if (newQuantity < 1) {
            // If quantity is less than 1, remove the item
            return await removeFromCart(itemId);
        }

        const requestBody = {
            quantity: newQuantity,
            sessionId: getSessionId() // Will be null for authenticated users
        };

        const result = await apiCall(`/api/cart/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify(requestBody)
        });

        // Trigger cart update event
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
        return {
            success: true,
            cartItems: result.data?.items || [],
            updatedItem: result.data
        };
    } catch (error) {
        console.error('Error updating cart item:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
    try {
        let url;
        
        if (isAuthenticated()) {
            url = `/api/cart/${itemId}`;
        } else {
            const sessionId = getSessionId();
            url = `/api/cart/${itemId}?sessionId=${sessionId}`;
        }

        const result = await apiCall(url, {
            method: 'DELETE'
        });

        // Trigger cart update event
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
        return {
            success: true,
            cartItems: result.data?.items || []
        };
    } catch (error) {
        console.error('Error removing from cart:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Clear entire cart
export const clearCart = async () => {
    try {
        let url;
        
        if (isAuthenticated()) {
            url = '/api/cart';
        } else {
            const sessionId = getSessionId();
            url = `/api/cart?sessionId=${sessionId}`;
        }

        const result = await apiCall(url, {
            method: 'DELETE'
        });

        // Trigger cart update event
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
        return {
            success: true,
            cartItems: []
        };
    } catch (error) {
        console.error('Error clearing cart:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Merge guest cart into user cart (when user logs in)
export const mergeGuestCart = async () => {
    try {
        if (!isAuthenticated()) {
            return {
                success: false,
                error: 'User not authenticated'
            };
        }

        const sessionId = localStorage.getItem('guestSessionId');
        if (!sessionId) {
            return {
                success: true,
                message: 'No guest cart to merge',
                cartItems: []
            };
        }

        const result = await apiCall('/api/cart/merge', {
            method: 'POST',
            body: JSON.stringify({ sessionId })
        });

        // Clear guest session after successful merge
        localStorage.removeItem('guestSessionId');

        // Trigger cart update event
        window.dispatchEvent(new CustomEvent('cartUpdated'));

        return {
            success: true,
            message: result.message,
            cartItems: result.data?.items || []
        };
    } catch (error) {
        console.error('Error merging cart:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Get cart summary (total items, subtotal)
export const getCartSummary = async () => {
    try {
        const cartResult = await getCartItems();
        
        if (!cartResult.success) {
            return {
                success: false,
                summary: { itemCount: 0, subtotal: 0, items: [] },
                error: cartResult.error
            };
        }

        const items = cartResult.cartItems;
        const itemCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
        const subtotal = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);

        return {
            success: true,
            summary: {
                itemCount,
                subtotal: Math.round(subtotal * 100) / 100,
                items
            }
        };
    } catch (error) {
        console.error('Error fetching cart summary:', error);
        return {
            success: false,
            summary: { itemCount: 0, subtotal: 0, items: [] },
            error: error.message
        };
    }
};

// Apply coupon code
export const applyCoupon = async (couponCode, subtotal) => {
    try {
        const result = await apiCall('/api/cart/coupon', {
            method: 'POST',
            body: JSON.stringify({ code: couponCode, subtotal })
        });
        
        return {
            success: true,
            coupon: result.data
        };
    } catch (error) {
        console.error('Error applying coupon:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// ===============================
// CHECKOUT API FUNCTIONS
// ===============================

// Create checkout order (with authentication support)
export const createCheckoutOrder = async (checkoutData) => {
    try {
        const orderData = {
            ...checkoutData,
            sessionId: getSessionId() // Include session ID for guest users
        };
        
        const result = await apiCall('/api/checkout/create-order', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
        
        return {
            success: true,
            paypalOrderId: result.data.paypalOrderId,
            tempOrderId: result.data.tempOrderId,
            approvalUrl: result.data.approvalUrl
        };
    } catch (error) {
        console.error('Error creating checkout order:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Capture PayPal payment (with authentication support)
export const capturePayment = async (paypalOrderId, orderDetails) => {
    try {
        const captureData = {
            ...orderDetails,
            sessionId: getSessionId() // Include session ID for guest users
        };
        
        const result = await apiCall(`/api/checkout/capture/${paypalOrderId}`, {
            method: 'POST',
            body: JSON.stringify(captureData)
        });
        
        return {
            success: true,
            orderId: result.data.orderId,
            paymentStatus: result.data.paymentStatus
        };
    } catch (error) {
        console.error('Error capturing payment:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// ===============================
// UTILITY FUNCTIONS
// ===============================

// Calculate cart totals (client-side calculation that matches backend)
export const calculateCartTotals = (cartItems, appliedCoupon = null, shippingOption = 'tracked') => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    
    // Calculate discount
    const discount = appliedCoupon 
        ? appliedCoupon.type === 'percentage' 
            ? subtotal * appliedCoupon.discount 
            : appliedCoupon.discount
        : 0;
    
    // Calculate shipping
    const shippingCost = shippingOption === 'next-day' ? 7.99 : 0;
    
    // Calculate tax (20% VAT on after-discount amount)
    const taxRate = 0.20;
    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * taxRate;
    
    // Calculate total
    const total = afterDiscount + shippingCost + tax;
    
    return {
        subtotal: Math.round(subtotal * 100) / 100,
        discount: Math.round(discount * 100) / 100,
        shipping: Math.round(shippingCost * 100) / 100,
        tax: Math.round(tax * 100) / 100,
        total: Math.round(total * 100) / 100
    };
};

// Get cart item count (async)
export const getCartItemCount = async () => {
    try {
        const summary = await getCartSummary();
        return summary.success ? summary.summary.itemCount : 0;
    } catch (error) {
        console.error('Error getting cart item count:', error);
        return 0;
    }
};

// Get cart total (async)
export const getCartTotal = async () => {
    try {
        const summary = await getCartSummary();
        return summary.success ? summary.summary.subtotal : 0;
    } catch (error) {
        console.error('Error getting cart total:', error);
        return 0;
    }
};

// Sync function versions for backward compatibility with existing cart utils
export const getCartItemsSync = () => {
    // This is a fallback - the component should use the async version
    // We'll use the global state set by CartContext
    if (window.__CART_STATE__) {
        return window.__CART_STATE__.items || [];
    }
    return [];
};

export const getCartItemCountSync = () => {
    if (window.__CART_STATE__) {
        return window.__CART_STATE__.itemCount || 0;
    }
    return 0;
};

export const getCartTotalSync = () => {
    if (window.__CART_STATE__) {
        return window.__CART_STATE__.total || 0;
    }
    return 0;
};

// Authentication helper functions
export const handleUserLogin = async () => {
    console.log('User logged in, merging guest cart...');
    const mergeResult = await mergeGuestCart();
    if (mergeResult.success) {
        console.log('Guest cart merged successfully');
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    } else {
        console.error('Failed to merge guest cart:', mergeResult.error);
    }
};

export const handleUserLogout = () => {
    console.log('User logged out, cart will reset to guest mode');
    // The cart context will handle reloading as guest cart
    window.dispatchEvent(new CustomEvent('cartUpdated'));
};

// Export session ID getter for other components
export { getSessionId, isAuthenticated };