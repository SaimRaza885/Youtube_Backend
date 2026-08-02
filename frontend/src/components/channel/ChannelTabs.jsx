import { motion } from 'framer-motion'

export const ChannelTabs = ({ activeTab, setActiveTab, setSelectedPlaylist }) => {
  const tabs = ['videos', 'playlists']

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex gap-1 mb-8 p-1 rounded-xl"
      style={{
        background: 'var(--color-overlay-strong)',
        border: '1px solid var(--color-border-subtle)',
      }}
    >
      {tabs.map((tab, i) => {
        const isActive = activeTab === tab
        return (
          <motion.button
            key={tab}
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i, ease: 'easeOut' }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setActiveTab(tab); if (tab === 'videos') setSelectedPlaylist(null) }}
            className={`relative flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold capitalize transition-colors duration-200 cursor-pointer ${
              isActive ? 'text-accent-active-text' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="channel-tab-active"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-lg bg-accent/10 ring-1 ring-accent/20"
              />
            )}
            <span className="relative z-10">{tab}</span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
