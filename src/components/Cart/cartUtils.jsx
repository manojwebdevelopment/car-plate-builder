// cartUtils.js - Cart management functions using localStorage

// Get cart items from localStorage
export const getCartItems = () => {
    try {
        const cartData = localStorage.getItem('plateCart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return [];
    }
};

// Save cart items to localStorage
export const saveCartItems = (items) => {
    try {
        localStorage.setItem('plateCart', JSON.stringify(items));
        return true;
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
        return false;
    }
};

// Add item to cart
export const addToCart = (plateData) => {
    try {
        const currentCart = getCartItems();
        
        // Create plate item
        const plateItem = {
            id: `plate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'plate',
            name: `${plateData.styleLabel} ${plateData.thickness} Acrylic Plates`,
            side: plateData.plateType.toUpperCase(),
            registration: plateData.text,
            roadLegal: plateData.roadLegal || 'No',
            size: plateData.sizeLabel || 'Standard Oblong',
            plateStyle: plateData.plateStyle,
            thickness: plateData.thickness,
            fontColor: plateData.fontColor,
            shadowEffect: plateData.shadowEffect,
            borderStyle: plateData.borderStyle,
            countryBadge: plateData.countryBadge,
            selectedCountry: plateData.selectedCountry,
            badgePosition: plateData.badgePosition,
            customTextColor: plateData.customTextColor,
            outlineColor: plateData.outlineColor,
            selectedSize: plateData.selectedSize,
            price: plateData.price,
            quantity: plateData.quantity,
            subtotal: plateData.price * plateData.quantity,
            addedAt: new Date().toISOString()
        };

        // Add the plate to cart
        const updatedCart = [...currentCart, plateItem];
        
        // Check if fixing kit already exists
        const hasFixingKit = currentCart.some(item => item.type === 'fixing-kit');
        
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
            updatedCart.push(fixingKit);
        }

        // Save to localStorage
        const saved = saveCartItems(updatedCart);
        
        if (saved) {
            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { items: updatedCart, action: 'add', newItem: plateItem }
            }));
            return { success: true, cartItems: updatedCart };
        } else {
            throw new Error('Failed to save to localStorage');
        }
        
    } catch (error) {
        console.error('Error adding to cart:', error);
        return { success: false, error: error.message };
    }
};

// Remove item from cart
export const removeFromCart = (itemId) => {
    try {
        const currentCart = getCartItems();
        const item = currentCart.find(item => item.id === itemId);
        
        // Prevent removal of fixing kit
        if (item && item.type === 'fixing-kit') {
            return { success: false, error: 'Fixing kit cannot be removed from cart' };
        }
        
        const updatedCart = currentCart.filter(item => item.id !== itemId);
        
        const saved = saveCartItems(updatedCart);
        
        if (saved) {
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { items: updatedCart, action: 'remove', itemId }
            }));
            return { success: true, cartItems: updatedCart };
        } else {
            throw new Error('Failed to save to localStorage');
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        return { success: false, error: error.message };
    }
};

// Update item quantity
export const updateCartItemQuantity = (itemId, newQuantity) => {
    try {
        const currentCart = getCartItems();
        const item = currentCart.find(item => item.id === itemId);
        
        // Prevent quantity changes for fixing kit
        if (item && item.type === 'fixing-kit') {
            return { success: false, error: 'Fixing kit quantity cannot be changed' };
        }
        
        if (newQuantity <= 0) {
            return removeFromCart(itemId);
        }
        
        const updatedCart = currentCart.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    quantity: newQuantity,
                    subtotal: item.price * newQuantity
                };
            }
            return item;
        });
        
        const saved = saveCartItems(updatedCart);
        
        if (saved) {
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { items: updatedCart, action: 'update', itemId, newQuantity }
            }));
            return { success: true, cartItems: updatedCart };
        } else {
            throw new Error('Failed to save to localStorage');
        }
    } catch (error) {
        console.error('Error updating cart item:', error);
        return { success: false, error: error.message };
    }
};

// Clear entire cart
export const clearCart = () => {
    try {
        localStorage.removeItem('plateCart');
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { items: [], action: 'clear' }
        }));
        return { success: true, cartItems: [] };
    } catch (error) {
        console.error('Error clearing cart:', error);
        return { success: false, error: error.message };
    }
};

// Get cart item count
export const getCartItemCount = () => {
    const items = getCartItems();
    return items.reduce((count, item) => count + item.quantity, 0);
};

// Get cart total
export const getCartTotal = () => {
    const items = getCartItems();
    return items.reduce((total, item) => total + item.subtotal, 0);
};

// Format cart data for checkout
export const formatCartForCheckout = () => {
    const items = getCartItems();
    const subtotal = getCartTotal();
    const tax = subtotal * 0.20; // 20% VAT
    
    return {
        items,
        subtotal,
        tax,
        total: subtotal + tax,
        itemCount: getCartItemCount(),
        formattedItems: items.map(item => ({
            ...item,
            formattedPrice: `£${item.price.toFixed(2)}`,
            formattedSubtotal: `£${item.subtotal.toFixed(2)}`
        }))
    };
};