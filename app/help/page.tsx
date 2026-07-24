'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageCircle, 
  FileText, 
  Video, 
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
  CreditCard,
  Truck,
  Package,
  Map,
  Users,
  Settings,
  Headphones,
  Send,
  Copy,
  Check,
  ArrowRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Globe,
  Lock,
  UserCheck,
  FileCheck,
  Bell,
  Zap,
  Award,
  Bookmark
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs'
import toast from 'react-hot-toast'

// FAQ Data
const faqCategories = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: Rocket,
    questions: [
      {
        q: 'How do I create my first shipment?',
        a: 'To create your first shipment, navigate to the Dashboard, click on "New Shipment" in the operations section, fill in the required details (sender, recipient, package info), and submit. You\'ll receive a tracking number immediately.',
      },
      {
        q: 'How do I track a package?',
        a: 'You can track a package by entering the tracking number in the search bar at the top of the dashboard or using the dedicated tracking page. You can also scan QR codes on packages using your mobile device.',
      },
      {
        q: 'What is the estimated delivery time?',
        a: 'Delivery times vary based on the service level chosen. Standard shipping takes 3-5 business days, Express takes 1-2 business days, and Priority Same-Day is available in select areas.',
      },
    ]
  },
  {
    id: 'shipments',
    label: 'Shipments & Tracking',
    icon: Package,
    questions: [
      {
        q: 'How can I update shipment details?',
        a: 'You can update shipment details by finding the shipment in your dashboard, clicking on it, and using the "Edit" button. Note that some details (like tracking number) cannot be changed after creation.',
      },
      {
        q: 'What do the different statuses mean?',
        a: 'Statuses indicate the current stage: Pending (waiting for pickup), In Transit (on the way), Out for Delivery (en route to final destination), Delivered (successfully delivered), Delayed (unexpected hold).',
      },
      {
        q: 'Can I cancel a shipment?',
        a: 'Yes, shipments can be cancelled before they are picked up. Once in transit, cancellation requires contacting support. You\'ll receive a full refund if cancelled before pickup.',
      },
    ]
  },
  {
    id: 'drivers',
    label: 'Drivers & Fleet',
    icon: Truck,
    questions: [
      {
        q: 'How do I assign a driver to a shipment?',
        a: 'Navigate to the shipment details, click "Assign Driver", and select from the list of available drivers. You can also use the auto-assign feature which optimizes based on location and workload.',
      },
      {
        q: 'What are the driver requirements?',
        a: 'Drivers must have a valid driver\'s license, clean driving record, and pass our background check. They also need to complete our training program and have the proper vehicle insurance.',
      },
      {
        q: 'How does driver tracking work?',
        a: 'Drivers are tracked via GPS through our mobile app. You can see their real-time location on the Live Map, view their route history, and get estimated arrival times.',
      },
    ]
  },
  {
    id: 'billing',
    label: 'Billing & Payments',
    icon: CreditCard,
    questions: [
      {
        q: 'What payment methods are accepted?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and PayPal. Enterprise customers can also set up invoice-based billing.',
      },
      {
        q: 'How are shipping costs calculated?',
        a: 'Costs are based on package weight, dimensions, destination, and service level. Our pricing calculator provides instant estimates when creating a shipment.',
      },
      {
        q: 'When will I be charged?',
        a: 'Charges are processed at the time of shipment creation. For recurring or enterprise accounts, billing occurs on a monthly basis with detailed invoices.',
      },
    ]
  },
  {
    id: 'security',
    label: 'Security & Privacy',
    icon: Shield,
    questions: [
      {
        q: 'How is my data protected?',
        a: 'All data is encrypted in transit and at rest. We use industry-standard security protocols, undergo regular security audits, and comply with GDPR and CCPA regulations.',
      },
      {
        q: 'Who has access to shipment data?',
        a: 'Only authorized users within your organization have access. We never share your data with third parties without explicit consent.',
      },
      {
        q: 'How do I secure my account?',
        a: 'We recommend using a strong, unique password and enabling two-factor authentication. You can manage these settings in your Profile section.',
      },
    ]
  },
]

// Support Topics
const supportTopics = [
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for urgent issues',
    color: 'bg-blue-500'
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step guides and walkthroughs',
    color: 'bg-purple-500'
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Comprehensive API and user guides',
    color: 'bg-green-500'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Instant messaging with our support team',
    color: 'bg-amber-500'
  },
]

// Helpful Resources
const helpfulResources = [
  {
    title: 'API Documentation',
    description: 'Integrate LogiTrack with your applications',
    link: '/docs/api',
    icon: FileCode,
  },
  {
    title: 'Release Notes',
    description: 'See what\'s new in the latest updates',
    link: '/release-notes',
    icon: FileText,
  },
  {
    title: 'Community Forum',
    description: 'Connect with other LogiTrack users',
    link: '/community',
    icon: Users,
  },
  {
    title: 'Status Page',
    description: 'Check system availability and incidents',
    link: '/status',
    icon: Activity,
  },
]

// Contact Methods
const contactMethods = [
  {
    icon: Mail,
    label: 'Email Support',
    value: 'support@logitrack.com',
    action: 'mailto:support@logitrack.com',
    description: 'Response within 24 hours',
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    icon: Phone,
    label: 'Phone Support',
    value: '+1 (800) 555-0123',
    action: 'tel:+18005550123',
    description: 'Available 24/7',
    color: 'bg-green-500/10 text-green-500'
  },
  {
    icon: MessageCircle,
    label: 'Live Chat',
    value: 'Start Chat',
    action: '#',
    description: 'Average wait time: 2 minutes',
    color: 'bg-purple-500/10 text-purple-500'
  },
]

function Rocket(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
}

function FileCode(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <path d="M14 2v6h6"/>
    <path d="M10 13l-2 2 2 2M14 13l2 2-2 2"/>
  </svg>
}

function Activity(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 12h-4l-3 9-4-18-3 9H2"/>
  </svg>
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<Record<string, 'helpful' | 'unhelpful' | null>>({})
  const [copied, setCopied] = useState(false)

  // Filter FAQs based on search
  const filteredFaqs = faqCategories.reduce((acc, category) => {
    if (activeCategory !== 'all' && category.id !== activeCategory) return acc

    const filteredQuestions = category.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (filteredQuestions.length > 0) {
      acc.push({ ...category, questions: filteredQuestions })
    }
    return acc
  }, [] as typeof faqCategories)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('support@logitrack.com')
    setCopied(true)
    toast.success('Email copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFeedback = (questionId: string, value: 'helpful' | 'unhelpful') => {
    setFeedback(prev => ({ ...prev, [questionId]: prev[questionId] === value ? null : value }))
    toast.success(value === 'helpful' ? 'Thanks for your feedback! 👍' : 'We\'ll improve this answer 👎')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-card-foreground mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, get support, and learn how to make the most of LogiTrack
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles, topics, or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-background border-border h-14 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Found {filteredFaqs.reduce((acc, cat) => acc + cat.questions.length, 0)} results
            </p>
          )}
        </motion.div>

        {/* Quick Support Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {supportTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className={`p-3 ${topic.color} rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <topic.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-1">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              Frequently Asked Questions
            </h2>
            <Badge variant="outline" className="text-xs">
              {faqCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} articles
            </Badge>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All Topics
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            {filteredFaqs.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <category.icon className="w-5 h-5 text-primary" />
                    {category.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === `${category.id}-${index}` ? null : `${category.id}-${index}`)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-card-foreground">{faq.q}</span>
                        {expandedFaq === `${category.id}-${index}` ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedFaq === `${category.id}-${index}` && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4"
                          >
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.a}
                            </p>
                            
                            {/* Feedback buttons */}
                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                              <span className="text-sm text-muted-foreground">Was this helpful?</span>
                              <button
                                onClick={() => handleFeedback(`${category.id}-${index}`, 'helpful')}
                                className={`p-1.5 rounded transition-colors ${
                                  feedback[`${category.id}-${index}`] === 'helpful'
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleFeedback(`${category.id}-${index}`, 'unhelpful')}
                                className={`p-1.5 rounded transition-colors ${
                                  feedback[`${category.id}-${index}`] === 'unhelpful'
                                    ? 'bg-red-500/10 text-red-500'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            ))}

            {filteredFaqs.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or browse the categories above
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Headphones className="w-6 h-6 text-primary" />
                Still need help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Our support team is here to assist you with any questions or issues you may have.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-full ${method.color}`}>
                        <method.icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-medium text-card-foreground">{method.label}</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{method.value}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1"
                        onClick={() => {
                          if (method.action.startsWith('mailto')) {
                            window.location.href = method.action
                          } else if (method.action.startsWith('tel')) {
                            window.location.href = method.action
                          } else {
                            toast.success('Chat support coming soon!')
                          }
                        }}
                      >
                        {method.label === 'Email Support' ? (
                          <>
                            {copied ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                            <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-xs">Contact</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{method.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Helpful Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-card-foreground mb-6">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpfulResources.map((resource, index) => (
              <Link key={index} href={resource.link}>
                <Card className="hover:shadow-lg transition-all hover:border-primary/50 h-full group">
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <resource.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <div className="flex items-center gap-1 text-sm text-primary font-medium mt-3">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Documentation
            </Button>
            <Button variant="outline" className="gap-2">
              <Video className="w-4 h-4" />
              Video Tutorials
            </Button>
            <Button variant="outline" className="gap-2">
              <Bell className="w-4 h-4" />
              Status Updates
            </Button>
            <Button variant="gradient" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            LogiTrack Help Center v2.0 • Updated: December 2024
          </p>
        </motion.div>
      </div>
    </div>
  )
}