import { X } from 'lucide-react'
import { useUI } from '../../context/UIContext'

const styles = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-accent text-white',
  warning: 'bg-yellow-600 text-white',
}

export const Toast = ({ message, type = 'info', onClose }) => (
  <div className={`${styles[type]} px-4 py-2.5 rounded-xl shadow-dropdown flex items-center gap-3 text-sm animate-slide-in`}>
    <span className="flex-1">{message}</span>
    <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity">
      <X className="w-4 h-4" />
    </button>
  </div>
)

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
