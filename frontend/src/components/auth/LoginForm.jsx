import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

export const LoginForm = ({ formData, errors, handleChange, handleSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        <motion.div {...fadeUp(0.2)}>
          <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-1.5 ml-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full bg-elevated  rounded-lg px-4 py-3 text-base text-text-primary placeholder:text-text-primary/30 focus:outline-hidden focus:border-accent-light focus:ring-1 focus:ring-accent-light transition-colors"
          />
          {errors.email && <p className="text-danger text-xs mt-1.5 ml-1">{errors.email}</p>}
        </motion.div>

        <motion.div {...fadeUp(0.25)}>
          <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-1.5 ml-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-elevated rounded-lg px-4 py-3 text-base text-text-primary placeholder:text-text-primary/30 focus:outline-hidden focus:border-accent-light focus:ring-1 focus:ring-accent-light transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-danger text-xs mt-1.5 ml-1">{errors.password}</p>}
        </motion.div>

        <motion.div {...fadeUp(0.3)}>
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
            Sign In
          </button>
        </motion.div>
      </div>
    </motion.form>
  )
}