import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

const services = [
  {
    id: '01',
    title: 'Website Development',
    category: 'Engineering',
    summary: 'Commercial websites and complex web applications built for performance, accessibility and long-term maintainability.',
    detail: [
      'Architecture review and technology selection',
      'Custom CMS integration (Sanity, Contentful, WordPress headless)',
      'Core Web Vitals optimisation — targeting top 10% Lighthouse scores',
      'Accessibility audit and WCAG 2.1 AA compliance',
      'CI/CD pipeline setup and managed deployment',
      '12-month post-launch support and maintenance',
    ],
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=560&fit=crop&auto=format',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    id: '02',
    title: 'Mobile Application Development',
    category: 'Engineering',
    summary: 'Native iOS and Android apps, and cross-platform solutions using React Native — built around real user research, not assumed journeys.',
    detail: [
      'User research and journey mapping before design begins',
      'React Native for cross-platform or Swift/Kotlin for native',
      'Offline-first architecture where appropriate',
      'App Store and Google Play submission support',
      'Push notification strategy and implementation',
      'Analytics integration and funnel tracking',
    ],
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=560&fit=crop&auto=format',
    tech: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
  },
  {
    id: '03',
    title: 'UI/UX Design',
    category: 'Design',
    summary: 'Research-led product design that converts. We validate assumptions early and iterate quickly — reducing expensive late-stage changes.',
    detail: [
      'User research: interviews, surveys, usability testing',
      'Information architecture and user flow mapping',
      'High-fidelity Figma prototypes for stakeholder alignment',
      'Design systems with full component libraries',
      'Handoff documentation and developer specifications',
      'A/B testing framework recommendations',
    ],
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=560&fit=crop&auto=format',
    tech: ['Figma', 'Framer', 'Maze', 'FullStory', 'Hotjar'],
  },
  {
    id: '04',
    title: 'Graphic Design',
    category: 'Design',
    summary: 'Visual communication that works across print and digital. From campaign assets to packaging — consistent, professional, and on-brand.',
    detail: [
      'Brand campaign design and art direction',
      'Social media asset creation and templating',
      'Print design: brochures, packaging, exhibition materials',
      'Email template design',
      'Presentation design (pitch decks, board packs)',
      'Iconography and illustration',
    ],
    img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=560&fit=crop&auto=format',
    tech: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
  },
  {
    id: '05',
    title: 'Business Branding',
    category: 'Strategy',
    summary: 'Brand identities built for longevity. Visual systems, positioning frameworks and verbal guidelines that give your business a clear, ownable voice.',
    detail: [
      'Brand positioning and competitive differentiation',
      'Naming and tagline development',
      'Logo and visual identity system',
      'Brand guidelines: typography, colour, usage rules',
      'Verbal identity: tone of voice, messaging frameworks',
      'Brand launch strategy and rollout support',
    ],
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=560&fit=crop&auto=format',
    tech: ['Brand Strategy', 'Identity Design', 'Copywriting'],
  },
  {
    id: '06',
    title: 'Digital Marketing',
    category: 'Growth',
    summary: 'Integrated campaigns that generate qualified pipeline — not vanity metrics. Strategy, execution, and optimisation under one roof.',
    detail: [
      'Paid search (Google Ads, Microsoft Ads)',
      'Paid social (Meta, LinkedIn, TikTok)',
      'Content marketing and editorial strategy',
      'Email marketing and automation (HubSpot, Klaviyo)',
      'Conversion rate optimisation',
      'Monthly reporting with attribution modelling',
    ],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=560&fit=crop&auto=format',
    tech: ['Google Ads', 'Meta', 'HubSpot', 'Klaviyo', 'GA4'],
  },
  {
    id: '07',
    title: 'SEO Optimisation',
    category: 'Growth',
    summary: 'Organic search strategy grounded in technical SEO, content authority and genuine user intent — not shortcuts that risk penalties.',
    detail: [
      'Technical audit: crawlability, indexation, Core Web Vitals',
      'Keyword research and topical authority mapping',
      'On-page optimisation and schema implementation',
      'Link acquisition through editorial outreach',
      'Local SEO for multi-location businesses',
      'Monthly reporting with rank tracking and traffic attribution',
    ],
    img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=560&fit=crop&auto=format',
    tech: ['Ahrefs', 'Screaming Frog', 'Search Console', 'Semrush'],
  },
  {
    id: '08',
    title: 'Cloud Hosting & Infrastructure',
    category: 'Engineering',
    summary: 'Scalable, secure cloud infrastructure with proactive monitoring, managed backups and 99.9% uptime SLAs.',
    detail: [
      'Cloud architecture on AWS, GCP or Azure',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Kubernetes orchestration for complex workloads',
      'Managed CI/CD with GitHub Actions or GitLab',
      'Security hardening, WAF and DDoS protection',
      '24/7 monitoring and incident response',
    ],
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=560&fit=crop&auto=format',
    tech: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Cloudflare'],
  },
]

const categories = ['All', 'Engineering', 'Design', 'Strategy', 'Growth']

export default function Services({ onNavigate }: Props) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory)

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
