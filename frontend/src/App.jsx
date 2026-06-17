import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { VideoProvider } from './context/VideoContext'
import { UIProvider } from './context/UIContext'
import { Header, Sidebar, Footer } from './components/layout'
import { ToastContainer } from './components'
import {
  Login,
  Register,
  Home,
  Upload,
  VideoPlayer,
  Channel,
  Search,
  Playlists,
  Profile,
} from './pages'
import { useAuth } from './context/AuthContext'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Layout Wrapper for pages that need header/sidebar/footer
const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-primary overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

function AppContent() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PageLayout>
            <Home />
          </PageLayout>
        }
      />
      <Route
        path="/video/:videoId"
        element={
          <PageLayout>
            <VideoPlayer />
          </PageLayout>
        }
      />
      <Route
        path="/channel/:channelId"
        element={
          <PageLayout>
            <Channel />
          </PageLayout>
        }
      />
      <Route
        path="/search"
        element={
          <PageLayout>
            <Search />
          </PageLayout>
        }
      />
      <Route
        path="/trending"
        element={
          <PageLayout>
            <Home />
          </PageLayout>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Upload />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlists"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Playlists />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Profile />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Home />
            </PageLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <VideoProvider>
          <UIProvider>
            <AppContent />
            <ToastContainer />
          </UIProvider>
        </VideoProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
