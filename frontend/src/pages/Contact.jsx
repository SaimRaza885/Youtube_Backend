import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Mail, Clock, Zap, Globe, ChevronRight, Send, Plus, LifeBuoy, Shield, Scale, Diamond } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

const contactCards = [
  { icon: Mail, label: 'Email Us', value: 'support@vidora.app' },
  { icon: Clock, label: 'Hours', value: 'Mon-Fri, 9-6 EST' },
  { icon: Zap, label: 'Response', value: 'Under 24 hours' },
  { icon: Globe, label: 'Location', value: 'Remote First' },
]

const supportLinks = [
  { icon: LifeBuoy, label: 'Help Center', accent: false },
  { icon: Shield, label: 'Privacy Policy', accent: false },
  { icon: Scale, label: 'Terms & Conditions', accent: false },
  { icon: Diamond, label: 'Premium Support', accent: true },
]

const faqs = [
  {
    q: 'How do I upload videos?',
    a: 'Navigate to your Library and click the "Upload" button in the top right corner. You can drag and drop files or select them from your device. We support MP4, MOV, and AVI formats up to 4K resolution.',
  },
  {
    q: 'How do I reset my password?',
    a: 'Go to the login page and click "Forgot Password". Enter your registered email address, and we\'ll send you a secure link to create a new password. The link expires in 24 hours for your security.',
  },
  {
    q: 'How do I upgrade to Premium?',
    a: 'You can upgrade anytime by navigating to Settings > Subscription. Choose the Premium tier that fits your needs. We accept all major credit cards and process payments securely via Stripe.',
  },
]

export const Contact = () => {
  useDocumentTitle('Contact')
  const [form, setForm] = useState({ name: '', email: '', category: 'general', subject: '', message: '' })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleClear = () => {
    setForm({ name: '', email: '', category: 'general', subject: '', message: '' })
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-15" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-10" />
      </div>

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-[1440px] mx-auto pb-24">
        {/* Hero */}
        <motion.header {...fadeUp(0)} className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-text-primary mb-4">Contact Us</h1>
          <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
            Have a question, suggestion, or need help? We'd love to hear from you.
          </p>
        </motion.header>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Info & Links */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Contact Info Cards */}
            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-4">
              {contactCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.label}
                    className="p-6 rounded-[18px] flex flex-col justify-between aspect-square"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid var(--color-border-subtle)',
                      boxShadow: 'inset 0 1px 0 var(--color-border-default)',
                    }}
                  >
                    <Icon className="w-8 h-8 text-accent-light" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">{card.label}</h4>
                      <p className="text-text-primary font-medium truncate">{card.value}</p>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            {/* Support Links */}
            <motion.div {...fadeUp(0.2)}
              className="rounded-[18px] overflow-hidden"
              style={{
                background: 'var(--color-overlay-strong)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              {supportLinks.map((link, i) => {
                const Icon = link.icon
                const isLast = i === supportLinks.length - 1
                return (
                  <div key={link.label}
                    className="flex items-center justify-between p-5 transition-colors group"
                    style={!isLast ? { borderBottom: '1px solid var(--color-overlay-hover)' } : {}}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`w-5 h-5 ${link.accent ? 'text-accent-light' : 'text-text-secondary group-hover:text-accent-light transition-colors'}`} />
                      <span className={`text-sm font-medium ${link.accent ? 'text-accent-light font-semibold' : 'text-text-primary'}`}>
                        {link.label}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${link.accent ? 'text-accent-light' : 'text-text-secondary'}`} />
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-7">
            <form onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-[18px] relative overflow-hidden"
              style={{
                background: 'var(--color-overlay-strong)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'inset 0 1px 0 var(--color-border-default)',
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <h2 className="text-2xl font-semibold text-text-primary mb-8 relative z-10">Send a Message</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary" htmlFor="name">Full Name</label>
                  <input
                    id="name" name="name" value={form.name} onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:border-accent-light focus:ring-1 focus:ring-accent-light outline-none transition-all text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary" htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:border-accent-light focus:ring-1 focus:ring-accent-light outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6 relative z-10">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary" htmlFor="category">Category</label>
                <div className="relative">
                  <select
                    id="category" name="category" value={form.category} onChange={handleChange}
                    className="w-full bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:border-accent-light focus:ring-1 focus:ring-accent-light outline-none transition-all text-sm appearance-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="bug">Report a Bug</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="billing">Billing Issue</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none rotate-90" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6 relative z-10">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary" htmlFor="subject">Subject</label>
                <input
                  id="subject" name="subject" value={form.subject} onChange={handleChange}
                  placeholder="How can we help?"
                  className="bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:border-accent-light focus:ring-1 focus:ring-accent-light outline-none transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 mb-8 relative z-10">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary" htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" value={form.message} onChange={handleChange}
                  placeholder="Detail your request here..."
                  rows={5}
                  className="bg-[var(--color-search-bg)] border border-[var(--color-border-light)] rounded-lg px-4 py-3 text-text-primary focus:border-accent-light focus:ring-1 focus:ring-accent-light outline-none transition-all text-sm resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-end relative z-10">
                <button type="button" onClick={handleClear}
                  className="w-full sm:w-auto px-6 py-3 border border-[#5b4041] text-text-secondary rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-white/[0.05] transition-all"
                >
                  Clear Form
                </button>
                <button type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-accent text-accent-on-dark rounded-lg text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  style={{ boxShadow: '0 0 20px var(--color-accent-glow-light)' }}
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section {...fadeUp(0.3)} className="mt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Common Questions</h2>
              <p className="text-text-secondary">Find quick answers before reaching out.</p>
            </div>
            <Link to="/faq" className="flex items-center gap-2 text-accent-light hover:text-[#e3bdbf] transition-colors group text-sm font-semibold uppercase tracking-wider">
              View All FAQs
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq) => (
              <div key={faq.q}
                className="p-6 rounded-[18px] transition-colors cursor-pointer group"
                style={{
                  background: 'var(--color-overlay-strong)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm font-semibold text-text-primary pr-4">{faq.q}</h3>
                  <Plus className="w-4 h-4 text-text-secondary group-hover:text-accent-light transition-colors shrink-0" />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
