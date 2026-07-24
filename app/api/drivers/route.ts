// app/api/drivers/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const mockDrivers: Array<{
    id: string
    name: string
    email: string
    phone: string
    status: string
    currentLocation: { lat: number; lng: number }
    assignedShipments: number
  }> = [
    {
      id: 'driver-1',
      name: 'Alex Morgan',
      email: 'alex@example.com',
      phone: '+1-555-0101',
      status: 'active',
      currentLocation: { lat: 40.7128, lng: -74.0060 },
      assignedShipments: 3,
    },
  ]

  return NextResponse.json({
    drivers: mockDrivers,
    total: mockDrivers.length,
  })
}