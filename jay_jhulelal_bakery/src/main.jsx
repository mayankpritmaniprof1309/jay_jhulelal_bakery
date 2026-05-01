import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css'
import Navbar from './Navbar.jsx'
import App from './App.jsx'
import Products from './productsPage_components/Products.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>   {/* ✅ wrap App */}
      <Navbar />
      <App />
    {/* <Route path='/product' element={Products}></Route> */}
    </BrowserRouter>
  </StrictMode>,
)
