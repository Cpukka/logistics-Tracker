'use client'

import { useState } from 'react'
import { Package } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Filter, 
  Download, 
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { ShipmentCard } from '../components/tracking/ShipmentCard'
import { Shipment } from '../types'

// Mock data with ALL required fields
const shipments: Shipment[] = [
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
    notes: 'Handle with care',
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
    trackingNumber: 'TRK123456789',
    status: 'delivered',
    origin: { address: 'Warehouse B, Chicago', lat: 41.8781, lng: -87.6298 },
    destination: { address: 'Residential, Miami', lat: 25.7617, lng: -80.1918 },
    estimatedDelivery: new Date(Date.now() - 86400000),
    driverId: 'driver3',
    driverName: 'Robert Chen',
    items: [{ 
      id: 'item3',
      name: 'Furniture', 
      quantity: 3, 
      weight: 45.0 
    }],
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 86400000),
    priority: 'medium',
    totalWeight: 45.0,
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
    trackingNumber: 'TRK456789123',
    status: 'pending',
    origin: { address: 'Distribution Center, Dallas', lat: 32.7767, lng: -96.7970 },
    destination: { address: 'Retail Store, Seattle', lat: 47.6062, lng: -122.3321 },
    estimatedDelivery: new Date(Date.now() + 259200000),
    driverId: 'driver4',
    driverName: 'Maria Garcia',
    items: [{ 
      id: 'item4',
      name: 'Clothing', 
      quantity: 50, 
      weight: 12.5 
    }],
    createdAt: new Date(Date.now() - 43200000),
    updatedAt: new Date(Date.now() - 43200000),
    priority: 'low',
    totalWeight: 12.5,
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

export default function ShipmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filteredShipments = shipments
    .filter(shipment => {
      const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           shipment.destination.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           shipment.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filter === 'all' || shipment.status === filter
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime()
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime()
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Shipments Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage and track all shipments
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => window.location.href = '/shipments/new'}
            >
              <Plus className="w-5 h-5" />
              New Shipment
            </motion.button>
          </div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search shipments by tracking number, customer, or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="in_transit">In Transit</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="status">Status</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Shipments Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredShipments.map((shipment, index) => (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <ShipmentCard shipment={shipment} />
                  
                  {/* Action Buttons */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      title="View Details"
                      onClick={() => window.location.href = `/shipments/${shipment.id}`}
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                      title="Edit"
                      onClick={() => window.location.href = `/shipments/${shipment.id}/edit`}
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      title="Delete"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this shipment?')) {
                          console.log('Delete shipment:', shipment.id)
                        }
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredShipments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No shipments found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try a different search term' : 'Create your first shipment to get started'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}