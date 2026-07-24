export interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  status: TrackingStatus;
  description: string;
  code?: string;
}

export type TrackingStatus = 
  | 'pending'
  | 'label_created'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'exception'
  | 'returned';

export interface TrackingData {
  trackingNumber: string;
  status: TrackingStatus;
  estimatedDelivery: string;
  lastUpdate: string;
  currentLocation: string | Location; // Allow both string and Location
  origin: Location;
  destination: Location;
  route: Location[];
  history: TrackingEvent[];
  packageDetails: PackageDetails;
  sender: ContactInfo;
  recipient: ContactInfo;
  distanceTraveled: number;
  daysInTransit: number;
  serviceLevel: string;
  carrier: string;
  deliveryOptions: DeliveryOptions;
  pricing?: PricingInfo;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PackageDetails {
  weight: string;
  dimensions: string;
  contents: string;
  declaredValue?: number;
  packageType: string;
  fragile?: boolean;
  insurance?: boolean;
}

export interface ContactInfo {
  name: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
}

export interface DeliveryOptions {
  canReschedule: boolean;
  canRedirect: boolean;
  canHoldAtLocation: boolean;
  canAddInstructions: boolean;
  canAddSignature?: boolean;
  canAddInsurance?: boolean;
}

export interface PricingInfo {
  shippingCost: number;
  insuranceCost?: number;
  totalCost: number;
  currency: string;
}