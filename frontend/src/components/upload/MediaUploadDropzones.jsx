import { Video, Image as ImageIcon } from 'lucide-react'

export const MediaUploadDropzones = ({ formData, errors, handleFileChange }) => {
  return (
    <div className="space-y-6">
      <div
        className="rounded-xl p-6"
        style={{
          background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
          border: '1px solid var(--color-border-light)',
        }}
      >
        <h2 className="text-sm font-semibold text-text-primary mb-3">Video Source File</h2>
        <label
          className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 min-h-[160px] ${
            formData.file
              ? 'border-[#22C55E]/50 bg-[#22C55E]/5'
              : errors.file
                ? 'border-red-500/50 bg-red-500/5'
                : 'border-[var(--color-border-light)] hover:border-white/[0.16]'
          }`}
          style={{
            background: !formData.file && !errors.file ? 'var(--color-overlay)' : undefined,
          }}
        >
          <input
            type="file"
            name="file"
            accept="video/*"
            onChange={handleFileChange}
            className="sr-only"
          />
          <Video className={`w-8 h-8 mb-3 transition-colors ${formData.file ? 'text-[#22C55E]' : 'text-[var(--color-text-muted)] group-hover:text-text-secondary'}`} />

          {formData.file ? (
            <div className="space-y-1 px-2 max-w-full">
              <p className="text-xs font-medium text-[#22C55E] truncate">{formData.file.name}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">{(formData.file.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-medium text-text-primary">Click to choose video file</p>
              <p className="text-[11px] text-[var(--color-text-muted)]">MP4, MKV, or MOV formats</p>
            </div>
          )}
        </label>
        {errors.file && <p className="text-red-400 text-xs mt-2 font-medium">{errors.file}</p>}
      </div>

      <div
        className="rounded-xl p-6"
        style={{
          background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
          border: '1px solid var(--color-border-light)',
        }}
      >
        <h2 className="text-sm font-semibold text-text-primary mb-3">
          Cover Thumbnail <span className="text-[var(--color-text-muted)] text-xs font-normal">(Optional)</span>
        </h2>
        <label
          className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 min-h-[160px] ${
            formData.thumbnail
              ? 'border-accent-light/50 bg-accent-light/5'
              : 'border-[var(--color-border-light)] hover:border-white/[0.16]'
          }`}
          style={{
            background: !formData.thumbnail ? 'var(--color-overlay)' : undefined,
          }}
        >
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
          <ImageIcon className={`w-8 h-8 mb-3 transition-colors ${formData.thumbnail ? 'text-accent-light' : 'text-[var(--color-text-muted)] group-hover:text-text-secondary'}`} />

          {formData.thumbnail ? (
            <div className="space-y-1 px-2 max-w-full">
              <p className="text-xs font-medium text-accent-light truncate">{formData.thumbnail.name}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">Image selected</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-medium text-text-primary">Select a cover picture</p>
              <p className="text-[11px] text-[var(--color-text-muted)]">PNG, JPG or WebP images</p>
            </div>
          )}
        </label>
      </div>
    </div>
  )
}