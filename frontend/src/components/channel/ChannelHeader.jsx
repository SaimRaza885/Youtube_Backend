import { User, BadgeCheck } from 'lucide-react'
import { Button, SubscribeButton } from '../../components'
import { fmt } from '../../utils'

export const ChannelHeader = ({
  channel,
  videos,
  isSubscribed,
  isChannelOwner,
  handleSubscribe,
  navigate
}) => {
  const avatarUrl = channel?.avatar?.url || null
  const coverUrl = channel?.coverImage?.url || null
  const totalViews = videos?.reduce((sum, v) => sum + (v.views || 0), 0) || 0
  const isMonetized = (channel.subscriberCount || 0) >= 10 && totalViews >= 100

  return (
    <>
      <div className="w-full h-36 md:h-48 rounded-2xl overflow-hidden mb-6 relative">
        {coverUrl ? (
          <img src={coverUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: 'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 40%, transparent), color-mix(in srgb, var(--color-accent-hover) 20%, transparent), var(--color-surface-low))' }} />
        )}
        {/* <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-surface-low) 0%, transparent 50%)' }} /> */}
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div className="flex items-start gap-5">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={channel.username}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 object-cover shadow-xl md:-mt-14 relative z-10" style={{ borderColor: 'var(--color-surface-low)' }}
            />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 bg-elevated flex items-center justify-center shadow-xl -mt-10 md:-mt-14 relative z-10" style={{ borderColor: 'var(--color-surface-low)' }}>
              <User className="w-10 h-10 text-[var(--color-text-muted)]" />
            </div>
          )}
          <div className="pt-3">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{channel.fullName}</h1>
              {isMonetized && (
                <BadgeCheck className="w-6 h-6 text-success shrink-0" strokeWidth={2.5} />
              )}
            </div>
            <p className="text-[var(--color-text-muted)] text-sm">@{channel.username}</p>
            <p className="text-text-secondary text-sm mt-1 flex items-center gap-1.5 flex-wrap">
              <span>{fmt(channel.subscriberCount || 0)} subscribers</span>
              <span className="text-[var(--color-text-muted)]">&bull;</span>
              <span>{fmt(channel.channelSubscribeToCount || 0)} subscribed</span>
              <span className="text-[var(--color-text-muted)]">&bull;</span>
              <span>{videos?.length || 0} videos</span>
            </p>
          </div>
        </div>

        {!isChannelOwner ? (
          <SubscribeButton
            channelId={channel._id}
            isSubscribed={isSubscribed}
            subscriberCount={channel.subscriberCount || 0}
            onSubscribe={handleSubscribe}
            size="md"
            showCount
          />
        ) : (
          <Button
            onClick={() => navigate('/upload')}
            className="bg-accent! text-accent-on-dark! hover:bg-accent-light! hover:text-accent-on-light! rounded-xl! px-6! py-2.5! text-xs! font-semibold! uppercase! tracking-wider! transition-all"
          >
            Upload Video
          </Button>
        )}
      </div>
    </>
  )
}