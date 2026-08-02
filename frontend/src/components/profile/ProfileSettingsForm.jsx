import { motion } from 'framer-motion'
import { X, User } from 'lucide-react'
import { Button } from '../../components'

export const ProfileSettingsForm = ({
  formData, loading, handleChange, handleSubmit, setIsEditing, setActiveTab
}) => {
  const handleClose = () => {
    setIsEditing(false)
    setActiveTab('analytics')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'var(--color-dropdown-bg)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--color-border-light)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/12 flex items-center justify-center">
              <User className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h3 className="text-base font-semibold ">Edit Profile</h3>
              <p className="text-[10px] text-[var(--color-text-muted)] font-medium">Update your display name</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-overlay-hover)] text-[var(--color-text-muted)] hover:bg-[var(--color-overlay-hover)] hover:text-text-secondary transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Full Name</label>
            <div className="relative">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-[var(--color-text-muted)] transition-all duration-200 outline-hidden focus:border-accent/40 focus:shadow-[0_0_0_3px_var(--color-accent-muted)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              loading={loading}
              className="bg-accent! text-accent-on-dark! hover:bg-accent-light! hover:text-accent-on-light! rounded-xl! px-6! py-2.5! text-xs! font-semibold! transition-all!"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="bg-[var(--color-overlay-hover)]! text-text-secondary! hover:bg-[var(--color-overlay-hover)]! hover:text-text-primary! rounded-xl! px-6! py-2.5! text-xs! font-semibold! transition-all! border! border-subtle!"
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}