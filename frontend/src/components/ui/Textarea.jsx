export const Textarea = ({ label, placeholder, value, onChange, rows = 4, error, disabled = false, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-text-primary mb-1.5">{label}</label>}
    <textarea
      placeholder={placeholder} value={value} onChange={onChange} rows={rows} disabled={disabled}
      className={`w-full bg-tertiary border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder-text-tertiary/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed resize-none transition-all ${
        error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-border-subtle'
      } ${className}`} {...props}
    />
    {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
  </div>
)
