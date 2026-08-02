import { Link } from 'react-router-dom'
import { ArrowLeft, Trash2, Pencil } from 'lucide-react'
import { Button, Skeleton, MediaPlaceholder } from '../../components'
import { NewVideoCard } from '../../components/NewVideoCard'

export const PlaylistDetails = ({
    selectedPlaylist,
    playlistVideos,
    handleBack,
    handleOpenEdit,
    handleDeletePlaylist,
    addVideo: {
        addVideoId,
        setAddVideoId,
        addingVideo,
        handleAddVideo,
    },
    userVideoBrowser: {
        userVideos,
        loadingUserVideos,
        showUserVideos,
        toggleUserVideos,
        handleSelectUserVideo,
        addingUserVideo,
        hasMoreUserVideos,
        fetchUserVideos,
        userVideoPage,
        loadingMoreVideos,
    },
    removeVideo: {
        removingVideo,
        handleRemoveVideo,
    },
}) => {
    return (
        <div>
            <button
                onClick={handleBack}
                className="mb-4 flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Playlists
            </button>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary">{selectedPlaylist.name}</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleOpenEdit}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-tertiary text-text-secondary rounded-lg text-sm font-medium hover:bg-elevated transition-colors"
                    >
                        <Pencil className="w-4 h-4" />
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeletePlaylist(selectedPlaylist._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-danger-muted text-danger rounded-lg text-sm font-medium hover:bg-danger/20 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={addVideoId}
                        onChange={(e) => setAddVideoId(e.target.value)}
                        placeholder="Paste a video ID to add..."
                        className="flex-1 bg-tertiary border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-primary placeholder-text-tertiary/60 focus:outline-hidden focus:border-accent transition-colors"
                    />
                    <Button size="sm" loading={addingVideo} onClick={handleAddVideo} disabled={!addVideoId.trim()}>Add</Button>
                </div>

                <button
                    onClick={toggleUserVideos}
                    className="flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors"
                >
                    {showUserVideos ? '▾' : '▸'} Browse your videos
                </button>

                {showUserVideos && (
                    <div className="bg-secondary border border-border-subtle rounded-xl p-4">
                        {loadingUserVideos ? (
                            <div className="grid grid-cols-3 gap-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} className="w-full aspect-video rounded-lg" />
                                ))}
                            </div>
                        ) : userVideos.length > 0 ? (
                            <>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    {userVideos.map((video) => {
                                        const alreadyInPlaylist = playlistVideos.some(v => v._id === video._id)
                                        return (
                                            <button
                                                key={video._id}
                                                onClick={() => !alreadyInPlaylist && handleSelectUserVideo(video._id)}
                                                disabled={alreadyInPlaylist || addingUserVideo === video._id}
                                                className={`relative group text-left rounded-lg overflow-hidden border transition-all ${alreadyInPlaylist
                                                    ? 'border-success/30 opacity-60 cursor-not-allowed'
                                                    : 'border-border-subtle hover:border-accent/30 hover:shadow-card-hover'
                                                    }`}
                                            >
                                                <div className="w-full aspect-video bg-tertiary overflow-hidden">
                                                    {video.thumbnail?.url ? (
                                                        <img
                                                            src={video.thumbnail?.url}
                                                            alt={video.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <MediaPlaceholder kind="thumbnail" className="w-full h-full" />
                                                    )}
                                                </div>
                                                <div className="p-2">
                                                    <p className="text-xs text-text-primary line-clamp-2 leading-tight">{video.title}</p>
                                                </div>
                                                {alreadyInPlaylist && (
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                        <span className="text-xs font-semibold text-white bg-success px-2 py-0.5 rounded">Added</span>
                                                    </div>
                                                )}
                                                {addingUserVideo === video._id && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                        <span className="text-xs text-white">Adding...</span>
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                                {hasMoreUserVideos && (
                                    <button
                                        onClick={() => fetchUserVideos(userVideoPage + 1)}
                                        disabled={loadingMoreVideos}
                                        className="w-full py-2 text-sm text-accent hover:text-accent-hover transition-colors disabled:opacity-50 border border-border-subtle rounded-lg"
                                    >
                                        {loadingMoreVideos ? 'Loading...' : 'Load more'}
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-sm text-text-tertiary text-center py-4">You haven't uploaded any videos yet</p>
                        )}
                    </div>
                )}
            </div>

            {playlistVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlistVideos.map((video) => (
                        <div key={video._id} className="relative group">
                            <NewVideoCard video={video} />
                            <button
                                onClick={() => handleRemoveVideo(video._id)}
                                disabled={removingVideo === video._id}
                                className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-danger/80 disabled:opacity-50 z-10"
                            >
                                <Trash2 className="w-4 h-4" /> hj
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-text-tertiary text-sm">This playlist is empty</p>
            )}
        </div>
    )
}
