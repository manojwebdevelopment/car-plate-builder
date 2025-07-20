import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    loading, 
    syncPending, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartItemCount 
  } = useCart();

  // Calculate totals
  const subtotal = getCartTotal();
  const taxRate = 0.18; // 18% GST for India
  const tax = subtotal * taxRate;
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/platebuilder');
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <i className="bi bi-cart-x display-1 text-warning mb-3"></i>
                <h3 className="text-dark mb-3">Your Cart is Empty</h3>
                <p className="text-muted mb-4">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <button 
                  className="btn btn-warning btn-lg"
                  onClick={handleContinueShopping}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Sync Status Indicator */}
      {syncPending && (
        <div className="alert alert-info d-flex align-items-center mb-4">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>Syncing your cart...</span>
        </div>
      )}

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h4 className="mb-0">
                <i className="bi bi-cart-fill me-2"></i>
                Your Cart ({getCartItemCount()} items)
              </h4>
            </div>
            <div className="card-body">
              {cart.map((item, index) => (
                <div key={item.id || index} className="row align-items-center border-bottom py-3">
                  <div className="col-md-2">
                    <div className="bg-light rounded p-3 text-center">
                      <i className="bi bi-card-text display-6 text-warning"></i>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold text-dark">{item.name}</h6>
                    <p className="text-muted small mb-1">
                      <strong>Registration:</strong> {item.registration || 'N/A'}
                    </p>
                    <p className="text-muted small mb-1">
                      <strong>Side:</strong> {item.side || 'Front'}
                    </p>
                    <p className="text-muted small mb-0">
                      <strong>Style:</strong> {item.styleLabel || 'Standard'}
                    </p>
                  </div>
                  <div className="col-md-2 text-center">
                    <div className="input-group input-group-sm">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || syncPending}
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control text-center" 
                        value={item.quantity}
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={syncPending}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <span className="fw-bold text-success">
                      £{item.price?.toFixed(2)}
                    </span>
                  </div>
                  <div className="col-md-2 text-center">
                    <span className="fw-bold text-dark">
                      £{(item.price * item.quantity)?.toFixed(2)}
                    </span>
                    <br />
                    <button 
                      className="btn btn-sm btn-outline-danger mt-1"
                      onClick={() => removeFromCart(item.id)}
                      disabled={syncPending}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="pt-3">
                <button 
                  className="btn btn-outline-warning"
                  onClick={handleContinueShopping}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Order Summary
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({getCartItemCount()} items):</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>GST (18%):</span>
                <span>£{tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold fs-5">Total:</span>
                <span className="fw-bold fs-5 text-success">£{total.toFixed(2)}</span>
              </div>
              
              {/* Checkout Button */}
              <button 
                className="btn btn-warning btn-lg w-100 mb-3"
                onClick={handleCheckout}
                disabled={syncPending}
              >
                <i className="bi bi-credit-card me-2"></i>
                {syncPending ? 'Syncing...' : 'Proceed to Checkout'}
              </button>
              
              {/* Security & Trust Badges */}
              <div className="text-center">
                <div className="row g-2 mb-3">
                  <div className="col-4">
                    <div className="badge bg-success w-100 py-2">
                      <i className="bi bi-shield-check"></i><br />
                      <small>Secure</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="badge bg-info w-100 py-2">
                      <i className="bi bi-truck"></i><br />
                      <small>Fast Ship</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="badge bg-warning text-dark w-100 py-2">
                      <i className="bi bi-award"></i><br />
                      <small>Quality</small>
                    </div>
                  </div>
                </div>
                
                <p className="small text-muted mb-0">
                  <i className="bi bi-lock-fill me-1"></i>
                  Your payment information is processed securely via PayPal
                </p>
              </div>
            </div>
          </div>
          
          {/* Estimated Delivery */}
          <div className="card border-0 shadow-sm mt-3">
            <div className="card-body text-center">
              <h6 className="text-warning">
                <i className="bi bi-calendar-check me-2"></i>
                Estimated Delivery
              </h6>
              <p className="mb-0 fw-bold text-dark">
                5-7 Business Days
              </p>
              <small className="text-muted">
                Free standard shipping included
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;