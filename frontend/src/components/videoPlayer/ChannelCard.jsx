import { Link } from 'react-router-dom'
import { User, Pencil, Trash2 } from 'lucide-react'
import { SubscribeButton } from '../common/SubscribeButton'
import { fmt } from '../../utils'

export const ChannelCard = ({
  owner, ownerUsername, ownerAvatar, subscriberCount,
  isSubscribed, isOwner, videoId, channelId,
  onSubscribe, onDelete,
}) => (
  <div
    className="flex items-center justify-between rounded-xl p-4"
    style={{
      background: 'var(--color-overlay-strong)',
      border: '1px solid var(--color-border-subtle)',
    }}
  >
    <div className="flex items-center gap-3">
      <Link to={`/channel/${ownerUsername}`}>
        {ownerAvatar ? (
          <img src={ownerAvatar} alt={ownerUsername} className="w-10 h-10 rounded-full object-cover" style={{ boxShadow: '0 0 0 2px var(--color-border-subtle)' }} />
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-overlay-hover)' }}>
            <User className="w-5 h-5 text-[var(--color-text-muted)]" />
          </div>
        )}
      </Link>
      <div>
        <Link to={`/channel/${ownerUsername}`} className="font-semibold text-sm text-text-primary hover:text-accent-light transition-colors">
          {owner.fullName || ownerUsername}
        </Link>
        <p className="text-xs text-[var(--color-text-muted)]">{fmt(subscriberCount)} subscribers</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {isOwner && (
        <>
          <Link
            to={`/video/edit/${videoId}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{ background: 'var(--color-overlay-hover)', color: 'var(--color-text-secondary)' }}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </>
      )}
      <SubscribeButton
        channelId={channelId}
        isSubscribed={isSubscribed}
        subscriberCount={subscriberCount}
        onSubscribe={onSubscribe}
        size="sm"
      />
    </div>
  </div>
)