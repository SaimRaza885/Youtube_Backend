import { X, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useUI } from '../../context/UIContext'

export const UploadProgressBar = () => {
  const { uploads, removeUpload } = useUI()

  if (uploads.length === 0) return null

  return (
    <div className="fixed bottom-20 right-4 z-50 space-y-2 max-w-sm w-72">
      {uploads.map((u) => (
        <div key={u.id} className="bg-secondary border border-border-subtle rounded-xl shadow-dropdown p-3 animate-slide-in">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              {u.status === 'uploading' ? (
                <Loader className="w-4 h-4 text-accent shrink-0 animate-spin" />
              ) : u.status === 'done' ? (
                <CheckCircle className="w-4 h-4 text-state-success shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span className="text-xs text-text-primary truncate">{u.fileName}</span>
            </div>
            {(u.status === 'done' || u.status === 'error') && (
              <button onClick={() => removeUpload(u.id)} className="text-text-tertiary hover:text-text-primary shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="w-full bg-tertiary rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                u.status === 'error' ? 'bg-red-500' : u.status === 'done' ? 'bg-state-success' : 'bg-accent'
              }`}
              style={{ width: `${u.progress}%` }}
            />
          </div>
          <p className="text-[10px] text-text-tertiary mt-1">
            {u.status === 'uploading' ? `${u.progress}% uploaded` : u.status === 'done' ? 'Published successfully' : 'Upload failed'}
          </p>
        </div>
      ))}
    </div>
  )
}
