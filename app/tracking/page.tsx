'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, QrCode, Filter } from 'lucide-react'
import { ShipmentCard } from '../components/tracking/ShipmentCard'
import { StatusTimeline } from '../components/tracking/StatusTimeline'

// Mock data
const shipments = [
  {
    id: '1',
    trackingNumber: 'TRK789456123',
    status: 'in_transit',
    origin: { address: 'Warehouse A, NYC', lat: 40.7128, lng: -74.0060 },
    destination: { address: 'Customer Location, Boston', lat: 42.3601, lng: -71.0589 },
    estimatedDelivery: new Date(Date.now() + 86400000),
    driverId: 'driver1',
    items: [{ name: 'Electronics Package', quantity: 1, weight: 5.2 }],
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    trackingNumber: 'TRK987654321',
    status: 'out_for_delivery',
    origin: { address: 'Distribution Center, LA', lat: 34.0522, lng: -118.2437 },
    destination: { address: 'Office Building, San Francisco', lat: 37.7749, lng: -122.4194 },
    estimatedDelivery: new Date(Date.now() + 14400000),
    driverId: 'driver2',
    items: [{ name: 'Documents', quantity: 1, weight: 0.5 }],
    createdAt: new Date(Date.now() - 172800000),
  },
]

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedShipment, setSelectedShipment] = useState(shipments[0])
  const [filter, setFilter] = useState('all')

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.destination.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || shipment.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Shipment Tracking
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track and manage all your shipments in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search and List */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by tracking number or destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'all'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('in_transit')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'in_transit'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    In Transit
                  </button>
                  <button
                    onClick={() => setFilter('delivered')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'delivered'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Delivered
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Shipments List */}
            <div className="space-y-4">
              {filteredShipments.map((shipment, index) => (
                <motion.div
                  key={shipment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ShipmentCard 
                    shipment={shipment}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Shipment Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Shipment Details
              </h2>

              {/* Selected Shipment Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {selectedShipment.trackingNumber}
                  </h3>
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                    {selectedShipment.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                    <p className="text-gray-900 dark:text-white">{selectedShipment.origin.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                    <p className="text-gray-900 dark:text-white">{selectedShipment.destination.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery</p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedShipment.estimatedDelivery.toLocaleDateString()} at{' '}
                      {selectedShipment.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Delivery Progress</h3>
                <StatusTimeline 
                  status={selectedShipment.status}
                  estimatedDelivery={selectedShipment.estimatedDelivery}
                />
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <QrCode className="w-4 h-4" />
                    View QR
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Filter className="w-4 h-4" />
                    Update
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}