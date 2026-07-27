import { useRef } from 'react'
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

const team = [
  { name: 'James Hartfield', title: 'Co-Founder & CEO', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format', bio: 'Product strategist. Previously built digital products at McKinsey and Monzo.' },
  { name: 'Yemi Adeyinka', title: 'Co-Founder & CTO', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&auto=format', bio: 'Systems architect. 14 years in distributed systems, previously at AWS and Palantir.' },
  { name: 'Lin Zhao', title: 'Head of Design', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format', bio: 'Design lead. Graduated from RCA. Previously design director at a FTSE 100 fintech.' },
  { name: 'Marcus Webb', title: 'Head of Engineering', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format', bio: 'Full-stack engineer and engineering manager. Open-source contributor, 200+ stars on GitHub.' },
  { name: 'Sofia Patel', title: 'Director of Growth', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format', bio: 'Growth strategist. Built and scaled marketing functions at Series B through IPO.' },
  { name: 'Ravi Krishnan', title: 'Lead Solutions Architect', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format', bio: 'Cloud and infrastructure specialist. Certified AWS Solutions Architect. Ex-Deloitte.' },
]

const values = [
  { title: 'Honesty over comfort', body: "We tell clients what we actually think, not what they want to hear. If a brief isn't right, we say so and explain why before work starts." },
  { title: 'Senior input throughout', body: 'Every project has a named senior practitioner responsible for quality. We don\'t pitch with experienced people and deliver with juniors.' },
  { title: 'Outcomes over outputs', body: 'We measure success by business results, not deliverables shipped. A beautiful website that doesn\'t convert is a failure.' },
  { title: 'Long-term thinking', body: 'We build things to last and to evolve. Every decision is made with your next 24 months in mind, not just the immediate deadline.' },
]

const timeline = [
  { year: '2018', event: 'Founded in London with 4 people and 2 clients.' },
  { year: '2019', event: 'Expanded to design services. Grew to 12 people.' },
  { year: '2020', event: 'Launched remote capability. Delivered 40 projects.' },
  { year: '2021', event: 'Opened offices in Dubai and Toronto.' },
  { year: '2022', event: 'Crossed 100 projects delivered. Team reached 28 people.' },
  { year: '2023', event: 'Launched Nexahub Academy — training programme for junior engineers.' },
  { year: '2024', event: '34 team members. 18 countries served. 120+ projects completed.' },
]

export default function About({ onNavigate }: Props) {
  return (
    <div className="page-enter pt-24">
      {/* Hero */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp>
                <span className="tag mb-5 block w-fit">Our story</span>
                <h1 className="section-heading mb-6">
                  Built by practitioners,<br />not project managers
                </h1>
                <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
                  Nexahub started because we were tired of the same problem on both sides of the table. Clients frustrated by agencies that didn't understand their business. Practitioners frustrated by agencies that didn't let them do their best work.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  We built a different kind of company — one where senior people are directly responsible for client outcomes, where we say no to projects that aren't right for us, and where quality is non-negotiable rather than a budget line item.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '3/4', background: 'var(--muted)' }}>
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=533&fit=crop&auto=format" alt="Nexahub office" className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                </div>
                <div className="rounded-2xl overflow-hidden mt-8" style={{ aspectRatio: '3/4', background: 'var(--muted)' }}>
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=533&fit=crop&auto=format" alt="Team collaboration" className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad border-t" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp className="mb-14">
            <span className="tag mb-4 block w-fit">How we operate</span>
            <h2 className="section-heading">Four principles.<br />Non-negotiable.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.07}>
                <div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-5" style={{ background: 'rgba(91,158,244,0.1)', border: '1px solid rgba(91,158,244,0.2)' }}>
                    <span className="font-mono-data text-xs" style={{ color: 'var(--primary)' }}>0{i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-3">{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{v.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp className="mb-14">
            <span className="tag mb-4 block w-fit">Leadership</span>
            <h2 className="section-heading">People you'll actually<br />work with</h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.07}>
                <div
                  className="rounded-2xl border overflow-hidden card-hover"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <div className="relative overflow-hidden" style={{ height: '260px', background: '#141720' }}>
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" style={{ opacity: 0.9 }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, var(--img-overlay-b) 100%)' }} />
                    <div className="absolute bottom-0 left-0 p-5">
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--primary)' }}>{member.title}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{member.bio}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <span className="tag mb-5 block w-fit">History</span>
              <h2 className="section-heading mb-6">Six years of steady,<br />purposeful growth</h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                We've grown deliberately — never taking on more than we can do well, never expanding headcount faster than our culture can absorb, and never compromising on client quality for revenue.
              </p>
            </FadeUp>
            <div>
              {timeline.map((item, i) => (
                <FadeUp key={item.year} delay={i * 0.06}>
                  <div className="flex gap-6 pb-8 relative">
                    {i < timeline.length - 1 && (
                      <div className="absolute left-[22px] top-8 bottom-0 w-px" style={{ background: 'var(--border)' }} />
                    )}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-mono-data text-xs font-medium"
                      style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--primary)' }}
                    >
                      {item.year.slice(2)}
                    </div>
                    <div className="pt-2.5">
                      <p className="font-mono-data text-xs mb-1" style={{ color: 'var(--muted-foreground)' }}>{item.year}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>{item.event}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office image */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <FadeUp>
          <div className="rounded-2xl overflow-hidden relative" style={{ height: '400px', background: 'var(--muted)' }}>
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&h=600&fit=crop&auto=format"
              alt="Nexahub London office"
              className="w-full h-full object-cover"
              style={{ opacity: 0.7 }}
            />
            <div className="absolute inset-0 flex items-end p-10" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 60%)' }}>
              <div>
                <p className="text-2xl font-display mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>Our London studio</p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Shoreditch, East London — where most of us still like to work together in person.</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* CTA */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="section-heading mb-5">Work with us</h2>
            <p className="text-base mb-8" style={{ color: 'var(--muted-foreground)' }}>
              We're selective about who we work with — not to be exclusive, but to stay focused on projects where we can genuinely add value.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button onClick={() => onNavigate('contact')} className="btn btn-primary btn-lg">Start a conversation</button>
              <button onClick={() => onNavigate('portfolio')} className="btn btn-secondary btn-lg">See our work</button>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
