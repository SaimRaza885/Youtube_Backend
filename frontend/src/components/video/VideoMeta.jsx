import { ThumbsUp } from 'lucide-react'

const fmt = (v) => v ? (v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(1)}K` : `${v}`) : '0'

const ago = (d) => {
  if (!d) return ''
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000)
  if (m < 1) return 'Just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const days = Math.floor(h / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

export const VideoMeta = ({ title, views, createdAt, liked, likeCount, onLike }) => (
  <div>
    <h1 className="text-xl font-bold text-text-primary leading-7 mb-3">{title}</h1>
    <div className="flex items-center justify-between flex-wrap gap-3">
      <p className="text-sm text-text-tertiary">{fmt(views)} views &bull; {ago(createdAt)}</p>
      <button
        onClick={onLike}
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          liked
            ? 'bg-accent-muted text-accent'
            : 'bg-tertiary text-text-tertiary hover:bg-elevated hover:text-text-primary'
        }`}
      >
        <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} strokeWidth={2} />
        {likeCount > 0 && <span>{fmt(likeCount)}</span>}
      </button>
    </div>
  </div>
)
