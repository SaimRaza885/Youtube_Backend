import { memo } from 'react'
import { motion } from 'framer-motion'
import { NewVideoCard } from '../NewVideoCard'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

const stagger = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } }
}

export const LikedVideosGrid = memo(({ videos }) => (
  <motion.div
    variants={stagger}
    initial="initial"
    animate="animate"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8"
  >
    {videos.map((ch, idx) => {
      const video = ch.likedVideo
      return (
        <motion.div key={idx} variants={fadeUp(0)}>
          <NewVideoCard video={video} />
        </motion.div>
      )
    })}
  </motion.div>
))

LikedVideosGrid.displayName = 'LikedVideosGrid'
