import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchAPI } from '../services/endpoints'
import { Card, Skeleton } from '../components'
import { Link } from 'react-router-dom'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.trim()) {
      const fetchResults = async () => {
        try {
          setLoading(true)
          const response = await searchAPI.search(query)
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
  }, [query])

  return (
    <div className="container-custom py-8">
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        {query.trim() ? `Results for "${query}"` : 'Search Results'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? Array(8).fill(0).map((_, i) => <Skeleton key={i} className="w-full aspect-video rounded-lg" />)
          : results.length > 0
          ? results.map((result) => (
              <Link key={result._id} to={`/video/${result._id}`} className="group">
                <Card hover>
                  <div className="relative w-full aspect-video bg-tertiary rounded-lg overflow-hidden mb-3">
                    <img
                      src={result.thumbnail?.url || 'https://placehold.co/320x180/1C1C2E/6B6B80?text=No+Thumbnail'}
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
              {query.trim() ? 'No results found' : 'Use the search bar above to find videos'}
            </div>
          )}
      </div>
    </div>
  )
}
