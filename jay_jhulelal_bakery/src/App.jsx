import { useAuth } from './context/AuthContext'
import Navbar from './Navbar'
import AppRoutes from './routes/appRoutes'
import AdminLayout from './admin_components/AdminLayout'
import AdminRoutes from './routes/adminRoutes'

const App = () => {
  const { isAdmin, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  if (isAdmin) {
    return (
      <AdminLayout>
        <AdminRoutes />
      </AdminLayout>
    )
  }

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App