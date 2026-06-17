export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-tertiary text-text-primary',
    accent: 'bg-accent text-white',
    success: 'bg-green-600 text-white',
    danger: 'bg-red-600 text-white',
  }

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
