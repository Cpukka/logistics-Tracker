// app/services/optimizationService.ts
import { Shipment, Driver, Route, Location } from '../types'

export interface OptimizationResult {
  routes: Route[]
  metrics: {
    totalDistance: number
    totalTime: number
    totalCost: number
    efficiency: number
    utilization: number
  }
  assignments: {
    driverId: string
    shipmentIds: string[]
    sequence: number[]
  }[]
}

export interface OptimizationConstraints {
  maxDistance?: number
  maxTime?: number
  maxShipments?: number
  vehicleCapacity?: number
  timeWindows?: {
    start: Date
    end: Date
  }[]
}

export class OptimizationService {
  private static instance: OptimizationService

  static getInstance(): OptimizationService {
    if (!OptimizationService.instance) {
      OptimizationService.instance = new OptimizationService()
    }
    return OptimizationService.instance
  }

  // Main optimization method
  async optimizeRoutes(
    shipments: Shipment[],
    drivers: Driver[],
    constraints?: OptimizationConstraints
  ): Promise<OptimizationResult> {
    // Validate inputs
    if (shipments.length === 0) {
      return this.createEmptyResult()
    }

    if (drivers.length === 0) {
      throw new Error('No drivers available for optimization')
    }

    // Group shipments by priority
    const grouped = this.groupShipmentsByPriority(shipments)

    // Assign shipments to drivers
    const assignments = await this.assignShipmentsToDrivers(
      grouped,
      drivers,
      constraints
    )

    // Calculate optimal routes for each driver
    const routes = await Promise.all(
      assignments.map(async (assignment) => {
        return this.calculateRoute(
          assignment.driverId,
          assignment.shipmentIds,
          drivers.find(d => d.id === assignment.driverId)!
        )
      })
    )

    // Calculate metrics
    const metrics = this.calculateMetrics(routes, shipments)

    // Convert assignments to include sequence
    const assignmentsWithSequence = assignments.map(assignment => ({
      ...assignment,
      sequence: assignment.shipmentIds.map((_, index) => index),
    }))

    return {
      routes,
      metrics,
      assignments: assignmentsWithSequence,
    }
  }

  private groupShipmentsByPriority(shipments: Shipment[]): Shipment[][] {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
    
    const sorted = [...shipments].sort((a, b) => {
      return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3)
    })

    const groups: Shipment[][] = []
    const groupSize = Math.ceil(sorted.length / 4)
    
    for (let i = 0; i < sorted.length; i += groupSize) {
      groups.push(sorted.slice(i, i + groupSize))
    }

    return groups
  }

  private async assignShipmentsToDrivers(
    groupedShipments: Shipment[][],
    drivers: Driver[],
    constraints?: OptimizationConstraints
  ): Promise<{ driverId: string; shipmentIds: string[] }[]> {
    const assignments: { driverId: string; shipmentIds: string[] }[] = []
    
    // Get available drivers
    const availableDrivers = drivers.filter(
      d => d.status === 'available' || d.status === 'on_duty'
    )

    if (availableDrivers.length === 0) {
      throw new Error('No available drivers found')
    }

    // Sort drivers by rating
    const sortedDrivers = [...availableDrivers].sort(
      (a, b) => (b.rating || 0) - (a.rating || 0)
    )

    // Assign shipments to drivers
    let driverIndex = 0
    for (const group of groupedShipments) {
      const driver = sortedDrivers[driverIndex % sortedDrivers.length]
      const shipmentIds = group.map(s => s.id)
      
      // Check capacity constraints
      if (constraints?.maxShipments && shipmentIds.length > constraints.maxShipments) {
        // Split into multiple assignments
        const chunks = this.chunkArray(shipmentIds, constraints.maxShipments)
        for (const chunk of chunks) {
          assignments.push({
            driverId: driver.id,
            shipmentIds: chunk,
          })
        }
      } else {
        assignments.push({
          driverId: driver.id,
          shipmentIds,
        })
      }
      
      driverIndex++
    }

    return assignments
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  private async calculateRoute(
    driverId: string,
    shipmentIds: string[],
    driver: Driver
  ): Promise<Route> {
    // Mock route calculation
    // In production, use Google Maps API or similar
    const waypoints: Location[] = [
      driver.currentLocation,
      ...shipmentIds.map(() => ({
        address: 'Delivery Point',
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.0060 + (Math.random() - 0.5) * 0.1,
      })),
    ]

    const totalDistance = waypoints.reduce((sum, _, i) => {
      if (i === 0) return 0
      return sum + 5 + Math.random() * 10 // Mock distance
    }, 0)

    const estimatedDuration = totalDistance * 2 // Mock time calculation

    return {
      id: `route_${Date.now()}_${driverId}`,
      driverId,
      shipments: shipmentIds,
      waypoints,
      distance: totalDistance,
      estimatedDuration,
      startTime: new Date(),
      optimized: true,
      status: 'planned',
    }
  }

  private calculateMetrics(
    routes: Route[],
    shipments: Shipment[]
  ): OptimizationResult['metrics'] {
    const totalDistance = routes.reduce((sum, r) => sum + r.distance, 0)
    const totalTime = routes.reduce((sum, r) => sum + r.estimatedDuration, 0)
    const totalCost = totalDistance * 0.5 // Mock cost calculation

    // Calculate efficiency
    const optimalDistance = shipments.reduce((sum, s) => sum + (s.distance || 0), 0)
    const efficiency = optimalDistance > 0 
      ? Math.min((optimalDistance / totalDistance) * 100, 100)
      : 100

    // Calculate utilization
    const usedDrivers = routes.filter(r => r.shipments.length > 0).length
    const totalDrivers = routes.length || 1
    const utilization = (usedDrivers / totalDrivers) * 100

    return {
      totalDistance,
      totalTime,
      totalCost,
      efficiency,
      utilization,
    }
  }

  private createEmptyResult(): OptimizationResult {
    return {
      routes: [],
      metrics: {
        totalDistance: 0,
        totalTime: 0,
        totalCost: 0,
        efficiency: 100,
        utilization: 0,
      },
      assignments: [],
    }
  }

  // Static method to validate optimization request
  static validateRequest(
    shipments: Shipment[],
    drivers: Driver[]
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (shipments.length === 0) {
      errors.push('At least one shipment is required')
    }

    if (drivers.length === 0) {
      errors.push('At least one driver is required')
    }

    // Check for duplicate shipment IDs
    const shipmentIds = shipments.map(s => s.id)
    if (new Set(shipmentIds).size !== shipmentIds.length) {
      errors.push('Duplicate shipment IDs found')
    }

    // Check for duplicate driver IDs
    const driverIds = drivers.map(d => d.id)
    if (new Set(driverIds).size !== driverIds.length) {
      errors.push('Duplicate driver IDs found')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }
}

// Export singleton instance
export const optimizationService = OptimizationService.getInstance()