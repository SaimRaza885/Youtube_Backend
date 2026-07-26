import { ListMusic, Check } from 'lucide-react'

export const PlaylistDropdown = ({
  playlists, savingToPlaylist, newPlaylistName, creatingPlaylist,
  onSave, onCreate, onNewPlaylistNameChange, onRefresh, onClose,
}) => (
  <div
    className="absolute right-0 top-full mt-2 w-64 rounded-2xl overflow-hidden shadow-2xl z-50 py-2"
    style={{
      background: 'var(--color-elevated)',
      backdropFilter: 'blur(24px)',
      border: '1px solid var(--color-border-light)',
    }}
  >
    <div className="flex items-center justify-between px-4 py-2">
      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Save to playlist</p>
      <button onClick={onRefresh} className="text-xs text-[var(--color-accent-active-text)] hover:text-accent transition-colors font-medium">Refresh</button>
    </div>
    <div className="max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--color-border-default) transparent' }}>
      {playlists.length > 0 ? playlists.map(p => (
        <button
          key={p._id}
          onClick={() => onSave(p._id)}
          disabled={savingToPlaylist === p._id}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors disabled:opacity-50 hover:bg-[var(--color-overlay-hover)]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <ListMusic className="w-4 h-4 text-[var(--color-accent-active-text)] shrink-0" />
          <span className="truncate">{p.name}</span>
          {savingToPlaylist === p._id && <Check className="w-4 h-4 text-[#22C55E] ml-auto shrink-0" />}
        </button>
      )) : (
        <p className="px-4 py-2 text-sm text-[var(--color-text-muted)] text-center">No playlists yet</p>
      )}
    </div>
    <div className="border-t border-subtle mt-2 pt-2 px-4 space-y-2">
      <input
        type="text"
        value={newPlaylistName}
        onChange={(e) => onNewPlaylistNameChange(e.target.value)}
        placeholder="New playlist name..."
        className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-xl px-3 py-2 text-sm text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-accent-light/50 transition-colors"
      />
      <button
        onClick={onCreate}
        disabled={!newPlaylistName.trim() || creatingPlaylist}
        className="w-full py-2 bg-accent hover:bg-accent-light hover:text-accent-on-light text-accent-on-dark rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
      >
        {creatingPlaylist ? 'Creating...' : 'Create & Add'}
      </button>
    </div>
  </div>
)