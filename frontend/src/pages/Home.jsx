import { useEffect, useState } from 'react'
import { CategoryChip, VideoGrid } from '../components'
import { videoAPI } from '../services/endpoints'

// const categories = ['All', 'Music', 'Gaming', 'News', 'Sports', 'Movies', 'Education', 'Technology', 'Entertainment', 'Podcasts', 'Live', 'Trending']

export const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCat, setActiveCat] = useState('All')

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const res = await videoAPI.getAllVideos({ limit: 24, sortBy: 'createdAt', sortType: 'desc' })
        setVideos(res.data.data?.docs || res.data.data || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load videos')
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  return (
    <div>
      {/* <div className="sticky top-14 z-30 bg-[#0f0f0f]/95 backdrop-blur-xl border-b border-[#2A2A42]"> */}
      {/* <div className="flex gap-3 overflow-x-auto px-6 py-3 scrollbar-none"> */}
      {/* {categories.map((c) => (
            <CategoryChip key={c} label={c} active={activeCat === c} onClick={() => setActiveCat(c)} />
          ))} */}
      {/* </div> */}
      {/* </div> */}
      <div className="px-4 lg:px-6 py-5">
        <VideoGrid
          videos={videos}
          loading={loading}
          error={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    </div>
  )
}
