// app/dashboard/help/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  Video, 
  BookOpen,
  Search,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('faq')

  const faqs = [
    {
      question: 'How do I track a shipment?',
      answer: 'Go to the Tracking page and enter the tracking number. You can also view all active shipments on the Dashboard map.',
      category: 'Tracking'
    },
    {
      question: 'How do I create a new shipment?',
      answer: 'Click "Create Shipment" on the dashboard or go to the Shipments page. Fill in the origin, destination, and item details.',
      category: 'Shipments'
    },
    {
      question: 'How do I assign a driver to a shipment?',
      answer: 'On the shipment details page, click "Assign Driver" and select from available drivers. The system will suggest optimal assignments.',
      category: 'Drivers'
    },
    {
      question: 'How do I generate reports?',
      answer: 'Use the Analytics page for detailed reports. You can export data as CSV, PDF, or Excel from the Export menu.',
      category: 'Analytics'
    },
    {
      question: 'What do the shipment statuses mean?',
      answer: 'Pending: Awaiting pickup. In Transit: On the way. Out for Delivery: Being delivered today. Delivered: Successfully delivered.',
      category: 'Shipments'
    },
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: '24/7 support line',
      contact: '+1 (800) 123-4567',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Response within 2 hours',
      contact: 'support@logitrack.com',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Available 9AM-6PM EST',
      contact: 'Start Chat',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Globe,
      title: 'Community Forum',
      description: 'Ask other users',
      contact: 'Visit Forum',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
  ]

  const resources = [
    {
      icon: FileText,
      title: 'User Manual',
      description: 'Complete guide to all features',
      link: '#',
      tag: 'PDF'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      link: '#',
      tag: 'Video'
    },
    {
      icon: BookOpen,
      title: 'API Documentation',
      description: 'Developer API references',
      link: '#',
      tag: 'Tech'
    },
    {
      icon: Lightbulb,
      title: 'Best Practices',
      description: 'Optimization tips & tricks',
      link: '#',
      tag: 'Guide'
    },
  ]

  return (
    <div className="min-h-screen bg-linea-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-linear-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Help & Support
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 mt-2 text-lg"
          >
            Find answers, guides, and support resources
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for help articles, guides, or FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 text-lg py-6"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Tracking Issues
                </Button>
                <Button variant="outline" size="sm">
                  Shipment Creation
                </Button>
                <Button variant="outline" size="sm">
                  Driver Management
                </Button>
                <Button variant="outline" size="sm">
                  Analytics Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq" className="gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Phone className="w-4 h-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="tips" className="gap-2">
              <Lightbulb className="w-4 h-4" />
              Tips
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                              {faq.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {faq.answer}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 rounded-full ${method.bgColor} flex items-center justify-center mx-auto mb-4`}>
                          <Icon className={`w-8 h-8 ${method.color}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {method.description}
                        </p>
                        <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                          {method.contact}
                        </p>
                        <Button variant="outline" className="w-full">
                          Contact Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                            <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {resource.title}
                              </h3>
                              <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                                {resource.tag}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                              {resource.description}
                            </p>
                            <Button variant="link" className="p-0 h-auto">
                              Learn More →
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Pro Tips & Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-emerald-700 dark:text-emerald-400">
                          Optimize Delivery Routes
                        </h4>
                        <p className="text-emerald-600 dark:text-emerald-300 text-sm mt-1">
                          Use the route optimization feature to reduce fuel costs by up to 15% and improve delivery times.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-700 dark:text-blue-400">
                          Real-time Tracking
                        </h4>
                        <p className="text-blue-600 dark:text-blue-300 text-sm mt-1">
                          Enable customer notifications for shipment updates to reduce support inquiries by 40%.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-purple-700 dark:text-purple-400">
                          Driver Performance
                        </h4>
                        <p className="text-purple-600 dark:text-purple-300 text-sm mt-1">
                          Review driver analytics monthly to identify training opportunities and improve on-time rates.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="border-2 border-red-200 dark:border-red-800 bg-linear-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-300">
                      Urgent Support Needed?
                    </h3>
                    <p className="text-red-600 dark:text-red-400">
                      Critical shipment issues or system emergencies
                    </p>
                  </div>
                </div>
                <Button variant="destructive" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Emergency Hotline
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}