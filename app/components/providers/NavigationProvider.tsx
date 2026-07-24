// app/components/providers/NavigationProvider.tsx
'use client'

import { usePathname } from 'next/navigation'
import { MobileNav } from '../navigation'
import { useAuth } from './AuthProvider'

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()
  
  // Show MobileNav only on dashboard routes and when user is logged in
  const isDashboardRoute = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/shipments') || 
                          pathname?.startsWith('/drivers') ||
                          pathname?.startsWith('/tracking')
  
  const showNavigation = isDashboardRoute && user
  
  return (
    <>
      {showNavigation && <MobileNav />}
      {children}
    </>
  )
}