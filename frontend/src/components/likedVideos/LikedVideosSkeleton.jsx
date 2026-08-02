import { motion } from 'framer-motion'
import { Skeleton } from '../ui/Skeleton'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

const stagger = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } }
}

export const LikedVideosSkeleton = () => (
  <motion.div
    variants={stagger}
    initial="initial"
    animate="animate"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8"
  >
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div key={i} variants={fadeUp(0)} className="space-y-3">
        <Skeleton className="aspect-video rounded-xl" />
        <div className="flex gap-3">
          <Skeleton className="h-9 w-9 rounded-full shrink-0" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
)
