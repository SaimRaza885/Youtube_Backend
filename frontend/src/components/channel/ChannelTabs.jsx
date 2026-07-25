export const ChannelTabs = ({ activeTab, setActiveTab, setSelectedPlaylist }) => {
  const tabs = ['videos', 'playlists']

  return (
    <div className="flex gap-1 mb-8 p-1 rounded-xl"
      style={{
        background: 'var(--color-overlay-strong)',
        border: '1px solid var(--color-border-subtle)',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => { setActiveTab(tab); if (tab === 'videos') setSelectedPlaylist(null) }}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
            activeTab === tab
              ? 'bg-accent/10 text-accent-light'
              : 'text-[var(--color-text-muted)] hover:text-text-primary hover:bg-[var(--color-overlay-hover)]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}