import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

export const SectionHeader = ({ count, loading, text, desc, badgeIcon: BadgeIcon = Heart, badgeLabel }) => {
  const label = badgeLabel || (count === 1 ? 'Video' : 'Videos')
  return (
    <motion.div {...fadeUp(0)} className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-1">{text}</h1>
        <p className="text-text-secondary">{desc}</p>
      </div>
      {!loading && count > 0 && (
        <div className="inline-flex items-center gap-2 bg-elevated border border-subtle px-4 py-2 rounded-full shadow-lg">
          <BadgeIcon className="w-4 h-4 text-accent-light" />
          <span className="text-xs font-medium text-text-primary">{count} {label}</span>
        </div>
      )}
    </motion.div>
  )
}