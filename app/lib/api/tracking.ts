import { TrackingData } from '../../types/tracking';

export async function fetchTrackingDetails(
  trackingNumber: string, 
  refCode?: string
): Promise<TrackingData | null> {
  // Add authentication headers if needed
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add reference code if provided
  const params = new URLSearchParams();
  if (refCode) {
    params.set('ref', refCode);
  }

  // For demo purposes, always use mock data
  // In production, you would use the real API
  if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    console.log('Using mock tracking data for:', trackingNumber);
    return getMockTrackingData(trackingNumber);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tracking/${trackingNumber}?${params}`,
      {
        headers,
        next: {
          revalidate: 60, // Revalidate every minute for real-time updates
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch tracking details');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    
    // Fallback to mock data if API fails
    return getMockTrackingData(trackingNumber);
  }
}

function getMockTrackingData(trackingNumber: string): TrackingData {
  const now = new Date();
  const deliveryDate = new Date(now);
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  return {
    trackingNumber,
    status: 'in_transit',
    estimatedDelivery: deliveryDate.toISOString(),
    lastUpdate: now.toISOString(),
    currentLocation: {
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    }, // Changed from string to Location object
    origin: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    destination: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    route: [
      { 
        city: 'New York', 
        state: 'NY', 
        country: 'USA',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      { 
        city: 'Chicago', 
        state: 'IL', 
        country: 'USA',
        coordinates: { lat: 41.8781, lng: -87.6298 }
      },
      { 
        city: 'Denver', 
        state: 'CO', 
        country: 'USA',
        coordinates: { lat: 39.7392, lng: -104.9903 }
      },
      { 
        city: 'Los Angeles', 
        state: 'CA', 
        country: 'USA',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      }
    ],
    history: [
      {
        id: '1',
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'New York Sorting Facility, NY',
        status: 'label_created',
        description: 'Shipment label created',
        code: 'LBLCR'
      },
      {
        id: '2',
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
        location: 'New York Hub, NY',
        status: 'in_transit',
        description: 'Package picked up by carrier',
        code: 'PKPU'
      },
      {
        id: '3',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Chicago Distribution Center, IL',
        status: 'in_transit',
        description: 'Arrived at distribution center',
        code: 'ARDC'
      },
      {
        id: '4',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        location: 'Chicago Distribution Center, IL',
        status: 'in_transit',
        description: 'Processed for onward transportation',
        code: 'DFF'
      },
      {
        id: '5',
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
        location: 'Chicago Distribution Center, IL',
        status: 'in_transit',
        description: 'Departed from facility',
        code: 'DFF'
      }
    ],
    packageDetails: {
      weight: '5.2 kg',
      dimensions: '30×20×15 cm',
      contents: 'Electronics - Laptop & Accessories',
      declaredValue: 1299.99,
      packageType: 'Box',
      fragile: true,
      insurance: true
    },
    sender: {
      name: 'TechGadgets Inc.',
      address: '123 Tech Street, Suite 450',
      city: 'New York, NY 10001',
      phone: '+1 (212) 555-0123',
      email: 'orders@techgadgets.com'
    },
    recipient: {
      name: 'Alexandra Chen',
      address: '456 Innovation Drive, Apt 302',
      city: 'Los Angeles, CA 90028',
      phone: '+1 (310) 555-9876',
      email: 'alex.chen@email.com'
    },
    distanceTraveled: 2850,
    daysInTransit: 3,
    serviceLevel: 'Express Priority',
    carrier: 'LogiFast Express',
    deliveryOptions: {
      canReschedule: true,
      canRedirect: true,
      canHoldAtLocation: true,
      canAddInstructions: true,
      canAddSignature: true,
      canAddInsurance: false
    },
    pricing: {
      shippingCost: 24.99,
      insuranceCost: 5.00,
      totalCost: 29.99,
      currency: 'USD'
    }
  };
}
// Optional: Fetch multiple tracking numbers
export async function fetchMultipleTrackingDetails(
  trackingNumbers: string[]
): Promise<TrackingData[]> {
  const promises = trackingNumbers.map(trackingNumber => 
    fetchTrackingDetails(trackingNumber)
  );
  
  const results = await Promise.allSettled(promises);
  
  return results
    .filter((result): result is PromiseFulfilledResult<TrackingData> => 
      result.status === 'fulfilled' && result.value !== null
    )
    .map(result => result.value);
}

// Optional: Search tracking by reference, order ID, etc.
export async function searchTracking(
  query: string,
  type: 'tracking' | 'reference' | 'order' = 'tracking'
): Promise<TrackingData[]> {
  // Implementation depends on your API
  // For demo, return mock data if query matches a pattern
  if (query && query.length >= 8) {
    return [getMockTrackingData(query)];
  }
  return [];
}