import { createContext, useContext, useState, useCallback } from 'react'

const VideoContext = createContext()

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    sort: 'latest',
    category: 'all',
  })

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = {
    videos,
    setVideos,
    selectedVideo,
    setSelectedVideo,
    loading,
    setLoading,
    error,
    setError,
    filters,
    updateFilters,
    clearError,
  }

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
}

export const useVideo = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error('useVideo must be used within VideoProvider')
  }
  return context
}
