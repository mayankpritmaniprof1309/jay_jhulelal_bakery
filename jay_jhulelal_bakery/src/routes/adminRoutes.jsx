import React from 'react'
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../admin_components/AdminDashboard';
import { ShowOrders } from '../admin_components/ShowOrders';
import ProductsPage from '../admin_components/productsPage';
import CustomersPage from '../admin_components/Customers';
import AdminSettingsPage from '../admin_components/SettingsPage';

const AdminRoutes = () => {
  return(
    <Routes>
      <Route path='/admin' element={<DashboardPage />}></Route>
      <Route path='/admin/orders' element={<ShowOrders />}></Route>
      <Route path='/admin/products' element={<ProductsPage />}></Route>
      <Route path='/admin/customers' element={<CustomersPage />}></Route>
      <Route path='/admin/settings' element={<AdminSettingsPage />}></Route>
    </Routes>
  )
}

export default AdminRoutes