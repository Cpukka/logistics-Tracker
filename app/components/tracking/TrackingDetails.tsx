import { TrackingStatus } from '../../types/tracking';

import { 
  CheckCircle, 
  Package, 
  Truck, 
  Home, 
  Clock,
  AlertCircle,
  Shield,
  Star
} from 'lucide-react';

interface TrackingDetailsProps {
  status: TrackingStatus;
  estimatedDelivery: string;
  lastUpdate: string;
   currentLocation: string | Location; // Updated
  serviceLevel?: string;
}

export default function TrackingDetails({
  status,
  estimatedDelivery,
  lastUpdate,
  currentLocation,
  serviceLevel = 'Standard'
}: TrackingDetailsProps) {
  const getStatusIcon = (status: TrackingStatus) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in_transit':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'out_for_delivery':
        return <Package className="h-6 w-6 text-orange-500" />;
      case 'exception':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: TrackingStatus) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'out_for_delivery':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'exception':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusDescription = (status: TrackingStatus) => {
    switch (status) {
      case 'delivered':
        return 'Package has been delivered successfully';
      case 'in_transit':
        return 'Package is on the way to destination';
      case 'out_for_delivery':
        return 'Package is out for delivery today';
      case 'exception':
        return 'Delivery exception - check details';
      case 'label_created':
        return 'Shipping label created, awaiting pickup';
      case 'pending':
        return 'Awaiting shipment processing';
      case 'returned':
        return 'Package has been returned';
      default:
        return 'Tracking in progress';
    }
  };

  const formatStatus = (status: TrackingStatus) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            {getStatusIcon(status)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                {formatStatus(status)}
              </span>
              {serviceLevel && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-medium">
                  <Star className="h-3 w-3" />
                  {serviceLevel}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {getStatusDescription(status)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Last updated: {new Date(lastUpdate).toLocaleString()}
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
  {formatLocation(currentLocation)}
</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Delivery</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {new Date(estimatedDelivery).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <Home className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Location</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{currentLocation}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Window</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">9 AM - 6 PM</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {status === 'in_transit' && (
        <div className="pt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Delivery Progress</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">65% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
              style={{ width: '65%' }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Origin</span>
            <span>In Transit</span>
            <span>Destination</span>
          </div>
        </div>
      )}
    </div>
  );
}