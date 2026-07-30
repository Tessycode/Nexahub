/**
 * Nexahub API Client
 *
 * Centralized fetch wrapper that:
 * - Uses a relative /api/v1 path in dev (Vite proxy forwards to Django :8000)
 * - Reads the CSRF token from the cookie Django sets
 * - Sends credentials (session cookie) with every request
 * - Handles JSON parsing and error normalization
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api/v1'

/** Read the Django CSRF cookie value */
function getCsrfToken(): string {
  const match = document.cookie.match(/csrftoken=([^;]+)/)
  return match ? match[1] : ''
}

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: unknown
  multipart?: boolean
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
}

export async function apiRequest<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { method = 'GET', body, multipart = false } = options

  const headers: Record<string, string> = {
    'X-CSRFToken': getCsrfToken(),
  }

  if (!multipart) {
    headers['Content-Type'] = 'application/json'
  }

  const config: RequestInit = {
    method,
    credentials: 'include',
    headers,
  }

  if (body !== undefined) {
    config.body = multipart ? (body as FormData) : JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE}${path}`, config)

  if (!response.ok) {
    let errorData: Record<string, unknown> = {}
    try {
      errorData = await response.json()
    } catch {
      // non-JSON error body
    }

    // Flatten DRF validation errors into a single message
    const message =
      (errorData.detail as string) ||
      (errorData.error as string) ||
      Object.values(errorData)
        .flat()
        .filter((v) => typeof v === 'string')
        .join(' ') ||
      `Request failed (${response.status})`

    const err: ApiError = { message, errors: errorData as Record<string, string[]>, status: response.status }
    throw err
  }

  if (response.status === 204) return undefined as T

  return response.json() as Promise<T>
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export const auth = {
  register: (data: {
    first_name: string
    last_name: string
    email: string
    phone?: string
    company?: string
    password: string
    confirm_password: string
    terms: boolean
  }) => apiRequest('/auth/register/', { method: 'POST', body: data }),

  login: (data: { email: string; password: string; remember?: boolean }) =>
    apiRequest('/auth/login/', { method: 'POST', body: data }),

  logout: () => apiRequest('/auth/logout/', { method: 'POST' }),

  forgotPassword: (email: string) =>
    apiRequest('/auth/forgot-password/', { method: 'POST', body: { email } }),

  resetPassword: (data: { token: string; new_password: string; confirm_new_password: string }) =>
    apiRequest('/auth/reset-password/', { method: 'POST', body: data }),

  me: () => apiRequest('/auth/me/'),

  updateProfile: (data: Partial<{
    first_name: string
    last_name: string
    phone: string
    company: string
    bio: string
    job_title: string
    timezone: string
  }>) => apiRequest('/auth/me/', { method: 'PATCH', body: data }),

  changePassword: (data: {
    current_password: string
    new_password: string
    confirm_new_password: string
  }) => apiRequest('/auth/change-password/', { method: 'POST', body: data }),

  uploadAvatar: (file: File) => {
    const form = new FormData()
    form.append('avatar', file)
    return apiRequest('/auth/me/avatar/', { method: 'POST', body: form, multipart: true })
  },
}

// ── Core ─────────────────────────────────────────────────────────────────────

export const core = {
  company: () => apiRequest('/company/'),
  team: () => apiRequest('/team/'),
  statistics: () => apiRequest('/statistics/'),
  testimonials: () => apiRequest('/testimonials/'),
  offices: () => apiRequest('/offices/'),
  faqs: (category?: string) => apiRequest(`/faqs/${category ? `?category=${category}` : ''}`),
  newsletterSubscribe: (email: string) =>
    apiRequest('/newsletter/subscribe/', { method: 'POST', body: { email } }),
}

// ── Services ──────────────────────────────────────────────────────────────────

export const services = {
  list: (category?: string) =>
    apiRequest(`/services/${category ? `?category=${category}` : ''}`),
  detail: (serviceId: string) => apiRequest(`/services/${serviceId}/`),
  categories: () => apiRequest('/services/categories/'),
}

// ── Portfolio ─────────────────────────────────────────────────────────────────

export const portfolio = {
  list: (category?: string) =>
    apiRequest(`/portfolio/${category ? `?category=${category}` : ''}`),
  detail: (projectId: string) => apiRequest(`/portfolio/${projectId}/`),
  categories: () => apiRequest('/portfolio/categories/'),
}

// ── Pricing ───────────────────────────────────────────────────────────────────

export const pricing = {
  plans: () => apiRequest('/pricing/'),
}

// ── Blog ──────────────────────────────────────────────────────────────────────

export const blog = {
  posts: (params?: { category?: string; tag?: string; search?: string; page?: number }) => {
    const qs = new URLSearchParams()
    if (params?.category) qs.set('category', params.category)
    if (params?.tag) qs.set('tag', params.tag)
    if (params?.search) qs.set('search', params.search)
    if (params?.page) qs.set('page', String(params.page))
    return apiRequest(`/blog/posts/${qs.toString() ? `?${qs}` : ''}`)
  },
  post: (slug: string) => apiRequest(`/blog/posts/${slug}/`),
  related: (slug: string) => apiRequest(`/blog/posts/${slug}/related/`),
  categories: () => apiRequest('/blog/categories/'),
  tags: () => apiRequest('/blog/tags/'),
  addComment: (slug: string, content: string) =>
    apiRequest(`/blog/posts/${slug}/comments/`, { method: 'POST', body: { content } }),
}

// ── Contact ───────────────────────────────────────────────────────────────────

export const contact = {
  enquiry: (data: {
    first_name: string
    last_name: string
    company?: string
    email: string
    phone?: string
    service_interest?: string
    budget_range?: string
    message: string
  }) => apiRequest('/contact/enquiry/', { method: 'POST', body: data }),
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export const dashboard = {
  overview: () => apiRequest('/dashboard/overview/'),
  notifications: () => apiRequest('/dashboard/notifications/'),
  markNotificationRead: (id: number) =>
    apiRequest(`/dashboard/notifications/${id}/read/`, { method: 'PATCH' }),
  messages: () => apiRequest('/dashboard/messages/'),
  sendMessage: (data: { recipient_email: string; subject?: string; body: string }) =>
    apiRequest('/dashboard/messages/send/', { method: 'POST', body: data }),
  markMessageRead: (id: number) =>
    apiRequest(`/dashboard/messages/${id}/read/`, { method: 'PATCH' }),
  settings: () => apiRequest('/dashboard/settings/'),
  updateSettings: (data: Partial<{
    theme_preference: string
    email_notifications: boolean
    sms_notifications: boolean
  }>) => apiRequest('/dashboard/settings/', { method: 'PATCH', body: data }),
  trafficData: () => apiRequest('/dashboard/analytics/traffic/'),
  conversionData: () => apiRequest('/dashboard/analytics/conversion/'),
}

// ── Orders ────────────────────────────────────────────────────────────────────

export const orders = {
  projects: () => apiRequest('/orders/projects/'),
  project: (id: number) => apiRequest(`/orders/projects/${id}/`),
  requestProject: (data: { project_name: string; service_name?: string; notes?: string }) =>
    apiRequest('/orders/projects/request/', { method: 'POST', body: data }),
  invoices: () => apiRequest('/orders/invoices/'),
  invoice: (id: number) => apiRequest(`/orders/invoices/${id}/`),
}
