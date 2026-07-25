import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, Video, Library, History, Heart, ChevronLeft, Sparkles } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import { SidebarItem } from './SidebarItem'
import { Logo } from '../common'
import { motion, AnimatePresence } from 'framer-motion'

const mainLinks = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Subscriptions', to: '/subscriptions', icon: Video },
  { label: 'Library', to: '/playlists', icon: Library },
  { label: 'Liked', to: '/liked-vidoes', icon: Heart },
  { label: 'History', to: '/history', icon: History },
]

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUI()
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleItemClick = () => {
    if (!isDesktop) toggleSidebar()
  }

  const collapsed = !sidebarOpen && isDesktop

  const sidebarBg = 'var(--color-surface-low)'
  const sidebarBorder = '1px solid var(--color-border-subtle)'

  return (
    <>
      {sidebarOpen && !isDesktop && (
        <div className="fixed inset-0 bg-black/60 z-30 animate-fade-in" onClick={toggleSidebar} />
      )}
      <nav
        className={`hidden lg:flex flex-col shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${collapsed ? 'w-[72px]' : 'w-56'
          }`}
      >
        <div
          className="sticky top-20 h-[calc(100vh-96px)] rounded-2xl flex flex-col overflow-hidden shadow-lg shadow-black/20"
          style={{ background: sidebarBg, border: sidebarBorder }}
        >
          <div className="flex-1 overflow-y-auto sidebar-scrollbar py-3 space-y-1 px-2">
            {mainLinks.map((item) => (
              <SidebarItem key={item.to} {...item} collapsed={collapsed} onClick={handleItemClick} />
            ))}
            <div className="px-2 pt-3">
              <Link
                to="/pricing"
                onClick={handleItemClick}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 bg-accent text-accent-on-dark hover:bg-accent-light hover:text-accent-on-light  ${collapsed ? 'justify-center' : ''}`}
                style={{
                  background: 'var(--color-accent-hover)',
                  border: '1px solid var(--color-accent-border)',
                  color: 'text-white',
                }}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                {!collapsed && <span>Get Premium</span>}
              </Link>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center py-3 text-[var(--color-text-muted)] hover:text-text-primary hover:bg-[var(--color-overlay)] transition-all duration-200"
            style={{ borderTop: sidebarBorder }}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {sidebarOpen && !isDesktop && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 z-40 h-full w-64 shadow-2xl shadow-black/30"
            style={{ background: sidebarBg, borderRight: sidebarBorder }}
          >
            <div className="flex items-center h-16 px-4" style={{ borderBottom: sidebarBorder }}>
              <Link to="/" className="flex items-center" onClick={handleItemClick}>
                <Logo size="sm" layoutId="mobile-sidebar-logo" />
              </Link>
            </div>
            <div className="overflow-y-auto sidebar-scrollbar py-3 space-y-1 px-3 h-[calc(100%-64px)]">
              {mainLinks.map((item) => (
                <SidebarItem key={item.to} {...item} collapsed={false} onClick={handleItemClick} />
              ))}
              <div className="px-2 pt-3">
                <Link
                  to="/pricing"
                  onClick={handleItemClick}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: 'var(--color-accent-muted-bg)',
                    border: '1px solid var(--color-accent-border)',
                    color: 'var(--color-accent-light)',
                  }}
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Get Premium</span>
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
