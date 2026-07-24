'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
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
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: 'Tracking',
    href: '/tracking',
    icon: <Package className="w-5 h-5" />,
    badge: '3'
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
    badge: '4'
  },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-64 flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              LogiTrack
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Logistics Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search shipments, drivers..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg transition-colors group",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                    )}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  
                  {item.badge && (
                    <Badge 
                      className={cn(
                        "text-xs px-2 py-1",
                        isActive
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Button className="w-full justify-start gap-3" variant="outline">
              <Package className="w-4 h-4" />
              New Shipment
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline">
              <Sparkles className="w-4 h-4" />
              Optimize Routes
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline">
              <Settings className="w-4 h-4" />
              System Settings
            </Button>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                John Driver
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Dispatcher
              </p>
            </div>
          </div>
          
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}