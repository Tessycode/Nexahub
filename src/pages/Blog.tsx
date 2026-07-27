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

const articles = [
  {
    slug: 'b2b-saas-onboarding',
    category: 'Product Design',
    title: "Why most B2B SaaS onboarding fails — and how to fix it",
    excerpt: "The first 15 minutes determine whether a user stays or churns. Most products spend months on acquisition and days on activation. Here's what the data tells us.",
    date: 'Jan 14, 2025',
    readTime: '7 min read',
    author: { name: 'Lin Zhao', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format' },
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format',
    featured: true,
  },
  {
    slug: 'page-load-performance',
    category: 'Engineering',
    title: "Building for performance: how we cut 3s from a client's page load",
    excerpt: "A real-world deep-dive into bundle analysis, server-side rendering decisions, and the trade-offs that actually move the needle on Core Web Vitals.",
    date: 'Dec 28, 2024',
    readTime: '11 min read',
    author: { name: 'Marcus Webb', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format' },
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&auto=format',
    featured: false,
  },
  {
    slug: 'rebranding-strategy',
    category: 'Brand Strategy',
    title: "Rebranding without losing your existing customers",
    excerpt: "Brand evolution is more art than science. Here's how we approach identity refreshes without triggering brand recognition loss.",
    date: 'Dec 10, 2024',
    readTime: '8 min read',
    author: { name: 'James Hartfield', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format' },
    img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=500&fit=crop&auto=format',
    featured: false,
  },
  {
    slug: 'paid-ads-conversion',
    category: 'Growth',
    title: "The hidden reason your paid ads aren't converting",
    excerpt: "Spending on traffic but not on what happens after the click is like pouring water into a leaking bucket. Post-click experience matters more than most marketers admit.",
    date: 'Nov 25, 2024',
    readTime: '6 min read',
    author: { name: 'Sofia Patel', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format' },
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format',
    featured: false,
  },
  {
    slug: 'react-native-vs-native',
    category: 'Engineering',
    title: "When to choose React Native vs. native development",
    excerpt: "The correct answer depends on your team, your users, your timeline, and your long-term maintenance appetite. Here's the decision framework we use with every client.",
    date: 'Nov 8, 2024',
    readTime: '9 min read',
    author: { name: 'Yemi Adeyinka', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&auto=format' },
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&auto=format',
    featured: false,
  },
  {
    slug: 'cloud-cost-optimisation',
    category: 'Cloud Infrastructure',
    title: "The £40k mistake: running EC2 when you should be running serverless",
    excerpt: "Infrastructure decisions made at MVP stage have a way of compounding. One of our most common consulting engagements is reversing architectures that made sense at 100 users but not at 100,000.",
    date: 'Oct 22, 2024',
    readTime: '10 min read',
    author: { name: 'Ravi Krishnan', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format' },
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&auto=format',
    featured: false,
  },
]

const categories = ['All', 'Product Design', 'Engineering', 'Brand Strategy', 'Growth', 'Cloud Infrastructure']

export default function Blog({ onNavigate }: Props) {
  const [filter, setFilter] = useState('All')

  const featured = articles[0]
  const rest = articles.slice(1)
  const filteredRest = filter === 'All' ? rest : rest.filter(a => a.category === filter)

  const filteredFeatured = filter === 'All' || filter === featured.category ? featured : null

  return (
    <div className="page-enter pt-24">
      {/* Header */}
      <section className="section-pad pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <FadeUp>
              <span className="tag mb-5 block w-fit">Perspectives</span>
              <h1 className="section-heading">Writing worth<br />your time</h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                We write about what we actually do — the decisions, trade-offs, and lessons from real projects. No thought leadership without the thoughts. Every article is written by someone who does this work, not someone who manages people who do.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Featured article */}
      {filteredFeatured && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeUp>
              <div
                className="rounded-2xl border overflow-hidden cursor-pointer group card-hover"
                style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                onClick={() => onNavigate(`blog-post-${featured.slug}`)}
              >
                <div className="grid lg:grid-cols-2">
                  <div className="relative overflow-hidden" style={{ minHeight: '360px', background: 'var(--muted)' }}>
                    <img src={featured.img} alt={featured.title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ opacity: 0.85 }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 60%, var(--img-overlay-card) 100%)' }} />
                    <span className="absolute top-5 left-5 tag accent">Featured</span>
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <span className="tag mb-5 block w-fit">{featured.category}</span>
                    <h2 className="text-2xl font-semibold leading-snug mb-4">{featured.title}</h2>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>{featured.excerpt}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <img src={featured.author.img} alt={featured.author.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium">{featured.author.name}</p>
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{featured.date} · {featured.readTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--primary)' }}>
                      Read article
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* Filter bar */}
      <div className="border-y" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center gap-2 py-3 overflow-x-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{ background: filter === cat ? 'var(--primary)' : 'transparent', color: filter === cat ? 'var(--primary-foreground)' : 'var(--muted-foreground)', border: filter === cat ? 'none' : '1px solid var(--border)' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article grid */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRest.map((article, i) => (
              <FadeUp key={article.slug} delay={i * 0.07}>
                <article
                  className="rounded-2xl border overflow-hidden cursor-pointer group card-hover h-full flex flex-col"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                  onClick={() => onNavigate(`blog-post-${article.slug}`)}
                >
                  <div className="overflow-hidden" style={{ height: '200px', background: 'var(--muted)' }}>
                    <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ opacity: 0.85 }} />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="tag accent text-xs">{article.category}</span>
                      <span className="font-mono-data text-xs" style={{ color: 'var(--muted-foreground)' }}>{article.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug mb-2 flex-1">{article.title}</h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>{article.excerpt.slice(0, 110)}…</p>
                    <div className="flex items-center gap-3 pt-3 mt-auto border-t" style={{ borderColor: 'var(--border)' }}>
                      <img src={article.author.img} alt={article.author.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-medium">{article.author.name}</p>
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{article.date}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1 text-xs" style={{ color: 'var(--primary)' }}>
                        Read
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>New articles, direct to you</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>We publish 2–4 times a month. No newsletters. Just writing worth reading.</p>
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <input type="email" className="input-base flex-1 text-sm" placeholder="your@company.com" />
              <button type="submit" className="btn btn-primary flex-shrink-0" style={{ padding: '0.75rem 1.25rem' }}>Subscribe</button>
            </form>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
