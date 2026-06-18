import { useUI } from '../../context/UIContext'
import { DurationBadge } from './DurationBadge'

const fmt = (v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(1)}K` : `${v}`

const ago = (d) => {
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000)
  if (m < 1) return 'Just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const days = Math.floor(h / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

export const VideoCard = ({ video, horizontal = false }) => {
  const { setSelectedVideo, setShowVideoPreview } = useUI()

  if (!video) return null

  const thumb = video.thumbnail || 'https://placehold.co/320x180/1C1C2E/6B6B80?text=No+Thumbnail'
  const channelName = video.ownerDetails?.username || video.owner?.username || 'Unknown'
  const channelAvatar = video.ownerDetails?.avatar || video.owner?.avatar || null

  const handleClick = (e) => {
    e.preventDefault()
    setSelectedVideo(video)
    setShowVideoPreview(true)
  }

  if (horizontal) {
    return (
      <div onClick={handleClick} className="group flex gap-3 cursor-pointer">
        <div className="relative w-40 lg:w-48 shrink-0 aspect-video bg-[#1C1C2E] rounded-lg overflow-hidden">
          <img src={thumb} alt={video.title} loading="lazy" className="w-full h-full object-cover" />
          <DurationBadge seconds={video.duration} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-[#F0F0F8] leading-5 line-clamp-2">
            {video.title || 'Untitled Video'}
          </h4>
          <p className="text-xs text-[#6B6B80] mt-1">{channelName}</p>
          <p className="text-xs text-[#6B6B80]/70 mt-0.5">{fmt(video.views)} views &bull; {ago(video.createdAt)}</p>
        </div>
      </div>
    )
  }

  return (
    <div onClick={handleClick} className="group block cursor-pointer">
      <div className="relative w-full aspect-video bg-[#1C1C2E] rounded-xl overflow-hidden mb-3">
        <img src={thumb} alt={video.title} loading="lazy" className="w-full h-full object-cover" />
        <DurationBadge seconds={video.duration} />
      </div>
      <div className="flex gap-3">
        {channelAvatar && (
          <img src={channelAvatar} alt={channelName} className="w-9 h-9 rounded-full object-cover shrink-0" />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-[#F0F0F8] leading-5 line-clamp-2 mb-1">
            {video.title || 'Untitled Video'}
          </h3>
          <p className="text-xs text-[#6B6B80] leading-4 truncate">{channelName}</p>
          <p className="text-xs text-[#6B6B80] leading-4">
            {fmt(video.views)} views &bull; {ago(video.createdAt)}
          </p>
        </div>
      </div>
    </div>
  )
}
