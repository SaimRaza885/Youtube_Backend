import { Play, Image as ImageIcon, User } from 'lucide-react'

const kindConfig = {
  thumbnail: { Icon: Play, className: 'bg-linear-to-br from-accent/30 to-accent-hover/20', icon: 'text-white/40' },
  avatar: { Icon: User, className: 'bg-linear-to-br from-[var(--color-placeholder-bg)] to-[var(--color-surface-elevated)]', icon: 'text-[var(--color-placeholder-fg)]' },
  cover: { Icon: ImageIcon, className: 'bg-linear-to-br from-[var(--color-placeholder-bg)] to-[var(--color-surface-elevated)]', icon: 'text-[var(--color-placeholder-fg)]' },
}

export const MediaPlaceholder = ({ kind = 'thumbnail', className = '' }) => {
  const cfg = kindConfig[kind] || kindConfig.thumbnail
  const { Icon } = cfg
  return (
    <div className={`flex items-center justify-center ${cfg.className} ${className}`}>
      <Icon className={cfg.icon} />
    </div>
  )
}
