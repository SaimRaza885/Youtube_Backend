import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { VideoProvider } from './context/VideoContext'
import { UIProvider } from './context/UIContext'
import { Navbar, Sidebar, ToastContainer } from './components'
import { UploadModal } from './components/ui/UploadModal'
import { VideoPreviewModal } from './components/ui/VideoPreviewModal'
import {
  Login,
  Register,
  Home,
  VideoPlayer,
  Channel,
  Search,
  Playlists,
  Profile,
} from './pages'

const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-[#0f0f0f] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PageLayout><Home /></PageLayout>} />
      <Route path="/video/:videoId" element={<PageLayout><VideoPlayer /></PageLayout>} />
      <Route path="/channel/:channelId" element={<PageLayout><Channel /></PageLayout>} />
      <Route path="/search" element={<PageLayout><Search /></PageLayout>} />
      <Route path="/trending" element={<PageLayout><Home /></PageLayout>} />
      <Route path="/shorts" element={<PageLayout><Home /></PageLayout>} />
      <Route path="/playlists" element={<PageLayout><Playlists /></PageLayout>} />
      <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
      <Route path="/subscriptions" element={<PageLayout><Home /></PageLayout>} />
      <Route path="/history" element={<PageLayout><Home /></PageLayout>} />
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
            <UploadModal />
            <VideoPreviewModal />
            <ToastContainer />
          </UIProvider>
        </VideoProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
