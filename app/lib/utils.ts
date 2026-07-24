import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format distance
export function formatDistance(distance: number, unit: 'km' | 'miles' = 'km'): string {
  if (unit === 'miles') {
    const miles = distance * 0.621371
    return miles < 1 ? `${Math.round(miles * 5280)} ft` : `${miles.toFixed(1)} mi`
  }
  return distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`
}

// Format duration
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

// Format date
export function formatDate(date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'relative') {
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
  }

  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Calculate progress percentage based on status
export function calculateProgress(status: string): number {
  const statusWeights: Record<string, number> = {
    pending: 0,
    processing: 25,
    ready_for_pickup: 40,
    picked_up: 50,
    in_transit: 65,
    out_for_delivery: 85,
    delivered: 100,
    delayed: 50,
    cancelled: 0,
    returned: 0,
    failed: 0,
  }
  return statusWeights[status] || 0
}

// Generate tracking number
export function generateTrackingNumber(prefix: string = 'LTK'): string {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${prefix}${timestamp}${random}`
}

// Get status color
export function getStatusColor(status: string): {
  bg: string;
  text: string;
  icon: string;
} {
  const colors: Record<string, { bg: string; text: string; icon: string }> = {
    pending: {
      bg: 'bg-gray-500/10',
      text: 'text-gray-700 dark:text-gray-300',
      icon: 'text-gray-500',
    },
    processing: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-700 dark:text-blue-400',
      icon: 'text-blue-500',
    },
    in_transit: {
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-700 dark:text-yellow-400',
      icon: 'text-yellow-500',
    },
    out_for_delivery: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-700 dark:text-purple-400',
      icon: 'text-purple-500',
    },
    delivered: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-700 dark:text-emerald-400',
      icon: 'text-emerald-500',
    },
    delayed: {
      bg: 'bg-red-500/10',
      text: 'text-red-700 dark:text-red-400',
      icon: 'text-red-500',
    },
    cancelled: {
      bg: 'bg-gray-500/10',
      text: 'text-gray-700 dark:text-gray-300',
      icon: 'text-gray-500',
    },
  }
  
  return colors[status] || colors.pending
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Deep clone
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// Calculate ETA
export function calculateETA(
  startTime: Date,
  distance: number,
  averageSpeed: number = 50 // km/h
): Date {
  const hours = distance / averageSpeed
  const eta = new Date(startTime.getTime() + hours * 60 * 60 * 1000)
  return eta
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone)
}

// Generate random ID
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}