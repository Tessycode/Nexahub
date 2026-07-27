import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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

const projects: Project[] = [
  {
    id: 'paragon',
    title: 'Paragon Pay',
    client: 'Paragon Financial Technologies Ltd',
    category: 'Fintech',
    services: ['Product Design', 'Engineering', 'Branding', 'Cloud Infrastructure'],
    tagline: 'A cross-border payment platform for SMEs.',
    description: 'Paragon Pay needed to enter a crowded fintech market with a product that SMEs would actually use — not a simplified version of enterprise banking software.',
    challenge: 'SME cross-border payments were expensive, slow, and opaque. Existing solutions required lengthy onboarding, didn\'t support the currencies SMEs needed, and lacked real-time transaction visibility.',
    approach: 'We started with extensive user research across 40 SME finance leads in the UK and Nigeria. The insight that shaped everything: users didn\'t want more features, they wanted certainty — knowing exactly what they\'d pay, exactly when funds would arrive. We designed around that.',
    outcome: 'Launched in 14 weeks from kickoff. Product Hunt #3 Product of the Day. Series A raised within 6 months of launch.',
    metrics: [
      { label: 'Transactions, year 1', value: '3.2M' },
      { label: 'Time to Series A', value: '6 mo' },
      { label: 'NPS at launch', value: '71' },
      { label: 'Onboarding time', value: '< 8 min' },
    ],
    heroImg: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=700&fit=crop&auto=format',
    galleryImgs: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&auto=format',
    ],
    palette: ['#0A1628', '#1A3A6B', '#2563EB', '#DBEAFE', '#F8FAFC'],
    year: '2024',
    duration: '14 weeks',
    large: true,
  },
  {
    id: 'meridian',
    title: 'Meridian Health',
    client: 'Meridian Health Technologies',
    category: 'Healthcare',
    services: ['UI/UX Design', 'Mobile App', 'Branding'],
    tagline: 'Patient-facing app for chronic disease management.',
    description: 'Meridian had clinical evidence that their approach to chronic disease management worked. What they lacked was a mobile product that patients would actually use consistently.',
    challenge: 'Patient adherence to self-monitoring protocols drops sharply after 3 weeks. Existing apps were clinical in feel — designed by compliance teams, not patient experience teams — and reinforced the idea that managing a chronic condition is a burden.',
    approach: 'We embedded with clinical staff and interviewed 22 patients across three hospitals. The key finding: patients didn\'t want to be reminded of their condition. They wanted tools that helped them forget about it — that integrated into life rather than interrupting it.',
    outcome: 'Launched on iOS and Android simultaneously. Featured in TechCrunch Health. NHS pilot programme secured within 8 months.',
    metrics: [
      { label: 'Active patients, 8 months', value: '14k' },
      { label: 'Manual data entry reduction', value: '70%' },
      { label: '90-day adherence rate', value: '68%' },
      { label: 'App Store rating', value: '4.8 ★' },
    ],
    heroImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop&auto=format',
    galleryImgs: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format',
    ],
    palette: ['#0F1B14', '#14532D', '#16A34A', '#BBF7D0', '#F0FDF4'],
    year: '2024',
    duration: '20 weeks',
    large: false,
  },
  {
    id: 'fieldstone',
    title: 'Fieldstone Capital',
    client: 'Fieldstone Capital Management',
    category: 'Asset Management',
    services: ['Website Development', 'Branding', 'SEO'],
    tagline: 'Brand refresh and new website for a £2.4bn AUM firm.',
    description: 'Fieldstone\'s existing website had been built by an internal team four years prior. It communicated stability but not sophistication — and it wasn\'t converting the institutional capital introductions they needed.',
    challenge: 'Institutional investors evaluate asset managers online before agreeing to meetings. Fieldstone\'s previous website didn\'t reflect the calibre of their investment process or team. Enquiries were coming in, but they were predominantly from retail investors outside their target mandate.',
    approach: 'We repositioned the brand around investment philosophy and track record — the things institutional investors actually care about. The new site led with performance attribution and philosophy rather than credentials and team bios.',
    outcome: 'New site launched January 2024. Within 90 days, inbound institutional enquiries increased 89%.',
    metrics: [
      { label: 'Inbound enquiries, Q1', value: '+89%' },
      { label: 'Avg. session duration', value: '+142%' },
      { label: 'Organic search traffic', value: '+67%' },
      { label: 'Pages per session', value: '5.4' },
    ],
    heroImg: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=700&fit=crop&auto=format',
    galleryImgs: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format',
    ],
    palette: ['#0C0D0F', '#1C1F26', '#374151', '#9CA3AF', '#F9FAFB'],
    year: '2023',
    duration: '10 weeks',
    large: false,
  },
  {
    id: 'clearpath',
    title: 'Clearpath AI',
    client: 'Clearpath Technologies Ltd',
    category: 'Enterprise SaaS',
    services: ['Product Design', 'Engineering', 'Cloud Infrastructure'],
    tagline: 'AI-powered procurement platform for enterprise.',
    description: 'Clearpath had developed an ML model that could automate 80% of supplier evaluation decisions. What they needed was a product that enterprise procurement teams would actually adopt.',
    challenge: 'Enterprise procurement is conservative. Procurement leads are accountable for supplier decisions and needed to trust the AI\'s recommendations enough to act on them. The previous interface showed model outputs without explanation — confidence scores with no reasoning.',
    approach: 'We built explainability into the core UX — every recommendation came with a structured rationale, audit trail, and confidence breakdown. We also designed for the reviewer workflow, not the decision-maker workflow: most procurement activity happens at team level, not director level.',
    outcome: '£1.1M ARR at launch. 40+ enterprise clients within 18 months. Currently processing £2.4B in annual procurement decisions.',
    metrics: [
      { label: 'ARR at launch', value: '£1.1M' },
      { label: 'Enterprise clients', value: '40+' },
      { label: 'Procurement processed', value: '£2.4B' },
      { label: 'Onboarding time', value: '< 2 weeks' },
    ],
    heroImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format',
    galleryImgs: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&auto=format',
    ],
    palette: ['#09090B', '#18181B', '#6366F1', '#A5B4FC', '#EEF2FF'],
    year: '2023',
    duration: '24 weeks',
    large: true,
  },
  {
    id: 'lumina',
    title: 'Lumina Group',
    client: 'Lumina Property Developments Ltd',
    category: 'Real Estate',
    services: ['Website Development', 'Digital Marketing', 'Branding', 'SEO'],
    tagline: 'Digital presence for a premium property developer.',
    description: 'Lumina were bringing premium residential developments to market in a price bracket where buyers expect a brand experience to match the product.',
    challenge: 'Property developer websites are notoriously poor. Most feel like database front-ends. Lumina\'s previous digital presence didn\'t communicate the quality of their developments and was generating volume enquiries rather than qualified buyers.',
    approach: 'We positioned Lumina as a lifestyle brand first and a developer second. Photography-led editorial layouts, neighbourhood storytelling, and a buyer journey designed around aspiration rather than specification. The lead form was removed from the homepage entirely.',
    outcome: '£18M in attributable pipeline from digital channels in year one. The quality of leads — as measured by sales conversion rate — improved 3.4x.',
    metrics: [
      { label: 'Digital pipeline, year 1', value: '£18M' },
      { label: 'Lead quality improvement', value: '3.4×' },
      { label: 'Avg. time on site', value: '5m 20s' },
      { label: 'Organic visibility', value: '+220%' },
    ],
    heroImg: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=700&fit=crop&auto=format',
    galleryImgs: [
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format',
    ],
    palette: ['#0D0B0A', '#1C1916', '#CA8A04', '#FDE68A', '#FEFCE8'],
    year: '2023',
    duration: '16 weeks',
    large: false,
  },
  {
    id: 'vantage',
    title: 'Vantage Labs',
    client: 'Vantage Industrial Technologies',
    category: 'B2B Software',
    services: ['UI/UX Design', 'Engineering'],
    tagline: 'Industrial IoT dashboard redesign.',
    description: 'Vantage\'s industrial monitoring platform had 300+ enterprise customers who depended on it for real-time operations visibility. The dashboard was complex, slow, and required weeks of training for new users.',
    challenge: 'The existing dashboard had accumulated 7 years of features without a coherent information hierarchy. Operators were overwhelmed by data. The most common support ticket type was "I can\'t find X" — for features that existed, just buried.',
    approach: 'We conducted contextual inquiry with operators in actual industrial settings — not usability labs. We observed how they actually used the tool during their shifts. The key insight: 90% of daily activity concentrated on 20% of the features. We redesigned around that 20%.',
    outcome: 'NPS improved from 14 to 67 — a 53-point improvement. Average time-to-insight fell from 4 hours to 11 minutes for the most common monitoring tasks.',
    metrics: [
      { label: 'NPS improvement', value: '+53 pts' },
      { label: 'Time-to-insight', value: '11 min' },
      { label: 'Support tickets', value: '–64%' },
      { label: 'New user time-to-proficiency', value: '3 days' },
    ],
    heroImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=700&fit=crop&auto=format',
    galleryImgs: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&auto=format',
    ],
    palette: ['#0A0C10', '#1A1D2A', '#0EA5E9', '#BAE6FD', '#F0F9FF'],
    year: '2022',
    duration: '18 weeks',
    large: false,
  },
  {
    id: 'axis',
    title: 'Axis Studio',
    client: 'Axis Creative Studios Ltd',
    category: 'Creative Agency',
    services: ['Branding', 'Website Development'],
    tagline: 'Identity and digital presence for a film production company.',
    description: 'Axis needed a brand identity and website that would help them compete for mid-to-large brand film briefs against more established production companies.',
    challenge: 'The production company market segments sharply at a certain project size. Below that threshold, clients choose on price. Above it, they choose on portfolio, brand confidence, and cultural fit. Axis wanted to move upmarket and needed a presence that credibly placed them there.',
    approach: 'We created an identity built around the idea of precise, considered craft — referenced in the wordmark and typographic system — balanced with the energy and confidence that characterises their work. The website led with showreel, not agency biography.',
    outcome: 'Average project value increased 65% in the 12 months following launch. Won three awards for agency website design.',
    metrics: [
      { label: 'Avg. project value', value: '+65%' },
      { label: 'New business enquiries', value: '+112%' },
      { label: 'Website awards', value: '3' },
      { label: 'New enterprise clients', value: '8' },
    ],
    heroImg: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=700&fit=crop&auto=format',
    galleryImgs: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format',
    ],
    palette: ['#0A0A0A', '#1A1A1A', '#E5E5E5', '#F5F5F5', '#FFFFFF'],
    year: '2022',
    duration: '8 weeks',
    large: false,
  },
  {
    id: 'northbank',
    title: 'NorthBank',
    client: 'NorthBank Digital Finance',
    category: 'Fintech',
    services: ['Product Design', 'Engineering', 'Digital Marketing'],
    tagline: 'Digital challenger bank for business accounts.',
    description: 'NorthBank entered the crowded challenger bank market targeting micro-businesses who were frustrated with incumbent bank account fees and poor mobile experiences.',
    challenge: 'The challenger bank space is extremely competitive. Differentiation can\'t be built on features alone — every feature can be copied. NorthBank needed to build emotional differentiation: the sense that this product was built for them specifically, not adapted from a product built for someone else.',
    approach: 'We designed the entire onboarding and account management experience around the specific rhythms of micro-business finance: irregular income, invoice timing, VAT preparation, and the psychological burden of money management for solo operators. Every feature was named and framed in micro-business terms, not banking terms.',
    outcome: '28,000 accounts opened in first six months, 40% ahead of target. Featured in The Guardian Money and Forbes.',
    metrics: [
      { label: 'Accounts, 6 months', value: '28k' },
      { label: 'vs. launch target', value: '+40%' },
      { label: '90-day retention', value: '78%' },
      { label: 'App Store rating', value: '4.7 ★' },
    ],
    heroImg: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=700&fit=crop&auto=format',
    galleryImgs: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop&auto=format',
    ],
    palette: ['#0C1040', '#1B2880', '#3B5BDB', '#A5B4FC', '#EEF2FF'],
    year: '2022',
    duration: '28 weeks',
    large: true,
  },
]

const categories = ['All', 'Fintech', 'Healthcare', 'Enterprise SaaS', 'Real Estate', 'B2B Software', 'Asset Management', 'Creative Agency']

export default function Portfolio({ onNavigate }: Props) {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [activeGallery, setActiveGallery] = useState(0)

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  const openProject = (p: Project) => { setSelected(p); setActiveGallery(0) }

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
