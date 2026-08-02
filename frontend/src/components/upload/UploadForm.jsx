export const UploadForm = ({ formData, errors, handleChange }) => {
  return (
    <div
      className="rounded-xl p-6 space-y-5"
      style={{
        background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
        border: '1px solid var(--color-border-light)',
      }}
    >
      <h2 className="text-lg font-semibold text-text-primary mb-2">Details</h2>

      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Title (required)</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Add a title that describes your video"
          className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:outline-hidden focus:border-accent-light/50 focus:ring-1 focus:ring-accent-light/50 transition-all placeholder:text-[var(--color-text-muted)]"
        />
        {errors.title && <p className="text-danger text-xs mt-1">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Description (required)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell viewers about your video"
          rows={6}
          className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:outline-hidden focus:border-accent-light/50 focus:ring-1 focus:ring-accent-light/50 transition-all placeholder:text-[var(--color-text-muted)] resize-none"
        />
        {errors.description && <p className="text-danger text-xs mt-1">{errors.description}</p>}
      </div>
    </div>
  )
}