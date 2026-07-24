'use client'

import { useState, useEffect } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts'
import { Shipment } from '../../types'
import { motion } from 'framer-motion'

interface DeliveryChartProps {
  shipments: Shipment[]
}

export function DeliveryChart({ shipments }: DeliveryChartProps) {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate sample data
  const generateData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return days.map((day, index) => {
      const baseValue = 100
      const randomFactor = Math.random() * 50
      return {
        name: day,
        deliveries: Math.floor(baseValue + randomFactor),
        delays: Math.floor(randomFactor / 2),
        distance: Math.floor(500 + Math.random() * 300),
        efficiency: Math.floor(85 + Math.random() * 15),
      }
    })
  }

  const data = generateData()

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="deliveries" 
              stroke="#3B82F6" 
              fill="#3B82F6" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="delays" 
              stroke="#EF4444" 
              fill="#EF4444" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        )
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Bar dataKey="deliveries" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="delays" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="deliveries" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="delays" 
              stroke="#EF4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="efficiency" 
              stroke="#10B981" 
              strokeWidth={2}
            />
          </LineChart>
        )
    }
  }

  if (!mounted) {
    return (
      <div className="h-96 w-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading chart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Weekly Performance
        </h3>
        <div className="flex gap-2">
          {(['line', 'area', 'bar'] as const).map((type) => (
            <motion.button
              key={type}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChartType(type)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                chartType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="h-[calc(100%-3rem)] w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}