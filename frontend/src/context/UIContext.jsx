import { createContext, useContext, useState, useCallback } from 'react'

const UIContext = createContext()

export const UIProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState([])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
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

  const value = {
    sidebarOpen,
    toggleSidebar,
    darkMode,
    setDarkMode,
    notifications,
    addNotification,
    removeNotification,
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
