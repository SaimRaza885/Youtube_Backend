import { Link, useLocation } from 'react-router-dom'

export const SidebarItem = ({ icon: Icon, label, to, collapsed, onClick }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  const activeClass = 'bg-[#8B5CF6]/12 text-[#8B5CF6]'
  const inactiveClass = 'text-[#6B6B80] hover:bg-[#1C1C2E] hover:text-[#F0F0F8]'

  return (
    <Link
      to={to}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`flex items-center transition-all duration-200 rounded-lg ${
        collapsed
          ? 'flex-col gap-1 py-3 px-1 mx-1 text-[10px]'
          : 'gap-3 px-3 py-2.5 text-sm'
      } ${active ? activeClass : inactiveClass}`}
    >
      <Icon className={`shrink-0 w-5 h-5 ${active ? 'text-[#8B5CF6]' : ''}`} strokeWidth={active ? 2.5 : 2} />
      <span className={`truncate leading-none ${collapsed ? 'text-[10px]' : ''}`}>{label}</span>
    </Link>
  )
}
