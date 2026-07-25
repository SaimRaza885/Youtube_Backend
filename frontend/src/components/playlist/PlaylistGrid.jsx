import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ListMusic, Plus } from 'lucide-react'

const PlaylistCard = ({ playlist }) => {
  const totalVideos = playlist.totalVideos || playlist.videos?.length || 0
  const isPublic = playlist.isPublic !== false
  const description = playlist.description || 'No description'
  const updatedAt = playlist.updatedAt || playlist.createdAt
  const timeAgo = updatedAt ? timeSince(updatedAt) : ''

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer rounded-[18px] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
        boxShadow: 'inset 0 1px 0 var(--color-border-subtle)',
        border: '1px solid var(--color-border-light)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Link to={`/playlists/${playlist._id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          {(playlist.thumbnail?.url || playlist.thumbnail || playlist.Videos?.[0]?.thumbnail?.url) ? (
            <img
              src={playlist.thumbnail?.url || playlist.thumbnail || playlist.Videos?.[0]?.thumbnail?.url}
              alt={playlist.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
              <ListMusic className="w-12 h-12 text-white/60" />
            </div>
          )}

          <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, var(--color-surface-low) 0%, var(--color-surface-low) 0.2, transparent)' }} />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-secondary/60 backdrop-blur-md border border-white/10 text-text-primary px-2.5 py-1 rounded-md text-[10px] font-medium flex items-center gap-1">
              {isPublic ? 'Public' : 'Private'}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-secondary/40 backdrop-blur-[2px]">
            <div className="bg-accent-light text-accent-on-light rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <ListMusic className="w-5 h-5" />
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-secondary/80 backdrop-blur-md px-2 py-1 rounded text-text-primary text-[11px] font-medium flex items-center gap-1 border border-white/5">
            <ListMusic className="w-3.5 h-3.5" />
            {totalVideos} Videos
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent-light transition-colors truncate">
            {playlist.name}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">{description}</p>
          <div className="flex items-center justify-between text-[var(--color-text-muted)] text-xs">
            <span>Updated {timeAgo}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const NewPlaylistCard = ({ onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="rounded-[18px] overflow-hidden group cursor-pointer flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-[var(--color-border-light)] hover:border-accent-light/50 transition-all duration-300"
    style={{
      background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
      backdropFilter: 'blur(20px)',
    }}
  >
    <div className="w-16 h-16 rounded-full bg-elevated flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-accent-light/20">
      <Plus className="w-8 h-8 text-text-secondary group-hover:text-accent-light transition-colors" />
    </div>
    <h3 className="text-lg font-semibold text-text-primary mb-1">New Playlist</h3>
    <p className="text-sm text-text-secondary text-center px-6">Create a new collection from scratch.</p>
  </motion.div>
)

export const PlaylistGrid = ({ playlists, onNewPlaylist }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist._id} playlist={playlist} />
      ))}
      <NewPlaylistCard onClick={onNewPlaylist} />
    </div>
  )
}

function timeSince(date) {
  const m = Math.floor((Date.now() - new Date(date).getTime()) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  return `${Math.floor(d / 30)}mo ago`
}