import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { channelAPI } from '../services/endpoints'
import { useAuth } from '../context/AuthContext'
import { Skeleton, SectionHeader } from '../components'
import { NewVideoCard } from '../components/NewVideoCard'
import { CreatorFilterRow, SubscriptionListModal } from '../components/subscriptions'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

const stagger = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } }
}

export const Subscriptions = () => {
  const { user, isAuthenticated } = useAuth()
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalSearch, setModalSearch] = useState('')

  useEffect(() => {
    if (!isAuthenticated || !user) { setLoading(false); return }

    const fetchData = async () => {
      try {
        const res = await channelAPI.getSubscriptions(user._id)
        if (res?.data?.data) {
          setChannels(Array.isArray(res.data.data) ? res.data.data.map(item => item.subscribedChannels).filter(Boolean) : [])
        }
      } catch {
        setChannels([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text-secondary text-lg">Please log in to see your subscriptions</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <SectionHeader count={channels.length} text="Subscriptions" desc="Stay up to date with your favorite creators" badgeIcon={Users} badgeLabel="Creators" />

        <CreatorFilterRow channels={channels} onAllClick={() => setShowModal(true)} />

        <motion.div {...fadeUp(0.15)}>
          <h2 className="text-xl font-semibold text-text-primary mb-6">Latest Videos</h2>
        </motion.div>

        {loading ? (
          <>
            <div className="mb-6">
              <div className="flex gap-2 overflow-x-auto py-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full shrink-0" />
                ))}
              </div>
            </div>
            <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
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
          </>
        ) : channels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Users className="w-16 h-16 text-[var(--color-text-muted)] mb-4" />
            <p className="text-text-secondary text-lg mb-2">No subscriptions yet</p>
            <p className="text-[var(--color-text-muted)] text-sm">Subscribe to channels to see their latest videos here.</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-accent text-accent-on-dark rounded-lg hover:bg-accent-light hover:text-accent-on-light transition-all font-medium">
              Browse Channels
            </Link>
          </div>
        ) : (
          <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {channels.map((ch, idx) => {
              const video = ch.latestVideo
              return (
                <motion.div key={idx} variants={fadeUp(0)}>
                  <NewVideoCard video={video} ch={ch} />
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>

      <SubscriptionListModal
        open={showModal}
        channels={channels}
        search={modalSearch}
        onSearch={setModalSearch}
        onClose={() => { setShowModal(false); setModalSearch('') }}
      />
    </div>
  )
}