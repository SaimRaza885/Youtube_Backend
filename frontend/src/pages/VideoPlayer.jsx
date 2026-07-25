import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useVideo } from '../hooks/useVideo'
import { useLike } from '../hooks/useLike'
import { useSubscription } from '../hooks/useSubscription'
import { usePlaylistMenu } from '../hooks/usePlaylistMenu'
import { useComments } from '../hooks/useComments'
import { useRelatedVideos } from '../hooks/useRelatedVideos'
import { fmt, ago } from '../utils'
import { Skeleton, ConfirmDialog } from '../components'
import {
  VideoSection, VideoHeader, VideoActions, ChannelCard,
  VideoDescription, CommentSection, RelatedVideos,
} from '../components/videoPlayer'
import ad_image from '../tokens/ad_image.jpg'

export const VideoPlayer = () => {
  const { videoId } = useParams()
  const { user, isAuthenticated } = useAuth()

  const { video, loading, owner, ownerUsername, ownerAvatar, handleDeleteVideo } = useVideo(videoId)
  const { isLiked, isDisliked, likeCount, handleLike, handleDislike } = useLike(videoId, video)
  const { isSubscribed, subscriberCount, handleSubscribe } = useSubscription(video)
  const {
    playlists, showPlaylistMenu, savingToPlaylist, newPlaylistName, creatingPlaylist,
    handleSaveToPlaylist, handleCreateAndSave, setShowPlaylistMenu, setNewPlaylistName,
    handleRefreshPlaylists,
  } = usePlaylistMenu(videoId)
  const {
    comments, newComment, commentLoading,
    editingCommentId, editCommentContent, actionLoadingId,
    setNewComment, handleAddComment, handleUpdateComment, handleDeleteComment,
    setEditingCommentId, setEditCommentContent,
  } = useComments(videoId, video)
  const { relatedVideos, relatedLoading } = useRelatedVideos(video)

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (!loading && !video) {
    return <div className="min-h-screen flex items-center justify-center text-text-secondary">Video not found</div>
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-15" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="aspect-video rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border-subtle)' }}>
                <Skeleton className="w-full h-full !rounded-none" />
              </div>
            ) : (
              <VideoSection
                video={video}
                adVideo={{
                  image: ad_image,
                  skipAfter: 5,
                  title: 'Discover Premium',
                  description: 'Unlock exclusive content with our premium plan.',
                }}
              />
            )}

            <div>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-7 w-3/4 !rounded-lg" />
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <Skeleton className="h-4 w-40 !rounded-lg" />
                    <Skeleton className="h-8 w-64 !rounded-lg" />
                  </div>
                </div>
              ) : (
                <>
                  <VideoHeader title={video.title} />
                  <div className="flex items-center justify-between flex-wrap gap-3 mt-2">
                    <p className="text-sm text-[var(--color-text-muted)]">{fmt(video.views)} views &bull; {ago(video.createdAt)}</p>
                    <VideoActions
                      isLiked={isLiked}
                      isDisliked={isDisliked}
                      likeCount={likeCount}
                      isAuthenticated={isAuthenticated}
                      onLike={handleLike}
                      onDislike={handleDislike}
                      showPlaylistMenu={showPlaylistMenu}
                      playlists={playlists}
                      savingToPlaylist={savingToPlaylist}
                      newPlaylistName={newPlaylistName}
                      creatingPlaylist={creatingPlaylist}
                      onTogglePlaylist={() => setShowPlaylistMenu(!showPlaylistMenu)}
                      onSaveToPlaylist={handleSaveToPlaylist}
                      onCreatePlaylist={handleCreateAndSave}
                      onNewPlaylistNameChange={setNewPlaylistName}
                      onRefreshPlaylists={handleRefreshPlaylists}
                    />
                  </div>
                </>
              )}
            </div>

            {loading ? (
              <div className="rounded-xl p-4" style={{ border: '1px solid var(--color-border-subtle)' }}>
                <Skeleton className="h-12 w-full !rounded-lg" />
              </div>
            ) : (
              <ChannelCard
                owner={owner}
                ownerUsername={ownerUsername}
                ownerAvatar={ownerAvatar}
                subscriberCount={subscriberCount}
                isSubscribed={isSubscribed}
                isOwner={user?._id === video.owner?._id}
                videoId={video._id}
                onSubscribe={handleSubscribe}
                onDelete={() => setShowDeleteModal(true)}
              />
            )}

            <ConfirmDialog
              open={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleDeleteVideo}
              title="Delete Video"
              message="This action is permanent and cannot be undone. All video data including views, likes, and comments will be removed."
              confirmText="delete"
            />

            {loading ? null : <VideoDescription description={video.description} />}

            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-5 w-32 !rounded-lg" />
                <div className="rounded-xl p-4" style={{ border: '1px solid var(--color-border-subtle)' }}>
                  <Skeleton className="h-10 w-full !rounded-lg" />
                </div>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-1/4 !rounded-lg" />
                      <Skeleton className="h-4 w-full !rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <CommentSection
                comments={comments}
                newComment={newComment}
                commentLoading={commentLoading}
                editingCommentId={editingCommentId}
                editCommentContent={editCommentContent}
                actionLoadingId={actionLoadingId}
                currentUserId={user?._id}
                onAddComment={handleAddComment}
                onNewCommentChange={setNewComment}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                onEditStart={(id, content) => { setEditingCommentId(id); setEditCommentContent(content) }}
                onEditCancel={() => setEditingCommentId(null)}
                onEditContentChange={setEditCommentContent}
              />
            )}
          </div>

          <RelatedVideos videos={relatedVideos} loading={loading} relatedvideos_loading={relatedLoading} />
        </div>
      </div>
    </div>
  )
}