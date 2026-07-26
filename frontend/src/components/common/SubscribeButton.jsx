import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, UserCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useUI } from '../../context/UIContext'

const COLORS = [
  'var(--color-accent)', '#22C55E', '#F59E0B',
  '#3B82F6', '#EC4899', '#A855F7', '#14B8A6',
]

const BURST = [
  { x: -35, y: -45, s: 5 }, { x: 45, y: -35, s: 4 },
  { x: -45, y: 35, s: 6 }, { x: 40, y: 40, s: 4 },
  { x: -15, y: -55, s: 3 }, { x: 55, y: 15, s: 5 },
  { x: -55, y: 5, s: 4 }, { x: 25, y: 55, s: 3 },
  { x: 0, y: -55, s: 3.5 }, { x: -40, y: 50, s: 4.5 },
]

const SIZE = {
  sm: { py: 'py-1.5', px: 'px-3', text: 'text-xs', gap: 'gap-1', icon: 14, rounding: 'rounded-lg' },
  md: { py: 'py-2.5', px: 'px-5', text: 'text-sm', gap: 'gap-1.5', icon: 16, rounding: 'rounded-xl' },
  lg: { py: 'py-3', px: 'px-6', text: 'text-base', gap: 'gap-2', icon: 18, rounding: 'rounded-xl' },
}

export const SubscribeButton = ({
  channelId,
  isSubscribed = false,
  subscriberCount = 0,
  onSubscribe,
  size = 'md',
  showCount = false,
}) => {
  const { isAuthenticated } = useAuth()
  const { addNotification } = useUI()
  const [particles, setParticles] = useState([])
  const [showRipple, setShowRipple] = useState(false)
  const busy = useRef(false)

  const handleClick = useCallback(async (e) => {
    e.stopPropagation()
    if (!isAuthenticated) {
      addNotification('Please login to subscribe', 'info')
      return
    }
    if (busy.current) return
    busy.current = true

    const now = Date.now()
    setParticles(
      BURST.map((p, i) => ({
        id: now + i,
        x: p.x + (Math.random() - 0.5) * 20,
        y: p.y + (Math.random() - 0.5) * 20,
        size: p.s,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.03,
      }))
    )
    setShowRipple(true)
    setTimeout(() => { setParticles([]); setShowRipple(false) }, 600)

    await onSubscribe?.()
    busy.current = false
  }, [isAuthenticated, addNotification, onSubscribe])

  const s = SIZE[size]

  return (
    <div className="relative inline-flex items-center" onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <motion.button
          onClick={handleClick}
          whileTap={{ scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 500, damping: 12 }}
          className={`
            relative overflow-hidden
            flex items-center ${s.gap} ${s.px} ${s.py} ${s.text} ${s.rounding}
            font-semibold transition-colors duration-200
            select-none whitespace-nowrap cursor-pointer
            outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]
            ${isSubscribed
              ? 'bg-[var(--color-overlay-hover)] text-text-secondary border border-subtle hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] group'
              : 'bg-accent text-accent-on-dark hover:bg-accent-light hover:text-accent-on-light border border-transparent'
            }
          `}
        >
          <AnimatePresence>
            {showRipple && (
              <motion.span
                key="ripple"
                initial={{ scale: 0, opacity: 0.45 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 rounded-[inherit] bg-white/20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isSubscribed ? 'check' : 'plus'}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isSubscribed ? <UserCheck size={s.icon} /> : <UserPlus size={s.icon} />}
            </motion.span>
          </AnimatePresence>

          <span>
            {isSubscribed ? (
              <>
                <span className="group-hover:hidden">Subscribed</span>
                <span className="hidden group-hover:inline">Unsubscribe</span>
              </>
            ) : (
              'Subscribe'
            )}
          </span>
        </motion.button>

        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{ x: p.x, y: p.y, scale: 0, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: p.delay, ease: 'easeOut' }}
              className="absolute pointer-events-none rounded-full z-10"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                left: '50%',
                top: '50%',
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showCount && subscriberCount > 0 && (
          <motion.span
            key={subscriberCount}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="ml-2 text-xs text-[var(--color-text-muted)] tabular-nums"
          >
            {subscriberCount}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
