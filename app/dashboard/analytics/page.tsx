'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Map } from 'lucide-react'
import { 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Filter,
  Download,
  BarChart3,
  PieChart,
  LineChart as LineChartIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { DeliveryChart } from '../../components/analytics/DeliveryChart'
import { Shipment } from '../../types'

const mockShipments: Shipment[] = [
  // Use your existing mock data
]

const timeRanges = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last Quarter', value: 'quarter' },
  { label: 'Year to Date', value: 'ytd' },
]

const metrics = [
  {
    title: 'Total Revenue',
    value: '$124,850',
    change: '+12.5%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'from-emerald-500 to-green-500',
  },
  {
    title: 'Avg. Delivery Time',
    value: '2.4h',
    change: '-8.2%',
    trend: 'down' as const,
    icon: TrendingDown,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'On-Time Rate',
    value: '96.7%',
    change: '+2.3%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Customer Satisfaction',
    value: '4.8/5',
    change: '+0.2',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'from-amber-500 to-yellow-500',
  },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')
  const [chartType, setChartType] = useState('line')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Insights and performance metrics for your logistics operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg">
            <Calendar className="w-4 h-4 mr-2" />
            {timeRanges.find(t => t.value === timeRange)?.label}
          </Button>
          <Button variant="outline" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card className="border-0 shadow-lg backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {timeRanges.map(range => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          metric.trend === 'up'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg bg-linear-to-br ${metric.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

     {/* Main Chart */}
<Card className="border-0 shadow-lg backdrop-blur-sm">
  <CardHeader>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Delivery Performance
        </CardTitle>
        <CardDescription>
          Track delivery metrics and performance trends
        </CardDescription>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex border rounded-lg overflow-hidden">
          {[
            { type: 'line', icon: LineChartIcon, label: 'Line' },
            { type: 'bar', icon: BarChart3, label: 'Bar' },
            { type: 'pie', icon: PieChart, label: 'Pie' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.type}
                onClick={() => setChartType(item.type)}
                className={`px-3 py-2 flex items-center gap-2 transition-colors ${
                  chartType === item.type
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            )
          })}
        </div>
        <Button variant="outline" size="lg">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <div className="h-96 min-h-96 w-full">
      <DeliveryChart shipments={mockShipments} />
    </div>
  </CardContent>
</Card>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipment Status Distribution */}
        <Card className="border-0 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-6 h-6 text-primary" />
              Shipment Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'Delivered', count: 245, color: 'bg-emerald-500', percentage: 45 },
                { status: 'In Transit', count: 120, color: 'bg-blue-500', percentage: 22 },
                { status: 'Out for Delivery', count: 85, color: 'bg-purple-500', percentage: 16 },
                { status: 'Pending', count: 65, color: 'bg-gray-500', percentage: 12 },
                { status: 'Delayed', count: 25, color: 'bg-red-500', percentage: 5 },
              ].map((item, index) => (
                <div key={item.status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="font-medium">{item.status}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Drivers */}
        <Card className="border-0 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Top Performing Drivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Sarah Miller', deliveries: 1890, rating: 4.9, onTime: 98.2 },
                { name: 'John Carter', deliveries: 1245, rating: 4.8, onTime: 96.7 },
                { name: 'Robert Chen', deliveries: 956, rating: 4.7, onTime: 94.5 },
                { name: 'Maria Garcia', deliveries: 745, rating: 4.6, onTime: 93.8 },
                { name: 'David Wilson', deliveries: 620, rating: 4.5, onTime: 92.1 },
              ].map((driver, index) => (
                <motion.div
                  key={driver.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {driver.deliveries.toLocaleString()} deliveries
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{driver.rating}</span>
                    </div>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      {driver.onTime}% on time
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Region */}
        <Card className="border-0 shadow-lg backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-6 h-6 text-primary" />
              Revenue by Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { region: 'North America', revenue: 65240, growth: 15.2 },
                { region: 'Europe', revenue: 42180, growth: 8.7 },
                { region: 'Asia Pacific', revenue: 31250, growth: 22.4 },
                { region: 'Middle East', revenue: 15680, growth: 18.9 },
              ].map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-linear-to-br from-primary/5 to-primary/10"
                >
                  <p className="text-sm text-muted-foreground">{region.region}</p>
                  <p className="text-2xl font-bold mt-2">
                    ${region.revenue.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      +{region.growth}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}