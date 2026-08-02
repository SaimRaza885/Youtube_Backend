import { Image as ImageIcon } from 'lucide-react'

export const ThumbnailUploader = ({ thumbnailPreview, onFileChange, submitting }) => {
  return (
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

      {thumbnailPreview && (
        <div className="mb-4 aspect-video rounded-xl overflow-hidden border border-subtle bg-black/40">
          <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
        </div>
      )}

      <label
        className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 min-h-[140px] ${
          thumbnailPreview
            ? 'border-accent-light/50 bg-accent-light/5'
            : 'border-[var(--color-border-light)] hover:border-border-light'
        }`}
        style={{
          background: !thumbnailPreview ? 'var(--color-overlay)' : undefined,
        }}
      >
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={onFileChange}
          disabled={submitting}
          className="sr-only"
        />
        <ImageIcon className={`w-8 h-8 mb-3 transition-colors ${thumbnailPreview ? 'text-accent-light' : 'text-[var(--color-text-muted)] group-hover:text-text-secondary'}`} />

        {thumbnailPreview ? (
          <div className="space-y-1 px-2 max-w-full">
            <p className="text-xs font-medium text-accent-light">Change thumbnail</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Click to select a new image</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-xs font-medium text-text-primary">Select a cover picture</p>
            <p className="text-[11px] text-[var(--color-text-muted)]">PNG, JPG or WebP images</p>
          </div>
        )}
      </label>
    </div>
  )
}