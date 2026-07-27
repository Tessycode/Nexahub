import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface HomeProps {
  onNavigate: (page: string) => void
  theme: 'dark' | 'light'
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <span ref={ref}>{count}{suffix}</span>
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

/* Company logos using Clearbit API (public, no-auth logo service) */
const clientLogos = [
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Intercom', domain: 'intercom.com' },
  { name: 'Atlassian', domain: 'atlassian.com' },
  { name: 'Webflow', domain: 'webflow.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
]

const services = [
  { id: '01', title: 'Website Development', description: 'Performant, accessible websites built with modern frameworks. From marketing sites to complex web applications — architected to grow.', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=420&fit=crop&auto=format', tags: ['React', 'Next.js', 'TypeScript'] },
  { id: '02', title: 'Mobile Applications', description: 'Native and cross-platform mobile apps that users actually want to use. Built around real user behaviour, not feature lists.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=420&fit=crop&auto=format', tags: ['iOS', 'Android', 'React Native'] },
  { id: '03', title: 'UI/UX Design', description: 'Research-led product design that converts. We validate assumptions early and iterate quickly — reducing expensive late-stage changes.', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=420&fit=crop&auto=format', tags: ['Figma', 'Prototyping', 'Research'] },
  { id: '04', title: 'Business Branding', description: 'Brand identities built to last. Visual systems, positioning frameworks, and verbal guidelines that give your company a clear voice.', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=420&fit=crop&auto=format', tags: ['Identity', 'Guidelines', 'Strategy'] },
  { id: '05', title: 'Digital Marketing', description: 'Campaigns that generate real pipeline — not just impressions. Paid search, social, content, and email working together.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=420&fit=crop&auto=format', tags: ['Paid Ads', 'Content', 'Analytics'] },
  { id: '06', title: 'Cloud Infrastructure', description: 'Scalable, secure cloud architecture with proactive monitoring, managed backups and 99.9% uptime SLAs.', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=420&fit=crop&auto=format', tags: ['AWS', 'GCP', 'DevOps'] },
]

const testimonials = [
  { quote: "Nexahub did something most agencies won't — they pushed back on our initial brief and proposed a better solution. Six months post-launch our conversion rate is up 34%.", name: 'Sarah Chen', title: 'Chief Product Officer', company: 'Fieldstone Capital', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format' },
  { quote: "The team understood our domain — fintech compliance — without us having to over-explain. They shipped on time, the code is clean, and the app got featured on Product Hunt.", name: 'Marcus Osei', title: 'Co-Founder & CTO', company: 'Paragon Pay', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format' },
  { quote: "We came to Nexahub with a vague idea and a tight deadline. They helped us think through the product, designed the whole experience and delivered a working MVP in eight weeks.", name: 'Priya Nair', title: 'Founder', company: 'Meridian Health', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format' },
]

const blogPosts = [
  { slug: 'b2b-saas-onboarding', category: 'Product Design', title: 'Why most B2B SaaS onboarding fails — and how to fix it', excerpt: 'The first 15 minutes determine whether a user stays or churns. Most products spend months on acquisition and days on activation.', date: 'Jan 14, 2025', readTime: '7 min', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop&auto=format' },
  { slug: 'page-load-performance', category: 'Engineering', title: "Building for performance: how we cut 3s from a client's page load", excerpt: 'A real-world deep-dive into bundle analysis, server-side rendering decisions, and the trade-offs that actually move the needle.', date: 'Dec 28, 2024', readTime: '11 min', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=380&fit=crop&auto=format' },
  { slug: 'rebranding-strategy', category: 'Brand Strategy', title: 'Rebranding without losing your existing customers', excerpt: 'Brand evolution is more art than science. Here\'s how we approach identity refreshes without triggering brand recognition loss.', date: 'Dec 10, 2024', readTime: '8 min', img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=380&fit=crop&auto=format' },
]

export default function Home({ onNavigate, theme }: HomeProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(t => (t + 1) % testimonials.length), 5500)
    return () => clearInterval(timer)
  }, [])

  const logoSet = [...clientLogos, ...clientLogos] // doubled for seamless loop

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1800&h=1000&fit=crop&auto=format" alt="" className="w-full h-full object-cover" style={{ opacity: theme === 'dark' ? 0.15 : 0.06 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, var(--overlay-from) 0%, var(--overlay-to) 60%)` }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-7">
              <span className="tag accent">Technology Partner — Est. 2018</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="hero-display mb-7">
              Design. Build.<br />
              <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Scale.</em>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: 'var(--muted-foreground)' }}>
              We partner with startups and established businesses to design, develop and grow digital products that solve real problems — and continue solving them as your company evolves.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.38 }} className="flex items-center flex-wrap gap-4">
              <button onClick={() => onNavigate('contact')} className="btn btn-primary btn-lg">
                Start a project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={() => onNavigate('portfolio')} className="btn btn-secondary btn-lg">View our work</button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-14 flex items-center gap-8">
              {[{ n: 120, suf: '+', label: 'Projects delivered' }, { n: 8, suf: ' yrs', label: 'In operation' }, { n: 96, suf: '%', label: 'Client retention' }].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold" style={{ fontFamily: 'DM Serif Display, serif' }}>
                    <AnimatedCounter target={stat.n} suffix={stat.suf} />
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&h=600&fit=crop&auto=format" alt="Nexahub team collaboration" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, var(--img-overlay-b) 100%)' }} />
            </div>

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-8 rounded-xl p-4 border" style={{ background: 'var(--card)', borderColor: 'var(--border)', backdropFilter: 'blur(12px)', minWidth: '180px', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(91,158,244,0.15)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Avg. project ROI</p>
                  <p className="text-sm font-semibold">+280% year one</p>
                </div>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-6 -right-4 rounded-xl p-3 border flex items-center gap-2" style={{ background: 'var(--card)', borderColor: 'var(--border)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <p className="text-xs font-medium">Delivered on time, every time</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY — Logo marquee */}
      <section className="py-14 border-y overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <p className="text-xs text-center tracking-widest uppercase" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
            Trusted by product-driven companies
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Left/right fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, var(--background), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(270deg, var(--background), transparent)' }} />

          <div className="flex animate-marquee gap-5 items-center" style={{ width: 'max-content' }}>
            {logoSet.map((co, i) => (
              <div key={`${co.domain}-${i}`} className="logo-pill gap-2.5" style={{ opacity: 0.75 }}>
                <img
                  src={`https://logo.clearbit.com/${co.domain}`}
                  alt={co.name}
                  className="h-5 w-auto object-contain"
                  style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none', opacity: theme === 'dark' ? 0.7 : 0.65 }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                <span className="text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--muted-foreground)' }}>{co.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 mb-16 items-end">
            <FadeUp>
              <span className="tag mb-4 block w-fit">What we do</span>
              <h2 className="section-heading">End-to-end digital<br />capability</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Every service we offer is connected. Strategy informs design, design informs development, and every decision is validated against the same goal — measurable business outcomes.
              </p>
              <button onClick={() => onNavigate('services')} className="btn btn-secondary mt-6 text-sm">
                Explore all services
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <FadeUp key={svc.id} delay={i * 0.07}>
                <div className="rounded-2xl border overflow-hidden card-hover cursor-pointer group" style={{ background: 'var(--card)', borderColor: 'var(--border)' }} onClick={() => onNavigate('services')}>
                  <div className="relative overflow-hidden" style={{ height: '200px', background: 'var(--muted)' }}>
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ opacity: theme === 'dark' ? 0.8 : 0.9 }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, var(--img-overlay-b) 100%)' }} />
                    <span className="absolute top-4 left-4 font-mono-data text-xs" style={{ color: 'var(--primary)' }}>{svc.id}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-base mb-2">{svc.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{svc.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {svc.tags.map(tag => <span key={tag} className="tag text-xs">{tag}</span>)}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <section className="section-pad border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '5/4', background: 'var(--muted)' }}>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=640&fit=crop&auto=format" alt="Nexahub team at work" className="w-full h-full object-cover" style={{ opacity: theme === 'dark' ? 0.9 : 1 }} />
              </div>
              <div className="absolute -bottom-5 -right-5 rounded-xl p-5 border w-48" style={{ background: 'var(--card)', borderColor: 'var(--border)', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
                <p className="text-3xl font-bold mb-1" style={{ fontFamily: 'DM Serif Display, serif' }}>2018</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Founded in London, now serving clients across 18 countries</p>
              </div>
            </div>
          </FadeUp>

          <div>
            <FadeUp delay={0.1}>
              <span className="tag mb-5 block w-fit">About Nexahub</span>
              <h2 className="section-heading mb-6">A different kind of<br />technology partner</h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
                We started Nexahub because we were frustrated with the same pattern — agencies that overpromise during the pitch, then hand work to juniors and disappear once invoices are paid.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
                Our model is different. Senior practitioners work directly on every project. We invest time upfront to understand your business, then stay accountable through delivery and beyond.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-6 mb-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                {[{ label: 'Team members', value: '34' }, { label: 'Countries served', value: '18' }, { label: 'Active projects', value: '12' }, { label: 'NPS score', value: '72' }].map(item => (
                  <div key={item.label}>
                    <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'DM Serif Display, serif' }}>{item.value}</p>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{item.label}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate('about')} className="btn btn-secondary">Learn about our story</button>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <span className="tag mb-5 inline-block">How we work</span>
            <h2 className="section-heading max-w-2xl mx-auto">A structured partnership from discovery to delivery</h2>
          </FadeUp>
          <div className="grid lg:grid-cols-4 gap-0 border rounded-2xl overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            {[
              { n: '1', title: 'Discovery', body: 'We spend the first week understanding your business model, users, technical constraints, and competitive landscape before writing a single line of code.' },
              { n: '2', title: 'Strategy', body: 'A detailed proposal covering architecture, user journeys, scope, timeline and commercial model — reviewed and agreed before work starts.' },
              { n: '3', title: 'Build', body: 'Iterative sprints with weekly demos. You see progress continuously, not just at the end. Every decision is documented and version-controlled.' },
              { n: '4', title: 'Launch & Scale', body: "Deployment, monitoring, performance tuning, and a 90-day post-launch support period. We don't disappear after go-live." },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.1}>
                <div className="p-8 border-r last:border-r-0 h-full" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <div className="font-mono-data text-xs mb-5" style={{ color: 'var(--primary)' }}>0{step.n} /</div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{step.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad border-t" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp><span className="tag mb-8 inline-block">Client perspective</span></FadeUp>
          <div className="relative" style={{ minHeight: '220px' }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={false} animate={{ opacity: i === activeTestimonial ? 1 : 0, y: i === activeTestimonial ? 0 : 12 }} transition={{ duration: 0.55 }} className="absolute inset-0 flex flex-col items-center" style={{ pointerEvents: i === activeTestimonial ? 'auto' : 'none' }}>
                <blockquote className="text-xl md:text-2xl leading-snug mb-8" style={{ fontStyle: 'italic', fontFamily: 'DM Serif Display, serif' }}>"{t.quote}"</blockquote>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div className="text-left">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t.title}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className="h-1 rounded-full transition-all duration-300" style={{ width: i === activeTestimonial ? '28px' : '8px', background: i === activeTestimonial ? 'var(--primary)' : 'var(--border)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <FadeUp>
              <span className="tag mb-4 block w-fit">From the blog</span>
              <h2 className="section-heading">Perspectives on<br />digital craft</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <button onClick={() => onNavigate('blog')} className="btn btn-secondary hidden md:flex">All articles</button>
            </FadeUp>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <FadeUp key={post.title} delay={i * 0.08}>
                <article className="rounded-2xl border overflow-hidden card-hover cursor-pointer group h-full flex flex-col" style={{ background: 'var(--card)', borderColor: 'var(--border)' }} onClick={() => onNavigate(`blog-post-${post.slug}`)}>
                  <div className="overflow-hidden" style={{ height: '200px', background: 'var(--muted)' }}>
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ opacity: theme === 'dark' ? 0.85 : 1 }} />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="tag accent text-xs">{post.category}</span>
                      <span className="font-mono-data text-xs" style={{ color: 'var(--muted-foreground)' }}>{post.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug mb-2 flex-1">{post.title}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>{post.excerpt}</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{post.date}</p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" style={{ opacity: theme === 'dark' ? 0.06 : 0.04 }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="section-heading mb-6">Ready to build something<br /><em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>worth building?</em></h2>
            <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Tell us about your project. We'll come back with a clear assessment — no sales pitch, no vague promises.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button onClick={() => onNavigate('contact')} className="btn btn-primary btn-lg">Start the conversation</button>
              <button onClick={() => onNavigate('portfolio')} className="btn btn-secondary btn-lg">See what we've built</button>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
