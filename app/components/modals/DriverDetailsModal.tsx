// app/components/modals/DriverDetailsModal.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  User, 
  Phone, 
  Truck, 
  MapPin, 
  Star, 
  Clock, 
  Package,
  Award,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Navigation,
  Calendar,
  Shield
} from 'lucide-react'
import { Driver } from '../../types'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/utils'
import { Progress } from '../../components/ui/Progress'

interface DriverDetailsModalProps {
  driver: Driver
  isOpen: boolean
  onClose: () => void
}

export function DriverDetailsModal({ driver, isOpen, onClose }: DriverDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'shipments' | 'performance'>('overview')

  if (!isOpen) return null

  // Safe defaults for optional properties
  const rating = driver.rating ?? 4.0
  const totalDeliveries = driver.totalDeliveries ?? 0
  const driverStats = driver.stats ?? {
    completedDeliveries: 0,
    onTimeRate: 0,
    averageRating: 0
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'on_duty': return 'bg-blue-500 text-white'
      case 'delivering': return 'bg-amber-500 text-white'
      case 'available': return 'bg-green-500 text-white'
      case 'off_duty': return 'bg-gray-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateEfficiency = (rating: number) => {
    return (rating / 5) * 100
  }

  // Performance metrics with safe defaults
  const performanceMetrics = [
    { 
      label: 'On-Time Rate', 
      value: `${(driverStats.onTimeRate * 100).toFixed(1)}%`, 
      change: '+2.1%', 
      color: 'text-emerald-500' 
    },
    { 
      label: 'Customer Rating', 
      value: rating.toFixed(1), 
      change: '+0.3', 
      color: 'text-amber-500' 
    },
    { 
      label: 'Total Deliveries', 
      value: totalDeliveries.toLocaleString(), 
      change: '+5%', 
      color: 'text-blue-500' 
    },
    { 
      label: 'Avg. Rating', 
      value: driverStats.averageRating.toFixed(1), 
      change: '+0.2', 
      color: 'text-green-500' 
    },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {driver.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(driver.status)}>
                        {driver.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex">
                <button
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                    activeTab === 'overview'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  )}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                    activeTab === 'shipments'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  )}
                  onClick={() => setActiveTab('shipments')}
                >
                  Current Shipments
                </button>
                <button
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                    activeTab === 'performance'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  )}
                  onClick={() => setActiveTab('performance')}
                >
                  Performance
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Current Location */}
                  <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Current Location</h3>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Live
                      </Badge>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{driver.currentLocation.address}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Coordinates: {driver.currentLocation.lat.toFixed(4)}, {driver.currentLocation.lng.toFixed(4)}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Navigation className="w-4 h-4" />
                        Navigate To
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </Button>
                    </div>
                  </div>

                  {/* Driver Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Contact Info */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{driver.contact}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="font-medium">Joined {formatDate(driver.joinedDate)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Vehicle Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{driver.vehicle.plate}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">License Plate</p>
                          </div>
                          <Badge variant="outline">
                            {driver.vehicle.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{driver.vehicle.capacity} kg</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Max Capacity</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {totalDeliveries.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Deliveries</p>
                    </div>
                    <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {rating.toFixed(1)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rating</p>
                    </div>
                    <div className="bg-linear-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {driverStats.completedDeliveries}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Completed</p>
                    </div>
                    <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {(driverStats.onTimeRate * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">On-Time Rate</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-6">
                  {/* Efficiency Score */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Driver Efficiency</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Overall performance score</p>
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        {calculateEfficiency(rating).toFixed(0)}%
                      </div>
                    </div>
                    <Progress value={calculateEfficiency(rating)} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <span>Needs Improvement</span>
                      <span>Excellent</span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
                            <p className="text-2xl font-bold mt-1">{metric.value}</p>
                          </div>
                          <div className={`text-sm font-medium ${metric.color}`}>
                            {metric.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Awards & Certifications */}
                  <div className="bg-linear-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-5 h-5 text-amber-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Awards & Certifications</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300">
                        <Shield className="w-3 h-3 mr-1" />
                        Safety Certified
                      </Badge>
                      {totalDeliveries >= 1000 && (
                        <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300">
                          <Star className="w-3 h-3 mr-1" />
                          1000+ Deliveries
                        </Badge>
                      )}
                      {driverStats.onTimeRate >= 0.95 && (
                        <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Top Performer
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'shipments' && (
                <div className="space-y-4">
                  {driver.activeShipmentId ? (
                    // Show active shipment details
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Currently Delivering
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Working on shipment #{driver.activeShipmentId}
                      </p>
                      <Button className="mt-4" variant="outline">
                        View Shipment Details
                      </Button>
                    </div>
                  ) : (
                    // No active shipments
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        No Active Shipments
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {driver.name} is currently available for assignments
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: Just now
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="gradient">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Driver
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}