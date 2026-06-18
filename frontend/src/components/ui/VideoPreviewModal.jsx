import { useState, useEffect } from 'react'
import { X, ThumbsUp, ThumbsDown, Share2, Bookmark, Play } from 'lucide-react'
import { useUI } from '../../context/UIContext'

const fmt = (v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(1)}K` : `${v}`

const ago = (d) => {
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000)
  if (m < 1) return 'Just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const days = Math.floor(h / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const mockComments = [
  {
    id: 'c1',
    author: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    text: 'This is exactly what I was looking for! The explanation was super clear and easy to follow.',
    timestamp: '2 days ago',
    likes: 342,
  },
  {
    id: 'c2',
    author: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    text: 'I have been following your channel for months and every single video is gold. Keep it up!',
    timestamp: '5 days ago',
    likes: 128,
  },
  {
    id: 'c3',
    author: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    text: 'Could you make a follow-up video covering more advanced topics? Would love to dive deeper.',
    timestamp: '1 week ago',
    likes: 89,
  },
]

export const VideoPreviewModal = () => {
  const { showVideoPreview, selectedVideo, closeVideoPreview } = useUI()
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (showVideoPreview) setAnimating(true)
  }, [showVideoPreview])

  if (!showVideoPreview || !selectedVideo) return null

  const video = selectedVideo
  const channelName = video.ownerDetails?.username || video.owner?.username || 'Unknown'
  const channelAvatar = video.ownerDetails?.avatar || video.owner?.avatar || 'https://placehold.co/100x100/24243A/A1A1B5?text=U'

  const handleLike = () => {
    setLiked(!liked)
    if (disliked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked(!disliked)
    if (liked) setLiked(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={closeVideoPreview}
    >
      <div
        className={`bg-[#14141F] border border-[#2A2A42] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          animating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#14141F] flex items-center justify-between p-4 border-b border-[#2A2A42] rounded-t-xl z-10">
          <h2 className="text-lg font-bold text-[#F0F0F8] flex items-center gap-2 truncate">
            Video Preview
          </h2>
          <button
            onClick={closeVideoPreview}
            className="text-[#6B6B80] hover:text-[#F0F0F8] p-1.5 rounded-full hover:bg-[#1C1C2E] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-0">
          <div className="relative w-full aspect-video bg-black flex items-center justify-center group cursor-pointer">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#FF0000]/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <Play className="w-7 h-7 text-white ml-0.5" fill="white" />
              </div>
            </div>
            <span className="absolute bottom-3 right-3 bg-black/85 text-white text-xs font-medium px-2 py-1 rounded">
              {formatDuration(video.duration)}
            </span>
          </div>

          <div className="p-4 lg:p-6">
            <h1 className="text-base lg:text-lg font-bold text-[#F0F0F8] leading-6 mb-3">
              {video.title || 'Untitled Video'}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={channelAvatar}
                  alt={channelName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-[#2A2A42]"
                />
                <div>
                  <p className="text-sm font-semibold text-[#F0F0F8]">{channelName}</p>
                  <p className="text-xs text-[#6B6B80]">{fmt(video.views)} views</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#1C1C2E] rounded-full overflow-hidden">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors hover:bg-[#24243A] border-r border-[#2A2A42] ${
                      liked ? 'text-[#8B5CF6]' : 'text-[#A1A1B5]'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-[#8B5CF6]' : ''}`} strokeWidth={2} />
                    <span>{fmt(liked ? (video.views ? Math.floor(video.views / 20) : 1200) + 1 : video.views ? Math.floor(video.views / 20) : 1200)}</span>
                  </button>
                  <button
                    onClick={handleDislike}
                    className={`px-4 py-2 text-sm font-medium transition-colors hover:bg-[#24243A] ${
                      disliked ? 'text-[#8B5CF6]' : 'text-[#A1A1B5]'
                    }`}
                  >
                    <ThumbsDown className={`w-4 h-4 ${disliked ? 'fill-[#8B5CF6]' : ''}`} strokeWidth={2} />
                  </button>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C2E] rounded-full text-sm font-medium text-[#A1A1B5] hover:bg-[#24243A] transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button className="p-2 bg-[#1C1C2E] rounded-full text-[#A1A1B5] hover:bg-[#24243A] transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-[#1C1C2E] rounded-xl p-4 mb-6">
              <p className="text-xs text-[#6B6B80] mb-1">
                {fmt(video.views)} views &bull; {ago(video.createdAt)}
              </p>
              <p className="text-sm text-[#D0D0E0] leading-6 line-clamp-3">
                This video covers everything you need to know about the topic. From beginner concepts to advanced techniques, we walk through each step with clear explanations and practical examples. Make sure to check out the links in the description for additional resources!
              </p>
            </div>

            <div className="border-t border-[#2A2A42] pt-4">
              <h3 className="text-base font-semibold text-[#F0F0F8] mb-4">
                Comments ({mockComments.length})
              </h3>
              <div className="space-y-4">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-[#2A2A42] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-[#F0F0F8]">{comment.author}</span>
                        <span className="text-xs text-[#6B6B80]">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-[#D0D0E0] leading-5">{comment.text}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <button className="flex items-center gap-1 text-xs text-[#6B6B80] hover:text-[#A1A1B5] transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs text-[#6B6B80] hover:text-[#A1A1B5] transition-colors">
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                        <button className="text-xs font-medium text-[#6B6B80] hover:text-[#A1A1B5] transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
