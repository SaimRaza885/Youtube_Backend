
import { DurationBadge } from './DurationBadge'
import { fmt, ago } from '../../utils'
import { Link } from 'react-router-dom'
import { MediaPlaceholder } from '../common/MediaPlaceholder'

export const VideoCard = ({ video, horizontal = true }) => {


  if (!video) return null

  const thumb = video.thumbnail?.url || null
  const channelName = video.ownerDetails?.username || video.owner?.username || 'Unknown'
  const channelAvatar = video.ownerDetails?.avatar?.url || video.ownerDetails?.avatar || null

  // console.log(video)

  if (horizontal) {
    return (
      <div className="group flex gap-3 cursor-pointer">
        <div className="relative w-40 lg:w-48 shrink-0 aspect-video rounded-lg overflow-hidden">
          {thumb ? (
            <img src={thumb} alt={video.title} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <MediaPlaceholder kind="thumbnail" className="w-full h-full" />
          )}
          <DurationBadge seconds={video.duration} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-text-primary leading-5 line-clamp-2">
            {video.title || 'Untitled Video'}
          </h4>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">{channelName} </p>
          <p className="text-xs text-[var(--color-text-muted)]/70 mt-0.5">{fmt(video.views)} views &bull; {ago(video.createdAt)}</p>
        </div>
      </div>
    )
  }

  return (
    <Link to={`/video/${video._id}`} >


      <div className="group block cursor-pointer border border-border-subtle p-4 ">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3">
          {thumb ? (
            <img src={thumb} alt={video.title} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <MediaPlaceholder kind="thumbnail" className="w-full h-full" />
          )}
          <DurationBadge seconds={video.duration} />
        </div>
        <div className="flex gap-3">
          {channelAvatar && (
            <img src={channelAvatar} alt={channelName} className="w-9 h-9 rounded-full object-cover shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-text-primary leading-5 line-clamp-2 mb-1">
              {video.title || 'Untitled Video'}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-4 truncate">{channelName}</p>
            <p className="text-xs text-[var(--color-text-muted)] leading-4">
              {fmt(video.views)} views &bull; {ago(video.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
