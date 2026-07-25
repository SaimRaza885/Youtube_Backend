import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const UIContext = createContext()

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem('vidora-theme')
    if (stored !== null) return stored === 'dark'
  } catch {}
  return true
}

export const UIProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(getInitialTheme)
  const [notifications, setNotifications] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [uploads, setUploads] = useState([])

  useEffect(() => {
    try {
      localStorage.setItem('vidora-theme', darkMode ? 'dark' : 'light')
    } catch {}
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev)
  }, [])

  const addNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now()
    const notification = { id, message, type }
    setNotifications((prev) => [...prev, notification])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])


  const addUpload = useCallback((id, fileName) => {
    setUploads((prev) => [...prev, { id, fileName, progress: 0, status: 'uploading' }])
  }, [])

  const updateUpload = useCallback((id, updates) => {
    setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)))
  }, [])

  const removeUpload = useCallback((id) => {
    setUploads((prev) => prev.filter((u) => u.id !== id))
  }, [])

  const value = {
    sidebarOpen,
    toggleSidebar,
    darkMode,
    setDarkMode,
    toggleDarkMode,
    notifications,
    addNotification,
    removeNotification,

    selectedVideo,
    setSelectedVideo,

    uploads,
    addUpload,
    updateUpload,
    removeUpload,
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within UIProvider')
  }
  return context
}
