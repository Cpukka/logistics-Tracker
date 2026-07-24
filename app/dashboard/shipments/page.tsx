'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { 
  Plus, 
  Filter, 
  Download, 
  Search,
  MoreVertical,
  Eye,
  Edit,
  Truck,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { ShipmentCard } from '../../components/tracking/ShipmentCard'
import { Shipment } from '../../types'
import { cn } from '../../lib/utils'

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
  // Add more shipments...
]

const statusFilters = [
  { value: 'all', label: 'All Status', color: 'bg-gray-500' },
  { value: 'pending', label: 'Pending', color: 'bg-gray-500' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-500' },
  { value: 'in_transit', label: 'In Transit', color: 'bg-yellow-500' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-purple-500' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-500' },
  { value: 'delayed', label: 'Delayed', color: 'bg-red-500' },
]

export default function ShipmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const filteredShipments = mockShipments.filter(shipment => {
    const matchesSearch = 
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || shipment.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: mockShipments.length,
    inTransit: mockShipments.filter(s => s.status === 'in_transit').length,
    delivered: mockShipments.filter(s => s.status === 'delivered').length,
    delayed: mockShipments.filter(s => s.status === 'delayed').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Shipments
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all your shipments in one place
          </p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          New Shipment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-linear-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Shipments</p>
                <p className="text-2xl font-bold mt-2">{stats.total}</p>
              </div>
              <Package className="w-10 h-10 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-linear-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold mt-2">{stats.inTransit}</p>
              </div>
              <Truck className="w-10 h-10 text-yellow-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-linear-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold mt-2">{stats.delivered}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-linear-to-br from-red-500/10 to-red-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold mt-2">{stats.delayed}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-500/30" />
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
                  placeholder="Search by tracking number, customer, or destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statusFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>

              <Button variant="outline" size="lg">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>

              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipments List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredShipments.map((shipment, index) => (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
              <ShipmentCard shipment={shipment} />
              <div className="p-4 border-t flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Truck className="w-4 h-4 mr-2" />
                  Assign
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredShipments.length === 0 && (
        <Card className="border-0 shadow-lg backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No shipments found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Create your first shipment to get started'}
            </p>
            <Button variant="gradient">
              <Plus className="w-5 h-5 mr-2" />
              Create New Shipment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}