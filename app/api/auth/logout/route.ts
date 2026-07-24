// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  // Since we're using JWT, logout is handled client-side
  // This endpoint exists for consistency
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  })
}