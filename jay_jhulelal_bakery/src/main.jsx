import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css'
import Navbar from './Navbar.jsx'
import App from './App.jsx'
import { CartProvider } from './context/CartProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>   {/* ✅ wrap App */}
        <CartProvider>
          <Navbar />
          <App />
        </CartProvider>
    </BrowserRouter>
  </StrictMode>
)
