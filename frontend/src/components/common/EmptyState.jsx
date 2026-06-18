export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-32 px-6">
    {Icon && <Icon className="w-14 h-14 text-text-tertiary/40 mb-4" strokeWidth={1.5} />}
    <p className="text-text-tertiary text-lg font-medium mb-1">{title || 'Nothing here'}</p>
    {description && <p className="text-text-tertiary/60 text-sm mb-6">{description}</p>}
    {action && <div>{action}</div>}
  </div>
)
