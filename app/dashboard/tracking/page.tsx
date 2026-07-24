'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  QrCode,
  Copy,
  Share2,
  Bell,
  MapPin,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { StatusTimeline } from '../../components/tracking/StatusTimeline'
import { Shipment } from '../../types'
import { cn, formatDate } from '../../lib/utils'

const mockShipment: Shipment = {
  id: '1',
  trackingNumber: 'LTK789456123',
  status: 'in_transit',
  origin: { 
    address: 'Warehouse A, 123 Main St, New York, NY 10001', 
    lat: 40.7128, 
    lng: -74.0060 
  },
  destination: { 
    address: 'Tech Office, 456 Innovation Dr, Boston, MA 02108', 
    lat: 42.3601, 
    lng: -71.0589 
  },
  estimatedDelivery: new Date(Date.now() + 86400000),
  driverId: 'driver1',
  driverName: 'John Carter',
  items: [
    { 
      id: 'item1',
      name: 'Server Rack Components', 
      description: 'High-performance server rack components',
      quantity: 1, 
      weight: 5.2,
      value: 4500,
      dimensions: { length: 120, width: 60, height: 180, unit: 'cm' }
    },
    { 
      id: 'item2',
      name: 'Networking Equipment', 
      description: 'Enterprise-grade networking equipment',
      quantity: 3, 
      weight: 2.5,
      value: 3200,
      dimensions: { length: 45, width: 30, height: 15, unit: 'cm' }
    },
  ],
  createdAt: new Date(Date.now() - 86400000),
  updatedAt: new Date(Date.now() - 43200000),
  priority: 'high',
  totalWeight: 13.2,
  totalValue: 7700,
  customer: {
    name: 'TechCorp Inc.',
    email: 'shipping@techcorp.com',
    phone: '+1 (617) 555-0123',
    address: '456 Innovation Dr, Boston, MA 02108',
  },
  payment: {
    status: 'paid',
    method: 'Credit Card',
    amount: 7700,
  },
  distance: 345,
  estimatedDuration: 240,
}

const trackingEvents = [
  {
    id: '1',
    shipmentId: '1',
    type: 'status_change',
    location: mockShipment.origin,
    timestamp: new Date(Date.now() - 86400000),
    description: 'Shipment created and confirmed',
  },
  {
    id: '2',
    shipmentId: '1',
    type: 'pickup',
    location: mockShipment.origin,
    timestamp: new Date(Date.now() - 43200000),
    description: 'Picked up by driver John Carter',
  },
  {
    id: '3',
    shipmentId: '1',
    type: 'location_update',
    location: { address: 'I-95, New Haven, CT', lat: 41.3083, lng: -72.9279 },
    timestamp: new Date(Date.now() - 21600000),
    description: 'In transit - Current location updated',
  },
  {
    id: '4',
    shipmentId: '1',
    type: 'status_change',
    location: { address: 'Route 128, Waltham, MA', lat: 42.3765, lng: -71.2356 },
    timestamp: new Date(Date.now() - 7200000),
    description: 'Approaching destination',
  },
]

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('LTK789456123')
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Track Shipment
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time tracking and updates for your shipments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="lg">
            <Bell className="w-4 h-4 mr-2" />
            Notify Me
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-lg backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter tracking number..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full pl-10 pr-32 py-3 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-sm"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <QrCode className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="gradient" size="lg" className="px-8">
              Track Shipment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tracking Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipment Overview */}
          <Card className="border-0 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                Shipment Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Origin & Destination */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">From</p>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{mockShipment.origin.address}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Pickup: {formatDate(mockShipment.createdAt, 'long')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">To</p>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{mockShipment.destination.address}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Estimated: {formatDate(mockShipment.estimatedDelivery, 'long')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          mockShipment.status === 'in_transit' && "bg-blue-500",
                          mockShipment.status === 'delivered' && "bg-emerald-500",
                          mockShipment.status === 'delayed' && "bg-red-500",
                        )} />
                        <p className="font-medium capitalize">{mockShipment.status.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">Priority</p>
                      <p className={cn(
                        "font-medium mt-1",
                        mockShipment.priority === 'high' && "text-red-600 dark:text-red-400",
                        mockShipment.priority === 'medium' && "text-yellow-600 dark:text-yellow-400",
                        mockShipment.priority === 'low' && "text-green-600 dark:text-green-400",
                      )}>
                        {mockShipment.priority}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Assigned Driver</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {mockShipment.driverName?.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{mockShipment.driverName}</p>
                        <p className="text-xs text-muted-foreground">Vehicle: ABC123</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-medium mt-1">{mockShipment.distance} km</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">Est. Time</p>
                      <p className="font-medium mt-1">{mockShipment.estimatedDuration} min</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          <Card className="border-0 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Tracking History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-purple-500 to-pink-500" />
                
                {/* Events */}
                <div className="space-y-8">
                  {trackingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-8 top-1">
                        <div className="h-4 w-4 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      </div>

                      {/* Event content */}
                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {event.type === 'pickup' && <Truck className="w-4 h-4 text-blue-500" />}
                            {event.type === 'status_change' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            {event.type === 'location_update' && <MapPin className="w-4 h-4 text-purple-500" />}
                            <span className="font-medium capitalize">{event.type.replace('_', ' ')}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(event.timestamp, 'long')}
                          </span>
                        </div>
                        <p className="text-sm">{event.description}</p>
                        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location.address}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Status & Actions */}
        <div className="space-y-6">
          {/* Current Status */}
          <Card className="border-0 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-3 w-3 rounded-full animate-pulse",
                      mockShipment.status === 'in_transit' && "bg-blue-500",
                      mockShipment.status === 'delivered' && "bg-emerald-500",
                      mockShipment.status === 'delayed' && "bg-red-500",
                    )} />
                    <span className="font-medium capitalize">{mockShipment.status.replace('_', ' ')}</span>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {mockShipment.priority} priority
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>From: {mockShipment.origin.address.split(',')[0]}</span>
                    <span>To: {mockShipment.destination.address.split(',')[0]}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-linear-to-r from-primary to-purple-600 rounded-full"
                    />
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-6">
                  <StatusTimeline 
                    status={mockShipment.status}
                    estimatedDelivery={mockShipment.estimatedDelivery}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card className="border-0 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                Shipment Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockShipment.items.map((item, index) => (
                  <div key={item.id} className="p-3 rounded-lg bg-muted">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="text-sm font-medium">x{item.quantity}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Weight</p>
                        <p>{item.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Value</p>
                        <p>${item.value?.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-linear-to-r from-primary/10 to-purple-600/10">
                <div className="flex justify-between">
                  <span className="font-medium">Total Value</span>
                  <span className="font-bold">${mockShipment.totalValue?.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="h-12">
                  <Bell className="w-4 h-4 mr-2" />
                  Alerts
                </Button>
                <Button variant="outline" className="h-12">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
                <Button variant="outline" className="h-12">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}