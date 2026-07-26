import { useEffect, useState } from 'react'
import { likeAPI } from '../services/endpoints'
import { useAuth } from '../context/AuthContext'
import {
  SectionHeader,
  LikedVideosGrid,
  LikedVideosEmptyState,
  LikedVideosSkeleton,
} from '../components/likedVideos'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const Liked_Vidoes = () => {
  useDocumentTitle('Liked Videos')
  const { user, isAuthenticated } = useAuth()
  const [vidoes, setVidoes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || !user) { setLoading(false); return }
    const fetch = async () => {
      try {
        const res = await likeAPI.getLikedVideos()
        const data = res.data.data
        setVidoes(data)
      } catch {
        setVidoes([])
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [user, isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text-secondary text-lg">Please log in to see your Liked Videos</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <SectionHeader count={vidoes.length} loading={loading} text="Liked Videos" desc="All the videos you've liked, in one place" />

        {loading ? (
          <LikedVideosSkeleton />
        ) : vidoes.length === 0 ? (
          <LikedVideosEmptyState />
        ) : (
          <LikedVideosGrid videos={vidoes} />
        )}
      </div>
    </div>
  )
}
