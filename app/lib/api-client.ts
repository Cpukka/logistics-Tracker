// app/lib/api-client.ts - Temporary fix
import { DashboardStats } from '../types'

// Mock data
const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalShipments: 156,
  activeShipments: 24,
  deliveredToday: 42,
  pendingPickups: 18,
  activeDrivers: 8,
  onTimeRate: 96.7,
  avgDeliveryTime: 2.4,
  routeEfficiency: 89,
  revenueToday: 12450,
  customerSatisfaction: 4.8,
}

// Mock API that doesn't make network calls
export const api = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_DASHBOARD_STATS
  },

  getShipments: async (params?: any) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return { shipments: [], total: 0 }
  },

  getDrivers: async (params?: any) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return { drivers: [], total: 0 }
  },

  exportData: async (format: 'csv' | 'pdf' | 'excel', dataType: string, filters?: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return new Blob(['Mock export data'], { type: 'text/plain' })
  },
}

export type { DashboardStats }