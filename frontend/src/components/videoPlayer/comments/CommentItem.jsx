import { User, Pencil, Trash2 } from 'lucide-react'
import { ago } from '../../../utils'
import { Button } from '../../ui/Button'

const EMPTY = {}

export const CommentItem = ({
  comment, currentUserId, idx,
  editingCommentId, editCommentContent, actionLoadingId,
  onEditStart, onEditCancel, onEditContentChange,
  onUpdate, onDelete,
}) => {
  const cOwner = comment.comment_owner || comment.owner || EMPTY
  const commentOwnerId = cOwner._id || comment.owner?._id || comment.owner
  const isCommentOwner = currentUserId && String(currentUserId) === String(commentOwnerId)
  const cAvatar = cOwner.avatar || null

  return (
    <div
      className="flex gap-3 items-start p-3 rounded-xl transition-all"
      style={{
        background: 'var(--color-overlay)',
        border: '1px solid var(--color-overlay-hover)',
      }}
    >
{cAvatar?.url ? (
          <img src={cAvatar.url} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" style={{ boxShadow: '0 0 0 1px var(--color-border-subtle)' }} />
        ) : (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--color-overlay-hover)' }}>
          <User className="w-4 h-4 text-[var(--color-text-muted)]" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-text-primary">@{cOwner.username || 'unknown'}</span>
          <span className="text-xs text-[var(--color-text-muted)]">{ago(comment.createdAt)}</span>
        </div>

        {editingCommentId === comment._id ? (
          <div className="mt-2 space-y-2">
            <input
              type="text"
              value={editCommentContent}
              onChange={(e) => onEditContentChange(e.target.value)}
              disabled={actionLoadingId === comment._id}
              autoFocus
              className="w-full border rounded-xl px-3 py-1.5 text-sm outline-none transition-colors disabled:opacity-50 focus:border-accent-light/50"
              style={{
                background: 'var(--color-search-bg)',
                borderColor: 'var(--color-border-light)',
                color: 'var(--color-text-primary)',
              }}
            />
            <div className="flex gap-2">
              <Button
                size="xs"
                onClick={() => onUpdate(comment._id)}
                disabled={!editCommentContent.trim() || actionLoadingId === comment._id}
                className="!bg-accent !text-accent-on-dark hover:!bg-accent-light hover:!text-accent-on-light !rounded-xl !transition-all"
              >
                Save
              </Button>
              <Button
                size="xs"
                variant="secondary"
                onClick={onEditCancel}
                disabled={actionLoadingId === comment._id}
                className="!bg-[var(--color-overlay-hover)] !text-text-secondary hover:!bg-[var(--color-overlay-hover)] !rounded-xl !border !border-subtle !transition-all"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-primary/90 leading-relaxed break-words">{comment.content}</p>
        )}
      </div>

      {isCommentOwner && editingCommentId !== comment._id && (
        <div className="flex items-center gap-2 ml-auto shrink-0 self-center">
          <button
            onClick={() => onEditStart(comment._id, comment.content)}
            disabled={actionLoadingId !== null}
            className="p-2 rounded-lg transition-all disabled:opacity-40"
            style={{ background: 'rgba(255,178,183,0.08)', color: 'var(--color-accent-light)' }}
            title="Edit comment"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(comment._id)}
            disabled={actionLoadingId !== null}
            className="p-2 rounded-lg transition-all bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-40"
            title="Delete comment"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}