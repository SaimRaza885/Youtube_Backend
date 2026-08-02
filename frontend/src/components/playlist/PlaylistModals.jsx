import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const ModalOverlay = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-secondary/80 backdrop-blur-xl" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-[24px] overflow-hidden shadow-2xl"
          style={{
            background: 'var(--color-overlay-strong)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--color-border-light)',
            boxShadow: 'inset 0 1px 0 var(--color-border-subtle)',
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export const CreatePlaylistModal = ({
  showModal, setShowModal,
  newPlaylistName, setNewPlaylistName,
  newPlaylistDescription, setNewPlaylistDescription,
  newPlaylistIsPublic, setNewPlaylistIsPublic,
  handleCreatePlaylist
}) => {
  return (
    <ModalOverlay isOpen={showModal} onClose={() => setShowModal(false)}>
      <div className="px-8 py-6 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
        <h3 className="text-2xl font-bold text-text-primary">Create Playlist</h3>
        <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-text-primary transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Playlist Name</label>
          <input
            type="text" value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="e.g., Summer Vibes 2024"
            className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:outline-hidden focus:border-accent-light/50 focus:ring-1 focus:ring-accent-light/50 transition-all placeholder:text-[var(--color-text-muted)]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            Description <span className="opacity-50 lowercase">(Optional)</span>
          </label>
          <textarea
            value={newPlaylistDescription}
            onChange={(e) => setNewPlaylistDescription(e.target.value)}
            placeholder="What is this playlist about?"
            rows={3}
            className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:outline-hidden focus:border-accent-light/50 focus:ring-1 focus:ring-accent-light/50 transition-all placeholder:text-[var(--color-text-muted)] resize-none"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Privacy</label>
          <div className="flex gap-4">
              {['Public', 'Private'].map((opt) => {
                const isPub = opt === 'Public'
                return (
                  <label key={opt} className="flex-1 cursor-pointer">
                    <input type="radio" name="privacy" checked={newPlaylistIsPublic === isPub} onChange={() => setNewPlaylistIsPublic(isPub)} className="peer sr-only" />
                    <div className="p-4 rounded-xl border border-[var(--color-border-light)] text-center transition-all peer-checked:border-accent-light peer-checked:bg-accent-light/5"
                      style={{ background: 'var(--color-overlay-strong)', backdropFilter: 'blur(20px)' }}
                    >
                      <span className="text-sm font-medium text-text-primary block">{opt}</span>
                    </div>
                  </label>
                )
              })}
          </div>
        </div>
      </div>

      <div className="px-8 py-6 bg-secondary/50 border-t border-[var(--color-border-subtle)] flex justify-end gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-6 py-2.5 rounded-lg border border-[var(--color-border-light)] text-text-primary text-xs font-medium uppercase tracking-wider hover:bg-[var(--color-overlay-hover)] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleCreatePlaylist}
          className="px-6 py-2.5 rounded-lg bg-accent text-accent-on-dark hover:bg-accent-light hover:text-accent-on-light transition-all text-xs font-semibold uppercase tracking-wider"
          style={{ boxShadow: '0 0 15px var(--color-accent-border)' }}
        >
          Create Collection
        </button>
      </div>
    </ModalOverlay>
  )
}

export const EditPlaylistModal = ({
  showEditModal, setShowEditModal, setEditingPlaylist,
  editName, setEditName,
  editDescription, setEditDescription,
  handleEditPlaylist
}) => {
  return (
    <ModalOverlay isOpen={showEditModal} onClose={() => { setShowEditModal(false); setEditingPlaylist(null) }}>
      <div className="px-8 py-6 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
        <h3 className="text-2xl font-bold text-text-primary">Edit Playlist</h3>
        <button onClick={() => { setShowEditModal(false); setEditingPlaylist(null) }} className="text-text-secondary hover:text-text-primary transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Playlist Name</label>
          <input
            type="text" value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="e.g., Summer Vibes 2024"
            className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:outline-hidden focus:border-accent-light/50 focus:ring-1 focus:ring-accent-light/50 transition-all placeholder:text-[var(--color-text-muted)]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            Description <span className="opacity-50 lowercase">(Optional)</span>
          </label>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="What is this playlist about?"
            rows={3}
            className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:outline-hidden focus:border-accent-light/50 focus:ring-1 focus:ring-accent-light/50 transition-all placeholder:text-[var(--color-text-muted)] resize-none"
          />
        </div>
      </div>

      <div className="px-8 py-6 bg-secondary/50 border-t border-[var(--color-border-subtle)] flex justify-end gap-4">
        <button
          onClick={() => { setShowEditModal(false); setEditingPlaylist(null) }}
          className="px-6 py-2.5 rounded-lg border border-[var(--color-border-light)] text-text-primary text-xs font-medium uppercase tracking-wider hover:bg-[var(--color-overlay-hover)] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleEditPlaylist}
          className="px-6 py-2.5 rounded-lg bg-accent text-accent-on-dark hover:bg-accent-light hover:text-accent-on-light transition-all text-xs font-semibold uppercase tracking-wider"
        >
          Save Changes
        </button>
      </div>
    </ModalOverlay>
  )
}