// app/services/driverService.ts
import { Driver, Location, Vehicle, DriverStatus } from '../types'

export interface DriverFilters {
  status?: DriverStatus
  search?: string
  minRating?: number
  maxDistance?: number
}

export class DriverService {
  private drivers: Driver[] = []
  private onDriversUpdate: ((drivers: Driver[]) => void) | null = null

  constructor(initialDrivers: Driver[] = []) {
    this.drivers = initialDrivers
  }

  // Get all drivers
  getDrivers(filters?: DriverFilters): Driver[] {
    let filtered = [...this.drivers]

    if (filters) {
      if (filters.status) {
        filtered = filtered.filter(d => d.status === filters.status)
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filtered = filtered.filter(d => 
          d.name.toLowerCase().includes(searchLower) ||
          d.contact.includes(searchLower) ||
          d.vehicle.plate.toLowerCase().includes(searchLower)
        )
      }
      if (filters.minRating) {
        filtered = filtered.filter(d => (d.rating || 0) >= filters.minRating!)
      }
    }

    return filtered
  }

  // Get driver by ID
  getDriverById(id: string): Driver | null {
    return this.drivers.find(d => d.id === id) || null
  }

  // Create new driver
  createDriver(driverData: Omit<Driver, 'id' | 'joinedDate'>): Driver {
    const newDriver: Driver = {
      ...driverData,
      id: `driver_${Date.now()}`,
      rating: driverData.rating || 0,
      totalDeliveries: driverData.totalDeliveries || 0,
      totalDistance: driverData.totalDistance || 0,
      joinedDate: new Date(),
      updatedAt: new Date(),
    }
    
    this.drivers.push(newDriver)
    this.notifyUpdate()
    return newDriver
  }

  // Update driver
  updateDriver(id: string, updates: Partial<Driver>): Driver | null {
    const index = this.drivers.findIndex(d => d.id === id)
    if (index === -1) return null

    // Remove updatedAt from updates to avoid type issues
    const { updatedAt, ...cleanUpdates } = updates

    this.drivers[index] = {
      ...this.drivers[index],
      ...cleanUpdates,
      updatedAt: new Date(),
    }
    
    this.notifyUpdate()
    return this.drivers[index]
  }

  // Update driver location
  updateDriverLocation(id: string, location: Location): Driver | null {
    return this.updateDriver(id, { currentLocation: location })
  }

  // Update driver status
  updateDriverStatus(id: string, status: DriverStatus): Driver | null {
    return this.updateDriver(id, { status })
  }

  // Assign shipment to driver
  assignShipment(driverId: string, shipmentId: string): Driver | null {
    const driver = this.getDriverById(driverId)
    if (!driver) return null

    return this.updateDriver(driverId, { 
      activeShipmentId: shipmentId,
      status: 'delivering'
    })
  }

  // Complete delivery
  completeDelivery(driverId: string, rating?: number): Driver | null {
    const driver = this.getDriverById(driverId)
    if (!driver) return null

    const totalDeliveries = (driver.totalDeliveries || 0) + 1
    const avgRating = rating 
      ? ((driver.rating || 0) * (driver.totalDeliveries || 0) + rating) / totalDeliveries
      : driver.rating

    return this.updateDriver(driverId, {
      totalDeliveries,
      rating: avgRating,
      activeShipmentId: undefined,
      status: 'available',
    })
  }

  // Get available drivers
  getAvailableDrivers(): Driver[] {
    return this.drivers.filter(d => d.status === 'available')
  }

  // Get drivers near location
  getDriversNearLocation(location: Location, radiusKm: number): Driver[] {
    return this.drivers.filter(driver => {
      const distance = this.calculateDistance(
        location,
        driver.currentLocation
      )
      return distance <= radiusKm
    })
  }

  // Calculate distance between two locations (Haversine formula)
  private calculateDistance(loc1: Location, loc2: Location): number {
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

  // Subscribe to driver updates
  subscribe(callback: (drivers: Driver[]) => void): () => void {
    this.onDriversUpdate = callback
    return () => {
      this.onDriversUpdate = null
    }
  }

  private notifyUpdate(): void {
    if (this.onDriversUpdate) {
      this.onDriversUpdate([...this.drivers])
    }
  }

  // Static method to validate driver data
  static validateDriver(driver: Partial<Driver>): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!driver.name || driver.name.length < 2) {
      errors.push('Name must be at least 2 characters')
    }
    if (!driver.contact || !driver.contact.match(/^[\+]?[1-9][\d]{0,15}$/)) {
      errors.push('Invalid phone number')
    }
    if (!driver.vehicle?.plate) {
      errors.push('Vehicle plate is required')
    }
    if (!driver.licenseNumber || driver.licenseNumber.length < 5) {
      errors.push('License number is required')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }
}

// Create a singleton instance
let driverServiceInstance: DriverService | null = null

export function getDriverService(initialDrivers?: Driver[]): DriverService {
  if (!driverServiceInstance) {
    driverServiceInstance = new DriverService(initialDrivers)
  }
  return driverServiceInstance
}