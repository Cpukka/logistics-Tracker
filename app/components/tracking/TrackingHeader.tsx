'use client';

import { TrackingData } from '../../types/tracking';
import { Copy, Share2, QrCode, Bell, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface TrackingHeaderProps {
  trackingNumber: string;
  data: TrackingData;
  viewMode?: string;
}

export default function TrackingHeader({ 
  trackingNumber, 
  data,
  viewMode 
}: TrackingHeaderProps) {
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingNumber);
    toast.success('Tracking number copied!');
  };

  const handleShare = async () => {
    const shareData = {
      title: `Track Shipment ${trackingNumber}`,
      text: `Track your shipment with LogiTrack: ${trackingNumber}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const showQRCode = () => {
    toast.success('QR code generated!', {
      icon: <QrCode className="h-5 w-5" />,
    });
  };

  const toggleNotifications = () => {
    toast.success('Notifications enabled for this shipment!');
  };

  return (
    <div className="mb-8">
      {/* Back Navigation */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Search</span>
      </button>

      {/* Header Content */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Track Shipment
            </h1>
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              {data.status.replace('_', ' ').toUpperCase()}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <code className="font-mono text-xl font-bold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
              {trackingNumber}
            </code>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Copy tracking number"
              >
                <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Share tracking"
              >
                <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={showQRCode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Show QR code"
              >
                <QrCode className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={toggleNotifications}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Enable notifications"
              >
                <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Shipped from {data.origin.city} to {data.destination.city} • {data.serviceLevel} Service
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.daysInTransit}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Days in Transit</div>
          </div>
          <div className="h-10 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(data.distanceTraveled).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Kilometers</div>
          </div>
        </div>
      </div>
    </div>
  );
}