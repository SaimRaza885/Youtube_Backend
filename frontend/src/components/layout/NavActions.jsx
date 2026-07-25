import { Link } from 'react-router-dom'
import { Search, Plus, Sun, Moon } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import { useAuth } from '../../context/AuthContext'
import { UserDropdown } from './UserDropdown'

export const NavActions = () => {
  const { darkMode, toggleDarkMode } = useUI()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <div className="flex items-center gap-1">
      <Link to="/search" className="md:hidden flex items-center justify-center w-9 h-9 text-[var(--color-text-muted)] hover:text-text-primary hover:bg-[var(--color-overlay-hover)] rounded-xl transition-all duration-200">
        <Search className="w-[18px] h-[18px]" />
      </Link>
      <button
        onClick={toggleDarkMode}
        className="flex items-center justify-center w-9 h-9 text-[var(--color-text-muted)] hover:text-text-primary hover:bg-[var(--color-overlay-hover)] rounded-xl transition-all duration-200"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
      </button>
      {isAuthenticated ? (
        <>
          <Link
            to="/upload"
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary px-3 py-1.5 hover:bg-[var(--color-overlay-hover)] rounded-xl transition-all text-sm font-medium border border-subtle"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
          </Link>
          <div className="w-px h-6 bg-[var(--color-border-light)] mx-1" />
          <UserDropdown user={user} onLogout={logout} />
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="text-sm font-medium text-text-secondary hover:text-text-primary px-3 py-1.5 hover:bg-[var(--color-overlay-hover)] rounded-xl transition-all"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium bg-accent text-accent-on-dark hover:bg-accent-light hover:text-accent-on-light px-4 py-1.5 rounded-xl transition-all"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  )
}
