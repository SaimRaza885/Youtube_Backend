import { useEffect, useState } from 'react'
import { CategoryChip, VideoGrid } from '../components'

const categories = ['All', 'Music', 'Gaming', 'News', 'Sports', 'Movies', 'Education', 'Technology', 'Entertainment', 'Podcasts', 'Live', 'Trending']

const fallbackVideos = [
  {
    _id: 'v1',
    title: 'Building a Full Stack App with React & Node.js in 2024',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=480&h=270&fit=crop',
    duration: 1845,
    views: 284000,
    createdAt: '2024-12-15T10:00:00Z',
    ownerDetails: {
      username: 'TechWithTim',
      fullName: 'Tech With Tim',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v2',
    title: 'Exploring the Mountains of Patagonia – A Cinematic Journey',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=480&h=270&fit=crop',
    duration: 925,
    views: 1200000,
    createdAt: '2024-12-14T08:30:00Z',
    ownerDetails: {
      username: 'NatureLens',
      fullName: 'Nature Lens',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v3',
    title: 'Top 10 AI Tools That Will Change Your Life in 2024',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=480&h=270&fit=crop',
    duration: 745,
    views: 892000,
    createdAt: '2024-12-13T14:00:00Z',
    ownerDetails: {
      username: 'FutureTech',
      fullName: 'Future Tech',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v4',
    title: 'How to Cook the Perfect Steak – Professional Chef Tips',
    thumbnail: 'https://images.unsplash.com/photo-1558030006-450675393462?w=480&h=270&fit=crop',
    duration: 632,
    views: 3456000,
    createdAt: '2024-12-12T18:00:00Z',
    ownerDetails: {
      username: 'ChefMaster',
      fullName: 'Chef Master',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v5',
    title: 'Learn JavaScript in 1 Hour – Crash Course for Beginners',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=480&h=270&fit=crop',
    duration: 3600,
    views: 5678000,
    createdAt: '2024-12-11T09:00:00Z',
    ownerDetails: {
      username: 'CodeAcademy',
      fullName: 'Code Academy',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v6',
    title: 'The Most Beautiful Places on Earth – 4K Drone Footage',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&h=270&fit=crop',
    duration: 1560,
    views: 7890000,
    createdAt: '2024-12-10T16:00:00Z',
    ownerDetails: {
      username: 'DroneVibes',
      fullName: 'Drone Vibes',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v7',
    title: 'React vs Next.js – Which One Should You Learn in 2024?',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=480&h=270&fit=crop',
    duration: 845,
    views: 456000,
    createdAt: '2024-12-09T11:00:00Z',
    ownerDetails: {
      username: 'DevExplained',
      fullName: 'Dev Explained',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v8',
    title: 'Ultimate Home Workout – No Equipment Needed (20 Min)',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=480&h=270&fit=crop',
    duration: 1200,
    views: 2345000,
    createdAt: '2024-12-08T07:00:00Z',
    ownerDetails: {
      username: 'FitLife',
      fullName: 'Fit Life',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v9',
    title: 'I Built a Tesla Cybertruck Replica Using Cardboard',
    thumbnail: 'https://images.unsplash.com/photo-1619767886558-efdc7b9af765?w=480&h=270&fit=crop',
    duration: 2100,
    views: 12300000,
    createdAt: '2024-12-07T20:00:00Z',
    ownerDetails: {
      username: 'CreativeBuilds',
      fullName: 'Creative Builds',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v10',
    title: 'The Science Behind Black Holes – Explained Simply',
    thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=480&h=270&fit=crop',
    duration: 1850,
    views: 4567000,
    createdAt: '2024-12-06T15:00:00Z',
    ownerDetails: {
      username: 'ScienceDaily',
      fullName: 'Science Daily',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v11',
    title: 'How I Made $50K Selling Digital Products Online',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=480&h=270&fit=crop',
    duration: 1567,
    views: 890000,
    createdAt: '2024-12-05T12:00:00Z',
    ownerDetails: {
      username: 'PassivePro',
      fullName: 'Passive Pro',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop'
    }
  },
  {
    _id: 'v12',
    title: 'Street Food Tour in Bangkok – Best Dishes You Must Try',
    thumbnail: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=480&h=270&fit=crop',
    duration: 1420,
    views: 6789000,
    createdAt: '2024-12-04T09:00:00Z',
    ownerDetails: {
      username: 'TravelEats',
      fullName: 'Travel Eats',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop'
    }
  },
]

export const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCat, setActiveCat] = useState('All')

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const { videoAPI } = await import('../services/endpoints')
        const res = await videoAPI.getAllVideos({ limit: 24, sortBy: 'createdAt', sortType: 'desc' })
        setVideos(res.data.data?.docs || res.data.data || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load videos')
        setVideos(fallbackVideos)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  return (
    <div>
      <div className="sticky top-14 z-30 bg-[#0f0f0f]/95 backdrop-blur-xl border-b border-[#2A2A42]">
        <div className="flex gap-3 overflow-x-auto px-6 py-3 scrollbar-none">
          {categories.map((c) => (
            <CategoryChip key={c} label={c} active={activeCat === c} onClick={() => setActiveCat(c)} />
          ))}
        </div>
      </div>
      <div className="px-4 lg:px-6 py-5">
        <VideoGrid
          videos={videos}
          loading={loading}
          error={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    </div>
  )
}
