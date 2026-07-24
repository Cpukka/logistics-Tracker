'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Shipment, Driver } from '../../types'
import { Truck, Package, CheckCircle2, AlertTriangle } from 'lucide-react'

// Fix for default marker icons in Next.js
let L: any = null

if (typeof window !== 'undefined') {
  import('leaflet').then((leaflet) => {
    L = leaflet.default
    // Fix for default marker icons
    delete (L.Icon.Default.prototype as any)._getIconUrl
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
      iconUrl: '/leaflet/images/marker-icon.png',
      shadowUrl: '/leaflet/images/marker-shadow.png',
    })
  })
}

// Dynamically import react-leaflet components (client-side only)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
)

interface LiveMapProps {
  shipments: Shipment[]
  drivers: Driver[]
  center?: [number, number]
  zoom?: number
}

// Custom icons creation function
const createDriverIcon = (status: string) => {
  const color = status === 'delivering' ? '#10B981' : '#3B82F6'
  return L?.divIcon?.({
    html: `
      <div class="relative">
        <div class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-2" style="border-color: ${color}">
          <div class="flex items-center justify-center w-full h-full">
            <svg class="w-5 h-5" style="color: ${color}" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-8a1 1 0 00-1-1h-3.01l-1.7-2.55A1 1 0 0014.5 1h-5a1 1 0 00-.8.4L6.71 4H3z"/>
            </svg>
          </div>
        </div>
        <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping" style="background-color: ${color}"></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })
}

const createShipmentIcon = (status: string) => {
  const color = status === 'delivered' ? '#10B981' : 
               status === 'delayed' ? '#EF4444' : '#F59E0B'
  const Icon = status === 'delivered' ? CheckCircle2 : 
               status === 'delayed' ? AlertTriangle : Package
  
  return L?.divIcon?.({
    html: `
      <div class="relative">
        <div class="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2" style="border-color: ${color}">
          <div class="flex items-center justify-center w-full h-full">
            <svg class="w-4 h-4" style="color: ${color}" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })
}

export function LiveMap({ shipments, drivers, center = [39.8283, -98.5795], zoom = 4 }: LiveMapProps) {
  const [mounted, setMounted] = useState(false)
  const [positions, setPositions] = useState<Record<string, [number, number]>>({})

  // Set mounted state and simulate movements
  useEffect(() => {
    setMounted(true)
    
    // Simulate real-time position updates
    const interval = setInterval(() => {
      if (mounted) {
        const newPositions: Record<string, [number, number]> = {}
        drivers.forEach(driver => {
          if (driver.currentLocation) {
            // Add slight movement for simulation
            const variation = 0.01
            newPositions[driver.id] = [
              driver.currentLocation.lat + (Math.random() - 0.5) * variation,
              driver.currentLocation.lng + (Math.random() - 0.5) * variation
            ]
          }
        })
        setPositions(newPositions)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [drivers, mounted])

  if (!mounted) {
    return (
      <div className="h-125 rounded-xl bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-125 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {drivers.map(driver => {
          const position = positions[driver.id] || [driver.currentLocation.lat, driver.currentLocation.lng]
          const icon = createDriverIcon(driver.status)
          
          if (!icon) return null
          
          return (
            <Marker
              key={driver.id}
              position={position as [number, number]}
              icon={icon}
            >
              <Popup>
                <div className="p-2 min-w-50">
                  <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                  <p className="text-sm text-gray-600">{driver.vehicle.type} • {driver.vehicle.plate}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Status: <span className="font-medium capitalize">{driver.status.replace('_', ' ')}</span>
                  </p>
                  <p className="text-sm text-gray-600">Contact: {driver.contact}</p>
                  {driver.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-gray-600">Rating:</span>
                      <span className="text-sm font-medium text-yellow-600">{driver.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}

        {shipments.map(shipment => {
          const icon = createShipmentIcon(shipment.status)
          
          if (!icon) return null
          
          return (
            <Marker
              key={shipment.id}
              position={[shipment.destination.lat, shipment.destination.lng]}
              icon={icon}
            >
              <Popup>
                <div className="p-2 min-w-50">
                  <h3 className="font-semibold text-gray-900">#{shipment.trackingNumber}</h3>
                  <p className="text-sm text-gray-600 capitalize">{shipment.status.replace('_', ' ')}</p>
                  <p className="text-sm text-gray-600 mt-1">To: {shipment.destination.address}</p>
                  <p className="text-sm text-gray-600">
                    Est: {shipment.estimatedDelivery.toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'delayed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shipment.priority} priority
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}