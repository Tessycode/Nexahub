import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { portfolio as portfolioApi } from '../lib/api'

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

type Project = {
  id: string
  title: string
  client: string
  category: string
  services: string[]
  tagline: string
  description: string
  challenge: string
  approach: string
  outcome: string
  metrics: { label: string; value: string }[]
  heroImg: string
  galleryImgs: string[]
  palette: string[]
  year: string
  duration: string
  large: boolean
}
export default function Portfolio({ onNavigate }: Props) {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [activeGallery, setActiveGallery] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([portfolioApi.list(), portfolioApi.categories()])
      .then(([projRes, catRes]: [any, any]) => {
        const projs: Project[] = (projRes.results ?? projRes).map((p: any, i: number) => ({
          id: p.slug ?? p.id ?? String(i),
          title: p.title,
          client: p.client_name ?? p.client ?? '',
          category: p.category?.name ?? p.category ?? 'General',
          services: Array.isArray(p.services) ? p.services.map((s: any) => s.name ?? s) : [],
          tagline: p.tagline ?? p.short_description ?? '',
          description: p.description ?? '',
          challenge: p.challenge ?? '',
          approach: p.approach ?? '',
          outcome: p.outcome ?? '',
          metrics: Array.isArray(p.metrics) ? p.metrics : [],
          heroImg: p.hero_image ?? p.image ?? 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=700&fit=crop&auto=format',
          galleryImgs: Array.isArray(p.gallery_images) ? p.gallery_images.map((g: any) => g.image ?? g) : [],
          palette: Array.isArray(p.color_palette) ? p.color_palette.map((c: any) => c.hex ?? c) : ['#0A1628', '#1A3A6B', '#2563EB'],
          year: p.year ?? new Date(p.completed_at ?? Date.now()).getFullYear().toString(),
          duration: p.duration ?? '',
          large: p.is_featured ?? i === 0,
        }))
        setProjects(projs)
        const catNames: string[] = ['All', ...(catRes.results ?? catRes).map((c: any) => c.name ?? c)]
        setCategories(catNames)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)
  const openProject = (p: Project) => { setSelected(p); setActiveGallery(0) }

  if (loading) {
    return (
      <div className="page-enter pt-24">
        <section className="section-pad">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-current opacity-10 rounded w-40" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-current opacity-5 rounded-2xl" />)}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }


  return (
    <div className="page-enter pt-24">
      {/* Hero stats strip */}
      <section className="section-pad pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <FadeUp>
              <span className="tag mb-5 block w-fit">Selected work</span>
              <h1 className="section-heading">Projects that moved<br />the needle</h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Every case study here is real. Real clients, real numbers, real outcomes. We include measurable business results because those are the only results that matter — not awards, not press coverage, not opinions.
              </p>
            </FadeUp>
          </div>

          {/* Aggregate stats */}
          <FadeUp delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '8', unit: 'Industries', desc: 'across our portfolio' },
                { value: '120+', unit: 'Projects', desc: 'delivered since 2018' },
                { value: '£2.4B', unit: 'Procured', desc: 'through client platforms' },
                { value: '96%', unit: 'Retained', desc: 'client retention rate' },
              ].map(s => (
                <div key={s.unit} className="p-5 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                  <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'DM Serif Display, serif' }}>{s.value}</p>
                  <p className="text-sm font-medium mb-0.5">{s.unit}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Filter bar */}
      <div className="border-y sticky top-[68px] z-30 nav-blur" style={{ borderColor: 'var(--border)', background: 'var(--nav-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center gap-2 py-3 overflow-x-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{ background: filter === cat ? 'var(--primary)' : 'transparent', color: filter === cat ? 'var(--primary-foreground)' : 'var(--muted-foreground)', border: filter === cat ? 'none' : '1px solid var(--border)' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={project.large ? 'md:col-span-2' : ''}
                >
                  <div
                    className="rounded-2xl border overflow-hidden cursor-pointer group card-hover h-full flex flex-col"
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                    onClick={() => openProject(project)}
                  >
                    <div className="relative overflow-hidden flex-shrink-0" style={{ height: project.large ? '340px' : '240px', background: 'var(--muted)' }}>
                      <img src={project.heroImg} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ opacity: 0.8 }} />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 35%, var(--img-overlay-b) 100%)' }} />
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                        <span className="tag text-xs">{project.category}</span>
                        <span className="font-mono-data text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{project.year}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 p-5">
                        <p className="text-xl font-semibold text-white mb-0.5">{project.title}</p>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{project.tagline}</p>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.services.map(s => <span key={s} className="tag text-xs">{s}</span>)}
                      </div>

                      {/* Metrics preview */}
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        {project.metrics.slice(0, 2).map(m => (
                          <div key={m.label} className="p-3 rounded-lg" style={{ background: 'var(--secondary)' }}>
                            <p className="text-lg font-bold" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--primary)' }}>{m.value}</p>
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{m.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-end mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--primary)' }}>
                          View case study
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Case study modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-t-2xl md:rounded-2xl border overflow-hidden w-full max-w-3xl"
              style={{ background: 'var(--card)', borderColor: 'var(--border)', maxHeight: '92vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Hero image with close */}
              <div className="relative" style={{ height: '280px', background: 'var(--muted)' }}>
                <img src={selected.heroImg} alt={selected.title} className="w-full h-full object-cover" style={{ opacity: 0.8 }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, var(--img-overlay-b) 100%)' }} />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center nav-blur" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-mono-data text-xs mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{selected.year} · {selected.duration}</p>
                  <p className="text-2xl font-semibold text-white">{selected.title}</p>
                  <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>{selected.client}</p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selected.services.map(s => <span key={s} className="tag">{s}</span>)}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {selected.metrics.map(m => (
                    <div key={m.label} className="p-4 rounded-xl text-center" style={{ background: 'var(--secondary)' }}>
                      <p className="text-xl font-bold mb-1" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--primary)' }}>{m.value}</p>
                      <p className="text-xs leading-snug" style={{ color: 'var(--muted-foreground)' }}>{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Challenge / Approach / Outcome */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    { heading: 'The challenge', body: selected.challenge },
                    { heading: 'Our approach', body: selected.approach },
                    { heading: 'The outcome', body: selected.outcome },
                  ].map(section => (
                    <div key={section.heading}>
                      <p className="font-mono-data text-xs mb-2" style={{ color: 'var(--primary)' }}>{section.heading}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{section.body}</p>
                    </div>
                  ))}
                </div>

                {/* Gallery thumbnails */}
                <div className="mb-8">
                  <div className="rounded-xl overflow-hidden mb-3" style={{ height: '220px', background: 'var(--muted)' }}>
                    <img src={selected.galleryImgs[activeGallery]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2">
                    {selected.galleryImgs.map((img, i) => (
                      <button key={i} onClick={() => setActiveGallery(i)} className="rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200" style={{ width: '80px', height: '54px', background: 'var(--muted)', opacity: activeGallery === i ? 1 : 0.5, outline: activeGallery === i ? '2px solid var(--primary)' : 'none', outlineOffset: '2px' }}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colour palette */}
                <div className="mb-8">
                  <p className="font-mono-data text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>Brand palette</p>
                  <div className="flex gap-2 items-center">
                    {selected.palette.map(color => (
                      <div key={color} className="w-10 h-10 rounded-lg border" style={{ background: color, borderColor: 'var(--border)' }} title={color} />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                  <button onClick={() => { setSelected(null); onNavigate('contact') }} className="btn btn-primary flex-1">Start a similar project</button>
                  <button onClick={() => setSelected(null)} className="btn btn-secondary">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Process & approach section */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp className="mb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="tag mb-5 block w-fit">How we measure success</span>
                <h2 className="section-heading mb-5">We define outcomes<br />before we write code</h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  Every project begins with a shared definition of success that goes beyond deliverables. What business metric will this move? By how much? How will we know it's working? Those questions shape every decision from architecture to copy.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '◎', label: 'Outcome-led briefs', desc: 'Every project starts with a measurable goal, not a feature list.' },
                  { icon: '◎', label: 'Senior accountability', desc: 'Named senior practitioner responsible for every project outcome.' },
                  { icon: '◎', label: 'Post-launch measurement', desc: '90-day support period with structured performance reporting.' },
                  { icon: '◎', label: 'Honest retrospectives', desc: "We share what didn't work as openly as what did." },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                    <p className="text-sm font-semibold mb-1.5">{item.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="section-heading mb-5">Your project could be next</h2>
            <p className="text-base mb-8" style={{ color: 'var(--muted-foreground)' }}>We have capacity for 2 new projects this quarter. Tell us what you're building.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button onClick={() => onNavigate('contact')} className="btn btn-primary btn-lg">Start a conversation</button>
              <button onClick={() => onNavigate('services')} className="btn btn-secondary btn-lg">Explore services</button>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
