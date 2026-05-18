import { useAuth } from './context/AuthContext'
import Navbar from './Navbar'
import AppRoutes from './routes/appRoutes'
import AdminLayout from './admin_components/AdminLayout'
import AdminRoutes from './routes/adminRoutes'
import CartToast from './productsPage_components/cartToast'

const App = () => {

  const { isAdmin } = useAuth()

  return (
    <>

      {isAdmin ? (

        <AdminLayout>
          <AdminRoutes />
        </AdminLayout>

      ) : (

        <>
          <Navbar />
          <CartToast />
          <AppRoutes />
        </>

      )}

    </>
  )
}

export default App