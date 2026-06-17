import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { videoAPI, commentAPI } from '../services/endpoints'
import { Input, Button, Card, Skeleton } from '../components'
import { useAuth } from '../context/AuthContext'

export const VideoPlayer = () => {
  const { videoId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await videoAPI.getVideoById(videoId)
        setVideo(response.data.data)
      } catch (err) {
        console.error('Failed to load video')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchVideo()
  }, [videoId])

  useEffect(() => {
    if (video) {
      const fetchComments = async () => {
        try {
          const response = await commentAPI.getComments(videoId)
          setComments(response.data.data || [])
        } catch (err) {
          console.error('Failed to load comments')
        }
      }
      fetchComments()
    }
  }, [video])

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      setCommentLoading(true)
      await commentAPI.addComment(videoId, { content: newComment })
      setNewComment('')
      // Refetch comments
      const response = await commentAPI.getComments(videoId)
      setComments(response.data.data || [])
    } catch (err) {
      console.error('Failed to add comment')
    } finally {
      setCommentLoading(false)
    }
  }

  if (loading) return <div className="container-custom py-8"><Skeleton className="w-full h-96" /></div>
  if (!video) return <div className="container-custom py-8 text-red-500">Video not found</div>

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="w-full aspect-video bg-primary rounded-lg overflow-hidden">
            <video
              src={video.videoFile}
              controls
              className="w-full h-full"
              controlsList="nodownload"
            />
          </div>

          {/* Video Info */}
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">{video.title}</h1>
            <div className="flex items-center justify-between text-text-secondary text-sm">
              <div className="flex items-center gap-4">
                <span>{video.views || 0} views</span>
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">👍 Like</Button>
                <Button variant="ghost" size="sm">👎 Dislike</Button>
              </div>
            </div>
          </div>

          {/* Channel Info */}
          <Card className="flex items-center gap-4">
            <img
              src={video.channelId?.avatar || 'https://via.placeholder.com/48'}
              alt={video.channelId?.username}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="font-semibold text-text-primary">{video.channelId?.username}</p>
              <p className="text-sm text-text-secondary">123K subscribers</p>
            </div>
            <Button>Subscribe</Button>
          </Card>

          {/* Description */}
          {video.description && (
            <Card>
              <p className="text-text-primary">{video.description}</p>
            </Card>
          )}

          {/* Comments */}
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-4">Comments ({comments.length})</h2>

            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="mb-6 flex gap-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-tertiary border border-text-secondary rounded-lg px-4 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent"
              />
              <Button loading={commentLoading} type="submit" size="sm">Post</Button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment._id}>
                  <div className="flex gap-3">
                    <img
                      src={comment.userId?.avatar || 'https://via.placeholder.com/36'}
                      alt={comment.userId?.username}
                      className="w-9 h-9 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text-primary text-sm">{comment.userId?.username}</p>
                        <p className="text-text-secondary text-xs">2 days ago</p>
                      </div>
                      <p className="text-text-primary text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Related Videos */}
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-4">Related Videos</h2>
          {/* Add related videos here */}
        </div>
      </div>
    </div>
  )
}
