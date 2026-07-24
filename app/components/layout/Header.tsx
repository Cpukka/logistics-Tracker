'use client'

import { useState } from 'react'
import { Package, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  User,
  Settings,
  LogOut,
  HelpCircle
} from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/utils'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../providers/AuthProvider'
import toast from 'react-hot-toast'

export function Header() {
  const router = useRouter()
  const { signOut, user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New shipment created', time: '2 min ago', read: false },
    { id: 2, message: 'Driver John arrived at destination', time: '15 min ago', read: false },
    { id: 3, message: 'Route optimization completed', time: '1 hour ago', read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const unreadNotifications = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
    setShowUserMenu(false)
  }

  const handleLogout = async () => {
    console.log('📄 Header: Logout clicked')
    setShowUserMenu(false)
    setIsMenuOpen(false)
    await signOut()
  }

  // Get user display name
  const displayName = user?.name || 'Admin User'
  const displayEmail = user?.email || 'admin@logitrack.com'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side - Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-accent"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigation('/dashboard')}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hidden sm:inline-block">
              LogiTrack
            </span>
          </motion.div>
        </div>

        {/* Center - Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 max-w-2xl mx-4 hidden lg:block"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search shipments, drivers, or locations..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Right side - Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          {/* Mobile Search */}
          <button className="lg:hidden p-2 rounded-md hover:bg-accent">
            <Search className="h-5 w-5" />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 rounded-lg border bg-popover shadow-lg z-50"
                >
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-primary hover:underline"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "p-4 border-b hover:bg-accent transition-colors cursor-pointer",
                            !notification.read && "bg-primary/5"
                          )}
                          onClick={() => {
                            setNotifications(
                              notifications.map(n =>
                                n.id === notification.id ? { ...n, read: true } : n
                              )
                            )
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "h-2 w-2 rounded-full mt-1.5",
                              notification.read ? "bg-muted" : "bg-primary"
                            )} />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t text-center">
                    <Button variant="ghost" size="sm" className="w-full">
                      View all notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </Button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 rounded-lg border bg-popover shadow-lg z-50"
                >
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{displayName}</p>
                        <p className="text-xs text-muted-foreground">{displayEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button 
                      className="flex items-center gap-3 w-full p-2 rounded hover:bg-accent text-sm text-foreground"
                      onClick={() => handleNavigation('/dashboard/profile')}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    
                    <Link href="/dashboard/settings">
                      <button 
                        className="flex items-center gap-3 w-full p-2 rounded hover:bg-accent text-sm text-foreground"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                    </Link>
                    
                    <Link href="/dashboard/help">
                      <button 
                        className="flex items-center gap-3 w-full p-2 rounded hover:bg-accent text-sm text-foreground"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <HelpCircle className="h-4 w-4" />
                        Help & Support
                      </button>
                    </Link>
                    
                    <div className="border-t my-2" />
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-2 rounded hover:bg-accent text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t"
          >
            <div className="container px-4 py-4 space-y-2">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <button 
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-accent text-foreground"
                onClick={() => handleNavigation('/dashboard')}
              >
                <User className="h-5 w-5" />
                Dashboard
              </button>
              
              <button 
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-accent text-foreground"
                onClick={() => handleNavigation('/dashboard/shipments')}
              >
                <Package className="h-5 w-5" />
                Shipments
              </button>
              
              <button 
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-accent text-foreground"
                onClick={() => handleNavigation('/dashboard/drivers')}
              >
                <Truck className="h-5 w-5" />
                Drivers
              </button>
              
              <button 
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-accent text-foreground"
                onClick={() => handleNavigation('/dashboard/settings')}
              >
                <Settings className="h-5 w-5" />
                Settings
              </button>
              
              <button 
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-accent text-foreground"
                onClick={() => handleNavigation('/dashboard/help')}
              >
                <HelpCircle className="h-5 w-5" />
                Help & Support
              </button>
              
              <div className="border-t my-2" />
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-accent text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}