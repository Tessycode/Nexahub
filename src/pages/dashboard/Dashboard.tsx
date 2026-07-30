import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { dashboard as dashboardApi, orders } from '../../lib/api'
import { useAuth } from '../../contexts/AuthContext'

interface Props { onNavigate: (page: string) => void }


type View = 'overview' | 'projects' | 'messages' | 'invoices' | 'profile'

const sideNav = [
  { id: 'overview' as View, label: 'Overview', icon: GridIcon },
  { id: 'projects' as View, label: 'My Projects', icon: FolderIcon },
  { id: 'messages' as View, label: 'Messages', icon: MessageIcon, badge: 2 },
  { id: 'invoices' as View, label: 'Invoices', icon: ReceiptIcon },
  { id: 'profile' as View, label: 'Profile', icon: UserIcon },
]

export default function Dashboard({ onNavigate }: Props) {
  const { user } = useAuth()
  const [view, setView] = useState<View>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Live data state
  const [trafficData, setTrafficData] = useState<any[]>([])
  const [conversionData, setConversionData] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [overview, setOverview] = useState<any>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      dashboardApi.trafficData(),
      dashboardApi.conversionData(),
      orders.projects(),
      orders.invoices(),
      dashboardApi.messages(),
      dashboardApi.overview(),
    ]).then(([traffic, conversion, projs, invs, msgs, ovw]: [any, any, any, any, any, any]) => {
      setTrafficData(Array.isArray(traffic) ? traffic : traffic.results ?? [])
      setConversionData(Array.isArray(conversion) ? conversion : conversion.results ?? [])
      const projList = Array.isArray(projs) ? projs : projs.results ?? []
      setProjects(projList.map((p: any) => ({
        id: p.reference_number ?? p.id,
        name: p.project_name ?? p.name,
        status: p.status_display ?? p.status ?? 'Active',
        progress: p.progress_percentage ?? 0,
        due: p.deadline ? new Date(p.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBD',
        lead: p.assigned_to ?? 'Nexahub Team',
      })))
      const invList = Array.isArray(invs) ? invs : invs.results ?? []
      setInvoices(invList.map((inv: any) => ({
        id: inv.invoice_number ?? inv.id,
        desc: inv.description ?? inv.title ?? '',
        amount: inv.amount ? `£${Number(inv.amount).toLocaleString()}` : '£0',
        due: inv.due_date ? new Date(inv.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
        status: inv.status_display ?? inv.status ?? 'Pending',
      })))
      const msgList = Array.isArray(msgs) ? msgs : msgs.results ?? []
      const unread = msgList.filter((m: any) => !m.is_read && !m.read_at).length
      setUnreadCount(unread)
      setMessages(msgList.map((m: any) => ({
        from: m.sender_name ?? m.sender ?? 'Nexahub',
        role: m.sender_role ?? '',
        avatar: m.sender_avatar ?? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
        preview: m.body ?? m.preview ?? '',
        time: m.created_at ? new Date(m.created_at).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }) : '',
        unread: !m.is_read,
      })))
      setOverview(ovw)
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  // Dynamic badge for messages nav item
  const sideNavResolved = sideNav.map(item =>
    item.id === 'messages' ? { ...item, badge: unreadCount } : item
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <div className="w-10 h-10 border-2 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Loading your dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 flex flex-col border-r transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
      >
        {/* Logo */}
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <button onClick={() => onNavigate('home')}>
            <img src="/src/imports/Nexahub_Logo.png" alt="Nexahub" className="h-6 w-auto" style={{ filter: 'brightness(1.1)' }} />
          </button>
          <span className="tag text-xs">Client Portal</span>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              {user?.avatar_url
                ? <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>{user?.first_name?.[0] ?? 'U'}</div>
              }
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user?.full_name ?? 'Loading…'}</p>
              <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>{user?.company ?? 'Client'}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <p className="text-xs uppercase tracking-widest px-3 mb-2" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>Portal</p>
          <div className="flex flex-col gap-0.5">
            {sideNavResolved.map(item => (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setSidebarOpen(false) }}
                className={`sidebar-link ${view === item.id ? 'active' : ''}`}
              >
                <item.icon />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs uppercase tracking-widest px-3 mb-2" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>Support</p>
            <button className="sidebar-link w-full">
              <HelpIcon />
              <span>Support Centre</span>
            </button>
          </div>
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <button onClick={() => onNavigate('home')} className="sidebar-link w-full text-left">
            <LogOutIcon />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b flex items-center justify-between px-6 h-14 nav-blur" style={{ borderColor: 'var(--border)', background: 'var(--nav-bg)' }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1" onClick={() => setSidebarOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <h1 className="text-sm font-semibold capitalize">{view === 'overview' ? 'Dashboard' : view.replace('-', ' ')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-lg transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }} />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              {user?.avatar_url
                ? <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>{user?.first_name?.[0] ?? 'U'}</div>
              }
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {view === 'overview' && <Overview trafficData={trafficData} conversionData={conversionData} projects={projects} invoices={invoices} messages={messages} overview={overview} user={user} />}
              {view === 'projects' && <Projects projects={projects} />}
              {view === 'messages' && <Messages messages={messages} />}
              {view === 'invoices' && <Invoices invoices={invoices} />}
              {view === 'profile' && <Profile user={user} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function Overview({ trafficData, conversionData, projects, invoices, messages, overview, user }: { trafficData: any[]; conversionData: any[]; projects: any[]; invoices: any[]; messages: any[]; overview: any; user: any }) {

  const stats = [
    { label: 'Active projects', value: String(overview?.active_projects_count ?? projects.length), change: 'Current quarter', up: true },
    { label: 'Open invoices', value: overview?.unpaid_invoices_amount ? `£${Number(overview.unpaid_invoices_amount).toLocaleString()}` : (invoices[0]?.amount ?? '£0'), change: 'Outstanding balance', up: false, warn: true },
    { label: 'Unread messages', value: String(overview?.unread_messages_count ?? messages.filter((m: any) => m.unread).length), change: 'Requires response', up: true },
    { label: 'Website traffic', value: '7,200', change: '+22% vs last month', up: true },
  ]

  const customTooltipStyle = {
    background: '#0E1018',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#EEF0F8',
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-1">Good morning, {user?.first_name ?? 'Client'}</h2>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Here's what's happening across your projects.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="rounded-xl border p-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</p>
            <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'DM Serif Display, serif' }}>{stat.value}</p>
            <p className="text-xs flex items-center gap-1" style={{ color: stat.warn ? '#F59E0B' : stat.up ? '#10B981' : 'var(--muted-foreground)' }}>
              {stat.up && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 rounded-xl border p-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-semibold">Website traffic</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Visits and leads, last 6 months</p>
            </div>
            <span className="tag text-xs">Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B9EF4" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#5B9EF4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7C87A0' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7C87A0' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={customTooltipStyle} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
              <Area type="monotone" dataKey="visits" stroke="#5B9EF4" strokeWidth={2} fill="url(#visitGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border p-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="mb-5">
            <p className="text-sm font-semibold">Lead conversion</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Rate by week, Jan 2025</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#7C87A0' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7C87A0' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="rate" fill="#5B9EF4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projects + Messages */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm font-semibold">Active projects</p>
            <span className="tag text-xs">{projects.length} projects</span>
          </div>
          <div>
            {projects.map((p) => (
              <div key={p.id} className="px-5 py-4 flex flex-col gap-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Lead: {p.lead} · Due {p.due}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Progress</span>
                    <span className="text-xs font-medium">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--muted)' }}>
                    <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${p.progress}%`, background: 'var(--primary)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm font-semibold">Recent messages</p>
            <span className="tag accent text-xs">2 unread</span>
          </div>
          <div>
            {messages.map((msg, i) => (
              <div key={i} className="px-5 py-4 border-b last:border-0 cursor-pointer group transition-colors" style={{ borderColor: 'var(--border)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img src={msg.avatar} alt={msg.from} className="w-9 h-9 rounded-full object-cover" />
                    {msg.unread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: 'var(--primary)', border: '2px solid var(--card)' }} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm ${msg.unread ? 'font-semibold' : 'font-medium'}`}>{msg.from}</p>
                      <p className="text-xs flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>{msg.time}</p>
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--muted-foreground)' }}>{msg.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects({ projects }: { projects: any[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-1">My Projects</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>All active and completed projects</p>
        </div>
        <button className="btn btn-secondary text-sm" style={{ padding: '0.5rem 1rem' }}>Request new project</button>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: 'var(--border)' }}>
                {['Project', 'Status', 'Lead', 'Progress', 'Due Date'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-xs font-semibold" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...projects, {
                id: 'PRJ-000', name: 'Brand Identity Refresh', status: 'Completed', progress: 100, due: 'Dec 15, 2024', lead: 'Lin Zhao'
              }].map(p => (
                <tr key={p.id} className="border-b last:border-0 transition-colors" style={{ borderColor: 'var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="px-5 py-4">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>{p.id}</p>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>{p.lead}</td>
                  <td className="px-5 py-4" style={{ minWidth: '140px' }}>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--muted)' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${p.progress}%`, background: p.progress === 100 ? '#10B981' : 'var(--primary)' }} />
                      </div>
                      <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>{p.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Messages({ messages }: { messages: any[] }) {
  const [activeMsg, setActiveMsg] = useState(0)
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-1">Messages</h2>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Direct communication with your Nexahub team</p>
      </div>
      <div className="rounded-xl border overflow-hidden grid md:grid-cols-3" style={{ background: 'var(--card)', borderColor: 'var(--border)', minHeight: '500px' }}>
        <div className="border-r" style={{ borderColor: 'var(--border)' }}>
          {messages.map((msg, i) => (
            <button key={i} onClick={() => setActiveMsg(i)} className="w-full text-left px-4 py-4 border-b last:border-0 transition-colors" style={{ borderColor: 'var(--border)', background: activeMsg === i ? 'var(--secondary)' : 'transparent' }}>
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <img src={msg.avatar} alt={msg.from} className="w-9 h-9 rounded-full object-cover" />
                  {msg.unread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: 'var(--primary)', border: '2px solid var(--card)' }} />}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm ${msg.unread ? 'font-semibold' : 'font-medium'}`}>{msg.from}</p>
                  <p className="text-xs truncate mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{msg.preview}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{msg.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="md:col-span-2 flex flex-col p-6">
          {messages[activeMsg] ? (
            <>
              <div className="flex items-center gap-3 pb-5 border-b mb-5" style={{ borderColor: 'var(--border)' }}>
                <img src={messages[activeMsg].avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm">{messages[activeMsg].from}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{messages[activeMsg].role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--muted-foreground)' }}>{messages[activeMsg].preview}</p>
              <div className="flex gap-2">
                <input className="input-base text-sm flex-1" placeholder="Type a reply…" />
                <button className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }}>Send</button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
              No message selected or available.
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

function Invoices({ invoices }: { invoices: any[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-1">Invoices</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Billing history and outstanding invoices</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total invoiced', value: '£19,700', note: 'All time' },
          { label: 'Outstanding', value: '£4,200', note: 'Due Jan 30', warn: true },
          { label: 'Paid this year', value: '£15,500', note: 'Jan 2025' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border p-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>{s.label}</p>
            <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'DM Serif Display, serif', color: s.warn ? '#F59E0B' : 'var(--foreground)' }}>{s.value}</p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{s.note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                {['Invoice', 'Description', 'Amount', 'Due Date', 'Status', ''].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-5 py-4 font-mono-data text-xs" style={{ color: 'var(--muted-foreground)' }}>{inv.id}</td>
                  <td className="px-5 py-4 text-sm">{inv.desc}</td>
                  <td className="px-5 py-4 font-semibold text-sm">{inv.amount}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>{inv.due}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{
                      background: inv.status === 'Paid' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                      color: inv.status === 'Paid' ? '#10B981' : '#F59E0B',
                    }}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-xs" style={{ color: 'var(--primary)' }}>Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Profile({ user }: { user: any }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-1">Profile</h2>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Manage your personal and company information</p>
      </div>

      <div className="rounded-xl border overflow-hidden mb-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="h-28" style={{ background: 'linear-gradient(135deg, #0d1829 0%, #1a2d55 100%)' }} />
        <div className="px-6 pb-6">
          <div className="-mt-10 mb-4 flex items-end justify-between">
            <div className="relative">
              {user?.avatar_url
                ? <img src={user.avatar_url} alt="" className="w-20 h-20 rounded-full object-cover border-4" style={{ borderColor: 'var(--card)' }} />
                : <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold border-4" style={{ borderColor: 'var(--card)', background: 'var(--primary)', color: 'var(--primary-foreground)' }}>{user?.first_name?.[0] ?? 'U'}</div>
              }
            </div>
          </div>
          <p className="font-semibold">{user?.full_name ?? 'User'}</p>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{user?.role ?? 'Client'} · {user?.company ?? 'N/A'}</p>
        </div>
      </div>

      <div className="rounded-xl border p-6 mb-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <h3 className="text-sm font-semibold mb-5">Personal information</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'First name', value: user?.first_name ?? '' },
            { label: 'Last name', value: user?.last_name ?? '' },
            { label: 'Email', value: user?.email ?? '' },
            { label: 'Phone', value: user?.phone ?? '' },
          ].map(field => (
            <div key={field.label}>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--muted-foreground)' }}>{field.label}</label>
              <input className="input-base text-sm" defaultValue={field.value} />
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-5 text-sm" style={{ padding: '0.625rem 1.25rem' }}>Save changes</button>
      </div>

      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <h3 className="text-sm font-semibold mb-2">Security</h3>
        <p className="text-xs mb-5" style={{ color: 'var(--muted-foreground)' }}>Last sign in: Today at 09:14 · London, UK</p>
        <div className="flex flex-col gap-3">
          <button className="btn btn-secondary text-sm text-left justify-start" style={{ padding: '0.75rem 1rem' }}>Change password</button>
          <button className="btn btn-secondary text-sm text-left justify-start" style={{ padding: '0.75rem 1rem' }}>Enable two-factor authentication</button>
          <button className="btn btn-secondary text-sm text-left justify-start" style={{ padding: '0.75rem 1rem' }}>View active sessions</button>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; color: string }> = {
    'In Progress': { bg: 'rgba(91,158,244,0.1)', color: '#5B9EF4' },
    'Review': { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
    'Active': { bg: 'rgba(16,185,129,0.1)', color: '#10B981' },
    'Completed': { bg: 'rgba(107,114,128,0.1)', color: '#9CA3AF' },
  }
  const c = config[status] || config['Active']
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: c.bg, color: c.color }}>
      {status}
    </span>
  )
}

// Icons
function GridIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> }
function FolderIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg> }
function MessageIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> }
function ReceiptIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg> }
function UserIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function HelpIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg> }
function LogOutIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> }

