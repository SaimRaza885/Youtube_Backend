import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { fmt, ago } from '../utils'
import { DurationBadge } from './video/DurationBadge'
import { MediaPlaceholder } from './common/MediaPlaceholder'

export const NewVideoCard = ({ video, ch = '', horizontal = false }) => {
  if (!video) return null
  const [imgError, setImgError] = useState({})

  const {
    _id, title, thumbnail, duration, views, createdAt, owner, ownerDetails,
  } = video

  if (ch) { video.ownerDetails = ch }
  const channel = ownerDetails || owner || {}

  const { username, fullName = 'Unknown Channel', avatar } = channel

  const thumbnailUrl = thumbnail?.url || null
  const avatarUrl = avatar?.url || avatar || null
  const thumbErr = imgError[_id]

  // console.log(video)

  if (horizontal) {
    return (
      <div className="group flex gap-3 rounded-xl overflow-hidden p-2 transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <Link to={`/video/${_id}`} className="relative w-40 lg:w-48 shrink-0 aspect-video overflow-hidden rounded-lg bg-elevated">
          {thumbnailUrl && !thumbErr ? (
            <img
              src={thumbnailUrl} alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(prev => ({ ...prev, [_id]: true }))}
            />
          ) : (
            <MediaPlaceholder kind="thumbnail" className="w-full h-full" />
          )}
          <DurationBadge seconds={duration} />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-accent-light text-accent-on-light flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col py-1">
          <Link to={`/video/${_id}`}>
            <h4 className="line-clamp-2 text-sm font-semibold leading-5 text-text-primary transition-colors group-hover:text-accent-light">
              {title || 'Untitled Video'}
            </h4>
          </Link>
          {username && (
            <Link to={`/channel/${username}`} className="mt-1 w-fit text-xs text-[var(--color-text-muted)] transition-colors hover:text-text-secondary">
              {username}
            </Link>
          )}
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            {fmt(views)} views • {ago(createdAt)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="group rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
        border: '1px solid var(--color-border-light)',
      }}
    >
      <Link to={`/video/${_id}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-elevated">
          {thumbnailUrl && !thumbErr ? (
            <img
              src={thumbnailUrl} alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(prev => ({ ...prev, [_id]: true }))}
            />
          ) : (
            <MediaPlaceholder kind="thumbnail" className="w-full h-full" />
          )}
          <DurationBadge seconds={duration} />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-accent-light text-accent-on-light flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>
        </div>
      </Link>

      <div className="p-3 flex gap-3">
        <Link to={`/channel/${username}`} className="shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt={fullName} className="h-9 w-9 rounded-full object-cover border border-[var(--color-border-light)]" />
          ) : (
            <div className="h-9 w-9 rounded-full overflow-hidden border border-[var(--color-border-light)]">
              <MediaPlaceholder kind="avatar" className="w-full h-full" />
            </div>
          )}
        </Link>

        <div className="min-w-0 flex-1">
          <Link to={`/video/${_id}`}>
            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-text-primary transition-colors duration-200 group-hover:text-accent-light">
              {title || 'Untitled Video'}
            </h3>
          </Link>
          {username && (
            <Link to={`/channel/${username}`} className="mt-1 block truncate text-xs text-[var(--color-text-muted)] transition-colors hover:text-text-secondary">
              {username}
            </Link>
          )}
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
            {fmt(views)} views • {ago(createdAt)}
          </p>
        </div>
      </div>
    </div>
  )
}