import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { Button, Input, Card } from '../components'
import { Avatar } from '../components'

export const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { addNotification } = useUI()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
  })

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
    } catch (err) {
      addNotification('Failed to update profile', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="container-custom py-8 text-text-secondary">Please log in to view your profile</div>
  }

  return (
    <div className="container-custom py-8 max-w-2xl">
      <div className="bg-secondary rounded-lg p-8 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <Avatar src={user.avatar} size="xl" />
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{user.fullName}</h1>
            <p className="text-text-secondary">@{user.username}</p>
            <p className="text-text-secondary text-sm mt-1">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <p className="text-2xl font-bold text-accent">24</p>
            <p className="text-text-secondary text-sm">Videos</p>
          </Card>
          <Card>
            <p className="text-2xl font-bold text-accent">1.2K</p>
            <p className="text-text-secondary text-sm">Subscribers</p>
          </Card>
          <Card>
            <p className="text-2xl font-bold text-accent">15K</p>
            <p className="text-text-secondary text-sm">Total Views</p>
          </Card>
        </div>

        {/* Edit Profile */}
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} fullWidth>
            Edit Profile
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            <Input
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
            <div className="flex gap-3">
              <Button fullWidth type="submit" loading={loading}>
                Save Changes
              </Button>
              <Button
                fullWidth
                variant="secondary"
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
