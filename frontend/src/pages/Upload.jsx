import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { videoAPI } from '../services/endpoints'
import { Button, Input, Textarea } from '../components'

export const Upload = () => {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { addNotification } = useUI()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
    thumbnail: null,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  if (authLoading) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData(prev => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.file) newErrors.file = 'Video file is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      const form = new FormData()
      form.append('title', formData.title)
      form.append('description', formData.description)
      form.append('videoFile', formData.file)
      if (formData.thumbnail) form.append('thumbnail', formData.thumbnail)

      await videoAPI.uploadVideo(form)
      addNotification('Video uploaded successfully!', 'success')
      navigate('/')
    } catch (err) {
      addNotification(err.response?.data?.message || 'Upload failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-custom py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Upload Video</h1>

      <form onSubmit={handleSubmit} className="bg-secondary rounded-lg p-8 space-y-6">
        <Input
          label="Video Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter video title"
          error={errors.title}
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter video description"
          rows={4}
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Video File</label>
          <input
            type="file"
            name="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full bg-tertiary border border-text-secondary rounded-lg px-4 py-3 text-text-secondary file:mr-4 file:bg-accent file:border-0 file:text-white file:rounded file:cursor-pointer hover:file:bg-accent-hover"
          />
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Thumbnail (Optional)</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full bg-tertiary border border-text-secondary rounded-lg px-4 py-3 text-text-secondary file:mr-4 file:bg-accent file:border-0 file:text-white file:rounded file:cursor-pointer hover:file:bg-accent-hover"
          />
        </div>

        <Button fullWidth loading={loading} type="submit" size="lg">
          {loading ? 'Uploading...' : 'Upload Video'}
        </Button>
      </form>
    </div>
  )
}
