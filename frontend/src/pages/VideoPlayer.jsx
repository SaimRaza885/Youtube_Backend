import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { videoAPI, commentAPI, likeAPI, channelAPI } from '../services/endpoints'
import { Button, Skeleton } from '../components'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { ThumbsUp, ThumbsDown, Share2, User } from 'lucide-react'
import { fmt, ago } from '../utils'

export const VideoPlayer = () => {
  const { videoId } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { addNotification } = useUI()

  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)

  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState(0)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true)
        const response = await videoAPI.getVideoById(videoId)
        const data = response.data.data
        setVideo(data)
        setIsLiked(data.isLiked || false)
        setLikeCount(data.like_Count || 0)
        setIsSubscribed(data.owner?.isSubscribed || false)
        setSubscriberCount(data.owner?.Subscribers_Count || 0)
        setComments(data.All_Comments || [])
      } catch (err) {
        setError('Failed to load video')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchVideo()
  }, [videoId, navigate])

  const handleLike = useCallback(async () => {
    if (!isAuthenticated) { addNotification('Please login to like', 'info'); return }
    try {
      const res = await likeAPI.likeVideo(videoId)
      setIsLiked(res.data.data.isLiked)
      setLikeCount(prev => res.data.data.isLiked ? prev + 1 : (prev > 0 ? prev - 1 : 0))
      if (isDisliked) setIsDisliked(false)
    } catch { addNotification('Failed to like video', 'error') }
  }, [videoId, isAuthenticated, isDisliked, addNotification])

  const handleDislike = useCallback(async () => {
    if (!isAuthenticated) { addNotification('Please login to dislike', 'info'); return }
    try {
      const res = await likeAPI.likeVideo(videoId)
      setIsDisliked(!isDisliked)
      if (isLiked) { setIsLiked(false); setLikeCount(prev => (prev > 0 ? prev - 1 : 0)) }
    } catch { addNotification('Failed', 'error') }
  }, [videoId, isAuthenticated, isLiked, addNotification])

  const handleSubscribe = useCallback(async () => {
    if (!isAuthenticated) { addNotification('Please login to subscribe', 'info'); return }
    try {
      const res = await channelAPI.subscribeChannel(video.owner._id)
      setIsSubscribed(res.data.data.isSubscribed)
      setSubscriberCount(prev => res.data.data.isSubscribed ? prev + 1 : prev - 1)
    } catch { addNotification('Failed to subscribe', 'error') }
  }, [isAuthenticated, video, addNotification])

  const handleAddComment = useCallback(async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    if (!isAuthenticated) { addNotification('Please login to comment', 'info'); return }
    try {
      setCommentLoading(true)
      await commentAPI.addComment(videoId, { content: newComment })
      setNewComment('')
      const response = await commentAPI.getComments(videoId)
      setComments(response.data.data?.docs || [])
    } catch { addNotification('Failed to add comment', 'error') }
    finally { setCommentLoading(false) }
  }, [newComment, videoId, isAuthenticated, addNotification])

  if (loading) return <div className="container-custom py-8"><Skeleton className="w-full aspect-video rounded-xl" /><div className="mt-6 space-y-4"><Skeleton className="h-8 w-2/3" /><Skeleton className="h-4 w-1/3" /><Skeleton className="h-24 w-full" /></div></div>
  if (!video) return <div className="container-custom py-8 text-center text-text-secondary">Video not found</div>

  const owner = video.owner || {}
  const ownerUsername = owner.username || 'Unknown'
  const ownerAvatar = owner.avatar || null

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
            <video src={video.videoFile?.url} controls className="w-full h-full" controlsList="nodownload" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-text-primary">{video.title}</h1>
            <div className="flex items-center justify-between flex-wrap gap-3 mt-2">
              <p className="text-sm text-text-tertiary">{fmt(video.views)} views &bull; {ago(video.createdAt)}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-tertiary rounded-full overflow-hidden">
                  <button onClick={handleLike} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors hover:bg-elevated border-r border-border-subtle ${isLiked ? 'text-accent' : 'text-text-secondary'}`}>
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-accent' : ''}`} />
                    {likeCount > 0 && <span>{fmt(likeCount)}</span>}
                  </button>
                  <button onClick={handleDislike} className={`px-4 py-2 text-sm font-medium transition-colors hover:bg-elevated ${isDisliked ? 'text-accent' : 'text-text-secondary'}`}>
                    <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-accent' : ''}`} />
                  </button>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-tertiary rounded-full text-sm font-medium text-text-secondary hover:bg-elevated transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-secondary border border-border-subtle rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Link to={`/channel/${ownerUsername}`}>
                {ownerAvatar ? (
                  <img src={ownerAvatar} alt={ownerUsername} className="w-10 h-10 rounded-full object-cover ring-2 ring-border-subtle" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center">
                    <User className="w-5 h-5 text-text-tertiary" />
                  </div>
                )}
              </Link>
              <div>
                <Link to={`/channel/${ownerUsername}`} className="font-semibold text-sm text-text-primary hover:text-accent transition-colors">
                  {owner.fullName || ownerUsername}
                </Link>
                <p className="text-xs text-text-tertiary">{fmt(subscriberCount)} subscribers</p>
              </div>
            </div>
            <Button size="sm" onClick={handleSubscribe}>
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>

          {video.description && (
            <div className="bg-secondary border border-border-subtle rounded-xl p-4">
              <p className="text-sm text-text-primary whitespace-pre-wrap">{video.description}</p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-4">Comments ({comments.length})</h2>
            <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
              <input
                type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..." disabled={commentLoading}
                className="flex-1 bg-tertiary border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary/60 focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
              />
              <Button loading={commentLoading} type="submit" size="sm" disabled={!newComment.trim()}>Post</Button>
            </form>
            <div className="space-y-4">
              {comments.length > 0 ? comments.map((comment, idx) => {
                const cOwner = comment.comment_owner || {}
                const cAvatar = cOwner.avatar || null
                return (
                  <div key={comment._id || idx} className="flex gap-3">
                    {cAvatar ? (
                      <img src={cAvatar} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-subtle shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-text-tertiary" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-text-primary">@{cOwner.username || 'unknown'}</span>
                        <span className="text-xs text-text-tertiary">{ago(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-text-primary/90 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                )
              }) : (
                <p className="text-center text-text-tertiary/60 text-sm py-8">No comments yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-text-primary mb-4">Related Videos</h2>
          <p className="text-text-tertiary text-sm">More videos coming soon</p>
        </div>
      </div>
    </div>
  )
}
