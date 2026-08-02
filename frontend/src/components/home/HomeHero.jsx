import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, User, X, Pause } from 'lucide-react'
import { Link } from 'react-router-dom'

export const HomeHero = ({ video, onDismiss }) => {
  const [phase, setPhase] = useState('suspended')
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!video) return
    const t1 = setTimeout(() => setPhase('info'), 2500)
    const t2 = setTimeout(() => setPhase('playing'), 7500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [video])

  useEffect(() => {
    if (phase === 'playing' && videoRef.current && videoReady) {
      videoRef.current.play().catch(() => { })
    }
  }, [phase, videoReady])

  if (!video) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className="relative w-full h-[400px] lg:h-[480px] rounded-[24px] overflow-hidden group shadow-card mb-8 hidden md:block"
    >
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-colors cursor-pointer"
        aria-label="Dismiss featured video"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Background Video */}
      <video
        ref={videoRef}
        src={video.videoFile?.url}
        poster={video.thumbnail?.url}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: phase === 'playing' ? 1 : 0.3 }}
        onCanPlay={() => setVideoReady(true)}
      />

      {/* Fallback thumbnail while suspended */}
      {phase !== 'playing' && (
        <img
          src={video.thumbnail?.url}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Fade to Black Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            {phase === 'suspended' && (
              <motion.div
                key="suspended"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium tracking-wide mb-4 backdrop-blur-md">
                  <Pause className="w-3 h-3" />
                  Sponsored video
                </span>
              </motion.div>
            )}

            {phase === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
              >
                {/* <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium tracking-wide mb-4 backdrop-blur-md">
                  Featured Video
                </span> */}
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight drop-shadow-lg line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl leading-relaxed drop-shadow-md line-clamp-2">
                  {video.description || `Watch this amazing video by ${video.owner?.fullName || 'our featured creator'}.`}
                </p>

                <div className="flex items-center gap-3">
                  <Link to={`/video/${video._id}`} className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-accent-on-dark rounded-xl font-medium transition-colors">
                    <Play className="w-5 h-5 fill-current" />
                    Watch Now
                  </Link>
                  <Link to={`/channel/${video.owner?.username}`} className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-medium transition-colors backdrop-blur-md">
                    <User className="w-5 h-5" />
                    View Channel
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
