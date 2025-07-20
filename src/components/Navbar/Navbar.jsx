// components/Navbar/Navbar.js - Complete Navbar with Cart Integration
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCartItemCount } from '../Cart/cartUtils'; // Import our cart utilities


const Navbar = () => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  // Load cart count on component mount and listen for updates
  useEffect(() => {
    // Initial load of cart count
    updateCartCount();
    
    // Listen for cart updates from localStorage
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    // Listen for custom cart update events
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Listen for localStorage changes (for cross-tab updates)
    window.addEventListener('storage', (e) => {
      if (e.key === 'plateCart') {
        updateCartCount();
      }
    });
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const updateCartCount = () => {
    try {
      const count = getCartItemCount();
      setCartItemCount(count);
    } catch (error) {
      console.error('Error updating cart count:', error);
      setCartItemCount(0);
    }
  };

  const handleCartClick = () => {
    navigate('/basket');
  };

  const handleShopNowClick = () => {
    navigate('/platebuilder');
  };

  return (
    <>
      {/* Top Promotional Banner */}
      {false && showCoupon && (
        <div className="alert text-center mb-0 py-3 position-relative promotional-banner">
          <div className="container">
            <strong>GET 15% OFF & FREE SHIPPING | USE CODE 'Save15'</strong>
            <button 
              className="btn btn-sm ms-3 btn-shop-now"
              onClick={handleShopNowClick}
            >
              SHOP NOW
            </button>
            <button 
              type="button" 
              className="btn-close position-absolute end-0 top-50 translate-middle-y me-3 close-btn-custom" 
              aria-label="Close"
              onClick={() => setShowCoupon(false)}
            ></button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <nav className="navbar navbar-expand-lg sticky-top navbar-custom">
        <div className="container-fluid px-4">
          {/* Brand */}
          <Link className="navbar-brand navbar-brand-custom" to="/">
            CAR PLATES
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler navbar-toggler-custom" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon navbar-toggler-icon-custom"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Main Navigation */}
            <ul className="navbar-nav me-auto ms-lg-4">
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/platebuilder">
                  PLATE BUILDER
                </Link>
              </li>
              
              {/* Plate Styles Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle nav-link-custom" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  PLATE STYLES
                </a>
                <ul className="dropdown-menu dropdown-menu-custom">
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?style=4d-gel">4D Gel Plates</Link></li>
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?style=3d">3D Plates</Link></li>
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?style=standard">Standard Plates</Link></li>
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?style=show">Show Plates</Link></li>
                  <li><hr className="dropdown-divider dropdown-divider-custom" /></li>
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?style=custom">Custom Designs</Link></li>
                </ul>
              </li>

              {/* Plate Sizes Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle nav-link-custom" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  PLATE SIZES
                </a>
                <ul className="dropdown-menu dropdown-menu-custom">
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?size=standard">Standard (520x111mm)</Link></li>
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?size=square">Square (279x203mm)</Link></li>
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?size=motorcycle">Motorcycle (229x164mm)</Link></li>
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?size=mini">Mini (285x201mm)</Link></li>
                  <li><hr className="dropdown-divider dropdown-divider-custom" /></li>
                  <li><Link className="dropdown-item dropdown-item-custom" to="/plate-builder?size=custom">Custom Size</Link></li>
                </ul>
              </li>

              {/* Accessories Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle nav-link-custom" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  ACCESSORIES
                </a>
                <ul className="dropdown-menu dropdown-menu-custom">
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Screw Caps</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Frames & Surrounds</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Fixings & Screws</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Racing Kit</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Tools</a></li>
                </ul>
              </li>

              {/* Help Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle nav-link-custom" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  HELP
                </a>
                <ul className="dropdown-menu dropdown-menu-custom">
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Contact Us</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">FAQ</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Size Guide</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Legal Requirements</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Returns & Refunds</a></li>
                  <li><hr className="dropdown-divider dropdown-divider-custom" /></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Track Order</a></li>
                </ul>
              </li>
            </ul>
            
            {/* Right Side Navigation */}
            <ul className="navbar-nav ms-auto">
              {/* Account Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle nav-link-custom" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  ACCOUNT
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-custom">
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Login</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Register</a></li>
                  <li><hr className="dropdown-divider dropdown-divider-custom" /></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">My Account</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">My Orders</a></li>
                  <li><a className="dropdown-item dropdown-item-custom" href="#">Wishlist</a></li>
                </ul>
              </li>

              {/* Cart/Basket with Live Count */}
              <li className="nav-item">
                <button 
                  className="nav-link nav-link-custom position-relative btn border-0 bg-transparent d-flex align-items-center"
                  onClick={handleCartClick}
                  style={{ cursor: 'pointer' }}
                  title={`View basket (${cartItemCount} items)`}
                >
                  <span className="me-2">🛒</span>
                  <span className="d-none d-md-inline">BASKET</span>
                  <span className="d-inline d-md-none">CART</span>
                  
                  {/* Cart Count Badge */}
                  {cartItemCount > 0 && (
                    <span 
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-badge-custom"
                      style={{ zIndex: 1 }}
                    >
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                  
                  {/* Empty Cart Indicator */}
                  {cartItemCount === 0 && (
                    <span 
                      className="position-absolute top-0 start-100 translate-middle cart-empty-indicator"
                      style={{ fontSize: '0' }}
                    >
                      <span className="visually-hidden">cart is empty</span>
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;