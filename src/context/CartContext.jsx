// context/CartContext.js - Complete Cart Context
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Cart Actions
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_SELECT: 'TOGGLE_SELECT',
  SELECT_ALL: 'SELECT_ALL',
  DESELECT_ALL: 'DESELECT_ALL',
  SET_CART_OPEN: 'SET_CART_OPEN'
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItemIndex = state.items.findIndex(item => 
        item.id === action.payload.id
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, selected: true }]
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case CART_ACTIONS.TOGGLE_SELECT:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, selected: !item.selected }
            : item
        )
      };

    case CART_ACTIONS.SELECT_ALL:
      return {
        ...state,
        items: state.items.map(item => ({ ...item, selected: true }))
      };

    case CART_ACTIONS.DESELECT_ALL:
      return {
        ...state,
        items: state.items.map(item => ({ ...item, selected: false }))
      };

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };

    case CART_ACTIONS.SET_CART_OPEN:
      return { ...state, isOpen: action.payload };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  isOpen: false
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('plateBuilderCart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        if (cartData.items && Array.isArray(cartData.items)) {
          cartData.items.forEach(item => {
            dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
          });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('plateBuilderCart', JSON.stringify(state));
  }, [state]);

  // Cart functions
  const addToCart = (plateData) => {
    const cartItem = {
      id: `${plateData.text}-${plateData.plateStyle}-${plateData.selectedSize}-${plateData.plateType}-${Date.now()}`,
      text: plateData.text,
      plateStyle: plateData.plateStyle,
      selectedSize: plateData.selectedSize,
      plateType: plateData.plateType,
      thickness: plateData.thickness,
      fontColor: plateData.fontColor,
      shadowEffect: plateData.shadowEffect,
      borderStyle: plateData.borderStyle,
      countryBadge: plateData.countryBadge,
      selectedCountry: plateData.selectedCountry,
      badgePosition: plateData.badgePosition,
      badgeBorderColor: plateData.badgeBorderColor,
      customFlagText: plateData.customFlagText,
      customFlagImage: plateData.customFlagImage,
      customTextColor: plateData.customTextColor,
      outlineColor: plateData.outlineColor,
      spacing: plateData.spacing,
      price: plateData.price || 25.99,
      quantity: plateData.quantity || 1,
      addedAt: new Date().toISOString(),
      selected: true
    };
    
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: cartItem });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });
  };

  const toggleSelect = (id) => {
    dispatch({ type: CART_ACTIONS.TOGGLE_SELECT, payload: id });
  };

  const selectAll = () => {
    dispatch({ type: CART_ACTIONS.SELECT_ALL });
  };

  const deselectAll = () => {
    dispatch({ type: CART_ACTIONS.DESELECT_ALL });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const setCartOpen = (isOpen) => {
    dispatch({ type: CART_ACTIONS.SET_CART_OPEN, payload: isOpen });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSelectedItems = () => {
    return state.items.filter(item => item.selected);
  };

  const getSelectedTotal = () => {
    return getSelectedItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalValue = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeItem,
    toggleSelect,
    selectAll,
    deselectAll,
    clearCart,
    setCartOpen,
    getTotalItems,
    getSelectedItems,
    getSelectedTotal,
    getTotalValue
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Cart Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;