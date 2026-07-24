import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/providers/ThemeProvider'
import { Toaster } from 'react-hot-toast'
import { QueryProvider } from './components/providers/QueryProvider'
import { WebSocketProvider } from './components/providers/WebSocketProvider'
import { AuthProvider } from './components/providers/AuthProvider'
import { MobileNav } from './components/navigation'
import { headers } from 'next/headers'
import { NavigationProvider } from './components/providers/NavigationProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LogiTrack | Logistics & Delivery Tracking',
  description: 'Real-time GPS tracking, delivery status updates, route optimization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // You can check if it's a dashboard route
  // This will be evaluated on the server
  const isDashboardRoute = false // Will be determined by pathname
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <WebSocketProvider>
                <NavigationProvider>
                {children}
                </NavigationProvider>
              </WebSocketProvider>
            </AuthProvider>
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}