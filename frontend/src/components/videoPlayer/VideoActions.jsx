import { ThumbsUp, ThumbsDown, Share2, BookmarkPlus } from 'lucide-react'
import { fmt } from '../../utils'
import { PlaylistDropdown } from './PlaylistDropdown'

export const VideoActions = ({
  isLiked, isDisliked, likeCount, isAuthenticated,
  onLike, onDislike,
  showPlaylistMenu, playlists, savingToPlaylist, newPlaylistName, creatingPlaylist,
  onTogglePlaylist, onSaveToPlaylist, onCreatePlaylist, onNewPlaylistNameChange, onRefreshPlaylists,
}) => (
  <div className="flex items-center gap-2">
    <div
      className="flex items-center rounded-full overflow-hidden"
      style={{ background: 'var(--color-overlay-hover)', border: '1px solid var(--color-border-subtle)' }}
    >
      <button
        onClick={onLike}
        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-overlay-hover)] border-r border-subtle ${
          isLiked ? 'text-accent-light' : 'text-text-secondary'
        }`}
      >
        <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-accent-light' : ''}`} />
        {likeCount > 0 && <span>{fmt(likeCount)}</span>}
      </button>
      <button
        onClick={onDislike}
        className={`px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-overlay-hover)] ${
          isDisliked ? 'text-accent-light' : 'text-text-secondary'
        }`}
      >
        <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-accent-light' : ''}`} />
      </button>
    </div>

    <button
      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-overlay-hover)]"
      style={{ background: 'var(--color-overlay-hover)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
    >
      <Share2 className="w-4 h-4" />
      <span className="hidden sm:inline">Share</span>
    </button>

    {isAuthenticated && (
      <div className="relative">
        <button
          onClick={onTogglePlaylist}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-overlay-hover)]"
          style={{ background: 'var(--color-overlay-hover)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
        >
          <BookmarkPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Save</span>
        </button>
        {showPlaylistMenu && (
          <PlaylistDropdown
            playlists={playlists}
            savingToPlaylist={savingToPlaylist}
            newPlaylistName={newPlaylistName}
            creatingPlaylist={creatingPlaylist}
            onSave={onSaveToPlaylist}
            onCreate={onCreatePlaylist}
            onNewPlaylistNameChange={onNewPlaylistNameChange}
            onRefresh={onRefreshPlaylists}
          />
        )}
      </div>
    )}
  </div>
)