import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Layout from './components/layout/Layout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CropPlanning from './pages/CropPlanning'
import Market from './pages/Market'
import Advisory from './pages/Advisory'
import Schemes from './pages/Schemes'
import Weather from './pages/Weather'

// Protect routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useApp()
  const location = useLocation()
  
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          
          {/* Dashboard routes with sidebar */}
          <Route path="/dashboard" element={<ProtectedRoute><Layout showSidebar><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/crop-planning" element={<ProtectedRoute><Layout showSidebar><CropPlanning /></Layout></ProtectedRoute>} />
          <Route path="/market" element={<ProtectedRoute><Layout showSidebar><Market /></Layout></ProtectedRoute>} />
          <Route path="/advisory" element={<ProtectedRoute><Layout showSidebar><Advisory /></Layout></ProtectedRoute>} />
          <Route path="/schemes" element={<ProtectedRoute><Layout showSidebar><Schemes /></Layout></ProtectedRoute>} />
          <Route path="/weather" element={<ProtectedRoute><Layout showSidebar><Weather /></Layout></ProtectedRoute>} />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
