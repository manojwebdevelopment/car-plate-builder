// App.js - Complete App with Cart Integration
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import PlateBuilder from './components/NumberPlate/PlateBuilder'
import './App.css'
import CartPage from './components/Cart/CartPage'
import Footer from './components/Footer/Footer'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
// import AdminDashboard from './dashboard/AdminDashboard'
import AdminDashboard from './components/AdminDashboard'
import AdminRegister from './components/AdminRegister'
import UnifiedPaymentSuccessPage from './components/Cart/PaymentSuccessPage';

// Create a Layout component to handle conditional rendering
function Layout() {
  const location = useLocation()
  const isAdminRoute = location.pathname === '/dashboard'

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div style={{ margin: isAdminRoute ? 0 : -1 }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/platebuilder' element={<PlateBuilder/>} />
          <Route path='/basket' element={<CartPage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/privacy-policy' element={<PrivacyPolicyPage/>} />
          <Route path='/dashboard' element={<AdminDashboard/>} />
          <Route path='/admin/register' element={<AdminRegister/>} />
          <Route path="/payment-success" element={<UnifiedPaymentSuccessPage />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer/>}
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  )
}

export default App