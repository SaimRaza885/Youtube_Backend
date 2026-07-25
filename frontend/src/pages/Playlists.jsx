import { motion } from 'framer-motion'
import { ListMusic, FolderOpen } from 'lucide-react'
import { Skeleton, ErrorState } from '../components'
import { usePlaylists } from '../hooks/usePlaylists'
import { PlaylistGrid } from '../components/playlist/PlaylistGrid'
import { CreatePlaylistModal, EditPlaylistModal } from '../components/playlist/PlaylistModals'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

export const Playlists = () => {
  const { user, loading, error, playlists, create, edit } = usePlaylists()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text-secondary text-lg">Please log in to view playlists</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <Skeleton className="w-64 h-10 rounded-lg mb-3" />
          <Skeleton className="w-full max-w-xl h-5 rounded-lg mb-6" />
          <div className="flex gap-4">
            <Skeleton className="w-28 h-8 rounded-lg" />
            <Skeleton className="w-28 h-8 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-[16/10] rounded-[18px]" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  const totalVideos = playlists.reduce((sum, p) => sum + (p.totalVideos || p.videos?.length || 0), 0)

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-30" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-20" />
      </div>

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-2">My Playlists</h1>
              <p className="text-text-secondary max-w-2xl">
                Organize your favorite videos into collections. Curate your perfect learning path or entertainment marathon.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ background: 'var(--color-overlay-strong)', backdropFilter: 'blur(20px)', border: '1px solid var(--color-border-light)' }}
                >
                  <FolderOpen className="w-4 h-4 text-accent-light" />
                  <span className="text-xs font-semibold text-text-primary">{playlists.length} Playlists</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ background: 'var(--color-overlay-strong)', backdropFilter: 'blur(20px)', border: '1px solid var(--color-border-light)' }}
                >
                  <ListMusic className="w-4 h-4 text-[#c4c7c9]" />
                  <span className="text-xs font-semibold text-text-primary">{totalVideos} Saved Videos</span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => create.setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent text-accent-on-dark hover:bg-accent-light hover:text-accent-on-light transition-all text-xs font-semibold uppercase tracking-wider"
            >
              <ListMusic className="w-4 h-4" />
              Create Playlist
            </motion.button>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <PlaylistGrid
            playlists={playlists}
            onNewPlaylist={() => create.setShowModal(true)}
          />
        </motion.div>
      </div>

      <CreatePlaylistModal
        showModal={create.showModal}
        setShowModal={create.setShowModal}
        newPlaylistName={create.newPlaylistName}
        setNewPlaylistName={create.setNewPlaylistName}
        newPlaylistDescription={create.newPlaylistDescription}
        setNewPlaylistDescription={create.setNewPlaylistDescription}
        newPlaylistIsPublic={create.newPlaylistIsPublic}
        setNewPlaylistIsPublic={create.setNewPlaylistIsPublic}
        handleCreatePlaylist={create.handleCreatePlaylist}
      />
      <EditPlaylistModal {...edit} />
    </div>
  )
}