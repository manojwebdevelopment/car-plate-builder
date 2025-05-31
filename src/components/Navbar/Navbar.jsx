import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Navbar = ({ cartItemCount = 0 }) => {
  const [showCoupon, setShowCoupon] = useState(true);

  return (
    <>
      {/* Top Promotional Banner */}
      {showCoupon && (
        <div className="alert alert-info text-center mb-0 py-2 position-relative" style={{ backgroundColor: '#4285f4', color: 'white', border: 'none' }}>
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
      <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ backgroundColor: '#ffc107', zIndex: 1050 }}>
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold" href="#" style={{ color: '#000', fontSize: '1.5rem' }}>
            <span style={{ border: '3px solid #000', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold' }}>
              CAR PLATES
            </span>
          </a>
          
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
                <ul className="dropdown-menu border-2 border-warning rounded-3 shadow-lg" style={{ backgroundColor: '#ffd43b' }}>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">4D Gel Plates</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">3D Plates</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Standard Plates</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Show Plates</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Custom Designs</a></li>
                </ul>
              </li>
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
                <ul className="dropdown-menu border-2 border-warning rounded-3 shadow-lg" style={{ backgroundColor: '#ffd43b' }}>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Standard (520x111mm)</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Square (279x203mm)</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Motorcycle (229x164mm)</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Mini (285x201mm)</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Custom Size</a></li>
                </ul>
              </li>
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
                <ul className="dropdown-menu border-2 border-warning rounded-3 shadow-lg" style={{ backgroundColor: '#ffd43b' }}>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Screw Caps</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Frames & Surrounds</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Fixings & Screws</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Racing Kit</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Tools</a></li>
                </ul>
              </li>
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
                <ul className="dropdown-menu border-2 border-warning rounded-3 shadow-lg" style={{ backgroundColor: '#ffd43b' }}>
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
            
            <ul className="navbar-nav ms-auto">
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
                <ul className="dropdown-menu dropdown-menu-end border-2 border-warning rounded-3 shadow-lg" style={{ backgroundColor: '#ffd43b' }}>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Login</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Register</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">My Account</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">My Orders</a></li>
                  <li><a className="dropdown-item fw-semibold text-dark py-2 px-3 hover-bg-warning rounded" href="#">Wishlist</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold text-dark position-relative px-3 py-2 rounded hover-bg-warning" href="#">
                  🛒 BASKET
                  {cartItemCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                      {cartItemCount}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;