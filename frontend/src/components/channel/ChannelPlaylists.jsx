import { ListMusic, ArrowLeft } from 'lucide-react'
import { EmptyState, Skeleton } from '../../components'
import { NewVideoCard } from '../../components/NewVideoCard'
import { PlaylistCard } from '../../components/playlist/PlaylistGrid'

export const ChannelPlaylists = ({
  playlists, loading, selectedPlaylist, setSelectedPlaylist,
  playlistVideos, setPlaylistVideos, loadingPlaylistVideos, handleSelectPlaylist
}) => {

  if (!selectedPlaylist) {
    if (playlists.length === 0) {
      return !loading ? (
        <EmptyState icon={ListMusic} title="No playlists yet" description="This channel hasn't created any playlists" />
      ) : null
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} onClick={() => handleSelectPlaylist(playlist)} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => { setSelectedPlaylist(null); setPlaylistVideos([]) }}
        className="mb-6 inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Playlists
      </button>

      <h2 className="text-xl font-bold text-text-primary mb-6">{selectedPlaylist.name}</h2>

      {loadingPlaylistVideos ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-video rounded-xl" />
          ))}
        </div>
      ) : playlistVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {playlistVideos.map((video) => (
            <NewVideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--color-text-muted)] text-sm">This playlist is empty</p>
      )}
    </div>
  )
}