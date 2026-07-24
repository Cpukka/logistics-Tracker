import { notFound } from 'next/navigation';
import ShipmentDetails from '../../components/shipments/ShipmentDetails';
import ShipmentTracking from '../../components/shipments/ShipmentTracking';
import ShipmentActions from '../../components/shipments/ShipmentActions';

interface ShipmentPageProps {
  params: {
    id: string;
  };
}

export default function ShipmentPage({ params }: ShipmentPageProps) {
  const { id } = params;

  // Validate ID format
  if (!id || id.length < 3) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Shipment Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Shipment ID: {id}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipment Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <ShipmentDetails shipmentId={id} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <ShipmentTracking shipmentId={id} />
            </div>
          </div>
          
          {/* Right Column - Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <ShipmentActions shipmentId={id} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Shipment Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className="font-medium">In Transit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Created:</span>
                  <span className="font-medium">2024-01-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Priority:</span>
                  <span className="font-medium">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata({ params }: ShipmentPageProps) {
  return {
    title: `Shipment ${params.id} | LogiTrack`,
    description: `Detailed shipment information and tracking`,
  };
}