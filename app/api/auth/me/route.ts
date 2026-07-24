// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    )
  }
}