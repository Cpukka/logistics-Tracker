'use client'

import { CheckCircle, Package, Truck, Home, Clock, AlertCircle } from 'lucide-react'
import { ShipmentStatus } from '../../types'
import { motion } from 'framer-motion'

interface StatusTimelineProps {
  status: ShipmentStatus
  estimatedDelivery?: Date
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Package, color: 'text-gray-500' },
  { key: 'processing', label: 'Processing', icon: Package, color: 'text-blue-500' },
  { key: 'in_transit', label: 'In Transit', icon: Truck, color: 'text-yellow-500' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, color: 'text-purple-500' },
  { key: 'delivered', label: 'Delivered', icon: Home, color: 'text-emerald-500' },
]

export function StatusTimeline({ status, estimatedDelivery }: StatusTimelineProps) {
  const currentIndex = statusSteps.findIndex(step => step.key === status)

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-gray-200 to-gray-200 dark:from-gray-700 dark:to-gray-700" />
      
      <div className="space-y-6">
        {statusSteps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = index <= currentIndex
          const isCurrent = index === currentIndex

          return (
            <div key={step.key} className="relative flex items-start gap-3">
              <div className="relative z-10">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full
                  ${isCompleted 
                    ? 'bg-linear-to-br from-primary to-purple-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}
                  transition-all duration-300
                `}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
              </div>
              
              <div className="flex-1 pt-0.5">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium ${isCompleted ? step.color : 'text-gray-500 dark:text-gray-400'}`}>
                    {step.label}
                  </h3>
                  {isCurrent && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Current
                    </span>
                  )}
                </div>
                {isCurrent && estimatedDelivery && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1"
                  >
                    <Clock className="w-3 h-3" />
                    Estimated: {estimatedDelivery.toLocaleDateString()}
                  </motion.p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}