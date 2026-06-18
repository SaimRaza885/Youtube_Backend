import { Link } from 'react-router-dom'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'

const fmt = (v) => v ? (v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(1)}K` : `${v}`) : '0'

export const ChannelInfo = ({ channel, description }) => {
  if (!channel) return null

  const username = channel.username || 'Unknown'
  const avatarUrl = channel.avatar?.url || channel.avatar || null
  const subscriberCount = channel.Subscribers_Count || channel.subscriberCount || 0

  return (
    <div className="bg-secondary border border-border-subtle rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <Link to={`/channel/${username}`}>
          <Avatar src={avatarUrl} alt={username} size="md" />
        </Link>
        <div className="min-w-0">
          <Link
            to={`/channel/${username}`}
            className="font-semibold text-sm text-text-primary hover:text-accent transition-colors block truncate"
          >
            {channel.fullName || username}
          </Link>
          <p className="text-xs text-text-tertiary">{fmt(subscriberCount)} subscribers</p>
        </div>
        <Button size="sm" className="ml-auto shrink-0">Subscribe</Button>
      </div>
      {description && (
        <p className="text-sm text-text-tertiary leading-relaxed whitespace-pre-wrap">{description}</p>
      )}
    </div>
  )
}
