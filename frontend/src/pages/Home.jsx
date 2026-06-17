import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { videoAPI } from '../services/endpoints'
import { Card, Skeleton } from '../components'
import { useVideo } from '../context/VideoContext'

export const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await videoAPI.getAllVideos({ limit: 12, sort: '-createdAt' })
        setVideos(response.data.data || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load videos')
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  if (error) return <div className="container-custom py-8 text-red-500">{error}</div>

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Recommended</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? Array(12)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className="w-full aspect-video rounded-lg" />)
          : videos.map((video) => (
              <Link key={video._id} to={`/video/${video._id}`}>
                <Card hover className="group">
                  <div className="relative w-full aspect-video bg-tertiary rounded-lg overflow-hidden mb-3">
                    <img
                      src={video.thumbnail || 'https://via.placeholder.com/320x180'}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-text-primary truncate-text-2 text-sm mb-1">{video.title}</h3>
                  <p className="text-text-secondary text-xs truncate">{video.channelId?.username}</p>
                  <p className="text-text-secondary text-xs">{video.views || 0} views</p>
                </Card>
              </Link>
            ))}
      </div>
    </div>
  )
}
