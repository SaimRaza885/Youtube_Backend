import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

export const LikedVideosEmptyState = () => (
  <motion.div {...fadeUp(0.15)} className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 rounded-full bg-accent-light/10 flex items-center justify-center mb-4">
      <Heart className="w-8 h-8 text-accent-light" />
    </div>
    <p className="text-text-secondary text-lg mb-2">No liked videos yet</p>
    <p className="text-[var(--color-text-muted)] text-sm max-w-sm">
      When you like a video, it will show up here so you can easily find it later.
    </p>
    <Link
      to="/"
      className="mt-6 px-6 py-3 bg-accent text-accent-on-dark rounded-lg hover:bg-accent-light hover:text-accent-on-light transition-all font-medium"
    >
      Browse Videos
    </Link>
  </motion.div>
)
