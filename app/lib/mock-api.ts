// app/lib/mock-api.ts
import { DashboardStats, Shipment, Driver } from '../types'

// Mock data
const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'LTK789456123',
    status: 'in_transit',
    origin: { 
      address: 'Warehouse A, NYC', 
      lat: 40.7128, 
      lng: -74.0060 
    },
    destination: { 
      address: 'Customer Location, Boston', 
      lat: 42.3601, 
      lng: -71.0589 
    },
    estimatedDelivery: new Date(Date.now() + 86400000),
    driverId: 'driver1',
    items: [{ 
      id: 'item1',
      name: 'Electronics Package', 
      quantity: 1, 
      weight: 5.2 
    }],
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
    priority: 'medium',
    totalWeight: 5.2,
    customer: {
      name: 'John Doe',
      phone: '+1234567890',
    },
    payment: {
      status: 'paid',
    },
  },
  {
    id: '2',
    trackingNumber: 'LTK987654321',
    status: 'out_for_delivery',
    origin: { 
      address: 'Distribution Center, LA', 
      lat: 34.0522, 
      lng: -118.2437 
    },
    destination: { 
      address: 'Office Building, San Francisco', 
      lat: 37.7749, 
      lng: -122.4194 
    },
    estimatedDelivery: new Date(Date.now() + 14400000),
    driverId: 'driver2',
    items: [{ 
      id: 'item2',
      name: 'Documents', 
      quantity: 1, 
      weight: 0.5 
    }],
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
    priority: 'high',
    totalWeight: 0.5,
    customer: {
      name: 'Jane Smith',
      phone: '+1987654321',
    },
    payment: {
      status: 'paid',
    },
  },
  {
    id: '3',
    trackingNumber: 'LTK456123789',
    status: 'delivered',
    origin: { 
      address: 'Warehouse B, Chicago', 
      lat: 41.8781, 
      lng: -87.6298 
    },
    destination: { 
      address: 'Residential, Miami', 
      lat: 25.7617, 
      lng: -80.1918 
    },
    estimatedDelivery: new Date(Date.now() - 43200000),
    driverId: 'driver3',
    items: [{ 
      id: 'item3',
      name: 'Furniture', 
      quantity: 2, 
      weight: 35.0 
    }],
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259200000),
    priority: 'medium',
    totalWeight: 35,
    customer: {
      name: 'Robert Johnson',
      phone: '+1555123456',
    },
    payment: {
      status: 'paid',
    },
  },
]

const mockDrivers: Driver[] = [
  {
    id: 'driver1',
    name: 'John Carter',
    contact: '+1 (234) 567-890',
    vehicle: { 
      type: 'van', 
      plate: 'ABC123', 
      capacity: 1000 
    },
    currentLocation: { 
      address: 'Route 95',
      lat: 41.8781, 
      lng: -73.4078 
    },
    status: 'on_duty',
    rating: 4.8,
    totalDeliveries: 1245,
    totalDistance: 12450,
    joinedDate: new Date('2023-01-15'),
    stats: {
      completedDeliveries: 1245,
      onTimeRate: 0.967,
      averageRating: 4.8
    }
  },
  {
    id: 'driver2',
    name: 'Sarah Miller',
    contact: '+1 (987) 654-321',
    vehicle: { 
      type: 'truck', 
      plate: 'XYZ789', 
      capacity: 5000 
    },
    currentLocation: { 
      address: 'Highway 101',
      lat: 37.3382, 
      lng: -121.8863 
    },
    status: 'delivering',
    rating: 4.9,
    totalDeliveries: 1890,
    totalDistance: 18900,
    joinedDate: new Date('2022-08-10'),
    stats: {
      completedDeliveries: 1890,
      onTimeRate: 0.982,
      averageRating: 4.9
    }
  },
  {
    id: 'driver3',
    name: 'Robert Chen',
    contact: '+1 (555) 123-456',
    vehicle: { 
      type: 'van', 
      plate: 'DEF456', 
      capacity: 800 
    },
    currentLocation: { 
      address: 'Miami Downtown',
      lat: 25.7617, 
      lng: -80.1918 
    },
    status: 'available',
    rating: 4.7,
    totalDeliveries: 956,
    totalDistance: 9560,
    joinedDate: new Date('2023-05-20'),
    stats: {
      completedDeliveries: 956,
      onTimeRate: 0.952,
      averageRating: 4.7
    }
  },
]

const mockDashboardStats: DashboardStats = {
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

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockAPI = {
  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(500) // Simulate network delay
    return mockDashboardStats
  },

  // Shipments
  getShipments: async (params?: {
    status?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
    search?: string
  }) => {
    await delay(300)
    
    let filteredShipments = [...mockShipments]
    
    // Apply filters
    if (params?.status && params.status !== 'all') {
      filteredShipments = filteredShipments.filter(s => s.status === params.status)
    }
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase()
      filteredShipments = filteredShipments.filter(s => 
        s.trackingNumber.toLowerCase().includes(searchLower) ||
        s.customer.name.toLowerCase().includes(searchLower) ||
        s.destination.address.toLowerCase().includes(searchLower)
      )
    }
    
    return {
      shipments: filteredShipments,
      total: filteredShipments.length,
      page: params?.page || 1,
      limit: params?.limit || 10,
      totalPages: Math.ceil(filteredShipments.length / (params?.limit || 10))
    }
  },

  getShipmentById: async (id: string) => {
    await delay(200)
    const shipment = mockShipments.find(s => s.id === id)
    if (!shipment) throw new Error('Shipment not found')
    return shipment
  },

  // Drivers
  getDrivers: async (params?: {
    status?: string
    vehicleType?: string
  }) => {
    await delay(300)
    
    let filteredDrivers = [...mockDrivers]
    
    if (params?.status) {
      filteredDrivers = filteredDrivers.filter(d => d.status === params.status)
    }
    
    return {
      drivers: filteredDrivers,
      total: filteredDrivers.length
    }
  },

  getDriverById: async (id: string) => {
    await delay(200)
    const driver = mockDrivers.find(d => d.id === id)
    if (!driver) throw new Error('Driver not found')
    return driver
  },

  // Analytics
  getDeliveryAnalytics: async (period: 'day' | 'week' | 'month' | 'year' = 'week') => {
    await delay(400)
    // Return mock analytics data
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      delivered: [42, 38, 45, 52, 48, 36, 41],
      inTransit: [18, 22, 19, 24, 21, 16, 20],
      delayed: [2, 1, 3, 1, 2, 4, 1],
      period
    }
  },

  // Export
  exportData: async (format: 'csv' | 'pdf' | 'excel', dataType: string, filters?: any) => {
    await delay(1000)
    // Return a mock blob
    const content = `Mock ${format.toUpperCase()} export for ${dataType}`
    return new Blob([content], { type: 'text/plain' })
  },
}