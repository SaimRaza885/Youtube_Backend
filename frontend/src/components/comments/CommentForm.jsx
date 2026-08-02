import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { MediaPlaceholder } from '../common/MediaPlaceholder'
import { useAuth } from '../../context/AuthContext'

export const CommentForm = ({ userAvatar, onSubmit, loading }) => {
  const { isAuthenticated } = useAuth()
  const [text, setText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await onSubmit(text.trim())
    setText('')
  }

  if (!isAuthenticated) {
    return (
      <div className="flex gap-3 mb-6 items-center">
        <div className="w-9 h-9 rounded-full bg-[var(--color-overlay-hover)] shrink-0 flex items-center justify-center">
          <span className="text-xs text-[var(--color-text-muted)]">?</span>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          <Link to="/login" className="text-accent hover:text-accent-light font-semibold">Log in</Link> or{' '}
          <Link to="/register" className="text-accent hover:text-accent-light font-semibold">sign up</Link> to leave a comment
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      {userAvatar ? (
        <img
          src={userAvatar}
          alt=""
          className="w-9 h-9 rounded-full object-cover ring-1 ring-border-subtle shrink-0"
        />
      ) : (
        <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-border-subtle shrink-0">
          <MediaPlaceholder kind="avatar" className="w-full h-full" />
        </div>
      )}
      <div className="flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full bg-transparent border-b border-border-subtle pb-2 text-sm text-text-primary placeholder-text-tertiary/60 focus:outline-hidden focus:border-accent transition-colors"
        />
        {text.trim() && (
          <div className="flex justify-end gap-2 mt-3">
            <Button variant="ghost" size="sm" onClick={() => setText('')}>Cancel</Button>
            <Button loading={loading} size="sm" type="submit">Comment</Button>
          </div>
        )}
      </div>
    </form>
  )
}
