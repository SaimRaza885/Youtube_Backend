import { motion } from 'framer-motion'
import { useProfile } from '../hooks/useProfile'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileStats } from '../components/profile/ProfileStats'
import { ProfileSettingsForm } from '../components/profile/ProfileSettingsForm'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }
})

export const Profile = () => {
  const {
    user, authLoading, activeTab, setActiveTab, setIsEditing,
    loading, stats, statsLoading, formData,
    avatarPreview, coverPreview,
    handleChange, handleSubmit, handleAvatarUpdate, handleCoverImageUpdate
  } = useProfile()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text-secondary text-lg">Please log in to view your profile</p>
      </div>
    )
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[var(--color-text-muted)] text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-20" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-10" />
      </div>

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto space-y-8">
        <motion.div {...fadeUp(0)}>
          <ProfileHeader
            user={user}
            coverPreview={coverPreview}
            avatarPreview={avatarPreview}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setIsEditing={setIsEditing}
            handleCoverImageUpdate={handleCoverImageUpdate}
            handleAvatarUpdate={handleAvatarUpdate}
            stats={stats}
            statsLoading={statsLoading}
          />
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          {activeTab === 'analytics' ? (
            <ProfileStats stats={stats} statsLoading={statsLoading} />
          ) : (
            <ProfileSettingsForm
              formData={formData}
              loading={loading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setIsEditing={setIsEditing}
              setActiveTab={setActiveTab}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}