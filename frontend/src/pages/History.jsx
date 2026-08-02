import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { History as HistoryIcon, Clock, Play } from 'lucide-react'
import { useHistory } from '../hooks/useHistory'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Skeleton, EmptyState, ErrorState, SectionHeader, DurationBadge, MediaPlaceholder } from '../components'
import { fmt, ago } from '../utils'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

const groupByDate = (videos) => {
  const groups = { Today: [], Yesterday: [], 'This Week': [], Earlier: [] }
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 86400000)
  const weekAgo = new Date(today.getTime() - 6 * 86400000)

  const sorted = [...videos].sort((a, b) => {
    const da = new Date(a.updatedAt || a.createdAt || a.watchedAt || 0)
    const db = new Date(b.updatedAt || b.createdAt || b.watchedAt || 0)
    return db - da
  })

  sorted.forEach((video) => {
    const d = new Date(video.updatedAt || video.createdAt || video.watchedAt || Date.now())
    if (d >= today) groups.Today.push(video)
    else if (d >= yesterday) groups.Yesterday.push(video)
    else if (d >= weekAgo) groups['This Week'].push(video)
    else groups.Earlier.push(video)
  })

  return Object.entries(groups).filter(([, v]) => v.length > 0)
}

export const History = () => {
  useDocumentTitle('History')
  const { user, videos, loading, error } = useHistory()
  const [thumbnailErrors, setThumbnailErrors] = useState({})

  const grouped = useMemo(() => groupByDate(videos), [videos])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text-secondary text-lg">Please log in to view history</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <Skeleton className="w-56 h-10 rounded-lg mb-3" />
          <Skeleton className="w-72 h-5 rounded-lg mb-6" />
          <div className="flex gap-4">
            <Skeleton className="w-28 h-8 rounded-lg" />
            <Skeleton className="w-32 h-8 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-28 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-30" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-20" />
      </div>

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        {/* Header */}
        <SectionHeader count={videos.length} text="Watch History" desc="Every video you've watched, organized by day. Your personal viewing timeline." />

        {/* Content */}
        {videos.length > 0 ? (
          <div className="space-y-10">
            {grouped.map(([groupName, groupVideos], groupIdx) => (
              <motion.div key={groupName} {...fadeUp(0.05 + groupIdx * 0.03)}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center">
                    <Clock className="w-4 h-4 text-text-secondary" />
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary">{groupName}</h2>
                  <span className="text-xs text-[var(--color-text-muted)]">({groupVideos.length} videos)</span>
                </div>

                <div className="space-y-3">
                  {groupVideos.map((video, idx) => {
                    const owner = video.ownerDetails || video.owner || {}
                    const thumbUrl = video.thumbnail?.url || null
                    const hasError = thumbnailErrors[video._id]

                    return (
                      <motion.div
                        key={video._id}
                        {...fadeUp(0.07 * idx)}
                        className="group relative"
                      >
                        <div
                          className="flex gap-4 rounded-xl overflow-hidden p-2 transition-all duration-300"
                          style={{
                            background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
                            border: '1px solid var(--color-border-subtle)',
                          }}
                        >
                          {/* Thumbnail */}
                          <Link to={`/video/${video._id}`} className="relative w-40 lg:w-52 shrink-0 aspect-video rounded-lg overflow-hidden bg-elevated">
                            {thumbUrl && !hasError ? (
                              <img
                                src={thumbUrl}
                                alt={video.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={() => setThumbnailErrors(prev => ({ ...prev, [video._id]: true }))}
                              />
                            ) : (
                              <MediaPlaceholder kind="thumbnail" className="w-full h-full" />
                            )}
                            {video.duration && <DurationBadge seconds={video.duration} />}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-8 h-8 rounded-full bg-accent-light text-accent-on-light flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              </div>
                            </div>
                          </Link>

                          {/* Info */}
                          <div className="flex-1 min-w-0 py-1">
                            <Link to={`/video/${video._id}`}>
                              <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent-light transition-colors leading-tight">
                                {video.title || 'Untitled Video'}
                              </h3>
                            </Link>

                            {(owner.username || owner.fullName) && (
                              <Link
                                to={`/channel/${owner.username}`}
                                className="mt-1.5 inline-block text-xs text-[var(--color-text-muted)] hover:text-text-secondary transition-colors"
                              >
                                {owner.fullName || owner.username}
                              </Link>
                            )}

                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-[11px] text-[var(--color-text-muted)]">{fmt(video.views || 0)} views</span>
                              {video.updatedAt && (
                                <>
                                  <span className="text-[var(--color-text-muted)]">·</span>
                                  <span className="text-[11px] text-[var(--color-text-muted)]">{ago(video.updatedAt)}</span>
                                </>
                              )}
                              {video.createdAt && !video.updatedAt && (
                                <>
                                  <span className="text-[var(--color-text-muted)]">·</span>
                                  <span className="text-[11px] text-[var(--color-text-muted)]">{ago(video.createdAt)}</span>
                                </>
                              )}
                            </div>

                            {video.description && (
                              <p className="mt-2 text-xs text-[var(--color-text-muted)] line-clamp-1">{video.description}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div {...fadeUp(0.1)}>
            <EmptyState
              icon={HistoryIcon}
              title="No watch history"
              description="Videos you watch will appear here. Start exploring!"
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}