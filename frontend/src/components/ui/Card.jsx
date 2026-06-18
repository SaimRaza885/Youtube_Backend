export const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-[#14141F] border border-[#2A2A42] rounded-xl ${className}`} {...props}>
    {children}
  </div>
)
