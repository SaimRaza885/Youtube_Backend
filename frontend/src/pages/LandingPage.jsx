import { useRef, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Send, Mail, MessageSquare, Play, Shield, Download, Monitor,
  Headphones, BadgeCheck, ChevronDown, Eye, Film, Users, Award,
  Quote, Heart, Sun, Moon, Sparkles, Lock, Check, Menu, X,
} from 'lucide-react'

import { Logo } from '../components/common'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'

const WindText = ({ text, as: Tag = 'h1', className = '', delay = 0 }) => {
  const words = useMemo(() => text.split(' '), [text])
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -20, y: -8, rotate: -3, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.12, 0.71, 0.33, 1], delay: delay + i * 0.08 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}

const fadeInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

const features = [
  { icon: Play, label: '4K HDR Streaming', desc: 'Cinema-quality resolution with vibrant HDR colors and crystal-clear audio.' },
  { icon: Shield, label: 'Ad-Free Experience', desc: 'Enjoy uninterrupted viewing across all your devices without any ads.' },
  { icon: Download, label: 'Offline Downloads', desc: 'Save videos to watch later when you don\'t have an internet connection.' },
  { icon: Monitor, label: 'Multi-Device Sync', desc: 'Seamlessly switch between devices without losing your place.' },
  { icon: Headphones, label: '24/7 Support', desc: 'Our dedicated team is here to help you around the clock.' },
  { icon: BadgeCheck, label: 'Creator Tools', desc: 'Powerful analytics, editing tools, and monetization for creators.' },
]

const stats = [
  { icon: Eye, value: '10M+', label: 'Daily Views' },
  { icon: Film, value: '500K+', label: 'Videos Hosted' },
  { icon: Users, value: '2M+', label: 'Active Creators' },
  { icon: Award, value: '99.9%', label: 'Uptime' },
]

const faqs = [
  { q: 'Is Vidora free to use?', a: 'Yes! Vidora offers a generous free tier with access to thousands of videos. Upgrade to Premium for an ad-free experience, 4K streaming, offline downloads, and more.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard), PayPal, Apple Pay, and Google Pay. All transactions are securely processed via Stripe.' },
  { q: 'Can I upload my own videos?', a: 'Absolutely! Anyone can create a channel and start uploading. We support MP4, MOV, and AVI formats up to 4K resolution. Premium members get priority processing.' },
  { q: 'How does the recommendation system work?', a: 'Our AI-powered system analyzes your viewing habits, likes, and watch history to suggest content tailored to your interests. The more you watch, the better it gets.' },
]

const testimonials = [
  { quote: 'Vidora transformed how I share my work. The analytics and community features are unmatched.', name: 'Sarah Chen', role: 'Digital Artist' },
  { quote: 'The streaming quality is incredible. My viewers notice the difference immediately.', name: 'Marcus Rivera', role: 'Content Creator' },
  { quote: 'Best platform for creators who care about quality. The tools are intuitive and powerful.', name: 'Aisha Patel', role: 'Filmmaker' },
]

export const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useUI()
  const navigate = useNavigate()
  const { enterGuestMode } = useAuth()
  const contactRef = useRef(null)
  const aboutRef = useRef(null)
  const featuresRef = useRef(null)
  const pricingRef = useRef(null)
  const faqRef = useRef(null)

  const scrollTo = (ref) => (e) => {
    e.preventDefault()
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-secondary text-text-primary flex flex-col overflow-x-hidden relative pt-[68px]">
      <motion.div className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
        />
      </motion.div>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{ background: 'var(--color-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <Logo size="sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#about" onClick={scrollTo(aboutRef)} className="hover:text-text-primary transition-colors">About</a>
            <a href="#features" onClick={scrollTo(featuresRef)} className="hover:text-text-primary transition-colors">Features</a>
            <a href="#pricing" onClick={scrollTo(pricingRef)} className="hover:text-text-primary transition-colors">Pricing</a>
            <a href="#faq" onClick={scrollTo(faqRef)} className="hover:text-text-primary transition-colors">FAQ</a>
            <a href="#contact" onClick={scrollTo(contactRef)} className="hover:text-text-primary transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-9 h-9 text-text-secondary hover:text-text-primary hover:bg-[var(--color-overlay-hover)] rounded-xl transition-all"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
            <Link to="/login" className="hidden sm:inline text-sm font-medium text-text-secondary hover:text-text-primary px-3 py-1.5 transition-colors">
              Log in
            </Link>
            <Link to="/register" className="hidden sm:inline text-sm font-medium px-4 py-2 rounded-lg hover:bg-[var(--color-overlay-hover)] transition-colors"
              style={{ background: 'var(--color-overlay)', border: '1px solid var(--color-border-light)' }}
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 text-text-secondary hover:text-text-primary hover:bg-[var(--color-overlay-hover)] rounded-xl transition-all"
            >
              {mobileOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-subtle px-6 py-4 space-y-3"
            style={{ background: 'var(--color-secondary)' }}
          >
            {[
              { label: 'About', ref: aboutRef },
              { label: 'Features', ref: featuresRef },
              { label: 'Pricing', ref: pricingRef },
              { label: 'FAQ', ref: faqRef },
              { label: 'Contact', ref: contactRef },
            ].map((item) => (
              <a key={item.label} href={`#${item.label.toLowerCase()}`} onClick={(e) => { scrollTo(item.ref)(e); setMobileOpen(false) }}
                className="block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-subtle">
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                style={{ border: '1px solid var(--color-border-light)', color: 'var(--color-text-secondary)' }}
              >
                Log in
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm font-medium px-4 py-2.5 rounded-lg"
                style={{ background: 'var(--color-accent)', color: 'var(--color-accent-on-dark)' }}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto min-h-[85vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 }}
            className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-xs font-semibold tracking-wide uppercase mb-6"
            style={{ border: '1px solid var(--color-accent)', color: 'var(--color-accent)', background: 'var(--color-accent-muted-bg)' }}
          >
            The New Standard in Video
          </motion.div> */}
          <WindText text="Cinematic Precision for your creative vision." className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight" delay={0.2} />
          <WindText text="Experience the next generation of video hosting. Engineered for speed, designed for elegance, and built for creators who demand the best." as="p" className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed" delay={0.5} />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <button onClick={() => { enterGuestMode(); navigate('/') }}
                className="w-full sm:w-auto px-8 py-3.5 font-semibold rounded-xl transition-all active:scale-[0.98] block"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-accent-on-dark)',
                  boxShadow: '0 0 20px var(--color-accent-glow-light)',
                }}
              >
                Watch as Guest
              </button>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <a href="#about" onClick={scrollTo(aboutRef)}
                className="px-8 py-3.5 font-medium rounded-xl transition-all active:scale-[0.98] block"
                style={{
                  background: 'var(--color-overlay-strong)',
                  border: '1px solid var(--color-border-light)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Learn more
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Stats */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16">
        <motion.div {...fadeInView(0.1)}
          className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden relative"
          style={{ border: '1px solid var(--color-border-subtle)' }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--color-accent-muted-bg) 0%, transparent 50%, rgba(255,178,183,0.03) 100%)' }} />
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                className="py-8 px-4 text-center relative"
                style={{ background: 'var(--color-overlay)' }}
              >
                <Icon className="w-5 h-5 text-accent-light mx-auto mb-3" />
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 + 0.2 }}
                  className="text-2xl md:text-3xl font-bold mb-1"
                >{stat.value}</motion.p>
                <p className="text-xs text-text-secondary uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* About */}
      <section id="about" ref={aboutRef} className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-24 pt-8">
        <motion.div {...fadeInView(0)} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ border: '1px solid var(--color-accent-border)', color: 'var(--color-accent-light)', background: 'var(--color-accent-muted-bg)' }}
          >
            About Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for creators, powered by community</h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Vidora is more than a video platform — it's a creative ecosystem. We provide cutting-edge streaming technology,
            powerful creator tools, and a supportive community to help you share your vision with the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Our Mission', desc: 'Empower every creator to share their story with cinema-quality streaming accessible to everyone, everywhere.' },
            { title: 'Our Technology', desc: 'Powered by next-generation encoding and global CDN infrastructure for instant playback at any resolution.' },
            { title: 'Our Community', desc: 'Join millions of creators and viewers who believe that great content deserves a great platform.' },
          ].map((item, i) => (
            <motion.div key={item.title} {...fadeInView(0.1 + i * 0.05)}
              className="p-6 rounded-xl relative"
              style={{ background: 'var(--color-overlay)', border: '1px solid var(--color-border-subtle)' }}
              whileHover={{ y: -4, borderColor: 'var(--color-accent-border-subtle)' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent-glow-light), transparent)' }} />
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" ref={featuresRef} className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-24 pt-8">
        <motion.div {...fadeInView(0)} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ border: '1px solid var(--color-accent-border)', color: 'var(--color-accent-light)', background: 'var(--color-accent-muted-bg)' }}
          >
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to create and watch</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Powerful tools for creators. Premium experience for viewers.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div key={feat.label} {...fadeInView(0.1 + i * 0.05)}
                className="p-6 rounded-xl relative"
                style={{ background: 'var(--color-overlay)', border: '1px solid var(--color-border-subtle)' }}
                whileHover={{ y: -4, borderColor: 'var(--color-accent-border-subtle)' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent-glow-light), transparent)' }} />
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'var(--color-accent-muted-bg)', border: '1px solid var(--color-accent-border-subtle)' }}
                >
                  <Icon className="w-5 h-5 text-accent-light" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feat.label}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" ref={pricingRef} className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-24 pt-8">
        <motion.div {...fadeInView(0)} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ border: '1px solid var(--color-accent-border)', color: 'var(--color-accent-light)', background: 'var(--color-accent-muted-bg)' }}
          >
            <Sparkles className="w-3 h-3" />
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Go Premium, go limitless</h2>
          <p className="text-text-secondary">Unlock the full Vidora experience with premium features.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-center">
          <motion.div {...fadeInView(0.1)}
            className="rounded-2xl p-8"
            style={{
              background: 'linear-gradient(135deg, var(--color-overlay-strong) 0%, var(--color-overlay-strong) 100%)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">$9.99</span>
              <span className="text-text-secondary text-sm">/month</span>
            </div>
            <Link to="/pricing"
              className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] mb-6"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-accent-on-dark)',
                boxShadow: '0 0 20px var(--color-accent-glow-light)',
              }}
            >
              See all plans
            </Link>
            <ul className="space-y-3">
              {[
                'Ad-Free Experience',
                '4K HDR Streaming',
                'Offline Downloads',
                'Background Play',
                'Exclusive Badge',
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 shrink-0" style={{ color: 'var(--color-accent-light)' }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="space-y-4">
            {[
              { icon: Shield, label: 'Cancel anytime', desc: 'No long-term commitments. Cancel whenever you want.' },
              { icon: Download, label: 'Download & go', desc: 'Save videos offline to watch anywhere, anytime.' },
              { icon: Monitor, label: 'All devices', desc: 'Premium works on TV, mobile, tablet, and desktop.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} {...fadeInView(0.15 + i * 0.05)}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: 'var(--color-overlay)', border: '1px solid var(--color-border-subtle)' }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-accent-muted-bg)', border: '1px solid var(--color-accent-border-subtle)' }}
                  >
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-0.5">{item.label}</h4>
                    <p className="text-xs text-text-secondary">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-24 pt-8">
        <motion.div {...fadeInView(0)} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by creators worldwide</h2>
          <p className="text-text-secondary">Hear from our community.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} {...fadeInView(0.1 + i * 0.05)}
              className="p-6 rounded-xl"
              style={{ background: 'var(--color-overlay)', border: '1px solid var(--color-border-subtle)' }}
              whileHover={{ y: -4, borderColor: 'var(--color-accent-border-subtle)' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote className="w-6 h-6 text-accent-light/30 mb-4" />
              <p className="text-sm text-text-secondary leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={faqRef} className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-24 pt-8">
        <motion.div {...fadeInView(0)} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ border: '1px solid var(--color-accent-border)', color: 'var(--color-accent-light)', background: 'var(--color-accent-muted-bg)' }}
          >
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
          <p className="text-text-secondary">Everything you need to know about Vidora.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i
            return (
              <motion.div key={faq.q} {...fadeInView(0.1 + i * 0.05)}
                className="rounded-xl overflow-hidden"
                style={{ background: 'var(--color-overlay)', border: '1px solid var(--color-border-subtle)' }}
                whileHover={{ borderColor: 'rgba(255,178,183,0.1)' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm font-medium">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-text-secondary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-text-secondary leading-relaxed"
                    style={{ borderTop: '1px solid var(--color-overlay-hover)', paddingTop: '16px' }}
                  >
                    {faq.a}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" ref={contactRef} className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-24 pt-8">
        <motion.div {...fadeInView(0)}
          className="rounded-2xl p-8 md:p-10 relative"
          style={{ background: 'var(--color-overlay)', border: '1px solid var(--color-border-subtle)' }}
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--color-accent-muted-bg) 0%, transparent 50%, rgba(255,178,183,0.02) 100%)' }} />
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ border: '1px solid var(--color-accent-border)', color: 'var(--color-accent-light)', background: 'var(--color-accent-muted-bg)' }}
            >
              <Mail className="w-3 h-3" />
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">We'd love to hear from you</h2>
            <p className="text-text-secondary max-w-lg mx-auto">Have a question, suggestion, or just want to say hi? Drop us a message.</p>
          </div>

          <form className="max-w-2xl mx-auto space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {['Your Name', 'Email'].map((field) => (
                <div key={field}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">{field}</label>
                  <input
                    placeholder={field === 'Your Name' ? 'John Doe' : 'john@example.com'}
                    type={field === 'Email' ? 'email' : 'text'}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'var(--color-overlay-strong)',
                      border: '1px solid var(--color-border-light)',
                      color: 'var(--color-text-primary)',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent-light)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-light)' }}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">Subject</label>
              <input placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'var(--color-overlay-strong)',
                  border: '1px solid var(--color-border-light)',
                  color: 'var(--color-text-primary)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent-light)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-light)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">Message</label>
              <textarea rows={4} placeholder="Tell us more..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                style={{
                  background: 'var(--color-overlay-strong)',
                  border: '1px solid var(--color-border-light)',
                  color: 'var(--color-text-primary)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent-light)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-light)' }}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" />
                We typically respond within 24 hours
              </p>
              <button type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.97]"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-accent-on-dark)',
                  boxShadow: '0 0 20px var(--color-accent-glow)',
                }}
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full border-t border-subtle">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <Logo size="sm" />
              <p className="text-sm text-text-secondary mt-4 max-w-sm leading-relaxed">
                Vidora is the next-generation video platform built for creators who demand cinematic quality and a community that values connection.
              </p>
              <div className="flex items-center gap-4 mt-6">
                {['X', 'YT', 'GH'].map((label, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors hover:text-accent-light"
                    style={{ background: 'var(--color-overlay-strong)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: 'Platform', links: ['Browse', 'Trending', 'Subscriptions', 'Library'] },
              { title: 'Resources', links: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[var(--color-text-muted)] hover:text-text-primary transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid var(--color-border-subtle)' }}
          >
            <p className="text-xs text-[var(--color-text-muted)]">© 2024 Vidora. All rights reserved.</p>
            <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-accent-light" /> for creators worldwide
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
