import { ago } from '../../utils'
import { MediaPlaceholder } from '../common/MediaPlaceholder'

export const CommentItem = ({ comment }) => {
  if (!comment) return null
  const owner = comment.comment_owner || {}
  const avatarUrl = owner.avatar?.url || owner.avatar || null

  return (
    <div className="flex gap-3">
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-subtle shrink-0" />
      ) : (
        <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-border-subtle shrink-0">
          <MediaPlaceholder kind="avatar" className="w-full h-full" />
        </div>
      )}
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-text-primary">@{owner.username || 'unknown'}</span>
          <span className="text-xs text-text-tertiary">{ago(comment.createdAt)}</span>
        </div>
        <p className="text-sm text-text-primary/90 leading-relaxed">{comment.content}</p>
      </div>
    </div>
  )
}
