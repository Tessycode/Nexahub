import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import type { ApiError } from '../../lib/api'

interface Props { onNavigate: (page: string) => void }

export default function Login({ onNavigate }: Props) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.email.includes('@')) { setError('Please enter a valid email address.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      await login(form.email, form.password, form.remember)
      onNavigate('dashboard')
    } catch (err) {
      const apiErr = err as ApiError
      setError(apiErr.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden" style={{ background: '#0C0F1A' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=900&h=1200&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.2 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(12,15,26,0.4) 0%, rgba(12,15,26,0.9) 100%)' }} />
        </div>

        <div className="relative z-10 p-10">
          <button onClick={() => onNavigate('home')}>
            <img src="/src/imports/Nexahub_Logo.png" alt="Nexahub" className="h-7 w-auto" style={{ filter: 'brightness(1.2)' }} />
          </button>
        </div>

        <div className="relative z-10 p-10">
          <blockquote className="text-xl leading-snug mb-6" style={{ fontFamily: 'DM Serif Display, serif', fontStyle: 'italic' }}>
            "Working with Nexahub felt less like hiring an agency and more like having an experienced co-founder on the product."
          </blockquote>
          <div className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" alt="Sofia" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium">Sofia Patel</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Founder, Meridian Health</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-16" style={{ background: 'var(--background)' }}>
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <button onClick={() => onNavigate('home')}>
            <img src="/src/imports/Nexahub_Logo.png" alt="Nexahub" className="h-7 w-auto" style={{ filter: 'brightness(1.1)' }} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Sign in to your Nexahub client portal
            </p>
          </div>

          {/* Social sign-in */}
          <div className="flex flex-col gap-2.5 mb-6">
            {[
              { name: 'Google', icon: <GoogleIcon /> },
              { name: 'Microsoft', icon: <MicrosoftIcon /> },
              { name: 'GitHub', icon: <GitHubIcon /> },
            ].map(provider => (
              <button
                key={provider.name}
                className="btn btn-secondary w-full justify-center gap-3 text-sm"
                style={{ padding: '0.75rem' }}
              >
                {provider.icon}
                Continue with {provider.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>or sign in with email</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Email address</label>
              <input
                type="email"
                className="input-base"
                placeholder="you@company.com"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>Password</label>
                <button type="button" onClick={() => onNavigate('forgot-password')} className="text-xs animated-link" style={{ color: 'var(--primary)' }}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="input-base pr-10"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                className="w-4 h-4 rounded"
                style={{ accentColor: 'var(--primary)' }}
              />
              <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Remember this device</span>
            </label>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-lg text-sm flex items-center gap-2"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 4v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="btn btn-primary w-full mt-1" style={{ padding: '0.875rem' }} disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign in'}
            </button>
          </form>

          <p className="text-sm text-center mt-6" style={{ color: 'var(--muted-foreground)' }}>
            Don't have an account?{' '}
            <button onClick={() => onNavigate('register')} className="animated-link font-medium" style={{ color: 'var(--primary)' }}>
              Create one
            </button>
          </p>

          <div className="mt-8 pt-6 border-t flex items-center justify-center gap-1" style={{ borderColor: 'var(--border)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Secured with 256-bit TLS encryption
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  )
}
function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}
function GoogleIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
}
function MicrosoftIcon() {
  return <svg width="16" height="16" viewBox="0 0 23 23"><path fill="#f35325" d="M0 0h11v11H0z"/><path fill="#81bc06" d="M12 0h11v11H12z"/><path fill="#05a6f0" d="M0 12h11v11H0z"/><path fill="#ffba08" d="M12 12h11v11H12z"/></svg>
}
function GitHubIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
}
