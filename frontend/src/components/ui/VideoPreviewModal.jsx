import { User } from 'lucide-react'
import { Play } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import { fmt, ago, formatDuration } from '../../utils'

export const VideoPreviewModal = () => {
  const { showVideoPreview, selectedVideo, closeVideoPreview } = useUI()

  if (!showVideoPreview || !selectedVideo) return null

  const video = selectedVideo
  const channelName = video.ownerDetails?.username || video.owner?.username || 'Unknown'
  const channelAvatar = video.ownerDetails?.avatar || video.owner?.avatar || null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={closeVideoPreview}>
      <div className="bg-secondary border border-border-subtle rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-modal" onClick={(e) => e.stopPropagation()}>
        <div className="p-0">
          <div className="relative w-full aspect-video bg-black flex items-center justify-center group cursor-pointer">
            <img src={video.thumbnail?.url || 'https://placehold.co/320x180/1C1C2E/6B6B80?text=No+Thumbnail'} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#FF0000]/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <Play className="w-7 h-7 text-white ml-0.5" fill="white" />
              </div>
            </div>
            <span className="absolute bottom-3 right-3 bg-black/85 text-white text-xs font-medium px-2 py-1 rounded">{formatDuration(video.duration)}</span>
          </div>

          <div className="p-4 lg:p-6">
            <h1 className="text-base lg:text-lg font-bold text-text-primary leading-6 mb-3">{video.title || 'Untitled Video'}</h1>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                {channelAvatar ? (
                  <img src={channelAvatar} alt={channelName} className="w-10 h-10 rounded-full object-cover ring-1 ring-border-subtle" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center">
                    <User className="w-5 h-5 text-text-tertiary" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-text-primary">{channelName}</p>
                  <p className="text-xs text-text-tertiary">{fmt(video.views)} views</p>
                </div>
              </div>
            </div>

            <div className="bg-tertiary rounded-xl p-4 mb-6">
              <p className="text-xs text-text-tertiary mb-1">{fmt(video.views)} views &bull; {ago(video.createdAt)}</p>
              {video.description && (
                <p className="text-sm text-text-primary/80 leading-6 line-clamp-3">{video.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
