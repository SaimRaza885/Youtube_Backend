import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import { SearchBar } from './SearchBar'
import { NavActions } from './NavActions'
import { motion } from 'framer-motion'
import { Logo } from '../common'

export const Navbar = () => {
  const { toggleSidebar } = useUI()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 bg-secondary "
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-6 gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 flex items-center justify-center text-[var(--color-text-muted)] hover:text-text-primary hover:bg-[var(--color-overlay-hover)] rounded-xl transition-all duration-200"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-[18px] h-[18px]" />
          </button>
          <Link to="/" className="flex items-center ml-1">
            <Logo size="sm" layoutId="vidora-logo" />
          </Link>
        </div>

        <div className="flex-1 max-w-2xl mx-auto">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <NavActions />
        </div>
      </div>
    </motion.header>
  )
}
