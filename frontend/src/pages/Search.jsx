import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchAPI } from '../services/endpoints'
import { Card, Skeleton, Input } from '../components'
import { useDebounce } from '../hooks/useDebounce'
import { Link } from 'react-router-dom'

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState(query)
  const debouncedSearch = useDebounce(searchInput, 500)

  useEffect(() => {
    if (debouncedSearch.trim()) {
      const fetchResults = async () => {
        try {
          setLoading(true)
          const response = await searchAPI.search(debouncedSearch)
          setResults(response.data.data?.docs || response.data.data || [])
        } catch (err) {
          console.error('Search failed:', err)
          setResults([])
        } finally {
          setLoading(false)
        }
      }
      fetchResults()
    } else {
      setResults([])
    }
  }, [debouncedSearch])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchInput(value)
    setSearchParams({ q: value }, { replace: true })
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <Input
          type="text"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search videos, channels, playlists..."
          className="text-lg"
        />
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-6">Search Results</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className="w-full aspect-video rounded-lg" />)
          : results.length > 0
          ? results.map((result) => (
              <Link key={result._id} to={`/video/${result._id}`} className="group">
                <Card hover>
                  <div className="relative w-full aspect-video bg-tertiary rounded-lg overflow-hidden mb-3">
                    <img
                      src={result.thumbnail?.url || 'https://via.placeholder.com/320x180'}
                      alt={result.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-text-primary truncate-text-2 text-sm mb-1">{result.title}</h3>
                  <p className="text-text-secondary text-xs truncate">{result.ownerDetails?.username}</p>
                  <p className="text-text-secondary text-xs">{result.views || 0} views</p>
                </Card>
              </Link>
            ))
          : (
            <div className="col-span-full text-center text-text-secondary py-12">
              {searchInput.trim() ? 'No results found' : 'Start searching to find videos'}
            </div>
          )}
      </div>
    </div>
  )
}
