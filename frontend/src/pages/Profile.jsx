import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { Button, Input, Card, Avatar } from '../components'
import { dashboardAPI } from '../services/endpoints'
import { fmt } from '../utils'

export const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { addNotification } = useUI()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [formData, setFormData] = useState({
    fullName: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({ fullName: user.fullName || '' })
      fetchStats()
    }
  }, [user])

  const fetchStats = async () => {
    try {
      setStatsLoading(true)
      const response = await dashboardAPI.getStats()
      setStats(response.data.data)
    } catch {
      setStats(null)
    } finally {
      setStatsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await updateProfile(formData)
      if (result.success) {
        addNotification('Profile updated successfully!', 'success')
        setIsEditing(false)
      }
    } catch {
      addNotification('Failed to update profile', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="container-custom py-8 text-text-secondary text-center">Please log in to view your profile</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="bg-secondary border border-border-subtle rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar src={user.avatar} size="xl" />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{user.fullName}</h1>
            <p className="text-text-secondary">@{user.username}</p>
            <p className="text-text-tertiary text-sm mt-1">
              Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center">
              <p className="text-xl font-bold text-accent">{fmt(stats.totalVideos || 0)}</p>
              <p className="text-text-tertiary text-xs mt-0.5">Videos</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xl font-bold text-accent">{fmt(stats.totalSubscribers || 0)}</p>
              <p className="text-text-tertiary text-xs mt-0.5">Subscribers</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xl font-bold text-accent">{fmt(stats.totalViews || 0)}</p>
              <p className="text-text-tertiary text-xs mt-0.5">Views</p>
            </Card>
          </div>
        )}

        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} fullWidth>Edit Profile</Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
            <div className="flex gap-3">
              <Button fullWidth type="submit" loading={loading}>Save Changes</Button>
              <Button fullWidth variant="secondary" onClick={() => setIsEditing(false)} disabled={loading}>Cancel</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
