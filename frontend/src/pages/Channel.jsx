import { useState } from 'react'
import { motion } from 'framer-motion'
import { Skeleton, ErrorState, ConfirmDialog } from '../components'
import { useChannel } from '../hooks/useChannel'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ChannelHeader } from '../components/channel/ChannelHeader'
import { ChannelTabs } from '../components/channel/ChannelTabs'
import { ChannelVideos } from '../components/channel/ChannelVideos'
import { ChannelPlaylists } from '../components/channel/ChannelPlaylists'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

export const Channel = () => {
  const {
    channel,
    currentUser,
    videos,
    loading,
    error,
    isSubscribed,
    playlists,
    activeTab,
    setActiveTab,
    selectedPlaylist,
    setSelectedPlaylist,
    playlistVideos,
    setPlaylistVideos,
    loadingPlaylistVideos,
    isChannelOwner,
    handleSelectPlaylist,
    handleSubscribe,
    handleDeleteVideo,
    navigate
  } = useChannel()
  useDocumentTitle(channel?.fullName || 'Channel')

  const [videoToDelete, setVideoToDelete] = useState(null)

  const handleDeleteClick = (videoId, e) => {
    e.preventDefault()
    e.stopPropagation()
    setVideoToDelete(videoId)
  }

  const confirmDeleteVideo = () => {
    if (videoToDelete) {
      handleDeleteVideo(videoToDelete)
      setVideoToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <div className="mb-8">
          <Skeleton className="w-full h-40 rounded-xl mb-6" />
          <div className="flex items-start gap-4">
            <Skeleton className="w-20 h-20 rounded-full shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>
        <div className="flex gap-6 mb-6">
          <Skeleton className="h-10 w-20 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-video rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text-secondary text-lg">Channel not found</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-20" />
      </div> */}

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <motion.div {...fadeUp(0)}>
          <ChannelHeader
            channel={channel}
            videos={videos}
            isSubscribed={isSubscribed}
            isChannelOwner={isChannelOwner}
            handleSubscribe={handleSubscribe}
            navigate={navigate}
          />
        </motion.div>

        <motion.div {...fadeUp(0.05)}>
          <ChannelTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSelectedPlaylist={setSelectedPlaylist}
          />
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          {activeTab === 'videos' ? (
            <>
              <ChannelVideos
                videos={videos}
                loading={loading}
                currentUser={currentUser}
                channel={channel}
                navigate={navigate}
                handleDeleteVideo={handleDeleteClick}
              />

              <ConfirmDialog
                open={!!videoToDelete}
                onClose={() => setVideoToDelete(null)}
                onConfirm={confirmDeleteVideo}
                title="Delete Video"
                message="This action is permanent and cannot be undone. All video data including views, likes, and comments will be removed."
                confirmText="delete"
              />
            </>
          ) : (
            <ChannelPlaylists
              playlists={playlists}
              loading={loading}
              selectedPlaylist={selectedPlaylist}
              setSelectedPlaylist={setSelectedPlaylist}
              playlistVideos={playlistVideos}
              setPlaylistVideos={setPlaylistVideos}
              loadingPlaylistVideos={loadingPlaylistVideos}
              handleSelectPlaylist={handleSelectPlaylist}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}