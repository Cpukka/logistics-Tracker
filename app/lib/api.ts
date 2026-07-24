// lib/api.ts
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ============================================
// AUTH API METHODS
// ============================================
export const authAPI = {
  // Login
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  // Register
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password })
    return response.data
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  // Reset password
  resetPassword: async (token: string, password: string) => {
    const response = await api.post('/auth/reset-password', { token, password })
    return response.data
  },
}

// ============================================
// DASHBOARD API METHODS
// ============================================
export const dashboardAPI = {
  // Dashboard Stats
  getDashboardStats: async () => {
    const response = await api.get('/dashboard/stats')
    return response.data
  },

  // Shipments
  getShipments: async (params?: {
    status?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    limit?: number
  }) => {
    const response = await api.get('/shipments', { params })
    return response.data
  },

  getShipmentById: async (id: string) => {
    const response = await api.get(`/shipments/${id}`)
    return response.data
  },

  createShipment: async (data: any) => {
    const response = await api.post('/shipments', data)
    return response.data
  },

  updateShipment: async (id: string, data: any) => {
    const response = await api.put(`/shipments/${id}`, data)
    return response.data
  },

  deleteShipment: async (id: string) => {
    const response = await api.delete(`/shipments/${id}`)
    return response.data
  },

  // Drivers
  getDrivers: async () => {
    const response = await api.get('/drivers')
    return response.data
  },

  getDriverById: async (id: string) => {
    const response = await api.get(`/drivers/${id}`)
    return response.data
  },

  createDriver: async (data: any) => {
    const response = await api.post('/drivers', data)
    return response.data
  },

  updateDriver: async (id: string, data: any) => {
    const response = await api.put(`/drivers/${id}`, data)
    return response.data
  },

  // Analytics
  getDeliveryAnalytics: async (period: 'day' | 'week' | 'month' | 'year' = 'week') => {
    const response = await api.get('/analytics/deliveries', { params: { period } })
    return response.data
  },

  // Real-time
  subscribeToUpdates: async (channel: string) => {
    const response = await api.get(`/updates/${channel}`)
    return response.data
  },
}

// ============================================
// TYPES
// ============================================
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface DashboardStats {
  totalShipments: number
  activeShipments: number
  deliveredToday: number
  pendingPickups: number
  activeDrivers: number
  onTimeRate: number
  avgDeliveryTime: number
  routeEfficiency: number
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'dispatcher' | 'driver' | 'customer'
  avatar?: string
}

export interface AuthResponse {
  token: string
  user: User
}