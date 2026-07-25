import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Pencil, Trash2, Video } from 'lucide-react'
import { EmptyState } from '../../components'
import { fmt, ago } from '../../utils'

export const ChannelVideos = ({
  videos, loading, currentUser, channel, navigate, handleDeleteVideo
}) => {
  const [imgErrors, setImgErrors] = useState({})

  if (videos.length === 0) {
    return !loading ? (
      <EmptyState
        icon={Video}
        title="No videos yet"
        description="This channel hasn't uploaded any videos"
      />
    ) : null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => {
        const thumbErr = imgErrors[video._id]
        return (
          <Link
            key={video._id}
            to={`/video/${video._id}`}
            className="group block rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <div className="relative w-full aspect-video bg-elevated overflow-hidden">
              {!thumbErr ? (
                <img
                  src={video.thumbnail?.url || 'https://placehold.co/640x360/1C1C2E/6B6B80?text=No+Thumbnail'}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={() => setImgErrors(prev => ({ ...prev, [video._id]: true }))}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent-hover/20 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-accent-light text-accent-on-light flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
              {currentUser?._id === channel._id && (
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/video/edit/${video._id}`) }}
                    className="p-1.5 bg-black/60 text-white rounded-full hover:bg-accent transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteVideo(video._id, e)}
                    className="p-1.5 bg-black/60 text-white rounded-full hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-text-primary text-sm line-clamp-2 group-hover:text-accent-light transition-colors">{video.title}</h3>
              <p className="text-[var(--color-text-muted)] text-xs mt-1">{fmt(video.views)} views{video.createdAt ? ` · ${ago(video.createdAt)}` : ''}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}