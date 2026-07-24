'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import {
  LayoutDashboard,
  Package,
  Truck,
  Map,
  BarChart3,
  Settings,
  Users,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '../../lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/shipments', label: 'Shipments', icon: Package },
  { href: '/dashboard/drivers', label: 'Drivers', icon: Truck },
  { href: '/dashboard/tracking', label: 'Tracking', icon: Map },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: 3 },
  { href: '/dashboard/help', label: 'Help & Support', icon: HelpCircle },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

// Bottom items - only Profile now
const bottomItems = [
  { href: '/dashboard/profile', label: 'Profile', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "hidden lg:flex flex-col h-screen sticky top-0 border-r bg-card transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo - Fixed height */}
      <div className="flex-shrink-0 p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                LogiTrack
              </span>
            </motion.div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-accent flex-shrink-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation - Takes remaining space */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all group relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="relative flex-shrink-0">
                <Icon className={cn(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium flex-1"
                >
                  {item.label}
                </motion.span>
              )}
              {!collapsed && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute right-3 w-1.5 h-6 bg-primary-foreground rounded-full"
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section - Only Profile now */}
      <div className="flex-shrink-0 p-4 border-t border-border">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all group",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-transform group-hover:scale-110 flex-shrink-0",
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          )
        })}
      </div>

      {/* User Profile - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 border-t border-border">
        {collapsed ? (
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto">
            <User className="h-4 w-4 text-white" />
          </div>
        ) : (
          <Link href="/dashboard/profile">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@logitrack.com</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </motion.aside>
  )
}