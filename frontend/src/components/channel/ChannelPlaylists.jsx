import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ListMusic, Play, ArrowLeft } from 'lucide-react'
import { EmptyState, Skeleton } from '../../components'
import { fmt, ago } from '../../utils'

export const ChannelPlaylists = ({
  playlists, loading, selectedPlaylist, setSelectedPlaylist,
  playlistVideos, setPlaylistVideos, loadingPlaylistVideos, handleSelectPlaylist
}) => {
  const [imgErrors, setImgErrors] = useState({})

  if (!selectedPlaylist) {
    if (playlists.length === 0) {
      return !loading ? (
        <EmptyState icon={ListMusic} title="No playlists yet" description="This channel hasn't created any playlists" />
      ) : null
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist._id}
            onClick={() => handleSelectPlaylist(playlist)}
            className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <div className="relative w-full aspect-video bg-elevated overflow-hidden">
              {(playlist.thumbnail?.url || playlist.thumbnail || playlist.Videos?.[0]?.thumbnail?.url) ? (
                <img
                  src={playlist.thumbnail?.url || playlist.thumbnail || playlist.Videos?.[0]?.thumbnail?.url}
                  alt={playlist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
                  <ListMusic className="w-12 h-12 text-white/60" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-accent-light text-accent-on-light rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ListMusic className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-text-primary truncate group-hover:text-accent-light transition-colors">{playlist.name}</h3>
              <p className="text-[var(--color-text-muted)] text-sm">{playlist.totalVideos || 0} videos</p>
              {playlist.description && (
                <p className="text-[var(--color-text-muted)] text-xs mt-1 line-clamp-1">{playlist.description}</p>
              )}
            </div>
          </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlistVideos.map((video) => {
            const thumbErr = imgErrors[video._id]
            return (
              <Link
                key={video._id}
                to={`/video/${video._id}`}
                className="group block rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
                  border: '1px solid var(--color-border-light)',
                }}
              >
                <div className="relative w-full aspect-video bg-elevated overflow-hidden">
                  {!thumbErr ? (
                    <img
                      src={video.thumbnail?.url || 'https://placehold.co/640x360/1C1C2E/6B6B80?text=No+Thumbnail'}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={() => setImgErrors(prev => ({ ...prev, [video._id]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent-hover/20 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-accent-light text-accent-on-light flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-text-primary text-sm line-clamp-2 group-hover:text-accent-light transition-colors">{video.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-xs mt-1">{fmt(video.views)} views{video.createdAt ? ` · ${ago(video.createdAt)}` : ''}</p>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <p className="text-[var(--color-text-muted)] text-sm">This playlist is empty</p>
      )}
    </div>
  )
}