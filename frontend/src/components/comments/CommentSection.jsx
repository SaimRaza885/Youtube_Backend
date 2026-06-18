import { MessageCircle } from 'lucide-react'
import { CommentItem } from './CommentItem'
import { CommentForm } from './CommentForm'

export const CommentSection = ({ comments, videoId, currentUser, onSubmitComment, commentLoading }) => {
  const userAvatar = currentUser?.avatar?.url || currentUser?.avatar || null

  return (
    <div>
      <h2 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-text-tertiary" strokeWidth={2} />
        {comments?.length || 0} Comments
      </h2>
      <CommentForm userAvatar={userAvatar} onSubmit={onSubmitComment} loading={commentLoading} />
      <div className="space-y-5">
        {comments?.length > 0 ? (
          comments.map((c) => <CommentItem key={c._id} comment={c} />)
        ) : (
          <p className="text-center text-text-tertiary/60 text-sm py-8">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  )
}
