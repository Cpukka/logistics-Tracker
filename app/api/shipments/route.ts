import { NextResponse } from 'next/server'

// Define types for mock data
interface MockShipment {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'delayed';
  origin: {
    address: string;
    lat: number;
    lng: number;
  };
  destination: {
    address: string;
    lat: number;
    lng: number;
  };
  estimatedDelivery: string;
  driverId?: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    weight: number;
  }>;
  createdAt: string;
  updatedAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  totalWeight: number;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  payment: {
    status: 'paid' | 'pending' | 'failed';
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  
  // Define mock shipments with proper typing
  const mockShipments: MockShipment[] = [
    {
      id: '1',
      trackingNumber: 'LTK789456123',
      status: 'in_transit',
      origin: { 
        address: 'Warehouse A, NYC', 
        lat: 40.7128, 
        lng: -74.0060 
      },
      destination: { 
        address: 'Customer Location, Boston', 
        lat: 42.3601, 
        lng: -71.0589 
      },
      estimatedDelivery: new Date(Date.now() + 86400000).toISOString(),
      driverId: 'driver1',
      items: [{ 
        id: 'item1',
        name: 'Electronics Package', 
        quantity: 1, 
        weight: 5.2 
      }],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      priority: 'medium',
      totalWeight: 5.2,
      customer: {
        name: 'John Doe',
        phone: '+1234567890',
        email: 'john.doe@example.com'
      },
      payment: {
        status: 'paid',
      },
    },
    {
      id: '2',
      trackingNumber: 'LTK987654321',
      status: 'out_for_delivery',
      origin: { 
        address: 'Distribution Center, LA', 
        lat: 34.0522, 
        lng: -118.2437 
      },
      destination: { 
        address: 'Office Building, San Francisco', 
        lat: 37.7749, 
        lng: -122.4194 
      },
      estimatedDelivery: new Date(Date.now() + 14400000).toISOString(),
      driverId: 'driver2',
      items: [{ 
        id: 'item2',
        name: 'Documents', 
        quantity: 1, 
        weight: 0.5 
      }],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
      priority: 'high',
      totalWeight: 0.5,
      customer: {
        name: 'Jane Smith',
        phone: '+1987654321',
        email: 'jane.smith@example.com'
      },
      payment: {
        status: 'paid',
      },
    },
    {
      id: '3',
      trackingNumber: 'LTK456123789',
      status: 'delivered',
      origin: { 
        address: 'Warehouse B, Chicago', 
        lat: 41.8781, 
        lng: -87.6298 
      },
      destination: { 
        address: 'Residential, Miami', 
        lat: 25.7617, 
        lng: -80.1918 
      },
      estimatedDelivery: new Date(Date.now() - 43200000).toISOString(),
      driverId: 'driver3',
      items: [{ 
        id: 'item3',
        name: 'Furniture', 
        quantity: 2, 
        weight: 35.0 
      }],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      updatedAt: new Date(Date.now() - 259200000).toISOString(),
      priority: 'medium',
      totalWeight: 35,
      customer: {
        name: 'Robert Johnson',
        phone: '+1555123456',
        email: 'robert.johnson@example.com'
      },
      payment: {
        status: 'paid',
      },
    },
    {
      id: '4',
      trackingNumber: 'LTK321654987',
      status: 'pending',
      origin: { 
        address: 'Warehouse C, Seattle', 
        lat: 47.6062, 
        lng: -122.3321 
      },
      destination: { 
        address: 'Tech Office, Portland', 
        lat: 45.5152, 
        lng: -122.6784 
      },
      estimatedDelivery: new Date(Date.now() + 172800000).toISOString(),
      driverId: 'driver1',
      items: [{ 
        id: 'item4',
        name: 'Medical Supplies', 
        quantity: 3, 
        weight: 12.5 
      }],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      priority: 'urgent',
      totalWeight: 12.5,
      customer: {
        name: 'Medical Corp Inc',
        phone: '+18885551234',
        email: 'contact@medicalcorp.com'
      },
      payment: {
        status: 'paid',
      },
    },
    {
      id: '5',
      trackingNumber: 'LTK654987321',
      status: 'delayed',
      origin: { 
        address: 'Distribution Center, Dallas', 
        lat: 32.7767, 
        lng: -96.7970 
      },
      destination: { 
        address: 'Retail Store, Houston', 
        lat: 29.7604, 
        lng: -95.3698 
      },
      estimatedDelivery: new Date(Date.now() + 43200000).toISOString(),
      driverId: 'driver3',
      items: [{ 
        id: 'item5',
        name: 'Clothing Inventory', 
        quantity: 5, 
        weight: 25.0 
      }],
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      updatedAt: new Date(Date.now() - 345600000).toISOString(),
      priority: 'medium',
      totalWeight: 25,
      customer: {
        name: 'Fashion Retail Co',
        phone: '+12815551234',
        email: 'orders@fashionretail.com'
      },
      payment: {
        status: 'paid',
      },
    },
  ]
  
  // Filter logic
  let filtered = [...mockShipments]
  
  if (status && status !== 'all') {
    filtered = filtered.filter(s => s.status === status)
  }
  
  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(s => 
      s.trackingNumber.toLowerCase().includes(searchLower) ||
      s.customer.name.toLowerCase().includes(searchLower) ||
      s.destination.address.toLowerCase().includes(searchLower) ||
      s.origin.address.toLowerCase().includes(searchLower)
    )
  }
  
  // Pagination logic
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedShipments = filtered.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filtered.length / limit)
  
  return NextResponse.json({
    success: true,
    data: {
      shipments: paginatedShipments,
      total: filtered.length,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    timestamp: new Date().toISOString()
  })
}

// POST handler for creating new shipments
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.trackingNumber || !body.customer || !body.origin || !body.destination) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create mock response
    const newShipment: MockShipment = {
      id: `SH${Date.now()}`,
      trackingNumber: body.trackingNumber,
      status: 'pending',
      origin: body.origin,
      destination: body.destination,
      estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      driverId: body.driverId,
      items: body.items || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priority: body.priority || 'medium',
      totalWeight: body.items?.reduce((sum: number, item: any) => sum + (item.weight || 0), 0) || 0,
      customer: {
        name: body.customer.name,
        phone: body.customer.phone,
        email: body.customer.email,
      },
      payment: {
        status: body.payment?.status || 'pending',
      },
    }
    
    return NextResponse.json({
      success: true,
      data: newShipment,
      message: 'Shipment created successfully',
      timestamp: new Date().toISOString()
    }, { status: 201 })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// PUT handler for updating shipments
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Shipment ID is required' },
        { status: 400 }
      )
    }
    
    // Mock update - in real app, update database
    return NextResponse.json({
      success: true,
      data: { id, ...updates, updatedAt: new Date().toISOString() },
      message: 'Shipment updated successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// DELETE handler for removing shipments
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Shipment ID is required' },
        { status: 400 }
      )
    }
    
    // Mock delete - in real app, delete from database
    return NextResponse.json({
      success: true,
      message: `Shipment ${id} deleted successfully`,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}