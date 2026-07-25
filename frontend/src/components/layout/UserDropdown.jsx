import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, User, LogOut, Clapperboard } from 'lucide-react'
import { Avatar } from '../ui/Avatar'

export const UserDropdown = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!user) return null
  const avatar = user.avatar?.url || null

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 pr-2.5 hover:bg-[var(--color-overlay-hover)] rounded-xl transition-all duration-200 border border-transparent hover:border-[var(--color-border-light)]"
      >
        <Avatar src={avatar} size="sm" />
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: 'var(--color-text-muted)' }} strokeWidth={2.5} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden z-50 shadow-2xl shadow-black/40"
          style={{
            background: 'var(--color-dropdown-bg)',
            backdropFilter: 'blur(24px)',
            border: '1px solid var(--color-border-light)',
          }}
        >
          <div className="px-4 py-4" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            <div className="flex items-center gap-3">
              <Avatar src={avatar} size="md" />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{user.fullName || user.username}</p>
                <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>@{user.username}</p>
              </div>
            </div>
          </div>

          <div className="py-1.5">
            <Link
              to={`/channel/${user.username}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.background = 'var(--color-overlay-hover)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent' }}
            >
              <Clapperboard className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
              My Channel
            </Link>
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.background = 'var(--color-overlay-hover)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent' }}
            >
              <User className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
              Profile
            </Link>
          </div>

          <div className="py-1.5" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            <button
              onClick={() => { onLogout(); setOpen(false) }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-all"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-light)'; e.currentTarget.style.background = 'var(--color-overlay-hover)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent' }}
            >
              <LogOut className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
