import { User, Upload, X } from 'lucide-react'

export const ImageUploaders = ({
  coverImageRef,
  coverImagePreview,
  handleCoverImageSelect,
  fileInputRef,
  avatarPreview,
  handleAvatarSelect
}) => {
  return (
    <div className="space-y-4">
      {/* Avatar */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-2 ml-1">
          Avatar Profile
        </label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-elevated border border-subtle flex items-center justify-center overflow-hidden shrink-0">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-text-secondary" />
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-lg bg-elevated text-text-primary hover:bg-[var(--color-overlay-hover)] transition-colors border border-subtle"
          >
            Browse
          </button>
          {avatarPreview && (
            <button
              type="button"
              onClick={() => {
                fileInputRef.current.value = ''
                handleAvatarSelect({ target: { files: null } })
              }}
              className="px-4 py-2 rounded-lg text-text-secondary hover:text-red-400 transition-colors"
            >
              Remove
            </button>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarSelect} />
        </div>
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-2 ml-1">
          Cover Image
        </label>
        <div
          onClick={() => coverImageRef.current?.click()}
          className="w-full h-32 rounded-lg bg-elevated border-2 border-dashed border-subtle flex flex-col items-center justify-center cursor-pointer hover:border-accent-light/50 transition-colors overflow-hidden relative"
        >
          {coverImagePreview ? (
            <>
              <img src={coverImagePreview} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Upload className="w-6 h-6 text-white" />
              </div>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-text-secondary mb-2" />
              <span className="text-base text-text-secondary">Click to upload cover</span>
            </>
          )}
        </div>
        <input ref={coverImageRef} type="file" accept="image/*" className="hidden" onChange={handleCoverImageSelect} />
      </div>
    </div>
  )
}