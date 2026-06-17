export const Card = ({ children, className = '', onClick, hover = true }) => {
  return (
    <div
      className={`bg-secondary rounded-lg p-4 transition-all duration-300 ${
        hover ? 'hover:bg-tertiary cursor-pointer transform hover:scale-105' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
