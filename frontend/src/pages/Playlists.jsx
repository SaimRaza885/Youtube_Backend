import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { playlistAPI, videoAPI } from '../services/endpoints'
import { Card, Button, Modal, Input, Skeleton } from '../components'
import { Link } from 'react-router-dom'
import { useUI } from '../context/UIContext'

export const Playlists = () => {
  const { user } = useAuth()
  const { addNotification } = useUI()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [playlistVideos, setPlaylistVideos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true)
        const response = await playlistAPI.getAllPlaylists()
        setPlaylists(response.data.data || [])
      } catch (err) {
        addNotification('Failed to load playlists', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchPlaylists()
  }, [])

  const handleSelectPlaylist = async (playlist) => {
    setSelectedPlaylist(playlist)
    try {
      const response = await playlistAPI.getPlaylistById(playlist._id)
      setPlaylistVideos(response.data.data?.videos || [])
    } catch (err) {
      addNotification('Failed to load playlist videos', 'error')
    }
  }

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return
    try {
      const response = await playlistAPI.createPlaylist({ name: newPlaylistName })
      setPlaylists(prev => [...prev, response.data.data])
      setNewPlaylistName('')
      setShowModal(false)
      addNotification('Playlist created!', 'success')
    } catch (err) {
      addNotification('Failed to create playlist', 'error')
    }
  }

  if (loading) return <div className="container-custom py-8"><Skeleton className="w-full h-96" /></div>

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Your Playlists</h1>
        <Button onClick={() => setShowModal(true)}>Create Playlist</Button>
      </div>

      {!selectedPlaylist ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <Card key={playlist._id} onClick={() => handleSelectPlaylist(playlist)} hover>
              <div className="w-full aspect-square bg-gradient-to-br from-accent to-accent-hover rounded-lg mb-3 flex items-center justify-center">
                <span className="text-4xl text-white">🎬</span>
              </div>
              <h3 className="font-semibold text-text-primary truncate">{playlist.name}</h3>
              <p className="text-text-secondary text-sm">{playlist.videos?.length || 0} videos</p>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedPlaylist(null)}
            className="mb-6 flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Playlists
          </button>
          <h2 className="text-2xl font-bold text-text-primary mb-6">{selectedPlaylist.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlistVideos.map((video) => (
              <Link key={video._id} to={`/video/${video._id}`}>
                <Card hover>
                  <div className="w-full aspect-video bg-tertiary rounded-lg overflow-hidden mb-3">
                    <img
                      src={video.thumbnail || 'https://via.placeholder.com/320x180'}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-text-primary truncate-text-2 text-sm">{video.title}</h3>
                </Card>
              </Link>
            ))}
          </div>
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
          <div className="flex gap-3">
            <Button fullWidth variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button fullWidth onClick={handleCreatePlaylist}>
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
