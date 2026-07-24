// app/components/providers/AuthProvider.tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'dispatcher' | 'driver' | 'customer'
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string, redirectTo?: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

// Helper function to set cookie
const setCookie = (name: string, value: any, days: number = 7) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${JSON.stringify(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

// Helper function to remove cookie
const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  // Check for existing auth on mount (check both localStorage and cookie)
  useEffect(() => {
    console.log('🔍 AuthProvider: Checking for existing user...')
    
    // Check localStorage first
    let storedUser = localStorage.getItem('auth_user')
    
    // If not in localStorage, check cookie
    if (!storedUser) {
      const cookies = document.cookie.split('; ')
      const authCookie = cookies.find(row => row.startsWith('auth_user='))
      if (authCookie) {
        try {
          const cookieValue = authCookie.split('=')[1]
          storedUser = decodeURIComponent(cookieValue)
        } catch (error) {
          console.error('Failed to parse auth cookie:', error)
        }
      }
    }
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        console.log('✅ AuthProvider: Found stored user:', parsedUser)
        setUser(parsedUser)
        
        // Also set cookie to ensure consistency
        setCookie('auth_user', parsedUser)
        
        // Redirect if on login/register page
        const pathname = window.location.pathname
        if (pathname === '/login' || pathname === '/register' || pathname === '/') {
          console.log('🔄 AuthProvider: Redirecting to dashboard from init')
          window.location.href = '/dashboard'
        }
      } catch (error) {
        console.error('❌ AuthProvider: Failed to parse stored user:', error)
        localStorage.removeItem('auth_user')
        removeCookie('auth_user')
      }
    }
    setIsInitialized(true)
    console.log('✅ AuthProvider: Initialized')
  }, [])

  const signIn = async (email: string, password: string, redirectTo?: string) => {
    console.log(`🔐 AuthProvider: signIn called with email: ${email}`)
    setIsLoading(true)
    
    try {
      if (!email || !password) {
        toast.error('Please enter email and password')
        setIsLoading(false)
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const userData: User = {
        id: '1',
        email: email,
        name: email.split('@')[0] || 'Demo User',
        role: 'admin'
      }
      
      console.log('✅ AuthProvider: Login successful, user:', userData)
      setUser(userData)
      
      // Save to localStorage
      localStorage.setItem('auth_user', JSON.stringify(userData))
      
      // Save to cookie for middleware
      setCookie('auth_user', userData)
      
      toast.success('Logged in successfully!')
      
      // Redirect
      const redirectPath = redirectTo || '/dashboard'
      console.log(`🔄 AuthProvider: Redirecting to ${redirectPath}`)
      window.location.href = redirectPath
      
    } catch (error) {
      console.error('❌ AuthProvider: Login error:', error)
      toast.error('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    console.log(`🔐 AuthProvider: signUp called with name: ${name}, email: ${email}`)
    setIsLoading(true)
    
    try {
      if (!name || !email || !password) {
        toast.error('Please fill in all fields')
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        setIsLoading(false)
        return
      }

      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newUser: User = {
        id: '2',
        email,
        name,
        role: 'manager'
      }
      
      console.log('✅ AuthProvider: Registration successful, user:', newUser)
      setUser(newUser)
      
      // Save to localStorage
      localStorage.setItem('auth_user', JSON.stringify(newUser))
      
      // Save to cookie for middleware
      setCookie('auth_user', newUser)
      
      toast.success('Account created successfully!')
      
      console.log('🔄 AuthProvider: Redirecting to dashboard')
      window.location.href = '/dashboard'
      
    } catch (error) {
      console.error('❌ AuthProvider: Registration error:', error)
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // app/components/providers/AuthProvider.tsx - Update signOut function

const signOut = async () => {
  console.log('🔐 AuthProvider: signOut called')
  setIsLoading(true)
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('✅ AuthProvider: Logout successful')
    
    // Clear all auth data
    setUser(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    
    // Remove cookie
    document.cookie = 'auth_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    
    toast.success('Logged out successfully')
    
    // Force redirect to homepage with hard navigation
    console.log('🔄 AuthProvider: Redirecting to homepage')
    window.location.href = '/'
    
  } catch (error) {
    console.error('❌ AuthProvider: Logout error:', error)
    toast.error('Logout failed')
    // Even if error, force redirect
    window.location.href = '/'
  } finally {
    setIsLoading(false)
  }
}

  const value = {
    user,
    signIn,
    signOut,
    signUp,
    isLoading,
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}