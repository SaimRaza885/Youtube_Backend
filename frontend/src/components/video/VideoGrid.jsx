import { ErrorState } from '../common'
import { NewVideoCard } from '../NewVideoCard'
import { VideoCardSkeleton } from './VideoCardSkeleton'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export const VideoGrid = ({ videos, loading, error, emptyMessage = 'No videos found', emptyIcon, onRetry, horizontal = false }) => {
  if (error && (!videos || videos.length === 0)) {
    return (
      <div className="px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    )
  }
  if (loading && (!videos || videos.length === 0)) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        <VideoCardSkeleton count={12} />
      </div>
    )
  }

  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6"
    >
      {videos.map((v) => (
        <motion.div key={v._id} variants={itemVariants}>
          <NewVideoCard video={v} horizontal={horizontal} />
        </motion.div>
      ))}
    </motion.div>
  )
}
