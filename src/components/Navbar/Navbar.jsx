// components/Navbar/Navbar.js - Complete Navbar with Cart Integration
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
// import CartModal from '../Cart/CartModal';

const Navbar = () => {
  const [showCoupon, setShowCoupon] = useState(true);
  const [showCartModal, setShowCartModal] = useState(false);
  const { getTotalItems } = useCart();

  const totalItems = getTotalItems();

  const handleCartClick = () => {
    setShowCartModal(true);
  };

  const handleCloseCart = () => {
    setShowCartModal(false);
  };

  return (
    <>
      {/* Top Promotional Banner */}
      {showCoupon && (
        <div className="alert alert-info text-center mb-0 py-2 position-relative" 
             style={{ backgroundColor: '#4285f4', color: 'white', border: 'none' }}>
          <div className="container">
            <strong>GET 15% OFF & FREE SHIPPING | USE CODE 'Save15'</strong>
            <button className="btn btn-warning btn-sm ms-3 fw-bold">SHOP NOW</button>
            <button 
              type="button" 
              className="btn-close btn-close-white position-absolute end-0 top-50 translate-middle-y me-3" 
              aria-label="Close"
              onClick={() => setShowCoupon(false)}
            ></button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <nav className="navbar navbar-expand-lg sticky-top shadow-sm" 
           style={{ backgroundColor: '#ffc107', zIndex: 1050 }}>
        <div className="container-fluid px-4">
          {/* Brand */}
          <Link className="navbar-brand fw-bold" to="/" style={{ color: '#000', fontSize: '1.5rem' }}>
            <span style={{ 
              border: '3px solid #000', 
              padding: '8px 12px', 
              borderRadius: '8px', 
              fontWeight: 'bold' 
            }}>
              CAR PLATES
            </span>
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler border-0 shadow-none" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            style={{ color: '#000' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Main Navigation */}
            <ul className="navbar-nav me-auto ms-lg-4">
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark px-3 py-2 rounded hover-bg-warning" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark px-3 py-2 rounded hover-bg-warning" to="/platebuilder">
                  PLATE BUILDER
                </Link>
              </li>
              
              {/* Plate Styles Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle fw-semibold text-dark px-3 py-2 rounded hover-bg-warning" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  PLATE STYLES
                </a>
                <ul className="dropdown-menu border-2 border-warning rounded-3 shadow-lg" 
                    style={{ backgroundColor: '#ffd43b' }}>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">4D Gel Plates</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">3D Plates</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Standard Plates</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Show Plates</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Custom Designs</a></li>
                </ul>
              </li>

              {/* Plate Sizes Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle fw-semibold text-dark px-3 py-2 rounded hover-bg-warning" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  PLATE SIZES
                </a>
                <ul className="dropdown-menu border-2 border-warning rounded-3 shadow-lg" 
                    style={{ backgroundColor: '#ffd43b' }}>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Standard (520x111mm)</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Square (279x203mm)</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Motorcycle (229x164mm)</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Mini (285x201mm)</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Custom Size</a></li>
                </ul>
              </li>

              {/* Accessories Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle fw-semibold text-dark px-3 py-2 rounded hover-bg-warning" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  ACCESSORIES
                </a>
                <ul className="dropdown-menu border-2 border-warning rounded-3 shadow-lg" 
                    style={{ backgroundColor: '#ffd43b' }}>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Screw Caps</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Frames & Surrounds</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Fixings & Screws</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Racing Kit</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Tools</a></li>
                </ul>
              </li>

              {/* Help Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle fw-semibold text-dark px-3 py-2 rounded hover-bg-warning" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  HELP
                </a>
                <ul className="dropdown-menu border-2 border-warning rounded-3 shadow-lg" 
                    style={{ backgroundColor: '#ffd43b' }}>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Contact Us</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">FAQ</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Size Guide</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Legal Requirements</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Returns & Refunds</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Track Order</a></li>
                </ul>
              </li>
            </ul>
            
            {/* Right Side Navigation */}
            <ul className="navbar-nav ms-auto">
              {/* Account Dropdown */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle fw-semibold text-dark px-3 py-2 rounded hover-bg-warning" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  ACCOUNT
                </a>
                <ul className="dropdown-menu dropdown-menu-end border-2 border-warning rounded-3 shadow-lg" 
                    style={{ backgroundColor: '#ffd43b' }}>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Login</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Register</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">My Account</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">My Orders</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Wishlist</a></li>
                </ul>
              </li>

              {/* Cart/Basket */}
              <li className="nav-item">
                <button 
                  className="nav-link fw-semibold text-dark position-relative px-3 py-2 rounded hover-bg-warning btn border-0 bg-transparent"
                  onClick={handleCartClick}
                  style={{ cursor: 'pointer' }}
                >
                  🛒 BASKET
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                      {totalItems}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Cart Modal */}
      {showCartModal && (
        <CartModal onClose={handleCloseCart} />
      )}

      {/* Custom CSS for hover effects */}
      <style jsx>{`
        .hover-bg-warning:hover {
          background-color: rgba(255, 193, 7, 0.2) !important;
        }
        
        .navbar-nav .nav-link {
          transition: all 0.3s ease;
        }
        
        .dropdown-menu {
          animation: fadeIn 0.2s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .badge {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default Navbar;