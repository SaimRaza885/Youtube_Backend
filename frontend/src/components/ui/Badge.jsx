export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-tertiary text-text-primary border border-border-subtle/50',
    accent: 'bg-accent text-accent-on-dark',
    success: 'bg-success text-white',
    danger: 'bg-danger text-white',
  }
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
