import { AlertCircle } from 'lucide-react'
import { Button } from '../ui/Button'

export const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-32 px-6">
    <AlertCircle className="w-14 h-14 text-text-tertiary/40 mb-4" strokeWidth={1.5} />
    <p className="text-text-tertiary text-lg font-medium mb-1">Something went wrong</p>
    <p className="text-text-tertiary/60 text-sm mb-6">{message || 'An unexpected error occurred'}</p>
    {onRetry && (
      <Button onClick={onRetry} size="sm">
        Try Again
      </Button>
    )}
  </div>
)
