import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from './Button'

export const ConfirmDialog = ({
  open, onClose, onConfirm, title = 'Confirm',
  message = 'Are you sure?', confirmText = 'delete',
  loading = false,
}) => {
  const [input, setInput] = useState('')

  const handleClose = () => {
    setInput('')
    onClose()
  }

  const handleConfirm = () => {
    if (input.toLowerCase() !== confirmText.toLowerCase()) return
    setInput('')
    onConfirm()
  }

  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'var(--color-dropdown-bg)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--color-border-light)',
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-danger-muted flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-danger" />
            </div>
            <h3 className="text-base font-semibold text-text-primary">{title}</h3>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--color-overlay-hover)] text-[var(--color-text-muted)] hover:bg-[var(--color-overlay-hover)] hover:text-text-secondary transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-text-secondary leading-relaxed">{message}</p>

          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--color-text-muted)]">
              Type <span className="text-danger font-semibold">&quot;{confirmText}&quot;</span> to confirm
            </label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Type "${confirmText}" here...`}
              className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-[var(--color-text-muted)] outline-hidden transition-all duration-200 focus:border-danger/40 focus:shadow-[0_0_0_3px_color-mix(in srgb, var(--color-danger) 10%, transparent)]"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <Button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="bg-[var(--color-overlay-hover)]! text-text-secondary! hover:bg-[var(--color-overlay-hover)]! hover:text-text-primary! rounded-xl! px-5! py-2.5! text-xs! font-semibold! transition-all! border! border-subtle! flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={input.toLowerCase() !== confirmText.toLowerCase() || loading}
              loading={loading}
              className="bg-danger! text-white! hover:bg-danger! rounded-xl! px-5! py-2.5! text-xs! font-semibold! transition-all! flex-1 disabled:opacity-40!"
            >
              {confirmText.charAt(0).toUpperCase() + confirmText.slice(1)}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}