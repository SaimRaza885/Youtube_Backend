import { Link, useLocation } from 'react-router-dom'
import { useUI } from '../../context/UIContext'

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUI()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { label: 'Home', path: '/', icon: 'M3 12a9 9 0 1118 0 9 9 0 01-18 0z' },
    { label: 'Trending', path: '/trending', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Subscriptions', path: '/subscriptions', icon: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' },
    { label: 'Playlists', path: '/playlists', icon: 'M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h12v-2H3v2z' },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-16 lg:top-0 left-0 h-[calc(100vh-64px)] lg:h-auto w-64 bg-primary border-r border-tertiary transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } z-40`}
      >
        <nav className="p-4 space-y-2 overflow-y-auto h-full">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${isActive(item.path)
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:bg-secondary hover:text-text-primary"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
