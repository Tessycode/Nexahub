import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { services as servicesApi } from '../lib/api'

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

type Service = {
  id: string
  title: string
  category: string
  summary: string
  detail: string[]
  img: string
  tech: string[]
}

export default function Services({ onNavigate }: Props) {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [activeCategory, setActiveCategory] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([servicesApi.list(), servicesApi.categories()])
      .then(([svcRes, catRes]: [any, any]) => {
        const svcs: Service[] = (svcRes.results ?? svcRes).map((s: any, i: number) => ({
          id: String(i + 1).padStart(2, '0'),
          title: s.title ?? s.name,
          category: s.category?.name ?? s.category ?? 'Engineering',
          summary: s.short_description ?? s.description ?? '',
          detail: Array.isArray(s.deliverables) ? s.deliverables : (s.description ?? '').split('\n').filter(Boolean).slice(0, 6),
          img: s.image ?? 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=560&fit=crop&auto=format',
          tech: Array.isArray(s.technologies) ? s.technologies : [],
        }))
        setServices(svcs)
        const catNames: string[] = ['All', ...(catRes.results ?? catRes).map((c: any) => c.name ?? c)]
        setCategories(catNames)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'All' ? services : services.filter(s => s.category === activeCategory)

  if (loading) {
    return (
      <div className="page-enter pt-24">
        <section className="section-pad pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-current opacity-10 rounded w-40" />
              <div className="h-12 bg-current opacity-5 rounded w-80" />
              <div className="grid md:grid-cols-2 gap-4">
                {[1,2,3,4].map(i => <div key={i} className="h-40 bg-current opacity-5 rounded-xl" />)}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-enter pt-24">
      {/* Header */}
      <section className="section-pad pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeUp>
                <span className="tag mb-5 block w-fit">Services</span>
                <h1 className="section-heading">
                  Complete digital<br />capability — one partner
                </h1>
              </FadeUp>
            </div>
            <FadeUp delay={0.1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Most companies need multiple vendors to cover design, development, marketing and infrastructure. Nexahub provides all of it — integrated, accountable, and with a single point of contact. That means faster decisions, less coordination overhead, and work that's actually coherent.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <div className="border-y sticky top-[68px] z-30 nav-blur" style={{ borderColor: 'var(--border)', background: 'var(--nav-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center gap-2 py-3 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                color: activeCategory === cat ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                border: activeCategory === cat ? 'none' : '1px solid var(--border)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services list */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            {filtered.map((svc, i) => (
              <FadeUp key={svc.id} delay={i * 0.05}>
                <div
                  className="rounded-2xl border overflow-hidden cursor-pointer"
                  style={{ background: 'var(--card)', borderColor: expanded === svc.id ? 'rgba(91,158,244,0.3)' : 'var(--border)' }}
                  onClick={() => setExpanded(expanded === svc.id ? null : svc.id)}
                >
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Image */}
                    <div className="relative overflow-hidden lg:col-span-1" style={{ minHeight: '200px', background: 'var(--muted)' }}>
                      <img
                        src={svc.img}
                        alt={svc.title}
                        className="w-full h-full object-cover absolute inset-0"
                        style={{ opacity: 0.75 }}
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(14,16,24,0.3), transparent)' }} />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-mono-data text-xs" style={{ color: 'var(--primary)' }}>{svc.id}</span>
                              <span className="tag text-xs">{svc.category}</span>
                            </div>
                            <h2 className="text-xl font-semibold">{svc.title}</h2>
                          </div>
                          <div
                            className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 transition-transform duration-300"
                            style={{
                              borderColor: 'var(--border)',
                              transform: expanded === svc.id ? 'rotate(45deg)' : 'rotate(0)',
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{svc.summary}</p>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ height: expanded === svc.id ? 'auto' : 0, opacity: expanded === svc.id ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="pt-6 mt-6 border-t grid md:grid-cols-2 gap-6" style={{ borderColor: 'var(--border)' }}>
                          <ul className="flex flex-col gap-2.5">
                            {svc.detail.map(d => (
                              <li key={d} className="flex items-start gap-2.5">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
                                  <circle cx="7" cy="7" r="6.5" stroke="rgba(91,158,244,0.4)"/>
                                  <path d="M4.5 7l2 2 3-3" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{d}</span>
                              </li>
                            ))}
                          </ul>
                          <div>
                            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>Technologies</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {svc.tech.map(t => (
                                <span key={t} className="tag text-xs">{t}</span>
                              ))}
                            </div>
                            <button
                              onClick={e => { e.stopPropagation(); onNavigate('contact') }}
                              className="btn btn-primary text-sm"
                              style={{ padding: '0.625rem 1.25rem' }}
                            >
                              Enquire about this service
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="section-heading mb-5">Not sure which service you need?</h2>
            <p className="text-base mb-8" style={{ color: 'var(--muted-foreground)' }}>
              Most projects require a combination of services. Tell us where you're trying to get to and we'll recommend the right approach.
            </p>
            <button onClick={() => onNavigate('contact')} className="btn btn-primary btn-lg">
              Book a free consultation
            </button>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
