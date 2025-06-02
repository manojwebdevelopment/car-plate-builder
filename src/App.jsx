// App.js - Complete App with Cart Integration
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import PlateBuilder from './components/NumberPlate/PlateBuilder'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/platebuilder' element={<PlateBuilder/>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App