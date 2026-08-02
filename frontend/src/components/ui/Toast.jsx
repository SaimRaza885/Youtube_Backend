import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useUI } from '../../context/UIContext'

const config = {
  success: { border: 'border-l-success', icon: CheckCircle, iconColor: 'text-success' },
  error: { border: 'border-l-danger', icon: AlertCircle, iconColor: 'text-danger' },
  info: { border: 'border-l-accent', icon: Info, iconColor: 'text-accent' },
  warning: { border: 'border-l-warning', icon: AlertTriangle, iconColor: 'text-warning' },
}

export const Toast = ({ message, type = 'info', onClose }) => {
  const { border, icon: Icon, iconColor } = config[type] || config.info
  return (
    <div
      style={{ background: 'var(--color-dropdown-bg)', backdropFilter: 'blur(24px)' }}
      className={`${border} border border-border-subtle rounded-xl shadow-dropdown flex items-start gap-3 px-4 py-3 text-sm animate-slide-in max-w-sm border-l-4`}
    >
      {Icon && <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`} />}
      <span className="flex-1 text-text-primary leading-5">{message}</span>
      <button onClick={onClose} className="text-text-tertiary hover:text-text-primary transition-colors shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export const ToastContainer = () => {
  const { notifications, removeNotification } = useUI()
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((n) => (
        <Toast key={n.id} message={n.message} type={n.type} onClose={() => removeNotification(n.id)} />
      ))}
    </div>
  )
}
