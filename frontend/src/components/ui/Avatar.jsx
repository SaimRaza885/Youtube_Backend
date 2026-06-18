const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14', xl: 'w-20 h-20' }

export const Avatar = ({ src, alt = 'User', size = 'md', className = '' }) => (
  <img
    src={src || 'https://placehold.co/100x100/24243A/A1A1B5?text=U'}
    alt={alt}
    width={20}
    height={20}
    className={`rounded-full object-cover ring-2 ring-border-subtle flex-shrink-0 ${sizes[size]} ${className}`}
  />
)
