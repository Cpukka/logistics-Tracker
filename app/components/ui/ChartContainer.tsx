'use client'

import { ReactNode, useEffect, useState } from 'react'

interface ChartContainerProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}

export function ChartContainer({ 
  children, 
  title, 
  description, 
  className = '' 
}: ChartContainerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`h-96 w-full rounded-lg bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading chart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="h-96 min-h-96 w-full">
        {children}
      </div>
    </div>
  )
}