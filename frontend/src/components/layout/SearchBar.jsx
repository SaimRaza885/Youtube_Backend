import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'

export const SearchBar = () => {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }, [query, navigate])

  return (
    <form onSubmit={handleSubmit} className="hidden md:flex items-center flex-1 max-w-xl mx-4 lg:mx-8">
      <div className={`relative w-full transition-all duration-300 ${focused ? 'scale-[1.01]' : ''}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search videos..."
          className="w-full border rounded-xl px-4 py-2.5 pl-11 text-sm focus:outline-hidden transition-all"
          style={{
            background: 'var(--color-search-bg)',
            color: 'var(--color-text-primary)',
            borderColor: focused ? 'var(--color-accent-active-text)' : 'var(--color-border-subtle)',
            boxShadow: focused ? '0 0 0 1px var(--color-accent-border-subtle)' : 'none',
          }}
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--color-text-muted)' }} strokeWidth={2} />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-accent hover:bg-accent-light text-accent-on-dark hover:text-accent-on-light rounded-lg text-xs font-medium transition-all duration-200"
        >
          <Search className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </form>
  )
}
