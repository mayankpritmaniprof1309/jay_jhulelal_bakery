import React from 'react'
import Homepage from './homepage_components/Homepage'
import { Routes, Route } from 'react-router-dom';
import Products from './productsPage_components/Products'
import Login_page from './login_components/login_page';
import SignUpPage from './signUpPage/SignUpPage';
import AppRoutes from './routes/appRoutes';





const App = () => {
  return (
   <>
    {/* <Homepage items={items}/> */}
    {/* <Products items={items}/> */}
    
  <AppRoutes />
      
  </>
  )
}

export default App