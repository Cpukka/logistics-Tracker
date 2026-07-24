'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  Package, 
  Truck, 
  Map, 
  BarChart, 
  Settings,
  User,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useTheme } from 'next-themes';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="w-5 h-5" />,
    badge: 'live'
  },
  {
    label: 'Tracking',
    href: '/tracking',
    icon: <Package className="w-5 h-5" />,
    badge: '3 active'
  },
  {
    label: 'Shipments',
    href: '/shipments',
    icon: <Truck className="w-5 h-5" />,
    badge: '12'
  },
  {
    label: 'Live Map',
    href: '/map',
    icon: <Map className="w-5 h-5" />,
    badge: 'live'
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: <BarChart className="w-5 h-5" />,
  },
  {
    label: 'Drivers',
    href: '/drivers',
    icon: <User className="w-5 h-5" />,
    badge: '4 active'
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

const quickActions = [
  {
    label: 'New Shipment',
    href: '/shipments/new',
    icon: <Package className="w-4 h-4" />,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    label: 'Track Package',
    href: '/tracking',
    icon: <Search className="w-4 h-4" />,
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    label: 'Route Optimizer',
    href: '/routes/optimize',
    icon: <Sparkles className="w-4 h-4" />,
    color: 'bg-purple-500 hover:bg-purple-600'
  },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [notifications] = useState(3); // Mock notification count

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  LogiTrack
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Logistics Dashboard
                </p>
              </div>
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">
                John Driver
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dispatcher • NYC Hub
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                onClick={closeMenu}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg text-white transition-colors",
                  action.color
                )}
              >
                {action.icon}
                <span className="text-xs font-medium mt-2 text-center">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      )}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    
                    {item.badge && (
                      <Badge 
                        className={cn(
                          "text-xs px-2 py-1",
                          item.badge === 'live'
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    
                    {isActive && (
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* System Status */}
          <div className="mt-6 p-4 bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                System Status
              </span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400">
                  Online
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Active Shipments</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span>Drivers Online</span>
                <span className="font-medium">8/12</span>
              </div>
              <div className="flex justify-between">
                <span>API Response</span>
                <span className="font-medium">45ms</span>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Appearance
              </span>
              <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                    theme === 'light'
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                    theme === 'dark'
                      ? "bg-gray-800 text-white shadow"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  Dark
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                    theme === 'system'
                      ? "bg-gray-800 text-white shadow"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  Auto
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Sign Out</span>
          </button>
          
          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>LogiTrack v2.1.4</p>
            <p className="mt-1">© 2024 Logistics Solutions Inc.</p>
          </div>
        </div>
      </div>
    </>
  );
}