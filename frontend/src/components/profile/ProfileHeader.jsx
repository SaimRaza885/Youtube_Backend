import { useRef } from 'react'
import { Camera, CheckCircle2, Calendar } from 'lucide-react'
import { Avatar, Button } from '../../components'

export const ProfileHeader = ({
  user, coverPreview, avatarPreview, activeTab, setActiveTab,
  setIsEditing, handleCoverImageUpdate, handleAvatarUpdate,
  stats, statsLoading
}) => {
  const fileInputRef = useRef(null)
  const coverImageRef = useRef(null)

  const subs = stats?.totalSubscribers || 0
  const views = stats?.totalViews || 0
  const isMonetized = subs >= 10 && views >= 100

  return (
    <div
      className="relative rounded-2xl overflow-hidden min-h-[240px] flex items-end"
      style={{
        background: coverPreview
          ? `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${coverPreview}) center/cover`
          : 'var(--color-surface-low)',
        border: '1px solid var(--color-border-light)',
      }}
    >


      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={() => coverImageRef.current?.click()}
          className="flex items-center gap-2 bg-[var(--color-overlay-hover)] hover:bg-[var(--color-overlay-strong)] text-text-secondary hover:text-text-primary border border-[var(--color-border-light)] px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-sm transition-colors cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          Change Banner
        </button>
        <input type="file" ref={coverImageRef} accept="image/*" onChange={handleCoverImageUpdate} className="hidden" />
      </div>

      <div className="w-full p-6 sm:p-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group cursor-pointer shrink-0" onClick={() => fileInputRef.current?.click()}>
              <Avatar src={avatarPreview || user.avatar?.url} size="xl" className="w-20 h-20 md:w-24 md:h-24 border-4 shadow-xl object-cover rounded-full" style={{ borderColor: 'var(--color-surface-low)' }} />
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleAvatarUpdate} className="hidden" />
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-4 border-transparent">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>

              <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className={`text-2xl md:text-3xl font-bold ${coverPreview ? 'text-white' : 'text-text-primary'} tracking-tight`}>{user.fullName}</h1>
                {isMonetized && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="text-[10px] font-semibold text-[#22C55E] uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </div>
              <p className={`text-sm ${coverPreview ? 'text-white/80' : 'text-text-secondary'}`}>@{user.username}</p>
              <div className={`flex items-center gap-1.5 text-xs ${coverPreview ? 'text-white/60' : 'text-[var(--color-text-muted)]'}`}>
                <Calendar className="w-3 h-3" />
                <span>
                  Member since {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <Button
              onClick={() => { setActiveTab('analytics'); setIsEditing(false) }}
              className={`!rounded-xl !px-5 !py-2 !text-xs !font-semibold !transition-all ${activeTab === 'analytics' ? '!bg-accent !text-accent-on-dark' : '!bg-[var(--color-overlay-hover)] !text-text-secondary hover:!bg-[var(--color-overlay-hover)] hover:!text-text-primary !border !border-subtle'}`}
            >
              Dashboard
            </Button>
            <Button
              onClick={() => { setActiveTab('edit'); setIsEditing(true) }}
              className={`!rounded-xl !px-5 !py-2 !text-xs !font-semibold !transition-all ${activeTab === 'edit' ? '!bg-accent !text-white' : '!bg-[var(--color-overlay-hover)] !text-white hover:!bg-[var(--color-overlay-hover)] !border !border-subtle'}`}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}