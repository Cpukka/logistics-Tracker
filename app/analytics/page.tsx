// app/analytics/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  LineChart,
  Calendar,
  Download,
  Filter,
  Users,
  Package,
  Truck,
  DollarSign,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month')
  const [chartType, setChartType] = useState('line')

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,850',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Total Shipments',
      value: '1,248',
      change: '+8.2%',
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Active Customers',
      value: '342',
      change: '+5.7%',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Avg. Delivery Time',
      value: '2.4h',
      change: '-15%',
      icon: Clock,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
  ]

  const chartData = [
    { month: 'Jan', shipments: 120, revenue: 9850 },
    { month: 'Feb', shipments: 135, revenue: 11200 },
    { month: 'Mar', shipments: 148, revenue: 12450 },
    { month: 'Apr', shipments: 142, revenue: 11800 },
    { month: 'May', shipments: 156, revenue: 13200 },
    { month: 'Jun', shipments: 168, revenue: 14200 },
  ]

  const topRoutes = [
    { route: 'NYC → Boston', shipments: 142, revenue: 12450, efficiency: 94 },
    { route: 'LA → SF', shipments: 128, revenue: 10800, efficiency: 89 },
    { route: 'Chicago → Detroit', shipments: 98, revenue: 8200, efficiency: 92 },
    { route: 'Dallas → Houston', shipments: 86, revenue: 7200, efficiency: 88 },
    { route: 'Seattle → Portland', shipments: 75, revenue: 6400, efficiency: 91 },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-linear-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Analytics Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 mt-2 text-lg"
          >
            Advanced insights and performance metrics
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Last 7 Days</SelectItem>
                        <SelectItem value="month">Last 30 Days</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                    <Select value={chartType} onValueChange={setChartType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Chart Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {metric.title}
                          </p>
                          <p className="text-2xl font-bold mt-2">
                            {metric.value}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-emerald-500">
                              {metric.change}
                            </span>
                            <span className="text-xs text-gray-500">from last month</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-full ${metric.bgColor}`}>
                          <Icon className={`w-6 h-6 ${metric.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Charts & Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  Shipments & Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      Chart Visualization
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      {chartType === 'line' && 'Line chart showing shipment and revenue trends over time'}
                      {chartType === 'bar' && 'Bar chart comparing shipment volumes across months'}
                      {chartType === 'pie' && 'Pie chart showing shipment distribution by status'}
                    </p>
                    <div className="mt-6">
                      <div className="flex justify-center space-x-4">
                        {chartData.map((data, index) => (
                          <div key={index} className="text-center">
                            <div className="text-sm text-gray-500">{data.month}</div>
                            <div className="text-lg font-bold">{data.shipments}</div>
                            <div className="text-xs text-gray-400">shipments</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Routes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Top Performing Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRoutes.map((route, index) => (
                    <div key={index} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {route.route}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {route.efficiency}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{route.shipments} shipments</span>
                        <span>${route.revenue.toLocaleString()}</span>
                      </div>
                      <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-linear-to-r from-primary to-purple-600"
                          style={{ width: `${route.efficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <PieChart className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">On-Time Delivery</h4>
                  <p className="text-3xl font-bold mt-2">96.7%</p>
                  <p className="text-sm text-gray-500 mt-1">+2.3% from last month</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <Users className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Customer Satisfaction</h4>
                  <p className="text-3xl font-bold mt-2">4.8/5</p>
                  <p className="text-sm text-gray-500 mt-1">Based on 342 reviews</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <TrendingUp className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Cost Efficiency</h4>
                  <p className="text-3xl font-bold mt-2">89%</p>
                  <p className="text-sm text-gray-500 mt-1">Optimized 124 routes this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Custom Analysis
            </Button>
            <Button variant="gradient" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Generate Insights
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}