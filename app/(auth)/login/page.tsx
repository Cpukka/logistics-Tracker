'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { useAuth } from '../../components/providers/AuthProvider'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('demo@logitrack.com') // Pre-filled for demo
  const [password, setPassword] = useState('password123') // Pre-filled for demo
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signIn, user } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }
    
    setIsLoading(true)
    
    try {
      await signIn(email, password)
      // The signIn function already handles toast and redirect
    } catch (error: any) {
      // Error is already handled in signIn, but just in case
      toast.error(error?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-purple-500/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <p className="text-muted-foreground mt-2">
              Sign in to your LogiTrack account
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary" 
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                loading={isLoading}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </Button>

              <div className="relative text-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative text-sm">
                  <span className="px-2 bg-background text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  type="button"
                  className="gap-2"
                  onClick={() => toast.success('Google auth coming soon!')}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829796 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                    <path fill="#34A853" d="M5.26620003,9.76452941 L1.23999023,6.65002441 C0.436787789,8.3873484 0,10.2471724 0,12 C0,14.0320361 0.729466845,16.0013016 1.98497449,17.5501535 L5.46972656,13.2675781 L5.26620003,9.76452941 Z"/>
                    <path fill="#FBBC05" d="M12.0172727,19.0909091 C8.81727273,19.0909091 5.78454545,17.5272727 4.23636364,14.5636364 L1.98497449,17.5501535 C3.12706079,19.6423956 5.69745455,21.0909091 8.98181818,21.0909091 C12.5090909,21.0909091 15.4909091,19.3636364 17.3636364,16.4 L13.8909091,12.6727273 C13.1090909,13.9090909 11.4909091,14.8272727 9.54545455,14.8272727 L9.54545455,14.8272727 L5.26620003,9.76452941 L12.0172727,19.0909091 Z"/>
                    <path fill="#4285F4" d="M21.8181818,12 C21.8181818,11.1454545 21.7818182,10.3272727 21.6727273,9.50909091 L12,9.50909091 L12,14.7454545 L17.4909091,14.7454545 C17.0909091,16.5090909 15.3090909,17.7090909 13.5090909,17.7090909 L13.5090909,17.7090909 L16.4181818,20.1727273 C19.8545455,18.4181818 21.8181818,15.4727273 21.8181818,12 Z"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  type="button"
                  className="gap-2"
                  onClick={() => toast.success('GitHub auth coming soon!')}
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  GitHub
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link 
                  href="/register" 
                  className="text-primary hover:underline font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>

              {/* Demo hint */}
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs text-center text-muted-foreground">
                  Demo: Use any email and password to login
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}