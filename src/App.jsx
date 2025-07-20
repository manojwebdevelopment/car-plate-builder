// App.jsx - Updated with Authentication System
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import AuthNavbar from './components/Navbar/AuthNavbar';
import Home from './pages/Home.tsx';
import PlateBuilder from './components/NumberPlate/PlateBuilder';
import CartPage from './components/Cart/CartPage';
import CheckoutPage from './pages/CheckoutPage'
import Footer from './components/Footer/Footer';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AdminDashboard from './components/AdminDashboard';
import AdminRegister from './components/AdminRegister';
import UnifiedPaymentSuccessPage from './components/Cart/PaymentSuccessPage';

// Authentication Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import OAuthCallback from './components/Auth/OAuthCallback';

// User Dashboard Components (to be created)
import UserProfile from './components/User/UserProfile.jsx';
import UserOrders from './components/User/UserOrders';

import './App.css';

// Layout component to handle conditional rendering
function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/dashboard';
  const isAuthRoute = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {/* Show navbar for all routes except admin dashboard */}
      {!isAdminRoute && <AuthNavbar />}
      
      <div style={{ margin: isAdminRoute ? 0 : -1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/platebuilder" element={<PlateBuilder />} />
          <Route path="/basket" element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/payment-success" element={<UnifiedPaymentSuccessPage />} />
          
          {/* Authentication Routes (redirect if already authenticated) */}
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            } 
          />
          
          {/* OAuth Callback Route */}
          <Route path="/auth/callback" element={<OAuthCallback />} />
          
          {/* Protected User Routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <UserOrders />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/register" element={<AdminRegister />} />
        </Routes>
      </div>
      
      {/* Show footer for all routes except admin dashboard and auth pages */}
      {!isAdminRoute && !isAuthRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;