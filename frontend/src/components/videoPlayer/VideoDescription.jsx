export const VideoDescription = ({ description }) => {
  if (!description) return null
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'var(--color-overlay-strong)',
        border: '1px solid var(--color-border-subtle)',
      }}
    >
      <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">{description}</p>
    </div>
  )
}