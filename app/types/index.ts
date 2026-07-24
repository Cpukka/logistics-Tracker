// app/types/index.ts
// ============================================
// All types in one file - No duplicate exports
// ============================================

// ============================================
// LOCATION TYPES
// ============================================
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  coordinates?: {  // Add this
    lat: number;
    lng: number;
  };
}

// ============================================
// VEHICLE INFORMATION
// ============================================
export interface Vehicle {
  type: 'van' | 'truck' | 'car' | 'motorcycle' | 'bicycle';
  plate: string;
  capacity: number; // in kg
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  fuelType?: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
}

// ============================================
// SHIPMENT STATUS TYPES
// ============================================
export type ShipmentStatus = 
  | 'pending'
  | 'processing'
  | 'ready_for_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'delayed'
  | 'cancelled'
  | 'returned'
  | 'failed';

export type DriverStatus = 
  | 'available'
  | 'on_duty'
  | 'delivering'
  | 'off_duty'
  | 'on_break'
  | 'offline';

// ============================================
// SHIPMENT ITEM
// ============================================
export interface ShipmentItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  weight: number; // in kg
  value?: number; // in USD
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  category?: string;
  sku?: string;
}

// ============================================
// SHIPMENT
// ============================================
export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: Location;
  destination: Location;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  pickupDate?: Date;
  driverId: string;
  driverName?: string;
  items: ShipmentItem[];
  notes?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  totalWeight: number;
  totalValue?: number;
  customer: {
    id?: string;
    name: string;
    email?: string;
    phone: string;
    address?: string;
  };
  payment: {
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    method?: string;
    amount?: number;
  };
  createdAt: Date;
  updatedAt: Date;
  distance?: number; // in km
  estimatedDuration?: number; // in minutes
}

// ============================================
// DRIVER
// ============================================
export interface Driver {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  contact: string;
  vehicle: Vehicle;
  currentLocation: Location;
  status: DriverStatus;
  activeShipmentId?: string;
  rating?: number;
  totalDeliveries?: number;
  totalDistance?: number; // in km
  joinedDate: Date;
  updatedAt?: Date;
  licenseNumber?: string;
  profileImage?: string;
  currentRoute?: Route;
  stats?: {
    completedDeliveries: number;
    onTimeRate: number;
    averageRating: number;
    totalEarnings?: number;
  };
}

// ============================================
// ROUTE AND DELIVERY EVENTS
// ============================================
export interface DeliveryEvent {
  id: string;
  shipmentId: string;
  type: 'pickup' | 'delivery' | 'delay' | 'location_update' | 'status_change' | 'note';
  location: Location;
  timestamp: Date;
  description?: string;
  metadata?: Record<string, any>;
}

export interface Route {
  id: string;
  driverId: string;
  shipments: string[];
  waypoints: Location[];
  distance: number; // in km
  estimatedDuration: number; // in minutes
  actualDuration?: number;
  startTime: Date;
  endTime?: Date;
  optimized: boolean;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  fuelCost?: number;
  tollCost?: number;
  totalCost?: number;
  optimizationScore?: number;
  polyline?: string; // Encoded polyline for map display
}

// ============================================
// ANALYTICS
// ============================================
export interface AnalyticsData {
  totalShipments: number;
  deliveredToday: number;
  inTransit: number;
  delayed: number;
  averageDeliveryTime: number;
  onTimeRate: number;
  totalRevenue?: number;
  activeDrivers: number;
  totalDistance: number;
  fuelEfficiency?: number;
}

export interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  deliveredToday: number;
  pendingPickups: number;
  activeDrivers: number;
  onTimeRate: number;
  avgDeliveryTime: number;
  routeEfficiency: number;
  revenueToday?: number;
  customerSatisfaction?: number;
}

export interface DailyStats {
  date: string;
  deliveries: number;
  revenue?: number;
  distance: number;
  onTimeRate: number;
}

export interface PerformanceMetrics {
  efficiency: number;
  customerSatisfaction: number;
  costPerDelivery: number;
  carbonFootprint?: number;
}

// ============================================
// REAL-TIME UPDATES
// ============================================
export interface LocationUpdate {
  driverId: string;
  location: Location;
  timestamp: Date;
  speed?: number;
  bearing?: number;
  accuracy?: number;
}

export interface StatusUpdate {
  shipmentId: string;
  status: ShipmentStatus;
  timestamp: Date;
  reason?: string;
  location?: Location;
}

// ============================================
// WEB SOCKET EVENTS
// ============================================
export type WebSocketEvent = 
  | { type: 'location_update'; data: LocationUpdate }
  | { type: 'status_update'; data: StatusUpdate }
  | { type: 'new_shipment'; data: Shipment }
  | { type: 'driver_status'; data: Driver }
  | { type: 'route_optimized'; data: Route }
  | { type: 'alert'; data: Alert };

// ============================================
// ALERTS AND NOTIFICATIONS
// ============================================
export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  metadata?: Record<string, any>;
}

export interface Notification {
  id: string;
  type: 'shipment' | 'driver' | 'system' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
  metadata?: Record<string, any>;
}

// ============================================
// USER AND AUTHENTICATION
// ============================================
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'dispatcher' | 'driver' | 'customer';
  company?: string;
  phone?: string;
  avatar?: string;
  permissions: string[];
}

// ============================================
// SETTINGS AND CONFIGURATION
// ============================================
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  map: {
    defaultZoom: number;
    defaultCenter: Coordinates;
    provider: 'openstreetmap' | 'google' | 'mapbox';
  };
  units: {
    distance: 'km' | 'miles';
    weight: 'kg' | 'lbs';
    temperature: 'celsius' | 'fahrenheit';
  };
}

// ============================================
// API RESPONSE TYPES
// ============================================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ============================================
// FORM DATA TYPES
// ============================================
export interface CreateShipmentFormData {
  origin: Location;
  destination: Location;
  items: Omit<ShipmentItem, 'id'>[];
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  pickupDate?: Date;
  estimatedDelivery?: Date;
}

export interface UpdateShipmentFormData {
  status?: ShipmentStatus;
  driverId?: string;
  notes?: string;
  estimatedDelivery?: Date;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

// ============================================
// OPTIMIZATION TYPES
// ============================================
export interface RouteOptimizationRequest {
  shipments: Shipment[];
  drivers: Driver[];
  constraints?: {
    maxDistance?: number;
    maxTime?: number;
    vehicleCapacity?: number;
    timeWindows?: {
      start: Date;
      end: Date;
    }[];
  };
  objectives?: ('minDistance' | 'minTime' | 'minCost' | 'maxEfficiency')[];
}

export interface OptimizedRoute {
  route: Route;
  assignments: {
    driverId: string;
    shipmentIds: string[];
    sequence: number[];
  }[];
  metrics: {
    totalDistance: number;
    totalTime: number;
    totalCost: number;
    efficiency: number;
    utilization: number;
  };
}

// ============================================
// MAP TYPES
// ============================================
export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapMarker {
  id: string;
  position: Coordinates;
  type: 'driver' | 'pickup' | 'delivery' | 'warehouse';
  data: Driver | Shipment | Location;
  icon?: string;
  color?: string;
}

// ============================================
// DASHBOARD WIDGET TYPES
// ============================================
export interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'map' | 'table' | 'list';
  title: string;
  size: 'small' | 'medium' | 'large' | 'full';
  data: any;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}