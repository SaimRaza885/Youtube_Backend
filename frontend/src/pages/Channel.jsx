import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { channelAPI, videoAPI } from '../services/endpoints'
import { Button, Skeleton, EmptyState, ErrorState } from '../components'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { User, Video } from 'lucide-react'
import { fmt } from '../utils'

export const Channel = () => {
  const { username } = useParams()
  const { user: currentUser } = useAuth()
  const { addNotification } = useUI()
  const [channel, setChannel] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState(0)

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true)
        setError(null)
        const channelRes = await channelAPI.getChannelByUsername(username)
        const channelData = channelRes.data.data
        setChannel(channelData)
        setIsSubscribed(channelData.isSubscribe || false)
        setSubscriberCount(channelData.subscriberCount || 0)

        const videosRes = await videoAPI.getVideosByUser(channelData._id)
        setVideos(videosRes.data.data?.docs || videosRes.data.data || [])
      } catch (err) {
        setError('Failed to load channel')
      } finally {
        setLoading(false)
      }
    }
    fetchChannel()
  }, [username])

  const handleSubscribe = async () => {
    if (!currentUser) { addNotification('Please login to subscribe', 'info'); return }
    try {
      const res = await channelAPI.subscribeChannel(channel._id)
      setIsSubscribed(res.data.data.isSubscribed)
      setSubscriberCount(prev => res.data.data.isSubscribed ? prev + 1 : prev - 1)
    } catch { addNotification('Failed to subscribe', 'error') }
  }

  if (loading) return <div className="container-custom py-8"><Skeleton className="w-full h-48 rounded-xl mb-6" /><div className="flex gap-4"><Skeleton className="w-20 h-20 rounded-full" /><div className="flex-1"><Skeleton className="h-8 w-48 mb-2" /><Skeleton className="h-4 w-32" /></div></div></div>
  if (error) return <div className="container-custom py-8"><ErrorState message={error} onRetry={() => window.location.reload()} /></div>
  if (!channel) return <div className="container-custom py-8 text-center text-text-secondary">Channel not found</div>

  const avatarUrl = channel.avatar || null

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="w-full h-40 bg-gradient-to-r from-accent to-accent-hover rounded-xl mb-6" />

      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-start gap-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt={channel.username} className="w-20 h-20 rounded-full border-4 border-primary object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full border-4 border-primary bg-tertiary flex items-center justify-center">
              <User className="w-10 h-10 text-text-tertiary" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{channel.fullName}</h1>
            <p className="text-text-secondary text-sm">@{channel.username}</p>
            <p className="text-text-tertiary text-sm mt-1">{fmt(subscriberCount)} subscribers &bull; {videos.length} videos</p>
            {channel.description && <p className="text-text-secondary mt-3 max-w-2xl text-sm">{channel.description}</p>}
          </div>
        </div>
        <Button onClick={handleSubscribe} variant={isSubscribed ? 'secondary' : 'primary'}>
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </Button>
      </div>

      <div className="flex gap-6 border-b border-border-subtle mb-6">
        <button className="px-4 py-3 font-semibold text-sm text-accent border-b-2 border-accent">Videos</button>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <Link key={video._id} to={`/video/${video._id}`} className="group">
              <div className="bg-secondary border border-border-subtle rounded-xl overflow-hidden transition-all duration-200 hover:border-accent/30 hover:shadow-card-hover">
                <div className="relative w-full aspect-video bg-tertiary overflow-hidden">
                  <img
                    src={video.thumbnail?.url || 'https://placehold.co/320x180/1C1C2E/6B6B80?text=No+Thumbnail'}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-text-primary text-sm line-clamp-2">{video.title}</h3>
                  <p className="text-text-tertiary text-xs mt-1">{fmt(video.views)} views</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading && <EmptyState icon={Video} title="No videos yet" description="This channel hasn't uploaded any videos" />
      )}
    </div>
  )
}
