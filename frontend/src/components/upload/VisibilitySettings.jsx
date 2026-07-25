import { Eye, Globe, Lock } from 'lucide-react'

export const VisibilitySettings = ({ formData, togglePublish }) => {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
        border: '1px solid var(--color-border-light)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-accent-light" />
        <h2 className="text-lg font-semibold text-text-primary">Visibility Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => togglePublish(true)}
          className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-4 ${
            formData.isPublished
              ? 'border-accent-light bg-accent-light/5'
              : 'border-subtle hover:border-[var(--color-border-light)]'
          }`}
          style={{
            background: formData.isPublished
              ? 'rgba(255,178,183,0.05)'
              : 'var(--color-overlay)',
          }}
        >
          <div className={`p-2 h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
            formData.isPublished ? 'bg-accent text-accent-light' : 'bg-elevated text-[var(--color-text-muted)]'
          }`}>
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Public</h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Everyone can watch your video instantly upon processing.</p>
          </div>
        </div>

        <div
          onClick={() => togglePublish(false)}
          className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-4 ${
            !formData.isPublished
              ? 'border-accent-light bg-accent-light/5'
              : 'border-subtle hover:border-[var(--color-border-light)]'
          }`}
          style={{
            background: !formData.isPublished
              ? 'rgba(255,178,183,0.05)'
              : 'var(--color-overlay)',
          }}
        >
          <div className={`p-2 h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
            !formData.isPublished ? 'bg-accent text-accent-light' : 'bg-elevated text-[var(--color-text-muted)]'
          }`}>
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Private</h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Only you can view this video inside your channel manager.</p>
          </div>
        </div>
      </div>
    </div>
  )
}