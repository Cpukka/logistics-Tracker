// app/services/mapService.ts
import { Location, Route, MapBounds, MapMarker } from '../types'

export interface GeocodeResult {
  address: string
  location: Location
  placeId?: string
}

export interface DirectionsResult {
  route: {
    distance: number // in km
    duration: number // in minutes
    polyline: string
    steps: {
      instruction: string
      distance: number
      duration: number
      location: Location
    }[]
  }
  waypoints: Location[]
}

export class MapService {
  private static instance: MapService
  private mapboxToken: string | null = null

  static getInstance(): MapService {
    if (!MapService.instance) {
      MapService.instance = new MapService()
    }
    return MapService.instance
  }

  // Initialize with Mapbox token
  initialize(token: string): void {
    this.mapboxToken = token
  }

  // Geocode an address to coordinates
  async geocodeAddress(address: string): Promise<GeocodeResult | null> {
    try {
      // Mock geocoding - in production, use Mapbox/Google Maps API
      const mockLocation: Location = {
        address,
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.0060 + (Math.random() - 0.5) * 0.1,
      }

      return {
        address,
        location: mockLocation,
        placeId: `place_${Date.now()}`,
      }
    } catch (error) {
      console.error('Geocoding error:', error)
      return null
    }
  }

  // Reverse geocode coordinates to address
  async reverseGeocode(location: Location): Promise<string> {
    try {
      // Mock reverse geocoding
      return `${location.address || 'Unknown Location'}`
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      return 'Unknown Location'
    }
  }

  // Get directions between locations
  async getDirections(
    origin: Location,
    destination: Location,
    waypoints: Location[] = []
  ): Promise<DirectionsResult | null> {
    try {
      // Mock directions - in production, use Mapbox/Google Maps API
      const totalDistance = this.calculateTotalDistance([origin, ...waypoints, destination])
      const totalDuration = totalDistance * 2 // Mock: 2 minutes per km

      const steps = [
        {
          instruction: 'Start at origin',
          distance: 0.5,
          duration: 1,
          location: origin,
        },
        ...waypoints.map((wp, i) => ({
          instruction: `Waypoint ${i + 1}: ${wp.address}`,
          distance: 1 + Math.random() * 2,
          duration: 2 + Math.random() * 4,
          location: wp,
        })),
        {
          instruction: 'Arrive at destination',
          distance: 0.5,
          duration: 1,
          location: destination,
        },
      ]

      return {
        route: {
          distance: totalDistance,
          duration: totalDuration,
          polyline: this.generatePolyline([origin, ...waypoints, destination]),
          steps,
        },
        waypoints: [origin, ...waypoints, destination],
      }
    } catch (error) {
      console.error('Directions error:', error)
      return null
    }
  }

  // Get route optimization
  async optimizeRoute(
    origin: Location,
    destinations: Location[]
  ): Promise<{
    optimizedOrder: Location[]
    totalDistance: number
    totalDuration: number
    polyline: string
  } | null> {
    try {
      // Simple optimization: sort by distance from origin
      const sorted = [...destinations].sort((a, b) => {
        const distA = this.calculateDistance(origin, a)
        const distB = this.calculateDistance(origin, b)
        return distA - distB
      })

      const totalDistance = this.calculateTotalDistance([origin, ...sorted])
      const totalDuration = totalDistance * 2

      return {
        optimizedOrder: sorted,
        totalDistance,
        totalDuration,
        polyline: this.generatePolyline([origin, ...sorted]),
      }
    } catch (error) {
      console.error('Route optimization error:', error)
      return null
    }
  }

  // Calculate distance between two locations
  calculateDistance(loc1: Location, loc2: Location): number {
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

  // Calculate total distance for a route
  calculateTotalDistance(locations: Location[]): number {
    let total = 0
    for (let i = 1; i < locations.length; i++) {
      total += this.calculateDistance(locations[i - 1], locations[i])
    }
    return total
  }

  // Generate mock polyline
  generatePolyline(locations: Location[]): string {
    // Mock polyline - in production, use actual encoding
    return locations.map(l => `${l.lat},${l.lng}`).join(';')
  }

  // Get map bounds for a set of locations
  getMapBounds(locations: Location[]): MapBounds {
    if (locations.length === 0) {
      return {
        north: 0,
        south: 0,
        east: 0,
        west: 0,
      }
    }

    let north = -90
    let south = 90
    let east = -180
    let west = 180

    locations.forEach(location => {
      north = Math.max(north, location.lat)
      south = Math.min(south, location.lat)
      east = Math.max(east, location.lng)
      west = Math.min(west, location.lng)
    })

    return { north, south, east, west }
  }

  // Create map markers from shipments and drivers
  createMarkers(
    shipments: any[],
    drivers: any[]
  ): MapMarker[] {
    const markers: MapMarker[] = []

    // Shipment markers
    shipments.forEach(shipment => {
      markers.push({
        id: `shipment_${shipment.id}`,
        position: shipment.destination,
        type: 'delivery',
        data: shipment,
        color: shipment.priority === 'urgent' ? '#EF4444' : '#3B82F6',
      })
    })

    // Driver markers
    drivers.forEach(driver => {
      markers.push({
        id: `driver_${driver.id}`,
        position: driver.currentLocation,
        type: 'driver',
        data: driver,
        color: driver.status === 'available' ? '#10B981' : '#F59E0B',
      })
    })

    return markers
  }

  // Static method to format distance
  static formatDistance(distance: number, unit: 'km' | 'miles' = 'km'): string {
    if (unit === 'miles') {
      const miles = distance * 0.621371
      return miles < 1 ? `${Math.round(miles * 5280)} ft` : `${miles.toFixed(1)} mi`
    }
    return distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`
  }

  // Static method to format duration
  static formatDuration(duration: number): string {
    if (duration < 60) {
      return `${duration}m`
    }
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }
}

// Export singleton instance
export const mapService = MapService.getInstance()