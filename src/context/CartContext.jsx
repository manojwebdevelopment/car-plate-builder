// // context/CartContext.js - Complete Cart Context
// import React, { createContext, useContext, useReducer, useEffect } from 'react';

// // Cart Context
// const CartContext = createContext();

// // Cart Actions
// export const CART_ACTIONS = {
//   ADD_ITEM: 'ADD_ITEM',
//   UPDATE_QUANTITY: 'UPDATE_QUANTITY',
//   REMOVE_ITEM: 'REMOVE_ITEM',
//   CLEAR_CART: 'CLEAR_CART',
//   TOGGLE_SELECT: 'TOGGLE_SELECT',
//   SELECT_ALL: 'SELECT_ALL',
//   DESELECT_ALL: 'DESELECT_ALL',
//   SET_CART_OPEN: 'SET_CART_OPEN'
// };

// // Cart Reducer
// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case CART_ACTIONS.ADD_ITEM:
//       const existingItemIndex = state.items.findIndex(item => 
//         item.id === action.payload.id
//       );
      
//       if (existingItemIndex >= 0) {
//         const updatedItems = [...state.items];
//         updatedItems[existingItemIndex].quantity += action.payload.quantity;
//         return { ...state, items: updatedItems };
//       }
      
//       return {
//         ...state,
//         items: [...state.items, { ...action.payload, selected: true }]
//       };

//     case CART_ACTIONS.UPDATE_QUANTITY:
//       return {
//         ...state,
//         items: state.items.map(item =>
//           item.id === action.payload.id
//             ? { ...item, quantity: Math.max(0, action.payload.quantity) }
//             : item
//         ).filter(item => item.quantity > 0)
//       };

//     case CART_ACTIONS.REMOVE_ITEM:
//       return {
//         ...state,
//         items: state.items.filter(item => item.id !== action.payload)
//       };

//     case CART_ACTIONS.TOGGLE_SELECT:
//       return {
//         ...state,
//         items: state.items.map(item =>
//           item.id === action.payload
//             ? { ...item, selected: !item.selected }
//             : item
//         )
//       };

//     case CART_ACTIONS.SELECT_ALL:
//       return {
//         ...state,
//         items: state.items.map(item => ({ ...item, selected: true }))
//       };

//     case CART_ACTIONS.DESELECT_ALL:
//       return {
//         ...state,
//         items: state.items.map(item => ({ ...item, selected: false }))
//       };

//     case CART_ACTIONS.CLEAR_CART:
//       return { ...state, items: [] };

//     case CART_ACTIONS.SET_CART_OPEN:
//       return { ...state, isOpen: action.payload };

//     default:
//       return state;
//   }
// };

// // Initial state
// const initialState = {
//   items: [],
//   isOpen: false
// };

// // Cart Provider Component
// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem('plateBuilderCart');
//     if (savedCart) {
//       try {
//         const cartData = JSON.parse(savedCart);
//         if (cartData.items && Array.isArray(cartData.items)) {
//           cartData.items.forEach(item => {
//             dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
//           });
//         }
//       } catch (error) {
//         console.error('Error loading cart from localStorage:', error);
//       }
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('plateBuilderCart', JSON.stringify(state));
//   }, [state]);

//   // Cart functions
//   const addToCart = (plateData) => {
//     const cartItem = {
//       id: `${plateData.text}-${plateData.plateStyle}-${plateData.selectedSize}-${plateData.plateType}-${Date.now()}`,
//       text: plateData.text,
//       plateStyle: plateData.plateStyle,
//       selectedSize: plateData.selectedSize,
//       plateType: plateData.plateType,
//       thickness: plateData.thickness,
//       fontColor: plateData.fontColor,
//       shadowEffect: plateData.shadowEffect,
//       borderStyle: plateData.borderStyle,
//       countryBadge: plateData.countryBadge,
//       selectedCountry: plateData.selectedCountry,
//       badgePosition: plateData.badgePosition,
//       badgeBorderColor: plateData.badgeBorderColor,
//       customFlagText: plateData.customFlagText,
//       customFlagImage: plateData.customFlagImage,
//       customTextColor: plateData.customTextColor,
//       outlineColor: plateData.outlineColor,
//       spacing: plateData.spacing,
//       price: plateData.price || 25.99,
//       quantity: plateData.quantity || 1,
//       addedAt: new Date().toISOString(),
//       selected: true
//     };
    
//     dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: cartItem });
//   };

//   const updateQuantity = (id, quantity) => {
//     dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
//   };

//   const removeItem = (id) => {
//     dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });
//   };

//   const toggleSelect = (id) => {
//     dispatch({ type: CART_ACTIONS.TOGGLE_SELECT, payload: id });
//   };

//   const selectAll = () => {
//     dispatch({ type: CART_ACTIONS.SELECT_ALL });
//   };

//   const deselectAll = () => {
//     dispatch({ type: CART_ACTIONS.DESELECT_ALL });
//   };

//   const clearCart = () => {
//     dispatch({ type: CART_ACTIONS.CLEAR_CART });
//   };

//   const setCartOpen = (isOpen) => {
//     dispatch({ type: CART_ACTIONS.SET_CART_OPEN, payload: isOpen });
//   };

//   const getTotalItems = () => {
//     return state.items.reduce((total, item) => total + item.quantity, 0);
//   };

//   const getSelectedItems = () => {
//     return state.items.filter(item => item.selected);
//   };

//   const getSelectedTotal = () => {
//     return getSelectedItems().reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const getTotalValue = () => {
//     return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const value = {
//     ...state,
//     addToCart,
//     updateQuantity,
//     removeItem,
//     toggleSelect,
//     selectAll,
//     deselectAll,
//     clearCart,
//     setCartOpen,
//     getTotalItems,
//     getSelectedItems,
//     getSelectedTotal,
//     getTotalValue
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// // Cart Hook
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export default CartContext;


// Enhanced Cart Context - Update your CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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

  // Define storage key
  const CART_STORAGE_KEY = 'plateCart';

  // Load cart from localStorage
  const loadCartFromStorage = useCallback(() => {
    try {
      console.log('🔄 Loading cart from storage...');
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      console.log('📦 Raw data from localStorage:', savedCart);
      
      if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
        const parsedCart = JSON.parse(savedCart);
        console.log('✅ Parsed cart data:', parsedCart);
        console.log('📊 Cart type:', typeof parsedCart, 'Is array:', Array.isArray(parsedCart));
        
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          console.log(`🛒 Setting cart with ${parsedCart.length} items`);
          setCart(parsedCart);
          setLoading(false);
          setInitialized(true);
          return parsedCart;
        } else if (Array.isArray(parsedCart) && parsedCart.length === 0) {
          console.log('📋 Empty cart array found');
          setCart([]);
          setLoading(false);
          setInitialized(true);
          return [];
        } else {
          console.error('❌ Invalid cart data structure:', parsedCart);
          setCart([]);
          setLoading(false);
          setInitialized(true);
          return [];
        }
      } else {
        console.log('🆕 No cart data found, initializing empty cart');
        setCart([]);
        setLoading(false);
        setInitialized(true);
        return [];
      }
    } catch (error) {
      console.error('💥 Error loading cart from localStorage:', error);
      setCart([]);
      setLoading(false);
      setInitialized(true);
      return [];
    }
  }, [CART_STORAGE_KEY]);

  // Save cart to localStorage
  const saveCartToStorage = useCallback((cartData) => {
    try {
      console.log('💾 Saving cart to storage:', cartData);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
      console.log('✅ Cart saved successfully');
    } catch (error) {
      console.error('💥 Error saving cart to localStorage:', error);
    }
  }, [CART_STORAGE_KEY]);

  // Initialize cart on component mount
  useEffect(() => {
    console.log('🚀 CartProvider initializing...');
    loadCartFromStorage();
  }, [loadCartFromStorage]);

  // Save cart whenever it changes (but not on initial load)
  useEffect(() => {
    if (initialized) {
      console.log('🔄 Cart changed, saving to storage...');
      saveCartToStorage(cart);
    }
  }, [cart, initialized, saveCartToStorage]);

  // Add item to cart
  const addToCart = useCallback((item) => {
    try {
      console.log('➕ Adding item to cart:', item);
      
      // Create enhanced item with all required fields
      const enhancedItem = {
        id: item.id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: item.name || `${item.registration || 'Custom'} Number Plate`,
        type: item.type || 'plate',
        price: parseFloat(item.price) || 0,
        quantity: parseInt(item.quantity) || 1,
        subtotal: parseFloat(item.subtotal) || (parseFloat(item.price) * parseInt(item.quantity)),
        
        // Plate configuration data
        registration: item.registration || item.text || '',
        side: item.side || 'front',
        roadLegal: item.roadLegal || 'No',
        spacing: item.spacing || 'legal',
        
        // Style data
        plateStyle: item.plateStyle || 'standard',
        styleLabel: item.styleLabel || 'Standard Plate',
        stylePrice: parseFloat(item.stylePrice) || 0,
        
        // Size data
        size: item.size || 'standard',
        sizeLabel: item.sizeLabel || 'Standard Size',
        sizeDimensions: item.sizeDimensions || '520mm x 111mm',
        sizePrice: parseFloat(item.sizePrice) || 0,
        
        // Color data
        fontColor: item.fontColor || '#000000',
        fontColorName: item.fontColorName || 'Black',
        fontColorPrice: parseFloat(item.fontColorPrice) || 0,
        customTextColor: item.customTextColor,
        
        // Border data
        borderStyle: item.borderStyle || 'none',
        borderName: item.borderName || 'No Border',
        borderType: item.borderType || 'none',
        borderColor: item.borderColor || '',
        borderWidth: parseFloat(item.borderWidth) || 0,
        borderPrice: parseFloat(item.borderPrice) || 0,
        
        // Badge data
        countryBadge: item.countryBadge || 'none',
        selectedCountry: item.selectedCountry || 'uk',
        badgeName: item.badgeName || 'No Badge',
        badgePosition: item.badgePosition || 'left',
        flagImage: item.flagImage || '',
        badgePrice: parseFloat(item.badgePrice) || 0,
        
        // Finish data
        finish: item.finish || 'standard',
        finishLabel: item.finishLabel || 'Standard Finish',
        finishDescription: item.finishDescription || '',
        finishPrice: parseFloat(item.finishPrice) || 0,
        
        // Thickness data
        thickness: item.thickness || '3mm',
        thicknessLabel: item.thicknessLabel || '3mm Standard',
        thicknessValue: parseFloat(item.thicknessValue) || 3,
        thicknessPrice: parseFloat(item.thicknessPrice) || 0,
        
        // Shadow effect data
        shadowEffect: item.shadowEffect || 'none',
        shadowName: item.shadowName || 'No Effect',
        shadowDescription: item.shadowDescription || '',
        shadowPrice: parseFloat(item.shadowPrice) || 0,
        
        // Additional fields
        displayText: item.displayText || item.registration || item.text,
        font: item.font || 'Charles Wright',
        fontSize: parseFloat(item.fontSize) || 79,
        
        // Timestamps
        addedAt: new Date().toISOString()
      };

      setCart(prevCart => {
        // Check if item already exists (same registration and side)
        const existingIndex = prevCart.findIndex(
          cartItem => 
            cartItem.registration === enhancedItem.registration && 
            cartItem.side === enhancedItem.side
        );

        let newCart;
        if (existingIndex >= 0) {
          // Update existing item
          newCart = [...prevCart];
          newCart[existingIndex] = {
            ...newCart[existingIndex],
            ...enhancedItem,
            quantity: newCart[existingIndex].quantity + enhancedItem.quantity,
            subtotal: (newCart[existingIndex].quantity + enhancedItem.quantity) * enhancedItem.price
          };
        } else {
          // Add new item
          newCart = [...prevCart, enhancedItem];
        }

        console.log('✅ Cart updated, new cart:', newCart);
        return newCart;
      });

      console.log('✅ Item added to cart successfully');
      return { success: true, message: 'Item added to cart successfully!' };

    } catch (error) {
      console.error('💥 Error adding item to cart:', error);
      return { success: false, error: 'Failed to add item to cart' };
    }
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((itemId) => {
    console.log('🗑️ Removing item from cart:', itemId);
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== itemId);
      console.log('✅ Item removed, new cart:', newCart);
      return newCart;
    });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId, newQuantity) => {
    console.log('🔢 Updating quantity for item:', itemId, 'to:', newQuantity);
    
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: item.price * newQuantity
            }
          : item
      );
      console.log('✅ Quantity updated, new cart:', newCart);
      return newCart;
    });
  }, [removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    console.log('🧹 Clearing cart');
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem('cart'); // Also remove old key for safety
    console.log('✅ Cart cleared');
  }, [CART_STORAGE_KEY]);

  // Get cart total
  const getCartTotal = useCallback(() => {
    const total = cart.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    console.log('💰 Cart total calculated:', total);
    return total;
  }, [cart]);

  // Get cart item count
  const getCartItemCount = useCallback(() => {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    console.log('📊 Cart item count:', count);
    return count;
  }, [cart]);

  // Store additional order data for payment processing
  const storeOrderData = useCallback((customerInfo, shippingAddress, pricing) => {
    try {
      console.log('💾 Storing order data for payment processing');
      localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
      localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
      localStorage.setItem('pricingInfo', JSON.stringify(pricing));
      
      // Also store a snapshot of current cart items for payment processing
      localStorage.setItem('lastOrderData', JSON.stringify({
        items: cart,
        customerInfo,
        shippingAddress,
        pricing,
        timestamp: new Date().toISOString()
      }));
      
      console.log('✅ Order data stored successfully');
    } catch (error) {
      console.error('💥 Error storing order data:', error);
    }
  }, [cart]);

  // Force reload cart from storage (for debugging)
  const reloadCart = useCallback(() => {
    console.log('🔄 Force reloading cart...');
    setInitialized(false);
    setLoading(true);
    loadCartFromStorage();
  }, [loadCartFromStorage]);

  // Debug cart state
  const debugCart = useCallback(() => {
    console.log('🔍 === CART DEBUG INFO ===');
    console.log('Cart state:', cart);
    console.log('Cart length:', cart.length);
    console.log('Initialized:', initialized);
    console.log('Loading:', loading);
    console.log('Storage key:', CART_STORAGE_KEY);
    console.log('Raw storage data:', localStorage.getItem(CART_STORAGE_KEY));
    console.log('Cart total:', getCartTotal());
    console.log('Cart count:', getCartItemCount());
    console.log('========================');
  }, [cart, initialized, loading, CART_STORAGE_KEY, getCartTotal, getCartItemCount]);

  const value = {
    cart,
    loading,
    initialized,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    storeOrderData,
    reloadCart,
    debugCart
  };

  // Debug on every render
  console.log('🔄 CartProvider render - Cart length:', cart.length, 'Initialized:', initialized);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};