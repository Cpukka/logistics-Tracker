// app/tracking/[trackingNumber]/page.tsx
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import TrackingDetails from '../../components/tracking/TrackingDetails';
import TrackingHistory from '../../components/tracking/TrackingHistory';
import TrackingMap from '../../components/tracking/TrackingMap';
import PackageInfo from '../../components/tracking/PackageInfo';
import ActionButtons from '../../components/tracking/ActionButtons';
import { fetchTrackingDetails } from '../../lib/api/tracking';
import TrackingHeader from '../../components/tracking/TrackingHeader';
import { Location } from '../../types';

interface TrackingPageProps {
  params: {
    trackingNumber: string;
  };
  searchParams?: {
    ref?: string;
    view?: string;
  };
}

// Helper function to format location
function formatLocation(location: string | Location): string {
  if (typeof location === 'string') {
    return location;
  }
  if (location && typeof location === 'object') {
    const parts = [];
    if (location.city) parts.push(location.city);
    if (location.state) parts.push(location.state);
    if (location.country) parts.push(location.country);
    return parts.join(', ') || location.address || 'Unknown Location';
  }
  return 'Unknown Location';
}

export default async function TrackingPage({ 
  params, 
  searchParams 
}: TrackingPageProps) {
  const { trackingNumber } = params;
  const { ref, view } = searchParams || {};

  // Validate tracking number format
  const trackingPattern = /^[A-Z0-9]{8,20}$/;
  if (!trackingPattern.test(trackingNumber)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Suspense fallback={<TrackingSkeleton />}>
          <TrackingContent 
            trackingNumber={trackingNumber} 
            refCode={ref}
            viewMode={view}
          />
        </Suspense>
      </div>
    </div>
  );
}

async function TrackingContent({ 
  trackingNumber, 
  refCode,
  viewMode 
}: { 
  trackingNumber: string;
  refCode?: string;
  viewMode?: string;
}) {
  try {
    const trackingData = await fetchTrackingDetails(trackingNumber, refCode);

    if (!trackingData) {
      notFound();
    }

    // Format the current location for display
    const currentLocationDisplay = formatLocation(trackingData.currentLocation);

    return (
      <>
        <TrackingHeader 
          trackingNumber={trackingNumber}
          data={trackingData}
          viewMode={viewMode}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Main Tracking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Overview Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 border border-gray-200 dark:border-gray-700">
              <TrackingDetails 
                status={trackingData.status}
                estimatedDelivery={trackingData.estimatedDelivery}
                lastUpdate={trackingData.lastUpdate}
                currentLocation={currentLocationDisplay}
                serviceLevel={trackingData.serviceLevel}
              />
            </div>

            {/* Map Visualization Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-5 bg-blue-500 rounded-full"></span>
                Shipment Route & Progress
              </h2>
              <div className="h-80 rounded-xl overflow-hidden">
                <TrackingMap 
                  origin={trackingData.origin}
                  destination={trackingData.destination}
                  currentLocation={trackingData.currentLocation}
                  route={trackingData.route}
                />
              </div>
            </div>

            {/* Tracking History Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="inline-block w-2 h-5 bg-green-500 rounded-full"></span>
                  Tracking History
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {trackingData.history.length} events
                </span>
              </div>
              <TrackingHistory events={trackingData.history} />
            </div>
          </div>

          {/* Right Column - Package Details & Actions */}
          <div className="space-y-6">
            {/* Package Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 border border-gray-200 dark:border-gray-700">
              <PackageInfo 
                packageDetails={trackingData.packageDetails}
                sender={trackingData.sender}
                recipient={trackingData.recipient}
              />
            </div>

            {/* Action Buttons Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 border border-gray-200 dark:border-gray-700">
              <ActionButtons 
                trackingNumber={trackingNumber}
                status={trackingData.status}
                deliveryOptions={trackingData.deliveryOptions}
              />
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-5 bg-purple-500 rounded-full"></span>
                Shipment Summary
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard 
                    label="Distance Traveled"
                    value={`${trackingData.distanceTraveled.toLocaleString()} km`}
                    icon="🚚"
                    trend="+5%"
                  />
                  <StatCard 
                    label="Days in Transit"
                    value={trackingData.daysInTransit.toString()}
                    icon="📅"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard 
                    label="Service Level"
                    value={trackingData.serviceLevel}
                    icon="⭐"
                  />
                  <StatCard 
                    label="Carrier"
                    value={trackingData.carrier}
                    icon="🏢"
                  />
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Estimated Arrival</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {new Date(trackingData.estimatedDelivery).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    notFound();
  }
}

function StatCard({ label, value, icon, trend }: { 
  label: string; 
  value: string; 
  icon: string;
  trend?: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
}

function TrackingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mb-6"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
        <div className="space-y-6">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata({ params }: TrackingPageProps) {
  return {
    title: `Track #${params.trackingNumber} | LogiTrack`,
    description: `Track your shipment with tracking number ${params.trackingNumber}. View real-time updates and delivery status.`,
    openGraph: {
      title: `Track Shipment ${params.trackingNumber} | LogiTrack`,
      description: `Real-time tracking for shipment ${params.trackingNumber}`,
      type: 'website',
    },
  };
}