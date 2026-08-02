import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  Sparkles, Download, PictureInPicture2, Monitor, List,
  Headphones, Clock, BadgeCheck, ChevronDown, Lock, X,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

const features = [
  { icon: X, label: 'Ad-Free', desc: 'Enjoy uninterrupted viewing across all devices without ads.' },
  { icon: Download, label: 'Offline Downloads', desc: 'Save videos to watch later without an internet connection.' },
  { icon: PictureInPicture2, label: 'Background Play', desc: 'Keep listening while using other apps or when your screen is locked.' },
  { icon: Monitor, label: '4K HDR Streaming', desc: 'Cinema-quality resolution and vibrant HDR colors.' },
  { icon: List, label: 'Unlimited Playlists', desc: 'Curate endless collections of your favorite content.' },
  { icon: Headphones, label: 'Priority Support', desc: '24/7 dedicated customer service.' },
  { icon: Clock, label: 'Early Access', desc: 'Watch original releases days before the free tier.' },
  { icon: BadgeCheck, label: 'Exclusive Badge', desc: 'Stand out with a premium member badge in comments and chats.' },
]

const faqs = [
  {
    q: 'How do I cancel my subscription?',
    a: 'You can cancel at any time through Account Settings. You will continue to have premium access until the end of your current billing cycle. No cancellation fees.',
  },
  {
    q: 'Are downloads available on desktop?',
    a: 'Yes, offline downloads are supported on the Vidora mobile app (iOS and Android) as well as our official desktop applications for Windows and macOS.',
  },
  {
    q: 'What does "4K HDR Streaming" require?',
    a: 'You need a compatible 4K HDR display, a stable internet connection of at least 25 Mbps, and a device supporting HEVC/AV1 hardware decoding.',
  },
]

export const Pricing = () => {
  useDocumentTitle('Pricing')
  const [yearly, setYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const price = yearly ? 7.99 : 9.99

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[150px] opacity-20" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-glow blur-[120px] opacity-15" />
      </div>

      <div className="relative z-10 px-4 lg:px-6 py-6 max-w-5xl mx-auto space-y-20 pb-20">
        {/* Hero */}
        <motion.section {...fadeUp(0)}
          className="relative rounded-[24px] overflow-hidden min-h-[360px] flex items-center justify-center p-8 lg:p-16 text-center"
          style={{ border: '1px solid var(--color-border-subtle)' }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-search-bg), transparent 60%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--color-search-bg) 0%, transparent 50%, var(--color-search-bg) 100%)' }} />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-6 backdrop-blur-md"
              style={{
                border: '1px solid var(--color-accent-light)',
                background: 'var(--color-accent-muted)',
                color: 'var(--color-accent)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Premium Experience
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 tracking-tight leading-tight">
              Upgrade to{' '}
              <span className="text-accent-hover">
                Vidora Premium
              </span>
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
              Unlock the full Vidora experience with premium features designed for creators and viewers who demand the best in cinematic quality.
            </p>
          </div>
        </motion.section>

        {/* Pricing Toggle + Card */}
        <motion.section {...fadeUp(0.1)} className="flex flex-col items-center">
          <div className="flex items-center p-1 rounded-full mb-8 relative"
            style={{
              background: 'var(--color-overlay-strong)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <div className="absolute h-8 w-24 rounded-full transition-transform duration-300 top-1 z-0"
              style={{
                background: 'var(--color-accent)',
                transform: yearly ? 'translateX(96px)' : 'translateX(4px)',
                left: 0,
              }}
            />
            <button
              onClick={() => setYearly(false)}
              className="relative z-10 px-6 py-1.5 text-xs font-semibold uppercase tracking-wider w-24 text-center transition-colors duration-300"
              style={{ color: yearly ? 'var(--color-text-secondary)' : 'var(--color-accent-on-dark)' }}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className="relative z-10 px-6 py-1.5 text-xs font-semibold uppercase tracking-wider w-24 text-center flex items-center justify-center gap-1 transition-colors duration-300"
              style={{ color: yearly ? 'var(--color-accent-on-dark)' : 'var(--color-text-secondary)' }}
            >
              Yearly
            </button>
            {yearly && (
              <span className="absolute -top-3 -right-6 bg-accent text-accent-on-dark text-[10px] font-bold px-2 py-0.5 rounded-full rotate-12 shadow-lg whitespace-nowrap">
                Save 20%
              </span>
            )}
          </div>

          <div className="rounded-[24px] p-8 md:p-12 w-full max-w-lg relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, var(--color-overlay) 0%, var(--color-overlay) 100%)',
              backdropFilter: 'blur(32px)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Premium Plan</h2>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-3xl text-text-secondary font-medium">$</span>
                <span className="text-6xl font-bold text-text-primary tracking-tighter">{price.toFixed(2)}</span>
                <span className="text-text-secondary">/month</span>
              </div>
              <p className="text-sm text-text-secondary mb-8 h-5">
                {yearly ? 'Billed $95.88 annually.' : 'Billed monthly.'}
              </p>
              <button className="w-full bg-accent hover:bg-accent-hover text-accent-on-dark rounded-lg py-4 font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] mb-6"
                style={{ boxShadow: '0 0 20px color-mix(in srgb, var(--color-accent) 40%, transparent)' }}
              >
                Upgrade to Premium
              </button>
              <p className="text-xs text-text-secondary/70">Cancel anytime. Terms apply.</p>
            </div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section {...fadeUp(0.2)}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Everything you need</h2>
            <p className="text-text-secondary">The tools to elevate your viewing and creation experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feat) => {
              const Icon = feat.icon
              return (
                <div key={feat.label}
                  className="p-6 rounded-xl transition-colors group"
                  style={{
                    background: 'var(--color-overlay-strong)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--color-border-subtle)',
                    borderTop: '1px solid var(--color-border-default)',
                  }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors"
                    style={{
                      background: 'var(--color-search-bg)',
                      border: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <Icon className="w-5 h-5 text-accent-light" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{feat.label}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
                </div>
              )
            })}
          </div>
        </motion.section>

        {/* Comparison Table */}
        <motion.section {...fadeUp(0.3)}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--color-overlay-strong)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div className="p-6 md:p-8 text-center md:text-left" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            <h2 className="text-2xl font-bold text-text-primary">Compare Plans</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-subtle)', background: 'var(--color-overlay)' }}>
                  <th className="p-6 text-xs font-semibold uppercase tracking-wider text-text-secondary w-1/2">Features</th>
                  <th className="p-6 text-xs font-semibold uppercase tracking-wider text-text-secondary text-center w-1/4">Free</th>
                  <th className="p-6 text-xs font-semibold uppercase tracking-wider text-accent-light text-center w-1/4">Premium</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y" style={{ borderColor: 'var(--color-overlay-hover)' }}>
                {[
                  { feat: 'Ad Experience', free: 'Ad-supported', premium: 'Ad-Free' },
                  { feat: 'Video Quality', free: '1080p HD', premium: '4K HDR' },
                  { feat: 'Offline Viewing', free: false, premium: true },
                  { feat: 'Background Play', free: false, premium: true },
                  { feat: 'Unlimited Playlists', free: false, premium: true },
                  { feat: 'Priority Support', free: false, premium: true },
                  { feat: 'Exclusive Badge', free: false, premium: true },
                ].map((row) => (
                  <tr key={row.feat} className="hover:bg-overlay-hover transition-colors">
                    <td className="p-6 text-text-primary">{row.feat}</td>
                    <td className="p-6 text-center text-text-secondary">
                      {typeof row.free === 'string' ? row.free : (
                        <X className="w-4 h-4 mx-auto text-text-muted" />
                      )}
                    </td>
                    <td className="p-6 text-center text-text-primary font-medium">
                      {typeof row.premium === 'string' ? row.premium : (
                        <BadgeCheck className="w-4 h-4 mx-auto text-accent-light" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section {...fadeUp(0.4)} className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'var(--color-overlay-strong)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-hidden"
                  >
                    <span className="font-medium text-text-primary hover:text-accent-light transition-colors">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-text-secondary leading-relaxed" style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.section>

        {/* Trust */}
        <motion.section {...fadeUp(0.5)} className="flex flex-col items-center pt-8" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-6">Secure Payment Methods</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['VISA', 'MC', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
              <div key={method}
                className="h-10 w-16 rounded flex items-center justify-center text-xs font-bold opacity-60"
                style={{
                  background: 'var(--color-search-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {method}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Secure Encrypted Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Cancel Anytime</span>
            </div>
          </div>
          <p className="text-xs text-text-secondary/50 mt-8">Note: This is a demo UI. No real transactions occur.</p>
        </motion.section>
      </div>
    </div>
  )
}
