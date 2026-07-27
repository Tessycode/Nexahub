import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/dashboard/Dashboard'

type Page =
  | 'home' | 'services' | 'about' | 'portfolio' | 'contact' | 'blog'
  | `blog-post-${string}`
  | 'login' | 'register' | 'forgot-password'
  | 'dashboard'

const NO_CHROME_PAGES = ['login', 'register', 'forgot-password', 'dashboard']

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const navigate = (p: string) => {
    setPage(p as Page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const basePageKey = page.startsWith('blog-post-') ? 'blog-post' : page
  const showChrome = !NO_CHROME_PAGES.some(p => page === p)

  const blogPostSlug = page.startsWith('blog-post-') ? page.replace('blog-post-', '') : null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
      {showChrome && (
        <Navigation
          currentPage={page.startsWith('blog-post-') ? 'blog' : page}
          onNavigate={navigate}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={basePageKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {page === 'home' && <Home onNavigate={navigate} theme={theme} />}
          {page === 'services' && <Services onNavigate={navigate} />}
          {page === 'about' && <About onNavigate={navigate} />}
          {page === 'portfolio' && <Portfolio onNavigate={navigate} />}
          {page === 'contact' && <Contact onNavigate={navigate} />}
          {page === 'blog' && <Blog onNavigate={navigate} />}
          {blogPostSlug && <BlogPost slug={blogPostSlug} onNavigate={navigate} />}
          {page === 'login' && <Login onNavigate={navigate} />}
          {page === 'register' && <Register onNavigate={navigate} />}
          {page === 'forgot-password' && <ForgotPassword onNavigate={navigate} />}
          {page === 'dashboard' && <Dashboard onNavigate={navigate} />}
        </motion.div>
      </AnimatePresence>

      {showChrome && <Footer onNavigate={navigate} />}
    </div>
  )
}
