import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Share2, BookmarkPlus, Check } from 'lucide-react'
import { fmt } from '../../utils'
import { PlaylistDropdown } from './PlaylistDropdown'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }
})

export const VideoActions = ({
  isLiked, isDisliked, likeCount, isAuthenticated, videoId,
  onLike, onDislike,
  showPlaylistMenu, playlists, savingToPlaylist, newPlaylistName, creatingPlaylist,
  onTogglePlaylist, onSaveToPlaylist, onCreatePlaylist, onNewPlaylistNameChange, onRefreshPlaylists,
}) => {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const url = `${window.location.origin}/video/${videoId}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div variants={fadeUp(0.15)} initial="initial" animate="animate" className="flex items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center rounded-full overflow-hidden"
        style={{ background: 'var(--color-overlay-hover)', border: '1px solid var(--color-border-subtle)' }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onLike}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-overlay-hover)] border-r border-subtle ${isLiked ? 'text-[var(--color-accent-active-text)]' : 'text-text-secondary'
            }`}
        >
          <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-[var(--color-accent-active-text)]' : ''}`} />
          <span>{fmt(likeCount)}</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onDislike}
          className={`px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-overlay-hover)] ${isDisliked ? 'text-[var(--color-accent-active-text)]' : 'text-text-secondary'
            }`}
        >
          <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-[var(--color-accent-active-text)]' : ''}`} />
        </motion.button>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-overlay-hover)]"
        style={{ background: 'var(--color-overlay-hover)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
      >
        {copied ? <Check className="w-4 h-4 text-success" /> : <Share2 className="w-4 h-4" />}
        <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
      </motion.button>

      {isAuthenticated && (
        <motion.div variants={fadeUp(0.2)} initial="initial" animate="animate" className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onTogglePlaylist}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-overlay-hover)]"
            style={{ background: 'var(--color-overlay-hover)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
          >
            <BookmarkPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </motion.button>
          {showPlaylistMenu && (
            <PlaylistDropdown
              playlists={playlists}
              savingToPlaylist={savingToPlaylist}
              newPlaylistName={newPlaylistName}
              creatingPlaylist={creatingPlaylist}
              onSave={onSaveToPlaylist}
              onCreate={onCreatePlaylist}
              onNewPlaylistNameChange={onNewPlaylistNameChange}
              onRefresh={onRefreshPlaylists}
            />
          )}
        </motion.div>
      )}
    </motion.div>
  )
}