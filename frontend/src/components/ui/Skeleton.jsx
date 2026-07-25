export const Skeleton = ({ className = '', count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`bg-gradient-to-r from-tertiary via-[var(--color-skeleton-shimmer)] to-tertiary bg-[length:200%_100%] animate-shimmer rounded-lg ${className}`} />
    ))}
  </>
)
