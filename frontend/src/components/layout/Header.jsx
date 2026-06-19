import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUI } from '../../context/UIContext'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'


export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const { toggleSidebar } = useUI()
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-40 bg-primary border-b border-tertiary">
      <div className="container-custom flex items-center justify-between h-16">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-text-primary hover:bg-secondary p-2 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-accent">
            {/* <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.175c-3.674-.492-11.556-.492-15.23 0C.488 3.667 0 5.068 0 9.079v5.842c0 4.011.488 5.412 4.385 5.904 3.674.492 11.556.492 15.23 0C23.512 20.333 24 18.932 24 14.921V9.079c0-4.011-.488-5.412-4.385-5.904zM9 15.9V8.1l6.233 3.9L9 15.9z" />
            </svg> */}
            <span className="hidden sm:inline">YouTube</span>
          </Link>
        </div>

        {/* Right: Search & Auth */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/upload" className="text-text-primary hover:text-accent transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <Avatar src={user?.avatar} size="sm" />
                  <svg className="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-0 w-48 bg-secondary border border-text-secondary rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to={`/channel/${user?.id}`} className="block px-4 py-2 text-text-primary hover:bg-tertiary transition-colors rounded-t-lg">
                    My Channel
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-text-primary hover:bg-tertiary transition-colors">
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-text-primary hover:bg-tertiary transition-colors rounded-b-lg border-t border-text-secondary"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
