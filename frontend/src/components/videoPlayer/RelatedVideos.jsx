import { motion } from 'framer-motion'
import { NewVideoCard } from '../NewVideoCard'

const SkeletonRow = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex gap-3">
        <div className="aspect-video w-40 shrink-0 rounded-xl lg:w-48" style={{ background: 'var(--color-overlay-hover)' }} />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3.5 w-full rounded" style={{ background: 'var(--color-overlay-hover)' }} />
          <div className="h-3 w-2/3 rounded" style={{ background: 'var(--color-overlay-strong)' }} />
          <div className="h-2.5 w-1/3 rounded" style={{ background: 'var(--color-overlay-strong)' }} />
        </div>
      </div>
    ))}
  </div>
)

export const RelatedVideos = ({ videos, loading, relatedvideos_loading }) => (
  <div>
    <h2 className="text-lg font-bold text-text-primary mb-4 tracking-tight">Related Videos</h2>
    {loading || relatedvideos_loading ? (
      <SkeletonRow />
    ) : videos.length > 0 ? (
      <div className="space-y-4">
        {videos.map(v => (
          <motion.div
            key={v._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <NewVideoCard key={v._id} video={v} horizontal />
          </motion.div>
        ))}
      </div>
    ) : (
      <p className="text-[var(--color-text-muted)] text-sm">No related videos found</p>
    )}
  </div>
)