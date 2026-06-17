import { useUI } from '../context/UIContext'

const notificationStyles = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-accent text-white',
  warning: 'bg-yellow-600 text-white',
}

export const Toast = ({ message, type = 'info', onClose }) => {
  return (
    <div
      className={`${notificationStyles[type]} px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export const ToastContainer = () => {
  const { notifications, removeNotification } = useUI()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}
