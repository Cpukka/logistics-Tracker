// app/tracking/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Search, Filter, ChevronDown } from 'lucide-react'
import { ShipmentCard } from '../components/tracking/ShipmentCard'
import { Shipment } from '../types'

// Mock data with ALL required fields
const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'TRK789456123',
    status: 'in_transit',
    origin: { address: 'Warehouse A, NYC', lat: 40.7128, lng: -74.0060 },
    destination: { address: 'Customer Location, Boston', lat: 42.3601, lng: -71.0589 },
    estimatedDelivery: new Date(Date.now() + 86400000),
    driverId: 'driver1',
    driverName: 'John Carter',
    items: [{ 
      id: 'item1',
      name: 'Electronics Package', 
      quantity: 1, 
      weight: 5.2 
    }],
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
    priority: 'high',
    totalWeight: 5.2,
    customer: {
      id: 'cust1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: 'Boston, MA'
    },
    payment: {
      status: 'paid',
      method: 'credit_card',
      amount: 29.99
    },
    distance: 215,
    estimatedDuration: 180,
  },
  {
    id: '2',
    trackingNumber: 'TRK987654321',
    status: 'out_for_delivery',
    origin: { address: 'Distribution Center, LA', lat: 34.0522, lng: -118.2437 },
    destination: { address: 'Office Building, San Francisco', lat: 37.7749, lng: -122.4194 },
    estimatedDelivery: new Date(Date.now() + 14400000),
    driverId: 'driver2',
    driverName: 'Sarah Miller',
    items: [{ 
      id: 'item2',
      name: 'Documents', 
      quantity: 1, 
      weight: 0.5 
    }],
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
    priority: 'medium',
    totalWeight: 0.5,
    customer: {
      id: 'cust2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      address: 'San Francisco, CA'
    },
    payment: {
      status: 'paid',
      method: 'paypal',
      amount: 14.99
    },
    distance: 383,
    estimatedDuration: 240,
  },
  {
    id: '3',
    trackingNumber: 'TRK456789123',
    status: 'delivered',
    origin: { address: 'Warehouse B, Chicago', lat: 41.8781, lng: -87.6298 },
    destination: { address: 'Residential, Miami', lat: 25.7617, lng: -80.1918 },
    estimatedDelivery: new Date(Date.now() - 86400000),
    driverId: 'driver3',
    driverName: 'Robert Chen',
    items: [{ 
      id: 'item3',
      name: 'Furniture', 
      quantity: 2, 
      weight: 35.0 
    }],
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 86400000),
    priority: 'medium',
    totalWeight: 35.0,
    customer: {
      id: 'cust3',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 (555) 456-7890',
      address: 'Miami, FL'
    },
    payment: {
      status: 'paid',
      method: 'credit_card',
      amount: 89.99
    },
    actualDelivery: new Date(Date.now() - 86400000),
    distance: 1390,
    estimatedDuration: 720,
  },
  {
    id: '4',
    trackingNumber: 'TRK321654987',
    status: 'pending',
    origin: { address: 'Distribution Center, Dallas', lat: 32.7767, lng: -96.7970 },
    destination: { address: 'Retail Store, Seattle', lat: 47.6062, lng: -122.3321 },
    estimatedDelivery: new Date(Date.now() + 259200000),
    driverId: 'driver4',
    driverName: 'Maria Garcia',
    items: [{ 
      id: 'item4',
      name: 'Clothing', 
      quantity: 5, 
      weight: 25.0 
    }],
    createdAt: new Date(Date.now() - 43200000),
    updatedAt: new Date(Date.now() - 43200000),
    priority: 'low',
    totalWeight: 25.0,
    customer: {
      id: 'cust4',
      name: 'Fashion Retail Co',
      email: 'orders@fashion.com',
      phone: '+1 (555) 789-0123',
      address: 'Seattle, WA'
    },
    payment: {
      status: 'pending',
      method: 'invoice',
      amount: 199.99
    },
    distance: 2100,
    estimatedDuration: 1440,
  },
]

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredShipments = mockShipments
    .filter(shipment => {
      const matchesSearch = 
        shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.destination.address.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFilter = filter === 'all' || shipment.status === filter
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Track Shipments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor and track all your shipments in real-time
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by tracking number, customer, or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_transit">In Transit</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shipments Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredShipments.map((shipment, index) => (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <ShipmentCard 
                  shipment={shipment}
                  onClick={() => {
                    // Navigate to shipment details
                    window.location.href = `/tracking/${shipment.trackingNumber}`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredShipments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No shipments found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try adjusting your search terms' : 'No shipments to display'}
            </p>
          </motion.div>
        )}

        {/* Stats Footer */}
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredShipments.length} of {mockShipments.length} shipments
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  )
}