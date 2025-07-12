// // src/components/Navbar/AuthNavbar.jsx - Updated Navbar with Authentication
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { getCartItemCount } from '../Cart/cartUtils';
// import { useCart } from '../../context/CartContext';

// const AuthNavbar = () => {
//   const [showCoupon, setShowCoupon] = useState(true);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   // Load cart count on component mount and listen for updates
//   useEffect(() => {
//     updateCartCount();
    
//     const handleCartUpdate = () => {
//       updateCartCount();
//     };
    
//     window.addEventListener('cartUpdated', handleCartUpdate);
//     window.addEventListener('storage', (e) => {
//       if (e.key === 'plateCart') {
//         updateCartCount();
//       }
//     });
    
//     return () => {
//       window.removeEventListener('cartUpdated', handleCartUpdate);
//       window.removeEventListener('storage', handleCartUpdate);
//     };
//   }, []);

//   const updateCartCount = () => {
//     try {
//       const count = getCartItemCount();
//       setCartItemCount(count);
//     } catch (error) {
//       console.error('Error updating cart count:', error);
//       setCartItemCount(0);
//     }
//   };

//   const handleCartClick = () => {
//     navigate('/basket');
//   };

//   const handleShopNowClick = () => {
//     navigate('/platebuilder');
//   };

//   const handleLogout = () => {
//     logout();
//     setShowUserDropdown(false);
//     navigate('/');
//   };

//   const handleProfileClick = () => {
//     setShowUserDropdown(false);
//     navigate('/profile');
//   };

//   const handleOrdersClick = () => {
//     setShowUserDropdown(false);
//     navigate('/orders');
//   };

//   return (
//     <>
//       {/* Top Promotional Banner */}
//       {showCoupon && (
//         <div className="alert alert-info text-center mb-0 py-2 position-relative" 
//              style={{ backgroundColor: '#4285f4', color: 'white', border: 'none' }}>
//           <div className="container">
//             <strong>GET 15% OFF & FREE SHIPPING | USE CODE 'Save15'</strong>
//             <button 
//               className="btn btn-warning btn-sm ms-3 fw-bold"
//               onClick={handleShopNowClick}
//             >
//               SHOP NOW
//             </button>
//             <button 
//               className="btn-close btn-close-white position-absolute end-0 me-3"
//               onClick={() => setShowCoupon(false)}
//               style={{ fontSize: '0.8rem' }}
//             ></button>
//           </div>
//         </div>
//       )}

//       {/* Main Navigation */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
//         <div className="container">
//           {/* Brand */}
//           <Link className="navbar-brand fw-bold fs-3" to="/">
//             <span style={{ color: '#ffc107' }}>Number</span>
//             <span style={{ color: '#000' }}>Plates</span>
//           </Link>

//           {/* Mobile Toggle */}
//           <button 
//             className="navbar-toggler border-0" 
//             type="button" 
//             data-bs-toggle="collapse" 
//             data-bs-target="#navbarNav"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Navigation Items */}
//           <div className="collapse navbar-collapse" id="navbarNav">
//             {/* Left Navigation */}
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//                 <Link className="nav-link fw-semibold px-3" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link fw-semibold px-3" to="/platebuilder">Build Plate</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link fw-semibold px-3" to="/about">About</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link fw-semibold px-3" to="/contact">Contact</Link>
//               </li>
//             </ul>

//             {/* Right Navigation */}
//             <ul className="navbar-nav ms-auto align-items-center">
//               {/* Cart */}
//               <li className="nav-item me-3">
//                 <button 
//                   className="btn btn-outline-warning position-relative"
//                   onClick={handleCartClick}
//                   style={{ border: '2px solid #ffc107' }}
//                 >
//                   <i className="bi bi-bag fs-5"></i>
//                   {cartItemCount > 0 && (
//                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                       {cartItemCount}
//                       <span className="visually-hidden">items in cart</span>
//                     </span>
//                   )}
//                 </button>
//               </li>

//               {/* Authentication */}
//               {isAuthenticated ? (
//                 /* User Dropdown */
//                 <li className="nav-item dropdown">
//                   <button 
//                     className="btn btn-link nav-link dropdown-toggle d-flex align-items-center text-decoration-none"
//                     onClick={() => setShowUserDropdown(!showUserDropdown)}
//                     style={{ border: 'none', color: '#000' }}
//                   >
//                     <div className="d-flex align-items-center">
//                       <div 
//                         className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-2"
//                         style={{ width: '32px', height: '32px' }}
//                       >
//                         <span className="fw-bold text-dark">
//                           {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
//                         </span>
//                       </div>
//                       <span className="fw-semibold d-none d-md-inline">
//                         {user?.firstName || 'User'}
//                       </span>
//                     </div>
//                   </button>
                  
//                   {showUserDropdown && (
//                     <div className="dropdown-menu dropdown-menu-end show position-absolute">
//                       <div className="dropdown-header">
//                         <strong>{user?.firstName} {user?.lastName}</strong>
//                         <br />
//                         <small className="text-muted">{user?.email}</small>
//                       </div>
//                       <div className="dropdown-divider"></div>
//                       <button className="dropdown-item" onClick={handleProfileClick}>
//                         <i className="bi bi-person me-2"></i>
//                         Profile
//                       </button>
//                       <button className="dropdown-item" onClick={handleOrdersClick}>
//                         <i className="bi bi-bag-check me-2"></i>
//                         My Orders
//                       </button>
//                       <div className="dropdown-divider"></div>
//                       <button className="dropdown-item text-danger" onClick={handleLogout}>
//                         <i className="bi bi-box-arrow-right me-2"></i>
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               ) : (
//                 /* Login/Register Buttons */
//                 <>
//                   <li className="nav-item me-2">
//                     <Link 
//                       to="/login" 
//                       className="btn btn-outline-dark fw-semibold px-3"
//                     >
//                       Login
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link 
//                       to="/register" 
//                       className="btn btn-warning fw-semibold px-3"
//                     >
//                       Sign Up
//                     </Link>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Click outside to close dropdown */}
//       {showUserDropdown && (
//         <div 
//           className="position-fixed top-0 start-0 w-100 h-100"
//           style={{ zIndex: 999 }}
//           onClick={() => setShowUserDropdown(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// export default AuthNavbar;


// src/components/Navbar/AuthNavbar.jsx - Updated Navbar with Database Cart
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const AuthNavbar = () => {
  const [showCoupon, setShowCoupon] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemCount, loading: cartLoading } = useCart();
  const navigate = useNavigate();

  // Load cart count on component mount and listen for updates
  useEffect(() => {
    updateCartCount();
    
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    // Listen for cart updates from CartContext
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Update cart count when cart context changes
  useEffect(() => {
    if (!cartLoading) {
      updateCartCount();
    }
  }, [cartLoading, getCartItemCount]);

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

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate even if logout has issues
      setShowUserDropdown(false);
      navigate('/');
    }
  };

  const handleProfileClick = () => {
    setShowUserDropdown(false);
    navigate('/profile');
  };

  const handleOrdersClick = () => {
    setShowUserDropdown(false);
    navigate('/orders');
  };

  return (
    <>
      {/* Top Promotional Banner */}
      {false && showCoupon && (
        <div className="alert alert-info text-center mb-0 py-2 position-relative" 
             style={{ backgroundColor: '#4285f4', color: 'white', border: 'none' }}>
          <div className="container">
            <strong>GET 15% OFF & FREE SHIPPING | USE CODE 'Save15'</strong>
            <button 
              className="btn btn-warning btn-sm ms-3 fw-bold"
              onClick={handleShopNowClick}
            >
              SHOP NOW
            </button>
            <button 
              className="btn-close btn-close-white position-absolute end-0 me-3"
              onClick={() => setShowCoupon(false)}
              style={{ fontSize: '0.8rem' }}
            ></button>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand fw-bold fs-3" to="/">
            <span style={{ color: '#ffc107' }}>Number</span>
            <span style={{ color: '#000' }}>Plates</span>
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Left Navigation */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link fw-semibold px-3" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold px-3" to="/platebuilder">Build Plate</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold px-3" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold px-3" to="/contact">Contact</Link>
              </li>
            </ul>

            {/* Right Navigation */}
            <ul className="navbar-nav ms-auto align-items-center">
              {/* Cart */}
              <li className="nav-item me-3">
                <button 
                  className="btn btn-outline-warning position-relative"
                  onClick={handleCartClick}
                  style={{ border: '2px solid #ffc107' }}
                  disabled={cartLoading}
                >
                  {cartLoading ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <i className="bi bi-bag fs-5"></i>
                  )}
                  
                  {cartItemCount > 0 && !cartLoading && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </button>
              </li>

              {/* Authentication */}
              {isAuthenticated ? (
                /* User Dropdown */
                <li className="nav-item dropdown">
                  <button 
                    className="btn btn-link nav-link dropdown-toggle d-flex align-items-center text-decoration-none"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    style={{ border: 'none', color: '#000' }}
                  >
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-2"
                        style={{ width: '32px', height: '32px' }}
                      >
                        <span className="fw-bold text-dark">
                          {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="fw-semibold d-none d-md-inline">
                        {user?.firstName || 'User'}
                      </span>
                    </div>
                  </button>
                  
                  {showUserDropdown && (
                    <div className="dropdown-menu dropdown-menu-end show position-absolute">
                      <div className="dropdown-header">
                        <strong>{user?.firstName} {user?.lastName}</strong>
                        <br />
                        <small className="text-muted">{user?.email}</small>
                      </div>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={handleProfileClick}>
                        <i className="bi bi-person me-2"></i>
                        Profile
                      </button>
                      <button className="dropdown-item" onClick={handleOrdersClick}>
                        <i className="bi bi-bag-check me-2"></i>
                        My Orders
                      </button>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                /* Login/Register Buttons */
                <>
                  <li className="nav-item me-2">
                    <Link 
                      to="/login" 
                      className="btn btn-outline-dark fw-semibold px-3"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      to="/register" 
                      className="btn btn-warning fw-semibold px-3"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Click outside to close dropdown */}
      {showUserDropdown && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 999 }}
          onClick={() => setShowUserDropdown(false)}
        ></div>
      )}
    </>
  );
};

export default AuthNavbar;