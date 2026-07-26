import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Trash2, Video } from 'lucide-react'
import { EmptyState, Skeleton } from '../../components'
import { NewVideoCard } from '../../components/NewVideoCard'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }
})

const stagger = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
}

export const ChannelVideos = ({
  videos, loading, currentUser, channel, navigate, handleDeleteVideo
}) => {
  if (loading) {
    return (
      <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div key={i} variants={fadeUp(0)} className="rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <Skeleton className="aspect-video rounded-none" />
            <div className="p-3 flex gap-3">
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
  }

  if (videos.length === 0) {
    return (
      <EmptyState
        icon={Video}
        title="No videos yet"
        description="This channel hasn't uploaded any videos"
      />
    )
  }

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video, idx) => (
        <motion.div key={video._id} variants={fadeUp(0)} className="group relative">
          <NewVideoCard video={video} />
          {currentUser?._id === channel._id && (
            <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/video/edit/${video._id}`) }}
                className="p-1.5 bg-black/60 text-white rounded-full hover:bg-accent transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteVideo(video._id, e) }}
                className="p-1.5 bg-black/60 text-white rounded-full hover:bg-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}