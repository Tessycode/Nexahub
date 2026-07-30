import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from '../../lib/api'
import type { ApiError } from '../../lib/api'

interface Props { onNavigate: (page: string) => void }

export default function ForgotPassword({ onNavigate }: Props) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await auth.forgotPassword(email)
      setSent(true)
    } catch (err) {
      const apiErr = err as ApiError
      setError(apiErr.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--background)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <button onClick={() => onNavigate('home')} className="mb-10 block">
          <img src="/src/imports/Nexahub_Logo.png" alt="Nexahub" className="h-7 w-auto" style={{ filter: 'brightness(1.1)' }} />
        </button>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-7" style={{ background: 'rgba(91,158,244,0.1)', border: '1px solid rgba(91,158,244,0.2)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>

              <h1 className="text-2xl font-semibold mb-2">Reset your password</h1>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Enter the email address linked to your account and we'll send you a reset link. The link expires in 30 minutes.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Email address</label>
                  <input
                    type="email"
                    className="input-base"
                    placeholder="you@company.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.875rem' }} disabled={loading}>
                  {loading ? 'Sending…' : 'Send reset link'}
                </button>
                {error && (
                  <p className="text-sm text-center" style={{ color: '#F87171' }}>{error}</p>
                )}
              </form>

              <p className="text-sm text-center mt-6" style={{ color: 'var(--muted-foreground)' }}>
                Remember your password?{' '}
                <button onClick={() => onNavigate('login')} className="animated-link" style={{ color: 'var(--primary)' }}>Sign in</button>
              </p>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-7"
                style={{ background: 'rgba(91,158,244,0.1)', border: '2px solid rgba(91,158,244,0.3)' }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </motion.div>

              <h2 className="text-2xl font-semibold mb-3">Check your inbox</h2>
              <p className="text-sm mb-2 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                We've sent a password reset link to <strong style={{ color: 'var(--foreground)' }}>{email}</strong>
              </p>
              <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
                The link will expire in 30 minutes. Check your spam folder if you don't see it.
              </p>

              <button onClick={() => setSent(false)} className="btn btn-secondary w-full mb-3">
                Resend the link
              </button>
              <button onClick={() => onNavigate('login')} className="btn btn-ghost w-full text-sm">
                Back to sign in
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
