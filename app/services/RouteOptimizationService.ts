import { Shipment, Driver, RouteOptimizationRequest, OptimizedRoute } from '../types'

export class RouteOptimizationService {
  static async optimizeRoutes(request: RouteOptimizationRequest): Promise<OptimizedRoute> {
    // This is a simplified version - in production, use Google Maps API, OR-Tools, etc.
    
    const { shipments, drivers, constraints, objectives = ['minDistance'] } = request
    
    // Group shipments by proximity
    const groupedShipments = this.groupByProximity(shipments)
    
    // Assign to drivers based on capacity and location
    const assignments = this.assignToDrivers(groupedShipments, drivers, constraints)
    
    // Calculate optimized routes
    const optimizedRoutes = await Promise.all(
      assignments.map(async (assignment) => {
        const route = await this.calculateOptimalRoute(assignment.shipments)
        // Create the sequence array (order of shipment IDs)
        const sequence = assignment.shipments.map((s, index) => index)
        return {
          driverId: assignment.driverId,
          shipmentIds: assignment.shipments.map(s => s.id),
          sequence: sequence,
          route: route, // Add the route data here
        }
      })
    )
    
    // Calculate metrics
    const metrics = this.calculateMetrics(optimizedRoutes, shipments)
    
    // Get the first route for the main route property
    const firstRoute = optimizedRoutes[0]?.route || { 
      waypoints: [], 
      distance: 0, 
      estimatedDuration: 0 
    }
    
    return {
      route: firstRoute,
      assignments: optimizedRoutes,
      metrics,
    }
  }

  private static groupByProximity(shipments: Shipment[], maxDistance: number = 50): Shipment[][] {
    // Simple clustering algorithm
    const groups: Shipment[][] = []
    const visited = new Set<string>()
    
    shipments.forEach(shipment => {
      if (!visited.has(shipment.id)) {
        const group = [shipment]
        visited.add(shipment.id)
        
        shipments.forEach(other => {
          if (!visited.has(other.id)) {
            const distance = this.calculateDistance(
              shipment.destination,
              other.destination
            )
            if (distance <= maxDistance) {
              group.push(other)
              visited.add(other.id)
            }
          }
        })
        
        groups.push(group)
      }
    })
    
    return groups
  }

  private static assignToDrivers(
    groupedShipments: Shipment[][], 
    drivers: Driver[], 
    constraints?: RouteOptimizationRequest['constraints']
  ): Array<{ driverId: string; shipments: Shipment[] }> {
    const assignments: Array<{ driverId: string; shipments: Shipment[] }> = []
    
    // Sort drivers by availability or rating
    const availableDrivers = drivers.filter(d => d.status === 'available' || d.status === 'on_duty')
    
    // Simple assignment: each group goes to the nearest driver
    groupedShipments.forEach((group) => {
      if (availableDrivers.length === 0) {
        // If no drivers available, assign to first driver
        const driver = drivers[0]
        if (driver) {
          assignments.push({ driverId: driver.id, shipments: group })
        }
        return
      }
      
      // Find the nearest driver for this group
      const groupCenter = this.calculateCenter(group)
      let bestDriver = availableDrivers[0]
      let bestDistance = Infinity
      
      availableDrivers.forEach(driver => {
        const distance = this.calculateDistance(
          groupCenter,
          driver.currentLocation
        )
        if (distance < bestDistance) {
          bestDistance = distance
          bestDriver = driver
        }
      })
      
      assignments.push({ driverId: bestDriver.id, shipments: group })
    })
    
    return assignments
  }

  private static calculateCenter(shipments: Shipment[]): { lat: number; lng: number } {
    if (shipments.length === 0) {
      return { lat: 0, lng: 0 }
    }
    
    const totalLat = shipments.reduce((sum, s) => sum + s.destination.lat, 0)
    const totalLng = shipments.reduce((sum, s) => sum + s.destination.lng, 0)
    
    return {
      lat: totalLat / shipments.length,
      lng: totalLng / shipments.length,
    }
  }

  private static calculateDistance(loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }): number {
    // Haversine formula
    const R = 6371 // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180
    const dLon = (loc2.lng - loc1.lng) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  private static async calculateOptimalRoute(shipments: Shipment[]): Promise<any> {
    // Use Google Maps Directions API or similar
    // For now, return mock data
    return {
      waypoints: shipments.map(s => s.destination),
      distance: shipments.reduce((sum, s) => sum + (s.distance || 0), 0),
      estimatedDuration: shipments.reduce((sum, s) => sum + (s.estimatedDuration || 0), 0),
      polyline: '', // Encoded polyline from API
    }
  }

  private static calculateMetrics(
    optimizedRoutes: Array<{ driverId: string; shipmentIds: string[]; sequence: number[]; route: any }>, 
    shipments: Shipment[]
  ): {
    totalDistance: number;
    totalTime: number;
    totalCost: number;
    efficiency: number;
    utilization: number;
  } {
    // Calculate total distance and time from routes
    const totalDistance = optimizedRoutes.reduce((sum, r) => sum + (r.route?.distance || 0), 0)
    const totalTime = optimizedRoutes.reduce((sum, r) => sum + (r.route?.estimatedDuration || 0), 0)
    
    // Calculate efficiency (higher is better)
    const optimalDistance = shipments.reduce((sum, s) => sum + (s.distance || 0), 0)
    const actualDistance = totalDistance
    const efficiency = actualDistance > 0 ? Math.min((optimalDistance / actualDistance) * 100, 100) : 100
    
    // Calculate utilization (percentage of drivers used)
    const usedDrivers = optimizedRoutes.filter(r => r.shipmentIds.length > 0).length
    const totalDrivers = optimizedRoutes.length || 1
    const utilization = totalDrivers > 0 ? (usedDrivers / totalDrivers) * 100 : 0
    
    return {
      totalDistance,
      totalTime,
      totalCost: totalDistance * 0.5, // Mock cost calculation
      efficiency: Math.min(efficiency, 100),
      utilization,
    }
  }
}