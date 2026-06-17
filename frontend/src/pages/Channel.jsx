import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { channelAPI, videoAPI } from '../services/endpoints'
import { Card, Button, Skeleton } from '../components'
import { Link } from 'react-router-dom'

export const Channel = () => {
  const { channelId } = useParams()
  const [channel, setChannel] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true)
        const channelRes = await channelAPI.getChannelById(channelId)
        setChannel(channelRes.data.data)

        const videosRes = await videoAPI.getVideosByChannel(channelId)
        setVideos(videosRes.data.data || [])
      } catch (err) {
        console.error('Failed to load channel')
      } finally {
        setLoading(false)
      }
    }
    fetchChannel()
  }, [channelId])

  if (loading) return <div className="container-custom py-8"><Skeleton className="w-full h-96" /></div>
  if (!channel) return <div className="container-custom py-8 text-red-500">Channel not found</div>

  return (
    <div className="container-custom py-8">
      {/* Channel Banner */}
      <div className="w-full h-32 bg-gradient-to-r from-accent to-accent-hover rounded-lg mb-6"></div>

      {/* Channel Info */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start gap-4">
          <img
            src={channel.avatar || 'https://via.placeholder.com/88'}
            alt={channel.username}
            className="w-20 h-20 rounded-full border-4 border-primary"
          />
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{channel.fullName}</h1>
            <p className="text-text-secondary">@{channel.username}</p>
            <p className="text-text-secondary text-sm mt-1">123K subscribers • 45 videos</p>
            {channel.description && <p className="text-text-secondary mt-3 max-w-2xl">{channel.description}</p>}
          </div>
        </div>
        <Button>Subscribe</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-tertiary mb-8">
        <button className="px-4 py-2 font-semibold text-accent border-b-2 border-accent">Videos</button>
        <button className="px-4 py-2 font-semibold text-text-secondary hover:text-text-primary transition-colors">Playlists</button>
        <button className="px-4 py-2 font-semibold text-text-secondary hover:text-text-primary transition-colors">About</button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <Link key={video._id} to={`/video/${video._id}`}>
            <Card hover>
              <div className="relative w-full aspect-video bg-tertiary rounded-lg overflow-hidden mb-3">
                <img
                  src={video.thumbnail || 'https://via.placeholder.com/320x180'}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-text-primary truncate-text-2 text-sm">{video.title}</h3>
              <p className="text-text-secondary text-xs mt-1">{video.views || 0} views</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
