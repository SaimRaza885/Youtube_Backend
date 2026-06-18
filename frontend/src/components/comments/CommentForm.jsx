import { useState } from 'react'
import { Button } from '../ui/Button'

export const CommentForm = ({ userAvatar, onSubmit, loading }) => {
  const [text, setText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await onSubmit(text.trim())
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <img
        src={userAvatar || 'https://placehold.co/36x36/24243A/A1A1B5?text=U'}
        alt=""
        className="w-9 h-9 rounded-full object-cover ring-1 ring-border-subtle shrink-0"
      />
      <div className="flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full bg-transparent border-b border-border-subtle pb-2 text-sm text-text-primary placeholder-text-tertiary/60 focus:outline-none focus:border-accent transition-colors"
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
