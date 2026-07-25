import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { ImageUploaders } from './ImageUploaders'

const Field = ({ label, name, type = 'text', value, onChange, error, placeholder, children }) => (
  <div>
    <label htmlFor={name} className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-1.5 ml-1">
      {label}
    </label>
    {children ? children : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-elevated  rounded-lg px-4 py-3 text-base text-text-primary placeholder:text-text-primary/30 focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light transition-colors"
      />
    )}
    {error && <p className="text-red-400 text-xs mt-1.5 ml-1">{error}</p>}
  </div>
)

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

export const RegisterForm = ({
  formData,
  errors,
  handleChange,
  coverImageRef,
  coverImagePreview,
  handleCoverImageSelect,
  fileInputRef,
  avatarPreview,
  handleAvatarSelect,
  handleSubmit,
  loading
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const getStrength = (pw) => {
    if (!pw) return 0
    let score = 0
    if (pw.length >= 6) score++
    if (pw.length >= 10) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    return Math.min(score, 3)
  }

  const strength = getStrength(formData.password)
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500']

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" error={errors.fullName} />
          <Field label="Username" name="username" value={formData.username} onChange={handleChange} placeholder="johndoe" error={errors.username} />
        </motion.div>

        <motion.div {...fadeUp(0.25)}>
          <Field label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" error={errors.email} />
        </motion.div>

        <motion.div {...fadeUp(0.3)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Password" error={errors.password}>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-elevated  rounded-lg px-4 py-3 text-base text-text-primary placeholder:text-text-primary/30 focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex gap-1 mt-2.5 px-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 w-full rounded-full transition-colors duration-300 ${i <= strength ? strengthColors[strength] : 'bg-[var(--color-text-muted)]'
                    }`}
                />
              ))}
            </div>
          </Field>

          <Field label="Confirm Password" error={errors.confirmPassword}>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-elevated  rounded-lg px-4 py-3 text-base text-text-primary placeholder:text-text-primary/30 focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </Field>
        </motion.div>

        <motion.div {...fadeUp(0.35)}>
          <ImageUploaders
            coverImageRef={coverImageRef}
            coverImagePreview={coverImagePreview}
            handleCoverImageSelect={handleCoverImageSelect}
            fileInputRef={fileInputRef}
            avatarPreview={avatarPreview}
            handleAvatarSelect={handleAvatarSelect}
          />
        </motion.div>

        <motion.div {...fadeUp(0.4)}>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent text-accent-on-dark text-base font-bold rounded-lg hover:bg-accent-light hover:text-accent-on-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            Create Account
          </button>
        </motion.div>
      </div>
    </motion.form>
  )
}