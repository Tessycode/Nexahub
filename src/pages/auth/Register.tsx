import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from '../../lib/api'
import type { ApiError } from '../../lib/api'

interface Props { onNavigate: (page: string) => void }

function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^a-zA-Z0-9]/.test(pw)) score++
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981']
  return { score, label: labels[score] || '', color: colors[score] || '' }
}

export default function Register({ onNavigate }: Props) {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '', email: '',
    phone: '', password: '', confirmPassword: '', terms: false,
  })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const strength = getStrength(form.password)

  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    if (!form.firstName.trim()) errs.firstName = 'Required'
    if (!form.lastName.trim()) errs.lastName = 'Required'
    if (!form.email.includes('@')) errs.email = 'Enter a valid email'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs: Record<string, string> = {}
    if (form.password.length < 8) errs.password = 'Minimum 8 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (!form.terms) errs.terms = 'You must accept the terms'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => { if (validateStep1()) setStep(2) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return
    setLoading(true)
    try {
      await auth.register({
        first_name: form.firstName,
        last_name: form.lastName,
        company: form.company,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirm_password: form.confirmPassword,
        terms: form.terms,
      })
      setSuccess(true)
    } catch (err) {
      const apiErr = err as ApiError
      if (apiErr.errors?.email) {
        setErrors({ email: apiErr.errors.email[0] })
        setStep(1)
      } else {
        setErrors({ submit: apiErr.message || 'Registration failed. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  const requirements = [
    { label: 'At least 8 characters', met: form.password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(form.password) },
    { label: 'One number', met: /[0-9]/.test(form.password) },
    { label: 'One special character', met: /[^a-zA-Z0-9]/.test(form.password) },
  ]

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--background)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.3)' }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 18l7 7 13-13" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Account created</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
            Welcome to Nexahub. We've sent a verification email to <strong style={{ color: 'var(--foreground)' }}>{form.email}</strong>
          </p>
          <button onClick={() => onNavigate('login')} className="btn btn-primary w-full">Continue to sign in</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden" style={{ background: '#0C0F1A' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=1200&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(12,15,26,0.4) 0%, rgba(12,15,26,0.92) 100%)' }} />
        </div>

        <div className="relative z-10 p-10">
          <button onClick={() => onNavigate('home')}>
            <img src="/src/imports/Nexahub_Logo.png" alt="Nexahub" className="h-7 w-auto" style={{ filter: 'brightness(1.2)' }} />
          </button>
        </div>

        <div className="relative z-10 p-10">
          <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>
            One account.<br />Every Nexahub service.
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              'Track project progress in real time',
              'Access all invoices and documents',
              'Communicate directly with your team',
              'Request new services and support',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(91,158,244,0.15)', border: '1px solid rgba(91,158,244,0.3)' }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-16" style={{ background: 'var(--background)' }}>
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
            <div className="flex items-center gap-2 mb-5">
              {[1, 2].map(n => (
                <div key={n} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300"
                    style={{
                      background: step >= n ? 'var(--primary)' : 'var(--secondary)',
                      color: step >= n ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                    }}
                  >
                    {n}
                  </div>
                  {n < 2 && <div className="w-8 h-px" style={{ background: step > n ? 'var(--primary)' : 'var(--border)' }} />}
                </div>
              ))}
              <span className="ml-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>Step {step} of 2</span>
            </div>
            <h1 className="text-2xl font-semibold mb-2">{step === 1 ? 'Create your account' : 'Set your password'}</h1>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {step === 1 ? 'Already have an account? ' : ''}
              {step === 1 && <button onClick={() => onNavigate('login')} className="animated-link" style={{ color: 'var(--primary)' }}>Sign in</button>}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>First name</label>
                      <input className={`input-base ${errors.firstName ? 'border-red-500' : ''}`} placeholder="James" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                      {errors.firstName && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Last name</label>
                      <input className={`input-base ${errors.lastName ? 'border-red-500' : ''}`} placeholder="Hartfield" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                      {errors.lastName && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Company name</label>
                    <input className="input-base" placeholder="Acme Ltd" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Work email</label>
                    <input type="email" className={`input-base ${errors.email ? 'border-red-500' : ''}`} placeholder="james@acme.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    {errors.email && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Phone number (optional)</label>
                    <input type="tel" className="input-base" placeholder="+44 7700 000000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <button type="button" onClick={handleNext} className="btn btn-primary w-full mt-2" style={{ padding: '0.875rem' }}>
                    Continue
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Password</label>
                    <div className="relative">
                      <input
                        type={showPw ? 'text' : 'password'}
                        className={`input-base pr-10 ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-2">
                          {[1,2,3,4].map(n => (
                            <div key={n} className="strength-bar flex-1">
                              <div className="strength-fill" style={{ width: strength.score >= n ? '100%' : '0', background: strength.color }} />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs" style={{ color: strength.color }}>{strength.label}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <ul className="flex flex-col gap-1.5">
                      {requirements.map(req => (
                        <li key={req.label} className="flex items-center gap-2 text-xs transition-colors" style={{ color: req.met ? '#10B981' : 'var(--muted-foreground)' }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            {req.met
                              ? <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              : <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>}
                          </svg>
                          {req.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Confirm password</label>
                    <input
                      type={showPw ? 'text' : 'password'}
                      className={`input-base ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Repeat your password"
                      value={form.confirmPassword}
                      onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                    />
                    {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.confirmPassword}</p>}
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.terms} onChange={e => setForm(f => ({ ...f, terms: e.target.checked }))} className="w-4 h-4 mt-0.5 rounded" style={{ accentColor: 'var(--primary)' }} />
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      I agree to Nexahub's <span className="animated-link" style={{ color: 'var(--primary)' }}>Terms of Service</span> and <span className="animated-link" style={{ color: 'var(--primary)' }}>Privacy Policy</span>
                    </span>
                  </label>
                  {errors.terms && <p className="text-xs" style={{ color: '#EF4444' }}>{errors.terms}</p>}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn btn-secondary flex-shrink-0">
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary flex-1" style={{ padding: '0.875rem' }} disabled={loading}>
                      {loading ? 'Creating account…' : 'Create account'}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
