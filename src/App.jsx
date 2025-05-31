import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home';
import './App.css'
import NumberPlateBuilder from './pages/NumberPlateBuilder';
import PlateBuilder from './components/NumberPlate/PlateBuilder';

function App() {
  const [count, setCount] = useState(0) 

  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/platebuilder' element={<PlateBuilder/>} />
          </Routes>
        </div>
      </Router>

    </>
  )
}

export default App
