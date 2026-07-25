import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { VideoProvider } from './context/VideoContext'
import { UIProvider } from './context/UIContext'
import { Navbar, Sidebar, ToastContainer } from './components'
import { UploadProgressBar } from './components/ui/UploadProgressBar'
import { ErrorBoundary, AppLoader } from './components/common'
import { AnimatePresence } from 'framer-motion'
import {
  Login,
  Register,
  Home,
  VideoPlayer,
  Channel,
  Search,
  Playlists,
  PlaylistDetailPage,
  Profile,
  Upload,
  History,
  Subscriptions,
  LandingPage,
  Pricing,
} from './pages'
import EditVideo from './pages/EditVideo'
import { Liked_Vidoes } from './pages/LikedVideos'

const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-background overflow-y-auto">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
      <UploadProgressBar />
    </div>
  )
}

function AppContent() {
  const { user } = useAuth()
  const [appReady, setAppReady] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!appReady && <AppLoader key="app-loader" onComplete={() => setAppReady(true)} />}
      </AnimatePresence>

      {appReady && (
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/" element={user ? <PageLayout><Home /></PageLayout> : <LandingPage />} />
          <Route path="/video/:videoId" element={<PageLayout><VideoPlayer /></PageLayout>} />
          <Route path="/video/edit/:videoId" element={<PageLayout><EditVideo /></PageLayout>} />
          <Route path="/channel/:username" element={<PageLayout><Channel /></PageLayout>} />
          <Route path="/search" element={<PageLayout><Search /></PageLayout>} />
          <Route path="/upload" element={<PageLayout><Upload /></PageLayout>} />
          <Route path="/playlists" element={<PageLayout><Playlists /></PageLayout>} />
          <Route path="/playlists/:id" element={<PageLayout><PlaylistDetailPage /></PageLayout>} />
          <Route path="/liked-vidoes" element={<PageLayout><Liked_Vidoes /></PageLayout>} />
          <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
          <Route path="/subscriptions" element={<PageLayout><Subscriptions /></PageLayout>} />
          <Route path="/history" element={<PageLayout><History /></PageLayout>} />
          <Route path="/pricing" element={<PageLayout><Pricing /></PageLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
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
