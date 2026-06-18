export const Button = ({ children, variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled = false, onClick, className = '', leftIcon: LeftIcon, rightIcon: RightIcon, ...props }) => {
  const base = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2'
  const variants = {
    primary: 'bg-accent hover:bg-accent-hover text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20 hover:shadow-accent/30',
    secondary: 'bg-tertiary hover:bg-elevated text-text-primary border border-border-subtle',
    ghost: 'bg-transparent hover:bg-tertiary text-text-secondary hover:text-text-primary',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base', icon: 'p-2' }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`} onClick={onClick} disabled={disabled || loading} {...props}>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && LeftIcon && <LeftIcon className="w-4 h-4" />}
      {children}
      {!loading && RightIcon && <RightIcon className="w-4 h-4" />}
    </button>
  )
}
