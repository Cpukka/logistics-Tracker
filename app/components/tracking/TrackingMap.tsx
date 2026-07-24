'use client';

import { useState, useEffect } from 'react';
import { Location } from '../../types/tracking';
import { MapPin, Navigation, Route } from 'lucide-react';

interface TrackingMapProps {
  origin: Location;
  destination: Location;
  currentLocation: Location | string; // Allow string or Location object
  route: Location[];
}

export default function TrackingMap({
  origin,
  destination,
  currentLocation,
  route
}: TrackingMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Convert currentLocation string to Location object if needed
  const getCurrentLocation = (): Location => {
    if (typeof currentLocation === 'string') {
      // Parse string like "Chicago, IL" into Location object
      const parts = currentLocation.split(',').map(part => part.trim());
      return {
        city: parts[0] || 'Unknown',
        state: parts[1] || '',
        country: 'USA',
      };
    }
    return currentLocation;
  };

  const currentLoc = getCurrentLocation();

  // In a real implementation, you would integrate with a mapping service
  // like Google Maps, Mapbox, or Leaflet
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getProgressPercentage = () => {
    // Simple progress calculation based on route index
    const currentIndex = route.findIndex(loc => 
      loc.city === currentLoc.city && loc.state === currentLoc.state
    );
    if (currentIndex === -1) return 33;
    return ((currentIndex + 1) / route.length) * 100;
  };

  const progress = getProgressPercentage();

  return (
    <div className="relative h-full">
      {/* Mock Map Visualization */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden">
        {!mapLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Route Line */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-blue-300 dark:bg-blue-800 transform -translate-y-1/2">
              <div 
                className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -right-2 -top-2">
                  <div className="relative">
                    <div className="animate-ping absolute inset-0 bg-blue-400 dark:bg-blue-600 rounded-full"></div>
                    <div className="relative bg-blue-600 dark:bg-blue-400 rounded-full p-2">
                      <Navigation className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Origin Marker */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <div className="relative">
                <div className="bg-green-600 rounded-full p-2">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm">
                  {origin.city}
                </div>
              </div>
            </div>

            {/* Destination Marker */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="relative">
                <div className="bg-red-600 rounded-full p-2">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm">
                  {destination.city}
                </div>
              </div>
            </div>

            {/* Current Location Marker */}
            {progress > 0 && progress < 100 && (
              <div 
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{ left: `${progress}%` }}
              >
                <div className="relative -translate-x-1/2">
                  <div className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-400 rounded-full p-3 shadow-lg">
                    <div className="bg-blue-600 dark:bg-blue-500 rounded-full p-1">
                      <Route className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm">
                    {currentLoc.city}
                  </div>
                </div>
              </div>
            )}

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Origin</span>
                      <span>{Math.round(progress)}%</span>
                      <span>Destination</span>
                    </div>
                    <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-red-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button 
          className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          title="Zoom In"
        >
          <span className="font-bold text-gray-700 dark:text-gray-300">+</span>
        </button>
        <button 
          className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          title="Zoom Out"
        >
          <span className="font-bold text-gray-700 dark:text-gray-300">-</span>
        </button>
        <button 
          className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          title="Center Map"
        >
          <Navigation className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Route Information */}
      <div className="absolute top-4 left-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Route className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-medium text-gray-800 dark:text-gray-200">Route Information</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Origin: {origin.city}, {origin.state}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Current: {currentLoc.city}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Destination: {destination.city}, {destination.state}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}