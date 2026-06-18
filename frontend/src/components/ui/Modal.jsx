import { X } from 'lucide-react'

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null

  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className={`bg-secondary border border-border-subtle rounded-xl ${sizes[size]} w-full max-h-[90vh] overflow-y-auto shadow-modal`} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-secondary flex items-center justify-between p-5 border-b border-border-subtle rounded-t-xl">
          <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          <button onClick={onClose} className="text-text-tertiary hover:text-text-primary p-1.5 rounded-full hover:bg-tertiary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
