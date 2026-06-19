import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { Button, Input } from '../components'

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const { login, loading, error } = useAuth()
  const { addNotification } = useUI()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    const result = await login(formData.email, formData.password)
    if (result.success) {
      addNotification('Login successful!', 'success')
      navigate('/')
    } else {
      addNotification(result.error, 'error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-surface px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-text tracking-tight">Sign In</h1>
            <p className="text-sm text-text-secondary mt-2">to your YouTube account</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" error={errors.email} />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" error={errors.password} />
            <Button fullWidth loading={loading} type="submit">Sign In</Button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-text-secondary">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <p className="text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:text-accent-hover font-medium transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
