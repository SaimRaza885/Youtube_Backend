export const Card = ({ children, hover = false, className = '', ...props }) => (
  <div
    className={`bg-secondary border border-border-subtle rounded-xl ${
      hover ? 'transition-all duration-200 hover:border-accent/30 hover:shadow-card-hover cursor-pointer' : ''
    } ${className}`}
    {...props}
  >
    {children}
  </div>
)
