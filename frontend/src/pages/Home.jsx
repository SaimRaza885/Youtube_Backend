import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VideoGrid } from '../components'
import { HomeHero, CategoryTabs } from '../components/home'
import { videoAPI } from '../services/endpoints'
import { motion } from 'framer-motion'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const CATEGORIES = ['All', 'Technology', 'Gaming', 'Music', 'AI', 'Design', 'Startups', 'Cinematography']

export const Home = () => {
  useDocumentTitle('Home')
  const navigate = useNavigate()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [showHero, setShowHero] = useState(true)
  const [featuredVideo, setFeaturedVideo] = useState(null)

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat)
    if (cat !== 'All') navigate(`/search?q=${encodeURIComponent(cat)}`)
  }

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      const [allVideosRes, heroRes] = await Promise.allSettled([
        videoAPI.getAllVideos({ limit: 24, sortBy: 'createdAt', sortType: 'desc' }),
        videoAPI.getVideoById('6a653e5c814704de93bcd906'),
      ])
      if (allVideosRes.status === 'fulfilled') {
        setVideos(allVideosRes.value.data.data?.docs || allVideosRes.value.data.data || [])
      } else {
        setError(allVideosRes.reason?.response?.data?.message || 'Failed to load videos')
      }
      if (heroRes.status === 'fulfilled' && heroRes.value.data?.data) {
        setFeaturedVideo(heroRes.value.data.data)
      }
      setLoading(false)
    }
    fetchVideos()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="px-4 lg:px-6 py-5 max-w-[1440px] mx-auto"
    >

      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
      />

      {showHero && (
        <HomeHero
          video={featuredVideo || videos[0]}
          onDismiss={() => setShowHero(false)}
        />
      )}

      {!error &&
        <div className="mt-12 mb-6 hidden md:block">
          <h3 className="text-2xl font-bold tracking-tight text-text-primary">Recommended For You</h3>
        </div>
      }

      <VideoGrid
        videos={videos}
        loading={loading}
        error={error}
        onRetry={() => window.location.reload()}
      />
    </motion.div>
  )
}
