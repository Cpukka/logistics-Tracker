// app/components/modals/ShipmentDetailsModal.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Package, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Truck, 
  AlertCircle,
  CheckCircle,
  Edit,
  Download,
  Share2,
  MessageSquare,
  History,
  DollarSign,
  Weight,
  Tag,
  ExternalLink
} from 'lucide-react'
import { Shipment } from '../../types'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/utils'
import { Progress } from '../../components/ui/Progress'

interface ShipmentDetailsModalProps {
  shipment: Shipment
  isOpen: boolean
  onClose: () => void
}

const statusSteps = [
  { key: 'pending', label: 'Pending', icon: Clock },
  { key: 'in_transit', label: 'In Transit', icon: Truck },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Package },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
]

export function ShipmentDetailsModal({ shipment, isOpen, onClose }: ShipmentDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'documents'>('details')

  if (!isOpen) return null

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-emerald-500 text-white'
      case 'out_for_delivery': return 'bg-amber-500 text-white'
      case 'in_transit': return 'bg-blue-500 text-white'
      case 'delayed': return 'bg-red-500 text-white'
      case 'pending': return 'bg-gray-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusIndex = () => {
    return statusSteps.findIndex(step => step.key === shipment.status)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateProgress = () => {
    const currentIndex = getStatusIndex()
    return (currentIndex + 1) / statusSteps.length * 100
  }

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
            className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    getStatusColor(shipment.status)
                  )}>
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {shipment.trackingNumber}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {shipment.items[0]?.name || 'Shipment'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-linear-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Delivery Progress
                </span>
                <span className="text-sm font-semibold text-primary">
                  {calculateProgress().toFixed(0)}%
                </span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
              
              <div className="flex justify-between mt-3">
                {statusSteps.map((step, index) => {
                  const StepIcon = step.icon
                  const isCompleted = index <= getStatusIndex()
                  const isCurrent = index === getStatusIndex()
                  
                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                        isCompleted 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      )}>
                        <StepIcon className="w-4 h-4" />
                      </div>
                      <span className={cn(
                        "text-xs font-medium",
                        isCurrent 
                          ? 'text-primary font-semibold' 
                          : 'text-gray-500 dark:text-gray-400'
                      )}>
                        {step.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
                <button
                  className={cn(
                    "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                    activeTab === 'details'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  )}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button
                  className={cn(
                    "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                    activeTab === 'timeline'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  )}
                  onClick={() => setActiveTab('timeline')}
                >
                  Timeline
                </button>
                <button
                  className={cn(
                    "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                    activeTab === 'documents'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  )}
                  onClick={() => setActiveTab('documents')}
                >
                  Documents
                </button>
              </div>

              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Shipment Info */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Shipment Information
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                          <Badge className={cn("mt-1", getStatusColor(shipment.status))}>
                            {shipment.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Priority</p>
                          <p className="font-medium">{shipment.priority.toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                          <p className="font-medium">{shipment.totalWeight} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Items</p>
                          <p className="font-medium">{shipment.items.length}</p>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Customer Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{shipment.customer.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{shipment.customer.phone}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Payment Information
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                          <Badge className={cn(
                            "mt-1",
                            shipment.payment.status === 'paid' 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-amber-500 text-white'
                          )}>
                            {shipment.payment.status.toUpperCase()}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View Invoice
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Locations */}
                    <div className="space-y-4">
                      {/* Origin */}
                      <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Pickup Location</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{shipment.origin.address}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Coordinates: {shipment.origin.lat.toFixed(4)}, {shipment.origin.lng.toFixed(4)}
                        </p>
                      </div>

                      {/* Destination */}
                      <div className="bg-linear-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-5 h-5 text-emerald-500" />
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Delivery Location</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{shipment.destination.address}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Coordinates: {shipment.destination.lat.toFixed(4)}, {shipment.destination.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>

                    {/* ETA */}
                    <div className="bg-linear-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-amber-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Estimated Delivery</h3>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {formatDate(shipment.estimatedDelivery)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {shipment.status === 'in_transit' ? 'En route' : 'Scheduled'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      <Button variant="outline" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Share Tracking
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Contact Customer
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export Details
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  {/* Timeline items would go here */}
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    Timeline feature coming soon
                  </p>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4">
                  {/* Documents would go here */}
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    Documents feature coming soon
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Created {formatDate(shipment.createdAt)}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="gradient">
                    <Edit className="w-4 h-4 mr-2" />
                    Update Status
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