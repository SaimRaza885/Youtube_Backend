export const Input = ({ label, type = 'text', placeholder, value, onChange, error, disabled = false, className = '', leftIcon: LeftIcon, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-text-primary mb-1.5">{label}</label>}
    <div className="relative">
      {LeftIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <LeftIcon className="w-4 h-4 text-text-tertiary" />
        </div>
      )}
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled}
        className={`w-full bg-tertiary border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder-text-tertiary/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${LeftIcon ? 'pl-10' : ''} ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-border-subtle'
        } ${className}`} {...props}
      />
    </div>
    {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
  </div>
)
