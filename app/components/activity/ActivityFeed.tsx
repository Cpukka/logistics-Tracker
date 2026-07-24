'use client'

import { format, formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  MapPin, 
  Clock,
  DollarSign,
  User,
  Home,
  Bell
} from 'lucide-react'
import { Shipment, Driver } from '../../types'
import { cn } from '../../lib/utils'
import { Badge } from '../../components/ui/Badge'

interface ActivityItem {
  id: string
  type: 'shipment' | 'driver' | 'payment' | 'alert'
  title: string
  description: string
  timestamp: Date
  icon: any
  color: string
  bgColor: string
  metadata?: Record<string, any>
  onClick?: () => void
}

interface ActivityFeedProps {
  shipments: Shipment[]
  drivers: Driver[]
  limit?: number
  showAll?: boolean
  className?: string
}

export function ActivityFeed({ 
  shipments, 
  drivers, 
  limit = 10, 
  showAll = false,
  className 
}: ActivityFeedProps) {
  
  // Generate activities from recent shipments
  const shipmentActivities: ActivityItem[] = shipments
    .slice(0, showAll ? shipments.length : 5)
    .map(shipment => {
      let icon = Package
      let color = 'text-blue-500'
      let bgColor = 'bg-blue-500/10'
      let title = `Shipment ${shipment.trackingNumber}`
      let description = ''
      
      switch(shipment.status) {
        case 'delivered':
          icon = CheckCircle
          color = 'text-emerald-500'
          bgColor = 'bg-emerald-500/10'
          description = `Delivered to ${shipment.destination.address}`
          break
        case 'out_for_delivery':
          icon = Truck
          color = 'text-amber-500'
          bgColor = 'bg-amber-500/10'
          description = `Out for delivery in ${shipment.destination.address}`
          break
        case 'in_transit':
          icon = MapPin
          color = 'text-indigo-500'
          bgColor = 'bg-indigo-500/10'
          description = `In transit to ${shipment.destination.address}`
          break
        case 'delayed':
          icon = AlertCircle
          color = 'text-red-500'
          bgColor = 'bg-red-500/10'
          description = 'Delivery delayed - check for updates'
          break
        case 'pending':
          icon = Clock
          color = 'text-gray-500'
          bgColor = 'bg-gray-500/10'
          description = 'Awaiting pickup'
          break
        default:
          icon = Package
          color = 'text-blue-500'
          bgColor = 'bg-blue-500/10'
          description = `Status: ${shipment.status}`
          break
      }
      
      return {
        id: shipment.id,
        type: 'shipment',
        title,
        description,
        timestamp: shipment.updatedAt,
        icon,
        color,
        bgColor,
        metadata: {
          shipmentId: shipment.id,
          status: shipment.status,
          priority: shipment.priority,
          customer: shipment.customer.name
        }
      }
    })

  // Generate activities from driver updates
  const driverActivities: ActivityItem[] = drivers
    .slice(0, showAll ? drivers.length : 3)
    .map(driver => {
      const safeRating = driver.rating ?? 4.0
      
      let icon = Truck
      let color = 'text-purple-500'
      let bgColor = 'bg-purple-500/10'
      let description = ''
      
      switch(driver.status) {
        case 'on_duty':
          description = `On duty - ${driver.currentLocation.address}`
          break
        case 'delivering':
          description = `Making deliveries - ${driver.currentLocation.address}`
          break
        case 'available':
          description = 'Available for assignments'
          break
        case 'off_duty':
          description = 'Off duty'
          break
        default:
          description = `Status: ${driver.status}`
          break
      }
      
      return {
        id: driver.id,
        type: 'driver',
        title: driver.name,
        description,
        timestamp: new Date(),
        icon,
        color,
        bgColor,
        metadata: {
          driverId: driver.id,
          status: driver.status,
          vehicle: driver.vehicle.plate,
          rating: safeRating
        }
      }
    })

  // System alerts and notifications
  const systemActivities: ActivityItem[] = [
    {
      id: 'system-1',
      type: 'alert',
      title: 'Route Optimization',
      description: '15 routes optimized for better efficiency',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: MapPin,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'system-2',
      type: 'payment',
      title: 'Payment Received',
      description: 'Invoice #INV-78945 paid by TechCorp Inc.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: DollarSign,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    }
  ]

  // Combine and sort all activities
  const allActivities = [
    ...shipmentActivities,
    ...driverActivities,
    ...systemActivities
  ]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit)

  // Group activities by time
  const groupActivitiesByTime = (activities: ActivityItem[]) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    const groups: Record<string, ActivityItem[]> = {
      'Today': [],
      'Yesterday': [],
      'This Week': [],
      'Older': []
    }
    
    activities.forEach(activity => {
      const activityDate = new Date(activity.timestamp.getFullYear(), activity.timestamp.getMonth(), activity.timestamp.getDate())
      
      if (activityDate.getTime() === today.getTime()) {
        groups['Today'].push(activity)
      } else if (activityDate.getTime() === yesterday.getTime()) {
        groups['Yesterday'].push(activity)
      } else if (activityDate.getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000) {
        groups['This Week'].push(activity)
      } else {
        groups['Older'].push(activity)
      }
    })
    
    return Object.entries(groups).filter(([_, items]) => items.length > 0)
  }

  const groupedActivities = groupActivitiesByTime(allActivities)

  const getStatusBadge = (type: string, metadata?: Record<string, any>) => {
    if (type === 'shipment' && metadata?.status) {
      const statusColors: Record<string, string> = {
        'delivered': 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
        'in_transit': 'bg-blue-500/20 text-blue-700 dark:text-blue-300',
        'out_for_delivery': 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
        'delayed': 'bg-red-500/20 text-red-700 dark:text-red-300',
        'pending': 'bg-gray-500/20 text-gray-700 dark:text-gray-300'
      }
      
      // FIXED: Explicitly type the parameter 'letter'
      const statusText = metadata.status
        .replace('_', ' ')
        .replace(/\b\w/g, (letter: string) => letter.toUpperCase())
      
      return (
        <Badge className={cn("text-xs font-medium", statusColors[metadata.status] || 'bg-gray-500/20')}>
          {statusText}
        </Badge>
      )
    }
    
    if (type === 'driver' && metadata?.status) {
      // FIXED: Explicitly type the parameter 'letter'
      const statusText = metadata.status
        .replace('_', ' ')
        .replace(/\b\w/g, (letter: string) => letter.toUpperCase())
      
      return (
        <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-medium">
          {statusText}
        </Badge>
      )
    }
    
    return null
  }

  if (allActivities.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
        <Bell className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No Recent Activity
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Activity will appear here as shipments and drivers update
        </p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {groupedActivities.map(([groupName, activities]) => (
        <div key={groupName} className="space-y-3">
          <div className="flex items-center gap-2 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 py-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2">
              {groupName}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
          </div>
          
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "group flex items-start gap-3 p-3 rounded-lg",
                    "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                    "transition-all duration-200 cursor-pointer",
                    "border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  )}
                  onClick={activity.onClick}
                >
                  <div className={cn(
                    "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                    activity.bgColor,
                    "transition-transform group-hover:scale-110"
                  )}>
                    <Icon className={cn("w-5 h-5", activity.color)} />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {activity.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {activity.description}
                        </p>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(activity.type, activity.metadata)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                        </span>
                        {activity.metadata?.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">
                            High Priority
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {format(activity.timestamp, 'HH:mm')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      ))}
      
      {!showAll && allActivities.length >= limit && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium text-center py-2">
            View All Activity →
          </button>
        </div>
      )}
    </div>
  )
}