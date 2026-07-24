import { notFound } from 'next/navigation';
import DriverProfile from '../../components/drivers/DriverProfile';
import DriverStats from '../../components/drivers/DriverStats';
import DriverAssignments from '../../components/drivers/DriverAssignments';

interface DriverPageProps {
  params: {
    id: string;
  };
}

export default function DriverPage({ params }: DriverPageProps) {
  const { id } = params;

  // Validate ID format
  if (!id || id.length < 3) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Driver Management
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Driver Profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <DriverProfile driverId={id} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <DriverAssignments driverId={id} />
            </div>
          </div>
          
          {/* Right Column - Stats */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <DriverStats driverId={id} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                  Assign New Route
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition">
                  View Schedule
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition">
                  Performance Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata({ params }: DriverPageProps) {
  return {
    title: `Driver ${params.id} | LogiTrack`,
    description: `Driver management and performance tracking`,
  };
}