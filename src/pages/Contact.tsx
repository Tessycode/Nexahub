import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { contact as contactApi } from '../lib/api'
import type { ApiError } from '../lib/api'

interface Props { onNavigate: (page: string) => void }

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const offices = [
  { city: 'London', address: '14 Hoxton Square, Shoreditch\nLondon, EC2A 3HD', phone: '+44 20 7946 0958', email: 'london@nexahub.io' },
  { city: 'Dubai', address: 'Level 14, One Central Tower\nDubai, UAE', phone: '+971 4 570 0814', email: 'dubai@nexahub.io' },
  { city: 'Toronto', address: '325 Front Street West, Suite 400\nToronto, ON M5V 2Y1', phone: '+1 416 555 0173', email: 'toronto@nexahub.io' },
]

type FormState = 'idle' | 'submitting' | 'success'

export default function Contact({ onNavigate: _ }: Props) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '', email: '', phone: '',
    service: '', budget: '', message: '',
  })

  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setFormState('submitting')
    try {
      await contactApi.enquiry({
        first_name: form.firstName,
        last_name: form.lastName,
        company: form.company,
        email: form.email,
        phone: form.phone,
        service_interest: form.service,
        budget_range: form.budget,
        message: form.message,
      })
      setFormState('success')
    } catch (err) {
      const apiErr = err as ApiError
      setError(apiErr.message || 'Failed to send. Please try again.')
      setFormState('idle')
    }
  }

  return (
    <div className="page-enter pt-24">
      {/* Header */}
      <section className="section-pad pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <FadeUp>
                <span className="tag mb-5 block w-fit">Contact</span>
                <h1 className="section-heading mb-6">
                  Let's talk about<br />your project
                </h1>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
                  We respond to every serious enquiry within one business day. If you have a deadline, mention it — we'll let you know honestly whether we can help.
                </p>
              </FadeUp>

              {/* Offices */}
              <div className="flex flex-col gap-5">
                {offices.map((office, i) => (
                  <FadeUp key={office.city} delay={i * 0.08}>
                    <div className="p-5 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                      <p className="font-semibold text-sm mb-2">{office.city}</p>
                      <p className="text-sm whitespace-pre-line mb-3" style={{ color: 'var(--muted-foreground)' }}>{office.address}</p>
                      <div className="flex flex-col gap-1">
                        <a href={`tel:${office.phone}`} className="text-xs animated-link" style={{ color: 'var(--primary)' }}>{office.phone}</a>
                        <a href={`mailto:${office.email}`} className="text-xs animated-link" style={{ color: 'var(--primary)' }}>{office.email}</a>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Form */}
            <FadeUp delay={0.15}>
              <div className="rounded-2xl border p-8" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-16 text-center"
                    >
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M5 14l7 7 11-11" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">Message received</h3>
                      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                        We'll review your project details and follow up within one business day.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div>
                        <h2 className="text-lg font-semibold mb-1">Project enquiry</h2>
                        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Tell us what you're working on</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>First name</label>
                          <input className="input-base" placeholder="James" required value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Last name</label>
                          <input className="input-base" placeholder="Hartfield" required value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Company</label>
                        <input className="input-base" placeholder="Acme Ltd" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Work email</label>
                        <input type="email" className="input-base" placeholder="james@acme.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Service needed</label>
                          <select
                            className="input-base"
                            value={form.service}
                            onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                            style={{ background: 'var(--secondary)', appearance: 'none' }}
                          >
                            <option value="">Select one</option>
                            <option>Website Development</option>
                            <option>Mobile App</option>
                            <option>UI/UX Design</option>
                            <option>Branding</option>
                            <option>Digital Marketing</option>
                            <option>Cloud Infrastructure</option>
                            <option>Not sure yet</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Budget range</label>
                          <select
                            className="input-base"
                            value={form.budget}
                            onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                            style={{ background: 'var(--secondary)', appearance: 'none' }}
                          >
                            <option value="">Select range</option>
                            <option>£5,000 – £15,000</option>
                            <option>£15,000 – £50,000</option>
                            <option>£50,000 – £150,000</option>
                            <option>£150,000+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Project brief</label>
                        <textarea
                          className="input-base resize-none"
                          rows={4}
                          placeholder="Tell us about your project, timeline, and what success looks like."
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-full"
                        style={{ padding: '0.875rem' }}
                        disabled={formState === 'submitting'}
                      >
                        {formState === 'submitting' ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25"/>
                              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Sending…
                          </span>
                        ) : 'Send enquiry'}
                      </button>

                      {error && (
                        <p className="text-sm text-center" style={{ color: '#F87171' }}>{error}</p>
                      )}

                      <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
                        We respect your privacy. Your data is never shared or sold.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Office image */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div className="rounded-2xl overflow-hidden" style={{ height: '360px', background: 'var(--muted)' }}>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=500&fit=crop&auto=format"
                alt="Nexahub Shoreditch office"
                className="w-full h-full object-cover"
                style={{ opacity: 0.65 }}
              />
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
