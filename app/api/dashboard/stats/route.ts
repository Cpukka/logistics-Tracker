// app/api/dashboard/stats/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const stats = {
    totalShipments: 156,
    activeShipments: 24,
    deliveredToday: 42,
    pendingPickups: 18,
    activeDrivers: 8,
    onTimeRate: 96.7,
    avgDeliveryTime: 2.4,
    routeEfficiency: 89,
    revenueToday: 12450,
    customerSatisfaction: 4.8,
  }
  
  return NextResponse.json(stats)
}