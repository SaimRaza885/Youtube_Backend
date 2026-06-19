import { ago } from '../../utils'

export const CommentItem = ({ comment }) => {
  if (!comment) return null
  const owner = comment.comment_owner || {}
  const avatarUrl = owner.avatar?.url || owner.avatar || 'https://placehold.co/36x36/24243A/A1A1B5?text=U'

  return (
    <div className="flex gap-3">
      <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-subtle shrink-0" />
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
