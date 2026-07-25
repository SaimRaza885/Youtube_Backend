import { motion } from 'framer-motion'

export const Logo = ({ size = 'lg', layoutId }) => {
  const isLarge = size === 'lg'
  return (
    <motion.div
      layoutId={layoutId}
      className={`flex items-center gap-1 ${isLarge ? 'text-4xl' : 'text-xl'} font-bold tracking-tight text-text-primary select-none`}
    >
      <motion.img
        src="/logo.png"
        alt="Vidora"
        className={`rounded-sm object-cover ${isLarge ? 'w-12 h-12' : 'w-8 h-8'}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      idora
    </motion.div>
  )
}

export const AppLoader = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => {
          setTimeout(onComplete, 600)
        }}
      >
        <Logo size="lg" layoutId="vidora-logo" />
      </motion.div>

      <motion.div
        className="mt-8 w-40 h-1 bg-surface rounded-full overflow-hidden"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 1.4,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
