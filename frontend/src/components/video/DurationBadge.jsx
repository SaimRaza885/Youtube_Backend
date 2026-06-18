export const DurationBadge = ({ seconds }) => {
  if (!seconds && seconds !== 0) return null
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return (
    <span className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-[11px] font-medium px-1.5 py-0.5 rounded leading-none tracking-tight">
      {m}:{String(s).padStart(2, '0')}
    </span>
  )
}
