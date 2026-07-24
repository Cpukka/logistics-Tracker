'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  MapPin, 
  TrendingUp,
  AlertCircle,
  Users,
  Route,
  Search,
  RefreshCw,
  Download,
  Activity,
  Loader2,
  BarChart3,
  Zap,
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Calendar,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Percent,
  Shield,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react'
import { LiveMap } from '../components/maps/LiveMap'
import { StatsCards } from '../components/analytics/StatsCards'
import { ShipmentCard } from '../components/tracking/ShipmentCard'
import { DeliveryChart } from '../components/analytics/DeliveryChart'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Shipment, Driver } from '../types'
import { ActivityFeed } from '../components/activity/ActivityFeed'
import { ShipmentDetailsModal } from '../components/modals/ShipmentDetailsModal'
import { DriverDetailsModal } from '../components/modals/DriverDetailsModal'
import { Input } from '../components/ui/Input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs'
import { Badge } from '../components/ui/Badge'

// Inline mock data
const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'LTK789456123',
    status: 'in_transit',
    origin: { address: 'Warehouse A, NYC', lat: 40.7128, lng: -74.0060 },
    destination: { address: 'Customer Location, Boston', lat: 42.3601, lng: -71.0589 },
    estimatedDelivery: new Date(Date.now() + 86400000),
    driverId: 'driver1',
    items: [{ id: 'item1', name: 'Electronics Package', quantity: 1, weight: 5.2 }],
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
    priority: 'medium',
    totalWeight: 5.2,
    customer: { name: 'John Doe', phone: '+1234567890', email: 'john@example.com' },
    payment: { status: 'paid' },
  },
  {
    id: '2',
    trackingNumber: 'LTK987654321',
    status: 'out_for_delivery',
    origin: { address: 'Distribution Center, LA', lat: 34.0522, lng: -118.2437 },
    destination: { address: 'Office Building, San Francisco', lat: 37.7749, lng: -122.4194 },
    estimatedDelivery: new Date(Date.now() + 14400000),
    driverId: 'driver2',
    items: [{ id: 'item2', name: 'Documents', quantity: 1, weight: 0.5 }],
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
    priority: 'high',
    totalWeight: 0.5,
    customer: { name: 'Jane Smith', phone: '+1987654321', email: 'jane@example.com' },
    payment: { status: 'paid' },
  },
  {
    id: '3',
    trackingNumber: 'LTK456123789',
    status: 'delivered',
    origin: { address: 'Warehouse B, Chicago', lat: 41.8781, lng: -87.6298 },
    destination: { address: 'Residential, Miami', lat: 25.7617, lng: -80.1918 },
    estimatedDelivery: new Date(Date.now() - 43200000),
    driverId: 'driver3',
    items: [{ id: 'item3', name: 'Furniture', quantity: 2, weight: 35.0 }],
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259200000),
    priority: 'medium',
    totalWeight: 35,
    customer: { name: 'Robert Johnson', phone: '+1555123456', email: 'robert@example.com' },
    payment: { status: 'paid' },
  },
  {
    id: '4',
    trackingNumber: 'LTK321654987',
    status: 'pending',
    origin: { address: 'Warehouse C, Seattle', lat: 47.6062, lng: -122.3321 },
    destination: { address: 'Tech Office, Portland', lat: 45.5152, lng: -122.6784 },
    estimatedDelivery: new Date(Date.now() + 172800000),
    driverId: 'driver1',
    items: [{ id: 'item4', name: 'Medical Supplies', quantity: 3, weight: 12.5 }],
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
    priority: 'urgent',
    totalWeight: 12.5,
    customer: { name: 'Medical Corp Inc', phone: '+18885551234', email: 'contact@medicalcorp.com' },
    payment: { status: 'paid' },
  },
  {
    id: '5',
    trackingNumber: 'LTK654987321',
    status: 'delayed',
    origin: { address: 'Distribution Center, Dallas', lat: 32.7767, lng: -96.7970 },
    destination: { address: 'Retail Store, Houston', lat: 29.7604, lng: -95.3698 },
    estimatedDelivery: new Date(Date.now() + 43200000),
    driverId: 'driver3',
    items: [{ id: 'item5', name: 'Clothing Inventory', quantity: 5, weight: 25.0 }],
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 345600000),
    priority: 'medium',
    totalWeight: 25,
    customer: { name: 'Fashion Retail Co', phone: '+12815551234', email: 'orders@fashion.com' },
    payment: { status: 'paid' },
  },
]

const MOCK_DRIVERS: Driver[] = [
  {
    id: 'driver1',
    name: 'John Carter',
    contact: '+1 (234) 567-890',
    vehicle: { type: 'van', plate: 'ABC123', capacity: 1000 },
    currentLocation: { address: 'Route 95, NYC', lat: 40.7128 + (Math.random() * 0.1 - 0.05), lng: -74.0060 + (Math.random() * 0.1 - 0.05) },
    status: 'on_duty',
    rating: 4.8,
    totalDeliveries: 1245,
    totalDistance: 12450,
    joinedDate: new Date('2023-01-15'),
    stats: { completedDeliveries: 1245, onTimeRate: 0.967, averageRating: 4.8 }
  },
  {
    id: 'driver2',
    name: 'Sarah Miller',
    contact: '+1 (987) 654-321',
    vehicle: { type: 'truck', plate: 'XYZ789', capacity: 5000 },
    currentLocation: { address: 'Highway 101, CA', lat: 37.3382 + (Math.random() * 0.1 - 0.05), lng: -121.8863 + (Math.random() * 0.1 - 0.05) },
    status: 'delivering',
    rating: 4.9,
    totalDeliveries: 1890,
    totalDistance: 18900,
    joinedDate: new Date('2022-08-10'),
    stats: { completedDeliveries: 1890, onTimeRate: 0.982, averageRating: 4.9 }
  },
  {
    id: 'driver3',
    name: 'Robert Chen',
    contact: '+1 (555) 123-456',
    vehicle: { type: 'van', plate: 'DEF456', capacity: 800 },
    currentLocation: { address: 'Miami Downtown, FL', lat: 25.7617 + (Math.random() * 0.1 - 0.05), lng: -80.1918 + (Math.random() * 0.1 - 0.05) },
    status: 'available',
    rating: 4.7,
    totalDeliveries: 956,
    totalDistance: 9560,
    joinedDate: new Date('2023-05-20'),
    stats: { completedDeliveries: 956, onTimeRate: 0.952, averageRating: 4.7 }
  },
  {
    id: 'driver4',
    name: 'Maria Garcia',
    contact: '+1 (333) 444-555',
    vehicle: { type: 'truck', plate: 'GHI789', capacity: 3000 },
    currentLocation: { address: 'Chicago Loop, IL', lat: 41.8781 + (Math.random() * 0.1 - 0.05), lng: -87.6298 + (Math.random() * 0.1 - 0.05) },
    status: 'off_duty',
    rating: 4.6,
    totalDeliveries: 780,
    totalDistance: 7800,
    joinedDate: new Date('2023-08-15'),
    stats: { completedDeliveries: 780, onTimeRate: 0.941, averageRating: 4.6 }
  },
]

export default function DashboardHome() {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS)
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS)
  const [showFilters, setShowFilters] = useState(false)

  // Derived statistics
  const stats = useMemo(() => {
    const total = shipments.length
    const delivered = shipments.filter(s => s.status === 'delivered').length
    const inTransit = shipments.filter(s => s.status === 'in_transit' || s.status === 'out_for_delivery').length
    const pending = shipments.filter(s => s.status === 'pending').length
    const delayed = shipments.filter(s => s.status === 'delayed').length
    const onTimeRate = total > 0 ? Math.round((delivered / total) * 100) : 0
    const totalWeight = shipments.reduce((sum, s) => sum + s.totalWeight, 0)
    const avgDeliveryTime = 2.4 // Mock value
    
    return { total, delivered, inTransit, pending, delayed, onTimeRate, totalWeight, avgDeliveryTime }
  }, [shipments])

  // Filter shipments based on search and status
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = searchQuery === '' || 
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    
    setTimeout(() => {
      setDrivers(prev => prev.map(driver => ({
        ...driver,
        currentLocation: {
          ...driver.currentLocation,
          lat: driver.currentLocation.lat + (Math.random() * 0.02 - 0.01),
          lng: driver.currentLocation.lng + (Math.random() * 0.02 - 0.01)
        }
      })))
      
      toast.success('Dashboard refreshed successfully')
      setIsRefreshing(false)
    }, 800)
  }

  // Handle export
  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    try {
      toast.loading(`Exporting data as ${format.toUpperCase()}...`)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const content = `TrackingNumber,Status,Customer,Destination\n` +
        shipments.map(s => `${s.trackingNumber},${s.status},${s.customer.name},${s.destination.address}`).join('\n')
      
      const blob = new Blob([content], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `shipments-export-${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('Export completed successfully')
    } catch (error) {
      toast.error('Failed to export data')
      console.error('Export error:', error)
    }
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setDrivers(prev => {
          const randomIndex = Math.floor(Math.random() * prev.length)
          const updatedDrivers = [...prev]
          updatedDrivers[randomIndex] = {
            ...updatedDrivers[randomIndex],
            currentLocation: {
              ...updatedDrivers[randomIndex].currentLocation,
              lat: updatedDrivers[randomIndex].currentLocation.lat + (Math.random() * 0.01 - 0.005),
              lng: updatedDrivers[randomIndex].currentLocation.lng + (Math.random() * 0.01 - 0.005)
            }
          }
          return updatedDrivers
        })
      }
      
      if (Math.random() > 0.8) {
        const statuses: Array<Shipment['status']> = ['in_transit', 'out_for_delivery', 'delivered']
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        
        setShipments(prev => {
          const inTransitShipments = prev.filter(s => s.status === 'in_transit' || s.status === 'out_for_delivery')
          if (inTransitShipments.length > 0) {
            const randomShipment = inTransitShipments[Math.floor(Math.random() * inTransitShipments.length)]
            const updatedShipments = prev.map(s => 
              s.id === randomShipment.id 
                ? { ...s, status: randomStatus, updatedAt: new Date() }
                : s
            )
            
            if (randomStatus === 'delivered') {
              toast.success(`✅ Shipment ${randomShipment.trackingNumber} delivered!`)
            }
            
            return updatedShipments
          }
          return prev
        })
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            Loading Dashboard
          </h2>
          <p className="text-muted-foreground">
            Preparing your logistics dashboard...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                LogiTrack Dashboard
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground mt-2 text-lg"
              >
                Real-time tracking and intelligent logistics management
              </motion.p>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
              {/* Quick Stats */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-medium text-muted-foreground">Live</span>
                </div>
                <div className="h-4 w-px bg-border"></div>
                <div className="flex items-center gap-1">
                  <Package className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium">{stats.inTransit} active</span>
                </div>
                <div className="h-4 w-px bg-border"></div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium">{drivers.filter(d => d.status === 'on_duty' || d.status === 'delivering').length} drivers</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2 shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search shipments, tracking numbers, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-background border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 shrink-0"
            >
              <Filter className="w-4 h-4" />
              Filters
              {statusFilter !== 'all' && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {statusFilter}
                </Badge>
              )}
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-muted/30 rounded-lg border border-border"
              >
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      statusFilter === 'all' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    All
                  </button>
                  {['pending', 'in_transit', 'out_for_delivery', 'delivered', 'delayed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors capitalize ${
                        statusFilter === status 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <StatsCards shipments={shipments} drivers={drivers} />
        </motion.div>

        {/* Tabs with enhanced content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="overview" className="gap-2">
              <MapPin className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="operations" className="gap-2">
              <Zap className="w-4 h-4" />
              Operations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Live Tracking Map
                      <Badge variant="outline" className="ml-2 text-xs font-normal">
                        {shipments.filter(s => s.status !== 'delivered').length} active
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <LiveMap 
                      shipments={shipments.filter(s => s.status !== 'delivered')}
                      drivers={drivers}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Active Shipments */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Active Shipments
                    </CardTitle>
                    <Badge variant="secondary">
                      {filteredShipments.filter(s => s.status !== 'delivered').length}
                    </Badge>
                  </CardHeader>
                  <CardContent className="max-h-[300px] overflow-y-auto space-y-3">
                    {filteredShipments
                      .filter(shipment => shipment.status !== 'delivered')
                      .slice(0, 5)
                      .map((shipment, index) => (
                        <motion.div
                          key={shipment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <ShipmentCard 
                            shipment={shipment} 
                            onClick={() => setSelectedShipment(shipment)}
                            compact
                          />
                        </motion.div>
                      ))}
                    
                    {filteredShipments.filter(s => s.status !== 'delivered').length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No active shipments</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-[250px] overflow-y-auto">
                    <ActivityFeed shipments={shipments} drivers={drivers} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="grid gap-6">
              {/* Delivery Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Delivery Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <DeliveryChart shipments={shipments} />
                </CardContent>
              </Card>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">On-Time Rate</p>
                        <p className="text-3xl font-bold text-card-foreground mt-2">{stats.onTimeRate}%</p>
                        <div className="flex items-center gap-1 mt-2">
                          <ArrowUp className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">+2.3% this month</span>
                        </div>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Delivery Time</p>
                        <p className="text-3xl font-bold text-card-foreground mt-2">{stats.avgDeliveryTime}h</p>
                        <div className="flex items-center gap-1 mt-2">
                          <ArrowDown className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">-0.8h improvement</span>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-full">
                        <Clock className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Weight</p>
                        <p className="text-3xl font-bold text-card-foreground mt-2">{stats.totalWeight.toFixed(1)} kg</p>
                        <div className="flex items-center gap-1 mt-2">
                          <ArrowUp className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-blue-500">+12% from last month</span>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-500/10 rounded-full">
                        <Package className="w-6 h-6 text-purple-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Route Efficiency</p>
                        <p className="text-3xl font-bold text-card-foreground mt-2">89%</p>
                        <div className="flex items-center gap-1 mt-2">
                          <ArrowUp className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">+5% optimized</span>
                        </div>
                      </div>
                      <div className="p-3 bg-amber-500/10 rounded-full">
                        <Route className="w-6 h-6 text-amber-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="operations" className="mt-6">
            <div className="grid gap-6">
              {/* Operations Grid */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Operations Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="h-24 flex flex-col gap-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      <Package className="w-6 h-6" />
                      <span className="text-sm font-medium">New Shipment</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Truck className="w-6 h-6 text-muted-foreground" />
                      <span className="text-sm font-medium">Manage Drivers</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Route className="w-6 h-6 text-muted-foreground" />
                      <span className="text-sm font-medium">Route Planning</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => handleExport('csv')}>
                      <Download className="w-6 h-6 text-muted-foreground" />
                      <span className="text-sm font-medium">Export Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-full">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Active Drivers</p>
                        <p className="text-2xl font-bold text-card-foreground">
                          {drivers.filter(d => d.status === 'on_duty' || d.status === 'delivering').length}
                        </p>
                        <p className="text-xs text-muted-foreground">of {drivers.length} total</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-500/10 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completed Today</p>
                        <p className="text-2xl font-bold text-card-foreground">
                          {shipments.filter(s => {
                            const today = new Date();
                            const deliveryDate = new Date(s.estimatedDelivery);
                            return s.status === 'delivered' && 
                              deliveryDate.getDate() === today.getDate() &&
                              deliveryDate.getMonth() === today.getMonth() &&
                              deliveryDate.getFullYear() === today.getFullYear();
                          }).length}
                        </p>
                        <p className="text-xs text-muted-foreground">deliveries</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-500/10 rounded-full">
                        <AlertCircle className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Issues</p>
                        <p className="text-2xl font-bold text-card-foreground">{stats.delayed}</p>
                        <p className="text-xs text-muted-foreground">delayed shipments</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="gradient" className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
              <Route className="w-4 h-4" />
              Optimize Routes
            </Button>
            <Button variant="outline" className="gap-2">
              <Package className="w-4 h-4" />
              Create Shipment
            </Button>
            <Button variant="outline" className="gap-2">
              <Truck className="w-4 h-4" />
              Assign Driver
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => handleExport('csv')}>
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button variant="outline" className="gap-2">
              <Shield className="w-4 h-4" />
              Safety Check
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedShipment && (
          <ShipmentDetailsModal
            shipment={selectedShipment}
            isOpen={!!selectedShipment}
            onClose={() => setSelectedShipment(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDriver && (
          <DriverDetailsModal
            driver={selectedDriver}
            isOpen={!!selectedDriver}
            onClose={() => setSelectedDriver(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}