'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell,
  Check,
  Trash2,
  Archive,
  Filter,
  Settings,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Mail,
  MessageSquare
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/utils'

interface Notification {
  id: string
  type: 'shipment' | 'driver' | 'system' | 'alert' | 'message'
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: 'low' | 'medium' | 'high'
  metadata?: {
    shipmentId?: string
    driverId?: string
    trackingNumber?: string
    action?: {
      label: string
      url: string
    }
  }
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'shipment',
    title: 'Shipment Delivered',
    message: 'Shipment #LTK789456123 has been successfully delivered to TechCorp Inc.',
    timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
    read: false,
    priority: 'high',
    metadata: {
      shipmentId: '1',
      trackingNumber: 'LTK789456123',
      action: {
        label: 'View Details',
        url: '/dashboard/tracking/LTK789456123',
      },
    },
  },
  {
    id: '2',
    type: 'driver',
    title: 'Driver Status Changed',
    message: 'John Carter has started his route and is now on duty.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: false,
    priority: 'medium',
    metadata: {
      driverId: 'driver1',
      action: {
        label: 'Track Driver',
        url: '/dashboard/drivers/driver1',
      },
    },
  },
  {
    id: '3',
    type: 'alert',
    title: 'Route Delay Detected',
    message: 'Route #R789 has been delayed by 45 minutes due to traffic.',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    read: true,
    priority: 'high',
    metadata: {
      action: {
        label: 'Optimize Route',
        url: '/dashboard/routes',
      },
    },
  },
  {
    id: '4',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tomorrow from 2:00 AM to 4:00 AM.',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
    priority: 'medium',
  },
  {
    id: '5',
    type: 'message',
    title: 'New Customer Message',
    message: 'Sarah Johnson from Retail Store Co. sent a message about her shipment.',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    read: true,
    priority: 'low',
    metadata: {
      action: {
        label: 'Reply',
        url: '/dashboard/messages',
      },
    },
  },
  {
    id: '6',
    type: 'shipment',
    title: 'Shipment Pickup',
    message: 'Shipment #LTK987654321 has been picked up by driver Sarah Miller.',
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    read: true,
    priority: 'medium',
    metadata: {
      trackingNumber: 'LTK987654321',
      action: {
        label: 'Track Shipment',
        url: '/dashboard/tracking/LTK987654321',
      },
    },
  },
  {
    id: '7',
    type: 'alert',
    title: 'Weather Alert',
    message: 'Severe weather warning for Northeast region. Consider route adjustments.',
    timestamp: new Date(Date.now() - 345600000), // 4 days ago
    read: true,
    priority: 'high',
  },
  {
    id: '8',
    type: 'system',
    title: 'New Feature Available',
    message: 'Route optimization AI is now available in beta. Try it out!',
    timestamp: new Date(Date.now() - 432000000), // 5 days ago
    read: true,
    priority: 'low',
    metadata: {
      action: {
        label: 'Try Now',
        url: '/dashboard/analytics',
      },
    },
  },
]

const typeIcons = {
  shipment: Package,
  driver: Truck,
  system: Settings,
  alert: AlertTriangle,
  message: MessageSquare,
}

const typeColors = {
  shipment: 'text-blue-500 bg-blue-500/10',
  driver: 'text-emerald-500 bg-emerald-500/10',
  system: 'text-purple-500 bg-purple-500/10',
  alert: 'text-red-500 bg-red-500/10',
  message: 'text-amber-500 bg-amber-500/10',
}

const priorityColors = {
  high: 'border-red-500 bg-red-500/5',
  medium: 'border-yellow-500 bg-yellow-500/5',
  low: 'border-gray-500 bg-gray-500/5',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredNotifications = notifications.filter(notification => {
    const matchesReadStatus = 
      filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter === 'read' && notification.read)
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    
    return matchesReadStatus && matchesType
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with shipment alerts, driver updates, and system notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {unreadCount} unread
            </Badge>
          )}
          <Button variant="outline" size="lg" onClick={markAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
          <Button variant="outline" size="lg" onClick={clearAll}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear all
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Status Filters */}
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilter('unread')}
              >
                Unread
              </Button>
              <Button
                variant={filter === 'read' ? 'default' : 'outline'}
                onClick={() => setFilter('read')}
              >
                Read
              </Button>
            </div>

            {/* Type Filters */}
            <div className="flex gap-2">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('all')}
              >
                All Types
              </Button>
              <Button
                variant={typeFilter === 'shipment' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('shipment')}
              >
                Shipments
              </Button>
              <Button
                variant={typeFilter === 'driver' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('driver')}
              >
                Drivers
              </Button>
              <Button
                variant={typeFilter === 'alert' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('alert')}
              >
                Alerts
              </Button>
            </div>

            <div className="flex-1" />

            <Button variant="outline" size="lg">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>

            <Button variant="outline" size="lg">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => {
            const Icon = typeIcons[notification.type]
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={cn(
                  "border-0 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl",
                  !notification.read && "border-l-4",
                  priorityColors[notification.priority]
                )}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={cn(
                        "p-3 rounded-lg",
                        typeColors[notification.type]
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{notification.title}</h3>
                              {!notification.read && (
                                <Badge variant="default" className="animate-pulse">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mt-1">{notification.message}</p>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{getTimeAgo(notification.timestamp)}</span>
                              </div>
                              <Badge variant="outline" className="capitalize">
                                {notification.type}
                              </Badge>
                              <Badge variant="outline" className="capitalize">
                                {notification.priority} priority
                              </Badge>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            {notification.metadata?.action && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(notification.metadata!.action!.url, '_blank')}
                              >
                                {notification.metadata.action.label}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notification.id)}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        ) : (
          <Card className="border-0 shadow-lg backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === 'unread' 
                  ? 'You have no unread notifications'
                  : typeFilter !== 'all'
                  ? `No ${typeFilter} notifications`
                  : 'You\'re all caught up!'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notification Settings */}
      <Card className="border-0 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Notifications */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Notifications
              </h4>
              <div className="space-y-3">
                {[
                  { label: 'Shipment Updates', enabled: true },
                  { label: 'Driver Alerts', enabled: true },
                  { label: 'System Notifications', enabled: false },
                  { label: 'Marketing Emails', enabled: false },
                  { label: 'Weekly Reports', enabled: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Push Notifications
              </h4>
              <div className="space-y-3">
                {[
                  { label: 'Urgent Alerts', enabled: true },
                  { label: 'Delivery Updates', enabled: true },
                  { label: 'Route Changes', enabled: true },
                  { label: 'Driver Messages', enabled: false },
                  { label: 'Promotions', enabled: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold mb-2">Notification Frequency</h4>
                <p className="text-sm text-muted-foreground">
                  Control how often you receive notifications
                </p>
              </div>
              <select className="px-4 py-2 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Real-time</option>
                <option>Every 15 minutes</option>
                <option>Hourly</option>
                <option>Every 6 hours</option>
                <option>Daily summary</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline">Reset to Defaults</Button>
            <Button variant="gradient">Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}