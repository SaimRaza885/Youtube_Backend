import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search as SearchIcon, ChevronDown, Play, TrendingUp, Clock, Sparkles } from 'lucide-react'
import { searchAPI } from '../services/endpoints'
import { Skeleton } from '../components'
import { ago, fmt } from '../utils'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

const fmtDuration = (seconds) => {
  if (!seconds || seconds <= 0) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

const Thumbnail = ({ src, alt, duration }) => (
  <div className="relative w-full h-full overflow-hidden bg-[var(--color-search-bg)]">
    <img
      src={src || 'https://placehold.co/320x180/1C1C2E/6B6B80?text=No+Thumbnail'}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center backdrop-blur-md scale-75 group-hover:scale-100 transition-all">
        <Play className="w-5 h-5 text-accent-on-dark ml-0.5" fill="var(--color-accent-on-dark)" />
      </div>
    </div>
    {duration > 0 && (
      <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[11px] font-medium text-white/90 leading-none backdrop-blur-sm">
        {fmtDuration(duration)}
      </span>
    )}
  </div>
)

const FILTERS = [
  { key: 'relevance', label: 'Relevance', icon: Sparkles, sortBy: null, sortType: null },
  { key: 'most_viewed', label: 'Most Viewed', icon: TrendingUp, sortBy: 'views', sortType: 'desc' },
  { key: 'newest', label: 'Newest', icon: Clock, sortBy: 'createdAt', sortType: 'desc' },
  { key: 'oldest', label: 'Oldest', icon: Clock, sortBy: 'createdAt', sortType: 'asc' },
]

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const activeFilter = searchParams.get('sort') || 'relevance'
  useDocumentTitle(query ? `${query} - Search` : 'Search')

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [totalDocs, setTotalDocs] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchResults = useCallback(async (pageNum, append = false) => {
    if (!query.trim()) return
    const filter = FILTERS.find(f => f.key === activeFilter) || FILTERS[0]
    const params = { page: pageNum, limit: 10 }
    if (filter.sortBy && filter.sortType) {
      params.sortBy = filter.sortBy
      params.sortType = filter.sortType
    }
    try {
      if (append) setLoadingMore(true); else setLoading(true)
      const response = await searchAPI.search(query, params)
      const data = response.data.data
      const docs = data?.docs || []
      if (append) {
        setResults(prev => [...prev, ...docs])
      } else {
        setResults(docs)
      }
      setHasNextPage(data?.hasNextPage || false)
      setTotalDocs(data?.totalDocs || 0)
    } catch {
      if (!append) setResults([])
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [query, activeFilter])

  useEffect(() => {
    setPage(1)
    setResults([])
    setHasNextPage(false)
    fetchResults(1)
  }, [fetchResults])

  const handleFilterChange = (key) => {
    const next = new URLSearchParams(searchParams)
    if (key === 'relevance') next.delete('sort')
    else next.set('sort', key)
    setSearchParams(next, { replace: true })
  }

  const handleLoadMore = () => {
    const next = page + 1
    setPage(next)
    fetchResults(next, true)
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-15" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-10" />
      </div>

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <main className="flex-1 min-w-0">
          {!query.trim() ? (
            <motion.div {...fadeUp(0)} className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--color-overlay-strong)] flex items-center justify-center mb-6"
                style={{ border: '1px solid var(--color-border-subtle)' }}
              >
                <SearchIcon className="w-9 h-9 text-[var(--color-text-muted)]" strokeWidth={1} />
              </div>
              <h2 className="text-2xl font-semibold text-text-primary mb-2">Search Videos</h2>
              <p className="text-text-secondary">Type a query above to discover content</p>
            </motion.div>
          ) : (
            <>
              <motion.div {...fadeUp(0)} className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
                  Results for <span className="text-accent-light">"{query}"</span>
                </h1>
                {!loading && (
                  <p className="text-text-secondary mt-2 text-sm">{totalDocs} result{totalDocs !== 1 ? 's' : ''}</p>
                )}
              </motion.div>

              <motion.div {...fadeUp(0.05)} className="flex items-center gap-2 mb-8 flex-wrap"
                style={{ animation: 'fadeIn 0.6s ease-out 0.1s forwards', opacity: 0 }}
              >
                {FILTERS.map((filter) => {
                  const active = activeFilter === filter.key
                  const Icon = filter.icon
                  return (
                    <button
                      key={filter.key}
                      onClick={() => handleFilterChange(filter.key)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        background: active ? 'var(--color-accent-muted-bg)' : 'var(--color-overlay-strong)',
                        border: active
                          ? '1px solid var(--color-accent-border-subtle)'
                          : '1px solid var(--color-border-subtle)',
                        color: active ? 'var(--color-accent-active-text)' : 'var(--color-text-secondary)',
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {filter.label}
                    </button>
                  )
                })}
              </motion.div>

              {loading && results.length === 0 ? (
                <div className="space-y-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl"
                      style={{ border: '1px solid var(--color-overlay-hover)' }}
                    >
                      <Skeleton className="w-full sm:w-[280px] aspect-video rounded-lg shrink-0" />
                      <div className="flex-1 space-y-3 py-1">
                        <Skeleton className="h-5 w-3/4 rounded-lg" />
                        <Skeleton className="h-3 w-1/3 rounded-lg" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="w-6 h-6 rounded-full" />
                          <Skeleton className="h-3 w-24 rounded-lg" />
                        </div>
                        <Skeleton className="h-3 w-full rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result, idx) => {
                    const owner = result.ownerDetails || {}
                    const avatarUrl = owner.avatar?.url
                    const channelName = owner.username || 'unknown'

                    return (
                      <motion.article key={result._id} {...fadeUp(Math.min(0.1 + idx * 0.05, 0.5))}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl group cursor-pointer transition-all duration-300"
                        style={{
                          background: 'var(--color-overlay)',
                          border: '1px solid var(--color-overlay-hover)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-overlay-hover)'
                          e.currentTarget.style.borderColor = 'rgba(255,178,183,0.12)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--color-overlay)'
                          e.currentTarget.style.borderColor = 'var(--color-overlay-hover)'
                        }}
                      >
                        <Link to={`/video/${result._id}`} className="w-full sm:w-[280px] shrink-0 aspect-video rounded-xl overflow-hidden relative group/thumb"
                          style={{ border: '1px solid var(--color-border-subtle)' }}
                        >
                          <Thumbnail src={result.thumbnail?.url} alt={result.title} duration={result.duration || 0} />
                        </Link>
                        <div className="flex flex-col py-0.5 min-w-0 flex-1 justify-center">
                          <Link to={`/video/${result._id}`}>
                            <h3 className="text-base font-semibold text-text-primary leading-snug mb-1.5 group-hover:text-accent-light transition-colors line-clamp-2">
                              {result.title}
                            </h3>
                          </Link>
                          <div className="text-sm text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                            <span>{fmt(result.views)} views</span>
                            <span className="text-[#5b4041]">&bull;</span>
                            <span>{ago(result.createdAt)}</span>
                          </div>
                          <Link to={`/channel/${owner._id}`} className="flex items-center gap-2 mb-2 hover:text-text-primary transition-colors w-fit">
                            {avatarUrl ? (
                              <img src={avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-[var(--color-overlay-hover)]" />
                            )}
                            <span className="text-sm text-text-secondary font-medium">{channelName}</span>
                          </Link>
                          <p className="text-sm text-[var(--color-text-muted)] line-clamp-1">{result.description}</p>
                        </div>
                      </motion.article>
                    )
                  })}

                  {hasNextPage && (
                    <motion.div {...fadeUp(0.5)} className="flex justify-center pt-6 pb-8">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-widest transition-all disabled:opacity-40 flex items-center gap-2 group"
                        style={{
                          background: 'var(--color-overlay-strong)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid var(--color-border-subtle)',
                          color: 'var(--color-text-primary)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-light)'; e.currentTarget.style.color = 'var(--color-accent-light)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-subtle)'; e.currentTarget.style.color = 'var(--color-text-primary)' }}
                      >
                        {loadingMore ? 'Loading...' : 'Load More Results'}
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div {...fadeUp(0.2)} className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-overlay-strong)] flex items-center justify-center mb-6"
                    style={{ border: '1px solid var(--color-border-subtle)' }}
                  >
                    <SearchIcon className="w-9 h-9 text-[var(--color-text-muted)]" strokeWidth={1} />
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">No Results Found</h2>
                  <p className="text-text-secondary">Try different keywords or refine your search</p>
                </motion.div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
