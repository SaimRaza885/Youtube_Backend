import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Pencil, Play, ListMusic, FolderOpen } from 'lucide-react'
import { playlistAPI, videoAPI } from '../services/endpoints'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { Skeleton, ConfirmDialog } from '../components'
import { formatDuration, ago } from '../utils'
import { EditPlaylistModal } from '../components/playlist/PlaylistModals'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

export const PlaylistDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user: currentUser } = useAuth()
  const { addNotification } = useUI()

  const [playlist, setPlaylist] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [removingVideo, setRemovingVideo] = useState(null)

  const [showEdit, setShowEdit] = useState(false)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const [addVideoId, setAddVideoId] = useState('')
  const [addingVideo, setAddingVideo] = useState(false)

  const [showDeletePlaylist, setShowDeletePlaylist] = useState(false)
  const [removeVideoId, setRemoveVideoId] = useState(null)

  const [userVideos, setUserVideos] = useState([])
  const [showUserVideos, setShowUserVideos] = useState(false)
  const [loadingUserVideos, setLoadingUserVideos] = useState(false)

  const fetchPlaylist = useCallback(async () => {
    try {
      setLoading(true)
      const res = await playlistAPI.getPlaylistById(id)
      const data = res.data.data
      setPlaylist(data)
      setVideos(data.Videos || [])
    } catch {
      setError('Failed to load playlist')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchPlaylist()
  }, [fetchPlaylist])

  const confirmDeletePlaylist = async () => {
    try {
      await playlistAPI.deletePlaylist(id)
      addNotification('Playlist deleted!', 'success')
      navigate('/playlists')
    } catch {
      addNotification('Failed to delete playlist', 'error')
    }
  }

  const handleEdit = async () => {
    if (!editName.trim()) return
    try {
      const res = await playlistAPI.updatePlaylist(id, { name: editName, description: editDescription })
      setPlaylist(res.data.data)
      setShowEdit(false)
      addNotification('Playlist updated!', 'success')
    } catch {
      addNotification('Failed to update playlist', 'error')
    }
  }

  const handleAddVideo = async () => {
    if (!addVideoId.trim()) return
    setAddingVideo(true)
    try {
      await playlistAPI.addVideoToPlaylist(id, addVideoId.trim())
      addNotification('Video added!', 'success')
      setAddVideoId('')
      fetchPlaylist()
    } catch {
      addNotification('Failed to add video', 'error')
    } finally {
      setAddingVideo(false)
    }
  }

  const confirmRemoveVideo = async () => {
    if (!removeVideoId) return
    setRemovingVideo(removeVideoId)
    try {
      await playlistAPI.removeVideoFromPlaylist(id, removeVideoId)
      setVideos(prev => prev.filter(v => v._id !== removeVideoId))
      addNotification('Video removed', 'success')
    } catch {
      addNotification('Failed to remove video', 'error')
    } finally {
      setRemovingVideo(null)
      setRemoveVideoId(null)
    }
  }

  const handleBrowseVideos = async () => {
    if (showUserVideos) { setShowUserVideos(false); return }
    setShowUserVideos(true)
    setLoadingUserVideos(true)
    try {
      const res = await videoAPI.getVideosByUser(currentUser?._id, { limit: 50, sortBy: 'createdAt', sortType: 'desc' })
      setUserVideos(res.data.data?.docs || res.data.data || [])
    } catch {} finally {
      setLoadingUserVideos(false)
    }
  }

  const handleAddUserVideo = async (videoId) => {
    try {
      await playlistAPI.addVideoToPlaylist(id, videoId)
      addNotification('Video added!', 'success')
      fetchPlaylist()
    } catch {
      addNotification('Failed to add video', 'error')
    }
  }

  if (loading) {
    return (
      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <Skeleton className="w-full h-64 rounded-2xl mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-video rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !playlist) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <FolderOpen className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4" />
          <p className="text-text-secondary text-lg">{error || 'Playlist not found'}</p>
          <Link to="/playlists" className="mt-4 inline-block text-accent-light hover:text-accent-hover-text transition-colors">
            Back to Playlists
          </Link>
        </div>
      </div>
    )
  }

  const isPublic = playlist.isPublic !== false
  const totalVideos = videos.length
  const timeAgo = ago(playlist.updatedAt || playlist.createdAt)

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-30" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-20" />
      </div>

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        {/* Back Button */}
        <motion.div {...fadeUp(0)} className="mb-6">
          <Link
            to="/playlists"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Playlists
          </Link>
        </motion.div>

        {/* Playlist Header */}
        <motion.div {...fadeUp(0.05)} className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-start gap-5">
              {/* Thumbnail */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center"
                style={{
                  background: (playlist.thumbnail?.url || playlist.thumbnail || videos[0]?.thumbnail?.url)
                    ? undefined
                    : 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))',
                  boxShadow: '0 8px 32px var(--color-accent-glow-light)',
                }}
              >
                {(playlist.thumbnail?.url || playlist.thumbnail || videos[0]?.thumbnail?.url) ? (
                  <img src={playlist.thumbnail?.url || playlist.thumbnail || videos[0]?.thumbnail?.url} alt={playlist.name} className="w-full h-full object-cover" />
                ) : (
                  <ListMusic className="w-10 h-10 md:w-14 md:h-14 text-white/60" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[var(--color-overlay-hover)] border border-subtle text-text-secondary">
                    {isPublic ? 'Public' : 'Private'}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">Updated {timeAgo}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1 truncate">{playlist.name}</h1>
                <p className="text-sm text-text-secondary line-clamp-2 max-w-xl">{playlist.description || 'No description'}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                    <ListMusic className="w-3.5 h-3.5" />
                    {totalVideos} videos
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => { setEditName(playlist.name); setEditDescription(playlist.description || ''); setShowEdit(true) }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-overlay-hover)] text-text-primary hover:bg-[var(--color-overlay-hover)] transition-all text-xs font-medium border border-subtle"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => setShowDeletePlaylist(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs font-medium border border-red-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        </motion.div>

        {/* Add Video Section */}
        <motion.div {...fadeUp(0.1)} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <input
                type="text" value={addVideoId}
                onChange={(e) => setAddVideoId(e.target.value)}
                placeholder="Paste a video ID to add..."
                className="w-full bg-[var(--color-search-bg)] border border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-accent-light transition-colors"
              />
            </div>
            <button
              onClick={handleAddVideo}
              disabled={!addVideoId.trim() || addingVideo}
              className="px-5 py-2.5 rounded-lg bg-accent text-accent-on-dark hover:bg-accent-light hover:text-accent-on-light transition-all text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingVideo ? 'Adding...' : 'Add Video'}
            </button>
            <button
              onClick={handleBrowseVideos}
              className="px-5 py-2.5 rounded-lg bg-[var(--color-overlay-hover)] text-text-primary hover:bg-[var(--color-overlay-hover)] transition-all text-xs font-medium border border-subtle"
            >
              {showUserVideos ? 'Close Browser' : 'Browse Videos'}
            </button>
          </div>

          {/* User Video Browser */}
          {showUserVideos && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 bg-[var(--color-search-bg)] border border-subtle rounded-xl p-4"
            >
              {loadingUserVideos ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="w-full aspect-video rounded-lg" />
                  ))}
                </div>
              ) : userVideos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {userVideos.map((video) => {
                    const alreadyIn = videos.some(v => v._id === video._id)
                    return (
                      <button
                        key={video._id}
                        onClick={() => !alreadyIn && handleAddUserVideo(video._id)}
                        disabled={alreadyIn}
                        className={`relative group text-left rounded-lg overflow-hidden border transition-all ${alreadyIn
                          ? 'border-[#22C55E]/30 opacity-60 cursor-not-allowed'
                          : 'border-subtle hover:border-accent-light/30'
                          }`}
                      >
                        <div className="w-full aspect-video bg-elevated overflow-hidden">
                          <img
                            src={video.thumbnail?.url || 'https://placehold.co/320x180/1C1C2E/6B6B80?text=No+Thumbnail'}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-xs text-text-primary line-clamp-2 leading-tight">{video.title}</p>
                        </div>
                        {alreadyIn && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-[10px] font-semibold text-white bg-[#22C55E] px-2 py-0.5 rounded">Added</span>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-[var(--color-text-muted)] text-center py-4">No videos available</p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Videos Grid */}
        <motion.div {...fadeUp(0.15)}>
          <h2 className="text-xl font-semibold text-text-primary mb-6">Videos</h2>
        </motion.div>

        {videos.length > 0 ? (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video, idx) => (
              <motion.div
                key={video._id}
                {...fadeUp(0.05 * idx)}
                className="group relative"
              >
                <Link to={`/video/${video._id}`} className="block">
                  <div className="rounded-xl overflow-hidden border border-subtle transition-all duration-300 group-hover:border-accent-light/30 group-hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
                    }}
                  >
                    <div className="relative aspect-video bg-elevated overflow-hidden">
                      <img
                        src={video.thumbnail?.url || 'https://placehold.co/320x180/1C1C2E/6B6B80?text=No+Thumbnail'}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {video.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium border border-white/10">
                          {formatDuration(video.duration)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-accent-light text-accent-on-light flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent-light transition-colors leading-tight">
                        {video.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1.5">
                        {video.views ? `${video.views >= 1000 ? `${(video.views / 1000).toFixed(1)}K` : video.views} views` : ''}
                        {video.views && video.createdAt ? ' · ' : ''}
                        {video.createdAt ? ago(video.createdAt) : ''}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => setRemoveVideoId(video._id)}
                  disabled={removingVideo === video._id}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 text-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80 disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div {...fadeUp(0.2)} className="flex flex-col items-center justify-center py-20 text-center">
            <ListMusic className="w-16 h-16 text-[var(--color-text-muted)] mb-4" />
            <p className="text-text-secondary text-lg mb-1">This playlist is empty</p>
            <p className="text-[var(--color-text-muted)] text-sm">Add videos using the options above</p>
          </motion.div>
        )}
      </div>

      <ConfirmDialog
        open={showDeletePlaylist}
        onClose={() => setShowDeletePlaylist(false)}
        onConfirm={confirmDeletePlaylist}
        title="Delete Playlist"
        message="This action is permanent and cannot be undone. All videos will remain in your library but will no longer be grouped in this playlist."
        confirmText="delete"
      />

      <ConfirmDialog
        open={!!removeVideoId}
        onClose={() => setRemoveVideoId(null)}
        onConfirm={confirmRemoveVideo}
        title="Remove Video"
        message="Remove this video from the playlist? The video itself will not be deleted."
        confirmText="remove"
      />

      <EditPlaylistModal
        showEditModal={showEdit}
        setShowEditModal={setShowEdit}
        setEditingPlaylist={() => {}}
        editName={editName}
        setEditName={setEditName}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        handleEditPlaylist={handleEdit}
      />
    </div>
  )
}