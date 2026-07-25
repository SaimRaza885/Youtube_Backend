import { Link, useLocation } from 'react-router-dom'

export const SidebarItem = ({ icon: Icon, label, to, collapsed, onClick }) => {
  const { pathname } = useLocation()
  const active = pathname === to

  return (
    <Link
      to={to}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`flex items-center transition-all duration-200 rounded-xl ${collapsed
        ? 'flex-col gap-1 py-3 px-0 text-[10px]'
        : 'gap-3 px-3 py-2.5 text-sm'
        } ${active
          ? 'bg-accent-muted text-[var(--color-accent-active-text)]'
          : 'text-[var(--color-text-muted)] hover:bg-[var(--color-overlay-hover)] hover:text-text-primary'
        }`}
    >
      <Icon className={`shrink-0 ${collapsed ? 'w-5 h-5' : 'w-5 h-5'} ${active ? 'text-accent' : 'text-[var(--color-text-muted)]'}`} strokeWidth={active ? 2.5 : 2} />
      <span className={`truncate leading-none ${collapsed ? 'text-[10px]' : ''}`}>{label}</span>
    </Link>
  )
}
