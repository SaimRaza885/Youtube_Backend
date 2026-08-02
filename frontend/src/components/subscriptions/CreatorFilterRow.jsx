import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

export const CreatorFilterRow = ({ channels, onAllClick }) => {
  const navigate = useNavigate()

  if (channels.length === 0) return null

  return (
    <motion.div {...fadeUp(0.1)} className="mb-10 relative w-full overflow-visible">
      <div
        className="flex overflow-x-auto gap-4 py-2 px-1 no-scrollbar"
        style={{ maskImage: 'linear-gradient(to right, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 90%, transparent 100%)' }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAllClick}
          className="flex flex-col items-center gap-2.5 min-w-[80px] group shrink-0 focus:outline-hidden"
        >
          <div className="w-16 h-16 rounded-full border-2 border-accent-light bg-accent-light/10 flex items-center justify-center shadow-[0_0_15px_var(--color-accent-glow-light)] transition-transform group-hover:scale-105">
            <Users className="w-6 h-6 text-accent-light" />
          </div>
          <span className="text-xs font-semibold text-text-primary truncate w-full text-center">All</span>
        </motion.button>

        {channels.map((ch, idx) => (
          <motion.button
            key={ch._id || idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/channel/${ch.username}`)}
            className="flex flex-col items-center gap-2.5 min-w-[80px] group shrink-0 focus:outline-hidden opacity-70 hover:opacity-100 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full p-[2px] bg-linear-to-tr from-tertiary to-elevated group-hover:from-accent group-hover:to-elevated transition-all group-hover:scale-105">
              <img
                src={ch.avatar?.url || ch.avatar}
                alt={ch.fullName}
                className="w-full h-full rounded-full object-cover border-2" style={{ borderColor: 'var(--color-search-bg)' }}
              />
            </div>
            <span className="text-xs text-text-secondary truncate w-full text-center group-hover:text-text-primary transition-colors">
              {ch.fullName}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}