'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Truck,
  Package,
  Map,
  Users,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Star,
  Zap,
  Globe,
  Phone,
  Mail,
  MapPin,
  BarChart3,
  Settings,
  HelpCircle,
  LogIn,
  UserPlus,
  ArrowUpRight,
  Play,
  Check,
  Sparkles,
  TrendingUp,
  Award,
  Headphones,
  Building,
  Cloud,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from './components/ui/Button'
import { Input } from './components/ui/Input'
import { Card, CardContent } from './components/ui/Card'
import { Badge } from './components/ui/Badge'
import { cn } from './lib/utils'
import Image from 'next/image'

// Features data
const features = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Real-Time Tracking',
    description: 'Track your shipments in real-time with GPS precision and instant updates.',
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Smart Logistics',
    description: 'AI-powered route optimization and intelligent delivery scheduling.',
    color: 'bg-green-500/10 text-green-500'
  },
  {
    icon: <Map className="w-6 h-6" />,
    title: 'Live Mapping',
    description: 'Interactive maps showing driver locations and shipment progress.',
    color: 'bg-purple-500/10 text-purple-500'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Team Management',
    description: 'Efficiently manage drivers, dispatchers, and fleet operations.',
    color: 'bg-amber-500/10 text-amber-500'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise Security',
    description: 'Bank-grade security with end-to-end encryption and compliance.',
    color: 'bg-red-500/10 text-red-500'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer support and technical assistance.',
    color: 'bg-indigo-500/10 text-indigo-500'
  },
]

// Stats data
const stats = [
  { value: '50K+', label: 'Shipments Delivered', icon: Package },
  { value: '98.7%', label: 'On-Time Delivery Rate', icon: CheckCircle },
  { value: '1.2K+', label: 'Active Drivers', icon: Users },
  { value: '4.9', label: 'Average Driver Rating', icon: Star },
]

// Testimonials
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Logistics Manager',
    company: 'TechCorp Logistics',
    content: 'LogiTrack has revolutionized our delivery operations. We\'ve seen a 40% improvement in delivery times and our customers love the real-time tracking.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director',
    company: 'Global Express',
    content: 'The route optimization feature alone has saved us thousands in fuel costs. The platform is intuitive and the support team is exceptional.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Fleet Manager',
    company: 'City Delivery Co.',
    content: 'Managing our fleet has never been easier. The real-time tracking and driver management features are exactly what we needed.',
    rating: 5
  },
]

// Pricing plans
const pricingPlans = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for small businesses starting out',
    features: ['50 shipments/month', 'Basic tracking', 'Email support', '1 team member'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Professional',
    price: '$79',
    description: 'For growing businesses with more needs',
    features: ['500 shipments/month', 'Advanced tracking', 'Priority support', '10 team members', 'Route optimization'],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with complex needs',
    features: ['Unlimited shipments', 'Full features', '24/7 support', 'Custom integrations', 'Dedicated account manager'],
    cta: 'Contact Sales',
    popular: false
  },
]

export default function Home() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  })

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setAuthLoading(false)
    }
  }

  // Handle register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/dashboard')
    } catch (error) {
      console.error('Register error:', error)
    } finally {
      setAuthLoading(false)
    }
  }

  // Close modals on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLoginModalOpen(false)
        setIsRegisterModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                LogiTrack
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('features')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                <UserPlus className="w-4 h-4" />
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
            >
              <div className="px-4 py-4 space-y-3">
                <button
                  onClick={() => scrollToSection('features')}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent"
                >
                  Features
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent"
                >
                  Pricing
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent"
                >
                  Testimonials
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="pt-4 border-t border-border space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsLoginModalOpen(true)
                    }}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                  <Button
                    className="w-full justify-center gap-2 bg-gradient-to-r from-primary to-purple-600"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsRegisterModalOpen(true)
                    }}
                  >
                    <UserPlus className="w-4 h-4" />
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 gap-2">
                <Sparkles className="w-3 h-3" />
                Next-Gen Logistics Platform
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-card-foreground leading-tight mb-4">
                Smart Logistics &{' '}
                <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Real-Time Tracking
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Streamline your delivery operations with AI-powered route optimization, 
                real-time GPS tracking, and intelligent fleet management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => scrollToSection('features')}
                >
                  <Play className="w-4 h-4" />
                  See How It Works
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 border-2 border-background flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-bold text-card-foreground">2,000+</span> companies trust LogiTrack
                </div>
              </div>
            </motion.div>

            {/* Right Content - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-card/50 to-card rounded-2xl border border-border p-4 shadow-2xl">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">Live</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { status: 'In Transit', from: 'NYC', to: 'Boston', progress: 65, color: 'bg-blue-500' },
                      { status: 'Out for Delivery', from: 'LA', to: 'SF', progress: 90, color: 'bg-green-500' },
                      { status: 'Delivered', from: 'Chicago', to: 'Miami', progress: 100, color: 'bg-emerald-500' },
                    ].map((shipment, i) => (
                      <div key={i} className="bg-background rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{shipment.status}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {shipment.from} → {shipment.to}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${shipment.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${shipment.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-4">
              Everything You Need for{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Modern Logistics
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your delivery operations and boost efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6">
                    <div className={`p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from businesses that have transformed their logistics with LogiTrack.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 text-amber-500 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-card-foreground mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-4">
              Choose the Perfect Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options to fit your business needs. Start small and scale as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative",
                  plan.popular && "md:scale-105"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-purple-600">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card className={cn(
                  "h-full",
                  plan.popular && "border-primary/50 shadow-lg"
                )}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-card-foreground">{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={cn(
                        "w-full",
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                          : ""
                      )}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => setIsRegisterModalOpen(true)}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Get Started
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-4">
              Ready to Transform Your Logistics?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using LogiTrack to streamline their delivery operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  LogiTrack
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart logistics and real-time tracking for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection('features')}>Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')}>Pricing</button></li>
                <li>Integrations</li>
                <li>Changelog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>API Status</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 LogiTrack. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsLoginModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4">
                  <LogIn className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-card-foreground">Welcome Back</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Sign in to your LogiTrack account
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="admin@logitrack.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-border" />
                    Remember me
                  </label>
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" className="w-full gap-2" disabled={authLoading}>
                  {authLoading ? (
                    <>Loading...</>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setIsLoginModalOpen(false)
                    setIsRegisterModalOpen(true)
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>

              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {isRegisterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsRegisterModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-card-foreground">Create Account</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Start your free trial today
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Full Name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Confirm Password</label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border" required />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </div>
                <Button type="submit" className="w-full gap-2 bg-gradient-to-r from-primary to-purple-600" disabled={authLoading}>
                  {authLoading ? (
                    <>Creating account...</>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setIsRegisterModalOpen(false)
                    setIsLoginModalOpen(true)
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>

              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}