'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Filter, 
  Search,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Star,
  Clock,
  Truck,
  Shield,
  BatteryCharging
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Driver } from '../../types'
import { cn, formatDistance } from '../../lib/utils'

const mockDrivers: Driver[] = [
  {
    id: 'driver1',
    name: 'John Carter',
    email: 'john.carter@logitrack.com',
    phone: '+1 (234) 567-890',
    contact: '+1 (234) 567-890',
    vehicle: { 
      type: 'van', 
      plate: 'ABC123', 
      capacity: 1000 
    },
    currentLocation: { 
      address: 'I-95, New Haven',
      lat: 41.3083, 
      lng: -72.9279 
    },
    status: 'on_duty',
    rating: 4.8,
    totalDeliveries: 1245,
    totalDistance: 45230,
    joinedDate: new Date('2023-01-15'),
    licenseNumber: 'DL789456123',
    stats: {
      completedDeliveries: 1245,
      onTimeRate: 96.7,
      averageRating: 4.8,
      totalEarnings: 45230,
    }
  },
  {
    id: 'driver2',
    name: 'Sarah Miller',
    email: 'sarah.m@logitrack.com',
    phone: '+1 (987) 654-321',
    contact: '+1 (987) 654-321',
    vehicle: { 
      type: 'truck', 
      plate: 'XYZ789', 
      capacity: 5000 
    },
    currentLocation: { 
      address: 'Highway 101, San Jose',
      lat: 37.3382, 
      lng: -121.8863 
    },
    status: 'delivering',
    rating: 4.9,
    totalDeliveries: 1890,
    totalDistance: 78210,
    joinedDate: new Date('2022-08-10'),
    licenseNumber: 'DL321654987',
    stats: {
      completedDeliveries: 1890,
      onTimeRate: 98.2,
      averageRating: 4.9,
      totalEarnings: 78210,
    }
  },
  {
    id: 'driver3',
    name: 'Robert Chen',
    email: 'robert.chen@logitrack.com',
    phone: '+1 (555) 123-456',
    contact: '+1 (555) 123-456',
    vehicle: { 
      type: 'van', 
      plate: 'DEF456', 
      capacity: 800 
    },
    currentLocation: { 
      address: 'I-95, Miami',
      lat: 25.7617, 
      lng: -80.1918 
    },
    status: 'available',
    rating: 4.7,
    totalDeliveries: 956,
    totalDistance: 32150,
    joinedDate: new Date('2023-05-20'),
    licenseNumber: 'DL456123789',
    stats: {
      completedDeliveries: 956,
      onTimeRate: 94.5,
      averageRating: 4.7,
      totalEarnings: 32150,
    }
  },
  {
    id: 'driver4',
    name: 'Maria Garcia',
    email: 'maria.g@logitrack.com',
    phone: '+1 (777) 888-999',
    contact: '+1 (777) 888-999',
    vehicle: { 
      type: 'car', 
      plate: 'GHI789', 
      capacity: 300 
    },
    currentLocation: { 
      address: 'Lake Shore Dr, Chicago',
      lat: 41.8781, 
      lng: -87.6298 
    },
    status: 'on_break',
    rating: 4.6,
    totalDeliveries: 745,
    totalDistance: 28900,
    joinedDate: new Date('2023-03-12'),
    licenseNumber: 'DL789123456',
    stats: {
      completedDeliveries: 745,
      onTimeRate: 93.8,
      averageRating: 4.6,
      totalEarnings: 28900,
    }
  },
]

const statusColors: Record<string, string> = {
  available: 'bg-green-500',
  on_duty: 'bg-blue-500',
  delivering: 'bg-purple-500',
  on_break: 'bg-yellow-500',
  off_duty: 'bg-gray-500',
  offline: 'bg-red-500',
}

const statusLabels: Record<string, string> = {
  available: 'Available',
  on_duty: 'On Duty',
  delivering: 'Delivering',
  on_break: 'On Break',
  off_duty: 'Off Duty',
  offline: 'Offline',
}

export default function DriversPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [vehicleFilter, setVehicleFilter] = useState('all')

  const filteredDrivers = mockDrivers.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.email?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter
    const matchesVehicle = vehicleFilter === 'all' || driver.vehicle.type === vehicleFilter
    
    return matchesSearch && matchesStatus && matchesVehicle
  })

  const stats = {
    total: mockDrivers.length,
    available: mockDrivers.filter(d => d.status === 'available').length,
    delivering: mockDrivers.filter(d => d.status === 'delivering').length,
    onDuty: mockDrivers.filter(d => d.status === 'on_duty').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Drivers
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your delivery team and track driver performance
          </p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Driver
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-linear-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Drivers</p>
                <p className="text-2xl font-bold mt-2">{stats.total}</p>
              </div>
              <Truck className="w-10 h-10 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-linear-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold mt-2">{stats.available}</p>
              </div>
              <Shield className="w-10 h-10 text-green-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-linear-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delivering</p>
                <p className="text-2xl font-bold mt-2">{stats.delivering}</p>
              </div>
              <BatteryCharging className="w-10 h-10 text-purple-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-linear-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Duty</p>
                <p className="text-2xl font-bold mt-2">{stats.onDuty}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="border-0 shadow-lg backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search by name, plate, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>

              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="px-4 py-2 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Vehicles</option>
                <option value="van">Van</option>
                <option value="truck">Truck</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
              </select>

              <Button variant="outline" size="lg">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver, index) => (
          <motion.div
            key={driver.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
              <CardContent className="p-6">
                {/* Driver Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background",
                        statusColors[driver.status]
                      )} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{driver.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{driver.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({driver.totalDeliveries} deliveries)
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={cn(
                    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
                    driver.status === 'available' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                    driver.status === 'on_duty' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                    driver.status === 'delivering' && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
                    driver.status === 'on_break' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                  )}>
                    <div className={cn("w-2 h-2 rounded-full", statusColors[driver.status])} />
                    {statusLabels[driver.status]}
                  </span>
                </div>

                {/* Vehicle Info */}
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{driver.vehicle.type}</p>
                      <p className="text-xs text-muted-foreground">{driver.vehicle.plate}</p>
                    </div>
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Capacity: {driver.vehicle.capacity}kg
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{driver.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{driver.currentLocation.address}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">On Time</p>
                    <p className="font-semibold">{driver.stats?.onTimeRate}%</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="font-semibold">{formatDistance(driver.totalDistance || 0)}</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Earnings</p>
                    <p className="font-semibold">${(driver.stats?.totalEarnings || 0).toLocaleString()}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDrivers.length === 0 && (
        <Card className="border-0 shadow-lg backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Truck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No drivers found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Add your first driver to get started'}
            </p>
            <Button variant="gradient">
              <Plus className="w-5 h-5 mr-2" />
              Add Driver
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}