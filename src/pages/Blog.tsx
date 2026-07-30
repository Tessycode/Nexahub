import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { blog as blogApi } from '../lib/api'

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

type Article = {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  author: { name: string; img: string }
  img: string
  featured: boolean
}

export default function Blog({ onNavigate }: Props) {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    Promise.all([blogApi.posts(), blogApi.categories()])
      .then(([postsRes, catsRes]: [any, any]) => {
        const posts: Article[] = (postsRes.results ?? postsRes).map((p: any) => ({
          slug: p.slug,
          category: p.category?.name ?? p.category ?? 'General',
          title: p.title,
          excerpt: p.excerpt ?? p.content?.substring(0, 160) ?? '',
          date: p.published_at ? new Date(p.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
          readTime: p.read_time ? (String(p.read_time).includes('min') ? p.read_time : `${p.read_time} min read`) : '5 min read',
          author: {
            name: typeof p.author === 'object' && p.author !== null ? (p.author.name || 'Nexahub Team') : (p.author_name ?? p.author ?? 'Nexahub Team'),
            img: typeof p.author === 'object' && p.author !== null ? (p.author.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format') : (p.author_avatar ?? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format'),
          },
          img: p.hero_image_display || p.featured_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format',
          featured: p.is_featured ?? false,
        }))
        setArticles(posts)
        const catNames: string[] = (catsRes.results ?? catsRes).map((c: any) => c.name)
        setCategories(['All', ...catNames])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = filtered.find(a => a.featured) ?? filtered[0]
  const rest = filtered.filter(a => a !== featured)
  if (loading) {
    return (
      <div className="page-enter pt-24">
        <section className="section-pad pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-current opacity-10 rounded w-48" />
              <div className="h-64 bg-current opacity-5 rounded-2xl" />
              <div className="grid md:grid-cols-3 gap-6">
                {[1,2,3].map(i => <div key={i} className="h-48 bg-current opacity-5 rounded-xl" />)}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const filteredFeatured = activeCategory === 'All' || activeCategory === featured?.category ? featured : null
  const filteredRest = activeCategory === 'All' ? rest : rest.filter(a => a.category === activeCategory)

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
          <FadeUp delay={0.2} className="mt-8">
            <div className="relative max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted-foreground)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/></svg>
              <input type="search" placeholder="Search articles…" value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm border outline-none transition-colors"
                style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
            </div>
          </FadeUp>
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
            <button key={cat} onClick={() => setActiveCategory(cat)} className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{ background: activeCategory === cat ? 'var(--primary)' : 'transparent', color: activeCategory === cat ? 'var(--primary-foreground)' : 'var(--muted-foreground)', border: activeCategory === cat ? 'none' : '1px solid var(--border)' }}>
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
