import { motion } from 'framer-motion'
import { Users, Eye, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react'
import { Skeleton } from '../../components'
import { fmt } from '../../utils'

const statCards = [
  { key: 'totalSubscribers', label: 'Subscribers', icon: Users },
  { key: 'totalViews', label: 'Views Reach', icon: Eye },
  { key: 'totalLikes', label: 'Total Likes', icon: TrendingUp },
  { key: 'totalVideos', label: 'Total Videos', icon: TrendingUp },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.06 * i }
  })
}

export const ProfileStats = ({ stats, statsLoading }) => {
  const subs = stats?.totalSubscribers || 0
  const views = stats?.totalViews || 0
  const subsTarget = 10
  const viewsTarget = 100
  const subsProgress = Math.min((subs / subsTarget) * 100, 100)
  const viewsProgress = Math.min((views / viewsTarget) * 100, 100)
  const overallProgress = Math.round((subsProgress + viewsProgress) / 2)
  const isMonetized = subs >= subsTarget && views >= viewsTarget

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Channel Analytics Overview</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {statsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-5 rounded-2xl" style={{ background: 'var(--color-overlay)', border: '1px solid var(--color-border-subtle)' }}>
                  <Skeleton className="h-9 w-9 rounded-xl mb-4" />
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-8 w-24" />
                </div>
              ))
            : statCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.key}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="p-5 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--color-accent-muted-bg)' }}>
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <span className="text-[var(--color-text-muted)] text-[11px] font-bold tracking-wider uppercase block mb-1">{card.label}</span>
                <h3 className="text-3xl font-extrabold text-text-primary tracking-tight">
                  {fmt(stats?.[card.key] || 0)}
                </h3>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: isMonetized
            ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-success) 8%, transparent) 0%, color-mix(in srgb, var(--color-success) 2%, transparent) 100%)'
            : 'linear-gradient(135deg, var(--color-accent-muted-bg) 0%, var(--color-overlay) 100%)',
          border: isMonetized
            ? '1px solid color-mix(in srgb, var(--color-success) 15%, transparent)'
            : '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: isMonetized
                    ? 'var(--color-success-muted)'
                    : 'var(--color-accent-muted)',
                }}
              >
                {isMonetized ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <DollarSign className="w-5 h-5 text-accent" />
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  {isMonetized ? 'Monetization Active' : 'Monetization Progress'}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {isMonetized
                    ? 'Your channel is fully monetized — keep growing!'
                    : 'Meet the thresholds below to unlock monetization'}
                </p>
              </div>
            </div>

            {!isMonetized && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-lg font-extrabold text-accent">{overallProgress}%</span>
                <span className="text-[10px] text-[var(--color-text-muted)] font-medium">done</span>
              </div>
            )}
          </div>

          {!isMonetized && (
            <div className="w-full h-2 rounded-full bg-[var(--color-overlay-hover)] mb-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-linear-to-r from-accent to-accent-light"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Subscribers', icon: Users, current: subs, target: subsTarget, progress: subsProgress, met: subs >= subsTarget },
              { label: 'Views', icon: Eye, current: views, target: viewsTarget, progress: viewsProgress, met: views >= viewsTarget },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="p-4 rounded-xl"
                  style={{
                    background: item.met ? 'var(--color-success-soft)' : 'var(--color-overlay)',
                    border: item.met ? '1px solid color-mix(in srgb, var(--color-success) 15%, transparent)' : '1px solid var(--color-overlay-hover)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: item.met ? 'var(--color-success-muted)' : 'var(--color-overlay-hover)',
                      }}
                    >
                      {item.met ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <Icon className="w-5 h-5 text-accent" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-text-secondary font-medium">{item.label}</span>
                        <span className="text-xs font-bold text-text-primary">
                          <span className={item.met ? 'text-success' : ''}>{fmt(item.current)}</span>
                          <span className="text-[var(--color-text-muted)]"> / {fmt(item.target)}</span>
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[var(--color-overlay-hover)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{
                            background: item.met ? 'var(--color-success)' : 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))',
                          }}
                        />
                      </div>
                      {item.met ? (
                        <p className="text-[10px] text-success mt-1.5 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Requirement met
                        </p>
                      ) : (
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5 font-medium">
                          {fmt(item.target - item.current)} more needed
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}