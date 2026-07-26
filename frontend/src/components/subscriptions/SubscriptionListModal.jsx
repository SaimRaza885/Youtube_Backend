import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search } from 'lucide-react'
import { SubscribeButton } from '../common/SubscribeButton'
import { channelAPI } from '../../services/endpoints'

export const SubscriptionListModal = ({ open, channels, search, onSearch, onClose }) => {
  const [local, setLocal] = useState(channels)

  useEffect(() => { setLocal(channels) }, [channels])

  const filtered = local.filter(ch =>
    ch.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    ch.username?.toLowerCase().includes(search.toLowerCase())
  )

  const handleToggle = async (ch) => {
    try {
      await channelAPI.subscribeChannel(ch._id)
      setLocal(prev => prev.filter(s => s._id !== ch._id))
    } catch {}
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[80vh] bg-[var(--color-search-bg)] border border-subtle rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-subtle">
              <h3 className="text-lg font-semibold text-text-primary">Subscriptions</h3>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-overlay-hover)] text-text-secondary hover:bg-[var(--color-overlay-hover)] hover:text-text-primary transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 pt-4 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input
                  type="text" value={search} onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search subscriptions..."
                  className="w-full bg-elevated border border-subtle rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-accent-light transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="text-center py-10 text-[var(--color-text-muted)] text-sm">No subscriptions found</div>
              ) : (
                filtered.map((ch, idx) => (
                  <motion.div
                    key={ch._id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-overlay-hover)] transition-colors group"
                  >
                    <Link to={`/channel/${ch.username}`} onClick={onClose} className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-elevated">
                        <img src={ch.avatar?.url || ch.avatar} alt={ch.fullName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{ch.fullName}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">@{ch.username}</p>
                      </div>
                    </Link>
                    <SubscribeButton
                      channelId={ch._id}
                      isSubscribed
                      onSubscribe={() => handleToggle(ch)}
                      size="sm"
                    />
                  </motion.div>
                ))
              )}
            </div>

            <div className="px-5 py-3 border-t border-subtle">
              <p className="text-xs text-[var(--color-text-muted)] text-center">{local.length} subscriptions</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}