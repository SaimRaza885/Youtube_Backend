import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { channelAPI } from '../services/endpoints'
import { Skeleton } from '../components'
import { useAuth } from '../context/AuthContext'
import { fmt, ago } from '../utils'

export const Subscriptions = () => {
  const { user, isAuthenticated } = useAuth()
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || !user) { setLoading(false); return }
    const fetch = async () => {
      try {
        const res = await channelAPI.getSubscriptions(user._id)
        const data = res.data.data
        if (Array.isArray(data)) {
          setChannels(data.map(item => item.subscribedChannels).filter(Boolean))
        }
      } catch {
        setChannels([])
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [user, isAuthenticated])

  if (!isAuthenticated) {
    return <div className="container-custom py-8 text-center text-text-secondary">Please log in to see your subscriptions</div>
  }

  return (
    <div className="container-custom py-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Subscriptions</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-video rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : channels.length === 0 ? (
        <p className="text-text-tertiary text-center py-12">No subscriptions yet. Subscribe to channels to see their latest videos here.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {channels.map((ch, idx) => {
            const video = ch.latestVideo
            return (
              <div key={idx} className="space-y-2">
                {video ? (
                  <>
                    <Link to={`/video/${video.owner}`} className="block group">
                      <div className="aspect-video bg-tertiary rounded-xl overflow-hidden">
                        {video.thumbnail?.url ? (
                          <img src={video.thumbnail.url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-tertiary">No thumbnail</div>
                        )}
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-text-primary line-clamp-2">{video.title}</h3>
                    </Link>
                    <p className="text-xs text-text-tertiary">{fmt(video.views)} views · {ago(video.createdAt)}</p>
                  </>
                ) : (
                  <div className="aspect-video bg-tertiary rounded-xl flex items-center justify-center text-text-tertiary">No videos yet</div>
                )}
                <Link to={`/channel/${ch.username}`} className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold">{ch.fullName?.[0]}</div>
                  <span className="text-xs text-text-secondary hover:text-text-primary">{ch.fullName}</span>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
