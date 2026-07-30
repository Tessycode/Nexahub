import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { auth } from '../lib/api'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  full_name: string
  phone: string
  company: string
  role: string
  email_verified: boolean
  avatar_url: string | null
  date_joined: string
  last_login: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const data = await auth.me() as User
      setUser(data)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string, remember = false) => {
    const data = await auth.login({ email, password, remember }) as { user: User }
    setUser(data.user)
  }

  const logout = async () => {
    await auth.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export type { User, AuthContextType }
