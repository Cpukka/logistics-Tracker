import { TrackingEvent } from '../../types/tracking';
import { Check, Package, Truck, Home, AlertCircle } from 'lucide-react';

interface TrackingHistoryProps {
  events: TrackingEvent[];
}

export default function TrackingHistory({ events }: TrackingHistoryProps) {
  const getEventIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check className="h-4 w-4" />;
      case 'in_transit':
        return <Truck className="h-4 w-4" />;
      case 'out_for_delivery':
        return <Package className="h-4 w-4" />;
      case 'exception':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-orange-100 text-orange-800';
      case 'exception':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex space-x-4">
          <div className="flex flex-col items-center">
            <div className={`p-2 rounded-full ${getEventColor(event.status)}`}>
              {getEventIcon(event.status)}
            </div>
            {index < events.length - 1 && (
              <div className="w-0.5 h-full bg-gray-300 my-2"></div>
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{event.description}</h4>
                <p className="text-sm text-gray-600">{event.location}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </span>
            </div>
            {event.code && (
              <div className="mt-2">
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  Code: {event.code}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}