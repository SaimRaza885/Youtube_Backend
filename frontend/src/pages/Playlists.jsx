import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { playlistAPI } from '../services/endpoints'
import { Button, Modal, Input, Skeleton, EmptyState, ErrorState } from '../components'
import { Link } from 'react-router-dom'
import { useUI } from '../context/UIContext'
import { ListMusic, ArrowLeft } from 'lucide-react'

export const Playlists = () => {
  const { user } = useAuth()
  const { addNotification } = useUI()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [playlistVideos, setPlaylistVideos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('')
  const [addVideoId, setAddVideoId] = useState('')
  const [addingVideo, setAddingVideo] = useState(false)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    const fetchPlaylists = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await playlistAPI.getUserPlaylists(user._id)
        setPlaylists(response.data.data || [])
      } catch (err) {
        setError('Failed to load playlists')
      } finally {
        setLoading(false)
      }
    }
    fetchPlaylists()
  }, [user])

  const handleSelectPlaylist = async (playlist) => {
    setSelectedPlaylist(playlist)
    try {
      const response = await playlistAPI.getPlaylistById(playlist._id)
      setPlaylistVideos(response.data.data?.Videos || [])
    } catch {
      addNotification('Failed to load playlist videos', 'error')
    }
  }

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return
    try {
      const response = await playlistAPI.createPlaylist({ name: newPlaylistName, description: newPlaylistDescription })
      setPlaylists(prev => [...prev, response.data.data])
      setNewPlaylistName('')
      setNewPlaylistDescription('')
      setShowModal(false)
      addNotification('Playlist created!', 'success')
    } catch {
      addNotification('Failed to create playlist', 'error')
    }
  }

  const handleAddVideo = async () => {
    if (!addVideoId.trim()) return
    setAddingVideo(true)
    try {
      await playlistAPI.addVideoToPlaylist(selectedPlaylist._id, addVideoId.trim())
      addNotification('Video added to playlist!', 'success')
      setAddVideoId('')
      const response = await playlistAPI.getPlaylistById(selectedPlaylist._id)
      setPlaylistVideos(response.data.data?.Videos || [])
    } catch {
      addNotification('Failed to add video. Check the video ID.', 'error')
    } finally {
      setAddingVideo(false)
    }
  }

  if (!user) return <div className="container-custom py-8 text-center text-text-secondary">Please log in to view playlists</div>
  if (loading) return <div className="container-custom py-8"><Skeleton className="w-full h-48 rounded-xl" /></div>
  if (error) return <div className="container-custom py-8"><ErrorState message={error} onRetry={() => window.location.reload()} /></div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Your Playlists</h1>
        <Button onClick={() => setShowModal(true)}>Create Playlist</Button>
      </div>

      {!selectedPlaylist ? (
        playlists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                onClick={() => handleSelectPlaylist(playlist)}
                className="bg-secondary border border-border-subtle rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-accent/30 hover:shadow-card-hover"
              >
                <div className="w-full aspect-video bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
                  <ListMusic className="w-12 h-12 text-white/80" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text-primary truncate">{playlist.name}</h3>
                  <p className="text-text-tertiary text-sm">{playlist.totalVideos || 0} videos</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={ListMusic} title="No playlists yet" description="Create your first playlist to organize videos" />
        )
      ) : (
        <div>
          <button
            onClick={() => { setSelectedPlaylist(null); setPlaylistVideos([]) }}
            className="mb-4 flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Playlists
          </button>
          <h2 className="text-xl font-bold text-text-primary mb-4">{selectedPlaylist.name}</h2>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={addVideoId}
              onChange={(e) => setAddVideoId(e.target.value)}
              placeholder="Paste a video ID to add..."
              className="flex-1 bg-tertiary border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-primary placeholder-text-tertiary/60 focus:outline-none focus:border-accent transition-colors"
            />
            <Button size="sm" loading={addingVideo} onClick={handleAddVideo} disabled={!addVideoId.trim()}>Add</Button>
          </div>
          {playlistVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlistVideos.map((video) => (
                <Link key={video._id} to={`/video/${video._id}`} className="group">
                  <div className="bg-secondary border border-border-subtle rounded-xl overflow-hidden transition-all duration-200 hover:border-accent/30 hover:shadow-card-hover">
                    <div className="w-full aspect-video bg-tertiary overflow-hidden">
                      <img
                        src={video.thumbnail?.url || 'https://placehold.co/320x180/1C1C2E/6B6B80?text=No+Thumbnail'}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-text-primary text-sm line-clamp-2">{video.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-text-tertiary text-sm">This playlist is empty</p>
          )}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Playlist">
        <div className="space-y-4">
          <Input
            label="Playlist Name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="My awesome playlist"
          />
          <Input
            label="Description"
            value={newPlaylistDescription}
            onChange={(e) => setNewPlaylistDescription(e.target.value)}
            placeholder="A short description of this playlist"
          />
          <div className="flex gap-3">
            <Button fullWidth variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button fullWidth onClick={handleCreatePlaylist}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
