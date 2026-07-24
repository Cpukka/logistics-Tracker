'use client';

import { Package, Clock, MapPin, User, AlertCircle, CheckCircle } from 'lucide-react';
import { Shipment } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ShipmentCardProps {
  shipment: Shipment;
  onClick?: () => void; // This line is crucial - make onClick optional
  compact?: boolean;
}

export function ShipmentCard({ shipment, onClick, compact = false }: ShipmentCardProps) {
  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'out_for_delivery':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'delayed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: Shipment['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'delayed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card 
      className={`hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer' : ''} ${compact ? 'py-3' : 'py-4'}`}
      onClick={onClick}
    >
      <CardContent className={`space-y-3 ${compact ? 'p-3' : 'p-4'}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-500" />
            <span className="font-mono font-bold text-sm text-gray-900 dark:text-white">
              {shipment.trackingNumber}
            </span>
          </div>
          <Badge className={`px-2 py-1 text-xs ${getStatusColor(shipment.status)}`}>
            <span className="flex items-center gap-1">
              {getStatusIcon(shipment.status)}
              {shipment.status.replace('_', ' ').charAt(0).toUpperCase() + shipment.status.slice(1)}
            </span>
          </Badge>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="flex-1 truncate">
            <span className="text-gray-600 dark:text-gray-400">
              {shipment.origin.address.split(',')[0]} → {shipment.destination.address.split(',')[0]}
            </span>
          </div>
        </div>

        {/* Customer */}
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-gray-600 dark:text-gray-400">{shipment.customer.name}</span>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              ETA: {formatDate(shipment.estimatedDelivery)}
            </span>
          </div>
          
          {!compact && (
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">Weight</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {shipment.totalWeight} kg
              </div>
            </div>
          )}
        </div>

        {/* Progress bar for in-transit shipments */}
        {shipment.status === 'in_transit' && !compact && (
          <div className="pt-2">
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: '65%' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>65% complete</span>
              <span>~2h remaining</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}