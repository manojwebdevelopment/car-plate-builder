// // cartUtils.js - Cart management functions using localStorage

// // Get cart items from localStorage
// export const getCartItems = () => {
//     try {
//         const cartData = localStorage.getItem('plateCart');
//         return cartData ? JSON.parse(cartData) : [];
//     } catch (error) {
//         console.error('Error reading cart from localStorage:', error);
//         return [];
//     }
// };

// // Save cart items to localStorage
// export const saveCartItems = (items) => {
//     try {
//         localStorage.setItem('plateCart', JSON.stringify(items));
//         return true;
//     } catch (error) {
//         console.error('Error saving cart to localStorage:', error);
//         return false;
//     }
// };

// // Add item to cart
// export const addToCart = (plateData) => {
//     try {
//         const currentCart = getCartItems();
        
//         // Create plate item
//         const plateItem = {
//             id: `plate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//             type: 'plate',
//             name: `${plateData.styleLabel} ${plateData.thickness} Acrylic Plates`,
//             side: plateData.plateType.toUpperCase(),
//             registration: plateData.text,
//             roadLegal: plateData.roadLegal || 'No',
//             size: plateData.sizeLabel || 'Standard Oblong',
//             plateStyle: plateData.plateStyle,
//             thickness: plateData.thickness,
//             fontColor: plateData.fontColor,
//             shadowEffect: plateData.shadowEffect,
//             borderStyle: plateData.borderStyle,
//             countryBadge: plateData.countryBadge,
//             selectedCountry: plateData.selectedCountry,
//             badgePosition: plateData.badgePosition,
//             customTextColor: plateData.customTextColor,
//             outlineColor: plateData.outlineColor,
//             selectedSize: plateData.selectedSize,
//             price: plateData.price,
//             quantity: plateData.quantity,
//             subtotal: plateData.price * plateData.quantity,
//             addedAt: new Date().toISOString()
//         };

//         // Add the plate to cart
//         const updatedCart = [...currentCart, plateItem];
        
//         // Check if fixing kit already exists
//         const hasFixingKit = currentCart.some(item => item.type === 'fixing-kit');
        
//         // Auto-add fixing kit if not present
//         if (!hasFixingKit) {
//             const fixingKit = {
//                 id: `fixing_kit_${Date.now()}`,
//                 type: 'fixing-kit',
//                 name: 'Fixing Kit (Sticky Pads & Screws)',
//                 description: 'Essential mounting hardware for your plates',
//                 price: 0,
//                 quantity: 1,
//                 subtotal: 0,
//                 addedAt: new Date().toISOString()
//             };
//             updatedCart.push(fixingKit);
//         }

//         // Save to localStorage
//         const saved = saveCartItems(updatedCart);
        
//         if (saved) {
//             // Dispatch custom event to notify other components
//             window.dispatchEvent(new CustomEvent('cartUpdated', {
//                 detail: { items: updatedCart, action: 'add', newItem: plateItem }
//             }));
//             return { success: true, cartItems: updatedCart };
//         } else {
//             throw new Error('Failed to save to localStorage');
//         }
        
//     } catch (error) {
//         console.error('Error adding to cart:', error);
//         return { success: false, error: error.message };
//     }
// };

// // Remove item from cart
// export const removeFromCart = (itemId) => {
//     try {
//         const currentCart = getCartItems();
//         const item = currentCart.find(item => item.id === itemId);
        
//         // Prevent removal of fixing kit
//         if (item && item.type === 'fixing-kit') {
//             return { success: false, error: 'Fixing kit cannot be removed from cart' };
//         }
        
//         const updatedCart = currentCart.filter(item => item.id !== itemId);
        
//         const saved = saveCartItems(updatedCart);
        
//         if (saved) {
//             window.dispatchEvent(new CustomEvent('cartUpdated', {
//                 detail: { items: updatedCart, action: 'remove', itemId }
//             }));
//             return { success: true, cartItems: updatedCart };
//         } else {
//             throw new Error('Failed to save to localStorage');
//         }
//     } catch (error) {
//         console.error('Error removing from cart:', error);
//         return { success: false, error: error.message };
//     }
// };

// // Update item quantity
// export const updateCartItemQuantity = (itemId, newQuantity) => {
//     try {
//         const currentCart = getCartItems();
//         const item = currentCart.find(item => item.id === itemId);
        
//         // Prevent quantity changes for fixing kit
//         if (item && item.type === 'fixing-kit') {
//             return { success: false, error: 'Fixing kit quantity cannot be changed' };
//         }
        
//         if (newQuantity <= 0) {
//             return removeFromCart(itemId);
//         }
        
//         const updatedCart = currentCart.map(item => {
//             if (item.id === itemId) {
//                 return {
//                     ...item,
//                     quantity: newQuantity,
//                     subtotal: item.price * newQuantity
//                 };
//             }
//             return item;
//         });
        
//         const saved = saveCartItems(updatedCart);
        
//         if (saved) {
//             window.dispatchEvent(new CustomEvent('cartUpdated', {
//                 detail: { items: updatedCart, action: 'update', itemId, newQuantity }
//             }));
//             return { success: true, cartItems: updatedCart };
//         } else {
//             throw new Error('Failed to save to localStorage');
//         }
//     } catch (error) {
//         console.error('Error updating cart item:', error);
//         return { success: false, error: error.message };
//     }
// };

// // Clear entire cart
// export const clearCart = () => {
//     try {
//         localStorage.removeItem('plateCart');
//         window.dispatchEvent(new CustomEvent('cartUpdated', {
//             detail: { items: [], action: 'clear' }
//         }));
//         return { success: true, cartItems: [] };
//     } catch (error) {
//         console.error('Error clearing cart:', error);
//         return { success: false, error: error.message };
//     }
// };

// // Get cart item count
// export const getCartItemCount = () => {
//     const items = getCartItems();
//     return items.reduce((count, item) => count + item.quantity, 0);
// };

// // Get cart total
// export const getCartTotal = () => {
//     const items = getCartItems();
//     return items.reduce((total, item) => total + item.subtotal, 0);
// };

// // Format cart data for checkout
// export const formatCartForCheckout = () => {
//     const items = getCartItems();
//     const subtotal = getCartTotal();
//     const tax = subtotal * 0.20; // 20% VAT
    
//     return {
//         items,
//         subtotal,
//         tax,
//         total: subtotal + tax,
//         itemCount: getCartItemCount(),
//         formattedItems: items.map(item => ({
//             ...item,
//             formattedPrice: `£${item.price.toFixed(2)}`,
//             formattedSubtotal: `£${item.subtotal.toFixed(2)}`
//         }))
//     };
// };



// cartUtils.js - Cart management functions using database API

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper to get auth headers
const getAuthHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    
    // Try to get auth token from localStorage or your auth context
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

// Helper to get session ID for guests
const getGuestSessionId = () => {
    let sessionId = localStorage.getItem('guestSessionId');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('guestSessionId', sessionId);
    }
    return sessionId;
};

// Check if user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem('userToken') || localStorage.getItem('token');
    return !!token;
};

// Get cart items from database
export const getCartItems = async () => {
    try {
        const sessionId = getGuestSessionId();
        const url = isAuthenticated() 
            ? `${API_URL}/api/cart`
            : `${API_URL}/api/cart?sessionId=${sessionId}`;
        
        console.log('abhishek - Fetching cart items from:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        const result = await response.json();
        
        if (result.success) {
            return result.data.items || [];
        } else {
            console.error('Failed to get cart items:', result.error);
            return [];
        }
    } catch (error) {
        console.error('Error reading cart from database:', error);
        return [];
    }
};

// This is kept for backward compatibility - but now it just calls the async version
export const getCartItemsSync = () => {
    // For components that expect synchronous cart data
    // We'll use the global state set by CartContext
    if (window.__CART_STATE__) {
        return window.__CART_STATE__.items || [];
    }
    return [];
};

// Save cart items to database (internal function)
const saveCartItems = async (items) => {
    try {
        // This is now handled by individual cart operations
        // Keep this function for backward compatibility but it doesn't do anything
        console.log('saveCartItems called - now handled by individual operations');
        return true;
    } catch (error) {
        console.error('Error saving cart:', error);
        return false;
    }
};

// Add item to cart
export const addToCart = async (plateData) => {
    try {
        // Create enhanced plate item with all required fields
        const plateItem = {
            id: `plate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'plate',
            name: `${plateData.styleLabel || 'Custom'} ${plateData.thickness || '3mm'} Number Plate`,
            side: plateData.plateType?.toUpperCase() || plateData.side || 'FRONT',
            registration: plateData.text || plateData.registration || '',
            roadLegal: plateData.roadLegal || 'No',
            spacing: plateData.spacing || 'legal',
            
            // Size data
            size: plateData.selectedSize || plateData.size || 'standard',
            sizeLabel: plateData.sizeLabel || 'Standard Size',
            sizeDimensions: plateData.sizeDimensions || '520mm x 111mm',
            sizePrice: parseFloat(plateData.sizePrice) || 0,
            
            // Style data
            plateStyle: plateData.plateStyle || 'standard',
            styleLabel: plateData.styleLabel || 'Standard Plate',
            stylePrice: parseFloat(plateData.stylePrice) || 0,
            
            // Thickness data
            thickness: plateData.thickness || '3mm',
            thicknessLabel: plateData.thicknessLabel || '3mm Standard',
            thicknessValue: parseFloat(plateData.thicknessValue) || 3,
            thicknessPrice: parseFloat(plateData.thicknessPrice) || 0,
            
            // Color data
            fontColor: plateData.fontColor || plateData.customTextColor || '#000000',
            fontColorName: plateData.fontColorName || 'Black',
            fontColorPrice: parseFloat(plateData.fontColorPrice) || 0,
            customTextColor: plateData.customTextColor,
            
            // Border data
            borderStyle: plateData.borderStyle || 'none',
            borderName: plateData.borderName || 'No Border',
            borderType: plateData.borderType || 'none',
            borderColor: plateData.borderColor || plateData.outlineColor || '',
            borderWidth: parseFloat(plateData.borderWidth) || 0,
            borderPrice: parseFloat(plateData.borderPrice) || 0,
            
            // Shadow effect data
            shadowEffect: plateData.shadowEffect || 'none',
            shadowName: plateData.shadowName || 'No Effect',
            shadowDescription: plateData.shadowDescription || '',
            shadowPrice: parseFloat(plateData.shadowPrice) || 0,
            
            // Badge data
            countryBadge: plateData.countryBadge || 'none',
            selectedCountry: plateData.selectedCountry || 'uk',
            badgeName: plateData.badgeName || 'No Badge',
            badgePosition: plateData.badgePosition || 'left',
            flagImage: plateData.flagImage || '',
            badgePrice: parseFloat(plateData.badgePrice) || 0,
            
            // Finish data
            finish: plateData.finish || 'standard',
            finishLabel: plateData.finishLabel || 'Standard Finish',
            finishDescription: plateData.finishDescription || '',
            finishPrice: parseFloat(plateData.finishPrice) || 0,
            
            // Additional fields
            displayText: plateData.displayText || plateData.text || plateData.registration,
            font: plateData.font || 'Charles Wright',
            fontSize: parseFloat(plateData.fontSize) || 79,
            
            // Pricing
            price: parseFloat(plateData.price) || 0,
            quantity: parseInt(plateData.quantity) || 1,
            subtotal: parseFloat(plateData.price) * parseInt(plateData.quantity) || 0,
            
            addedAt: new Date().toISOString()
        };

        // Add plate to database cart
        const sessionId = getGuestSessionId();
        const response = await fetch(`${API_URL}/api/cart`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                item: plateItem,
                sessionId: sessionId
            })
        });

        const result = await response.json();
        
        if (result.success) {
            // Check if fixing kit needs to be added
            const currentItems = result.data.items || [];
            const hasFixingKit = currentItems.some(item => item.type === 'fixing-kit');
            
            // Auto-add fixing kit if not present
            if (!hasFixingKit) {
                const fixingKit = {
                    id: `fixing_kit_${Date.now()}`,
                    type: 'fixing-kit',
                    name: 'Fixing Kit (Sticky Pads & Screws)',
                    description: 'Essential mounting hardware for your plates',
                    price: 0,
                    quantity: 1,
                    subtotal: 0,
                    addedAt: new Date().toISOString()
                };

                // Add fixing kit to database
                await fetch(`${API_URL}/api/cart`, {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        item: fixingKit,
                        sessionId: sessionId
                    })
                });
            }

            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { items: result.data.items, action: 'add', newItem: plateItem }
            }));
            
            return { success: true, cartItems: result.data.items };
        } else {
            throw new Error(result.error || 'Failed to add item to cart');
        }
        
    } catch (error) {
        console.error('Error adding to cart:', error);
        return { success: false, error: error.message };
    }
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
    try {
        // Get current items to check if it's a fixing kit
        const currentItems = await getCartItems();
        const item = currentItems.find(item => item.id === itemId);
        
        // Prevent removal of fixing kit
        if (item && item.type === 'fixing-kit') {
            return { success: false, error: 'Fixing kit cannot be removed from cart' };
        }
        
        const sessionId = getGuestSessionId();
        const url = isAuthenticated() 
            ? `${API_URL}/api/cart/${itemId}`
            : `${API_URL}/api/cart/${itemId}?sessionId=${sessionId}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        const result = await response.json();
        
        if (result.success) {
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { items: result.data.items, action: 'remove', itemId }
            }));
            return { success: true, cartItems: result.data.items };
        } else {
            throw new Error(result.error || 'Failed to remove item');
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        return { success: false, error: error.message };
    }
};

// Update item quantity
export const updateCartItemQuantity = async (itemId, newQuantity) => {
    try {
        // Get current items to check if it's a fixing kit
        const currentItems = await getCartItems();
        const item = currentItems.find(item => item.id === itemId);
        
        // Prevent quantity changes for fixing kit
        if (item && item.type === 'fixing-kit') {
            return { success: false, error: 'Fixing kit quantity cannot be changed' };
        }
        
        if (newQuantity <= 0) {
            return await removeFromCart(itemId);
        }
        
        const sessionId = getGuestSessionId();
        const response = await fetch(`${API_URL}/api/cart/${itemId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                quantity: newQuantity,
                sessionId: sessionId
            })
        });

        const result = await response.json();
        
        if (result.success) {
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { items: result.data.items, action: 'update', itemId, newQuantity }
            }));
            return { success: true, cartItems: result.data.items };
        } else {
            throw new Error(result.error || 'Failed to update quantity');
        }
    } catch (error) {
        console.error('Error updating cart item:', error);
        return { success: false, error: error.message };
    }
};

// Clear entire cart
export const clearCart = async () => {
    try {
        const sessionId = getGuestSessionId();
        const url = isAuthenticated() 
            ? `${API_URL}/api/cart`
            : `${API_URL}/api/cart?sessionId=${sessionId}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        const result = await response.json();
        
        if (result.success) {
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { items: [], action: 'clear' }
            }));
            return { success: true, cartItems: [] };
        } else {
            throw new Error(result.error || 'Failed to clear cart');
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
        return { success: false, error: error.message };
    }
};

// Get cart item count (synchronous - uses global state)
export const getCartItemCount = () => {
    try {
        // Use global state set by CartContext for immediate access
        if (window.__CART_STATE__) {
            return window.__CART_STATE__.itemCount || 0;
        }
        
        // Fallback: try localStorage for backward compatibility (will be empty now)
        // This is mainly for components that load before CartContext initializes
        return 0;
    } catch (error) {
        console.error('Error getting cart count:', error);
        return 0;
    }
};

// Get cart total (synchronous - uses global state)
export const getCartTotal = () => {
    try {
        if (window.__CART_STATE__) {
            return window.__CART_STATE__.total || 0;
        }
        return 0;
    } catch (error) {
        console.error('Error getting cart total:', error);
        return 0;
    }
};

// Get cart item count (async version for accurate data)
export const getCartItemCountAsync = async () => {
    try {
        const items = await getCartItems();
        return items.reduce((count, item) => count + (item.quantity || 0), 0);
    } catch (error) {
        console.error('Error getting async cart count:', error);
        return 0;
    }
};

// Get cart total (async version for accurate data)
export const getCartTotalAsync = async () => {
    try {
        const items = await getCartItems();
        return items.reduce((total, item) => total + (item.subtotal || 0), 0);
    } catch (error) {
        console.error('Error getting async cart total:', error);
        return 0;
    }
};

// Format cart data for checkout (async version)
export const formatCartForCheckout = async () => {
    try {
        const items = await getCartItems();
        const subtotal = items.reduce((total, item) => total + (item.subtotal || 0), 0);
        const tax = subtotal * 0.20; // 20% VAT
        
        return {
            items,
            subtotal,
            tax,
            total: subtotal + tax,
            itemCount: items.reduce((count, item) => count + (item.quantity || 0), 0),
            formattedItems: items.map(item => ({
                ...item,
                formattedPrice: `£${(item.price || 0).toFixed(2)}`,
                formattedSubtotal: `£${(item.subtotal || 0).toFixed(2)}`
            }))
        };
    } catch (error) {
        console.error('Error formatting cart for checkout:', error);
        return {
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            itemCount: 0,
            formattedItems: []
        };
    }
};

// Backward compatibility - synchronous version (uses global state)
export const formatCartForCheckoutSync = () => {
    try {
        if (window.__CART_STATE__) {
            const items = window.__CART_STATE__.items || [];
            const subtotal = window.__CART_STATE__.total || 0;
            const tax = subtotal * 0.20;
            
            return {
                items,
                subtotal,
                tax,
                total: subtotal + tax,
                itemCount: window.__CART_STATE__.itemCount || 0,
                formattedItems: items.map(item => ({
                    ...item,
                    formattedPrice: `£${(item.price || 0).toFixed(2)}`,
                    formattedSubtotal: `£${(item.subtotal || 0).toFixed(2)}`
                }))
            };
        }
        
        return {
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            itemCount: 0,
            formattedItems: []
        };
    } catch (error) {
        console.error('Error formatting cart sync:', error);
        return {
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            itemCount: 0,
            formattedItems: []
        };
    }
};