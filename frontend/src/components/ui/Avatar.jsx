import { MediaPlaceholder } from '../common/MediaPlaceholder'

const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14', xl: 'w-20 h-20' }

export const Avatar = ({ src, alt = 'User', size = 'md', className = '' }) => (
  src ? (
    <img
      src={src}
      alt={alt}
      width={20}
      height={20}
      className={`rounded-full object-cover ring-2 ring-border-subtle shrink-0 ${sizes[size]} ${className}`}
    />
  ) : (
    <div className={`rounded-full ring-2 ring-border-subtle shrink-0 overflow-hidden ${sizes[size]} ${className}`}>
      <MediaPlaceholder kind="avatar" className="w-full h-full" />
    </div>
  )
)
