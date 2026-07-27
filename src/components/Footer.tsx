interface FooterProps {
  onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const columns = [
    {
      heading: 'Services',
      links: [
        { label: 'Website Development', page: 'services' },
        { label: 'Mobile Applications', page: 'services' },
        { label: 'UI/UX Design', page: 'services' },
        { label: 'Business Branding', page: 'services' },
        { label: 'Digital Marketing', page: 'services' },
        { label: 'SEO Optimisation', page: 'services' },
        { label: 'Cloud Hosting', page: 'services' },
        { label: 'Technology Consulting', page: 'services' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About Nexahub', page: 'about' },
        { label: 'Our Work', page: 'portfolio' },
        { label: 'Blog', page: 'blog' },
        { label: 'Careers', page: 'about' },
        { label: 'Press', page: 'about' },
        { label: 'Contact', page: 'contact' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Case Studies', page: 'portfolio' },
        { label: 'Documentation', page: 'blog' },
        { label: 'Design System', page: 'services' },
        { label: 'Support Centre', page: 'contact' },
        { label: 'Privacy Policy', page: 'home' },
        { label: 'Terms of Service', page: 'home' },
      ],
    },
  ]

  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={() => onNavigate('home')} className="mb-5 block">
              <img src="/src/imports/Nexahub_Logo.png" alt="Nexahub" className="h-7 w-auto" style={{ filter: 'brightness(1.1)' }} />
            </button>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--muted-foreground)' }}>
              We help businesses establish, grow and transform their digital presence — from initial strategy through to deployment and beyond.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {['twitter', 'linkedin', 'github', 'dribbble'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(91,158,244,0.3)'
                    e.currentTarget.style.color = 'var(--primary)'
                    e.currentTarget.style.background = 'rgba(91,158,244,0.06)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--muted-foreground)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {columns.map(col => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--muted-foreground)' }}>
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-sm animated-link transition-colors"
                      style={{ color: 'var(--muted-foreground)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            &copy; {new Date().getFullYear()} Nexahub Ltd. All rights reserved. Registered in England &amp; Wales.
          </p>
          <div className="flex items-center gap-1" style={{ color: 'var(--muted-foreground)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-1.5" />
            <span className="text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }: { name: string }) {
  const size = 14
  if (name === 'twitter') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  )
  if (name === 'linkedin') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
  if (name === 'github') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  )
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/>
    </svg>
  )
}
