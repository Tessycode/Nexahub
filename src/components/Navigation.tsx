import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavProps {
  currentPage: string
  onNavigate: (page: string) => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const services = [
  { label: 'Website Development', page: 'services' },
  { label: 'Mobile Applications', page: 'services' },
  { label: 'UI/UX Design', page: 'services' },
  { label: 'Business Branding', page: 'services' },
  { label: 'Digital Marketing', page: 'services' },
  { label: 'Cloud Hosting', page: 'services' },
]

export default function Navigation({ currentPage, onNavigate, theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services', hasDropdown: true },
    { label: 'Work', page: 'portfolio' },
    { label: 'About', page: 'about' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur border-b' : 'bg-transparent'}`}
        style={{
          borderColor: scrolled ? 'var(--border)' : 'transparent',
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center h-[68px] gap-8">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 flex-shrink-0 mr-4">
            <img
              src="/src/imports/Nexahub_Logo.png"
              alt="Nexahub"
              className="h-32 w-auto"
              style={{
                filter: theme === 'dark'
                  ? 'brightness(1.1)'
                  : 'brightness(0) saturate(100%) invert(38%) sepia(90%) saturate(500%) hue-rotate(190deg) brightness(95%)',
              }}
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {navLinks.map(link => (
              <div
                key={link.page}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
              >
                <button
                  onClick={() => { onNavigate(link.page); setServicesOpen(false) }}
                  className="px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                  style={{ color: currentPage === link.page ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color = currentPage === link.page ? 'var(--foreground)' : 'var(--muted-foreground)')}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}>
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                {currentPage === link.page && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: 'var(--primary)' }}
                  />
                )}

                <AnimatePresence>
                  {link.hasDropdown && servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-60 rounded-xl border p-2 nav-blur"
                      style={{ background: 'var(--dropdown-bg)', borderColor: 'var(--border)', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}
                    >
                      {services.map(s => (
                        <button
                          key={s.label}
                          onClick={() => { onNavigate(s.page); setServicesOpen(false) }}
                          className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 block"
                          style={{ color: 'var(--muted-foreground)' }}
                          onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; e.currentTarget.style.background = 'var(--secondary)' }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted-foreground)'; e.currentTarget.style.background = 'transparent' }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(91,158,244,0.4)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'rgba(91,158,244,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted-foreground)'; e.currentTarget.style.background = 'transparent' }}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.span key="sun" initial={{ opacity: 0, rotate: -30 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 30 }} transition={{ duration: 0.2 }}>
                    <SunIcon />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ opacity: 0, rotate: 30 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -30 }} transition={{ duration: 0.2 }}>
                    <MoonIcon />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button onClick={() => onNavigate('login')} className="btn btn-ghost text-sm" style={{ padding: '0.5rem 1rem' }}>Sign In</button>
            <button onClick={() => onNavigate('register')} className="btn btn-primary text-sm" style={{ padding: '0.5625rem 1.25rem' }}>Get Started</button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="lg:hidden ml-auto flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-lg border flex items-center justify-center"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={`block h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} style={{ background: 'var(--foreground)' }} />
                <span className={`block h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} style={{ background: 'var(--foreground)' }} />
                <span className={`block h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} style={{ background: 'var(--foreground)' }} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-[68px] nav-blur lg:hidden"
            style={{ background: 'var(--nav-mobile-bg)' }}
          >
            <div className="p-6 flex flex-col gap-2">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { onNavigate(link.page); setMobileOpen(false) }}
                  className="text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors"
                  style={{ color: currentPage === link.page ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <button onClick={() => { onNavigate('login'); setMobileOpen(false) }} className="btn btn-secondary w-full">Sign In</button>
                <button onClick={() => { onNavigate('register'); setMobileOpen(false) }} className="btn btn-primary w-full">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}
