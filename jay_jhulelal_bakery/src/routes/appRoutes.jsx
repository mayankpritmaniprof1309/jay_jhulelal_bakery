import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Homepage from '../homepage_components/Homepage'
import Products from '../productsPage_components/Products'
import Login_page from '../login_components/login_page';
import SignUpPage from '../signUpPage/SignUpPage';
import CartPage from '../cart/cartPage';
import CheckoutPage from '../checkout/Checkoutpage';
import useProducts from '../productsPage_components/useProduct';

// Only the pages that need products are wrapped here
const HomepageWithProducts = () => {
  const { products, loading, error } = useProducts();
  if (loading) return <p style={{ padding: '40px', textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ padding: '40px', color: 'red' }}>{error}</p>;
  return <Homepage items={products} />;
};

const ProductsWithProducts = () => {
  const { products, loading, error } = useProducts();
  if (loading) return <p style={{ padding: '40px', textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ padding: '40px', color: 'red' }}>{error}</p>;
  return <Products items={products} />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"               element={<HomepageWithProducts />} />
      <Route path="/product"        element={<ProductsWithProducts />} />
      <Route path="/user/login"     element={<Login_page />} />
      <Route path="/user/register"  element={<SignUpPage />} />
      <Route path="/cart"           element={<CartPage />} />
      <Route path="/checkout"       element={<CheckoutPage />} />
    </Routes>
  );
};

export default AppRoutes;