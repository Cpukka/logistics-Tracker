'use client';

import { useState } from 'react';
import { TrackingStatus, DeliveryOptions } from '../../types/tracking';
import { 
  Calendar, 
  MapPin, 
  Bell, 
  Download, 
  Share2, 
  Printer, 
  Clock,
  Package,
  Home,
  Mail,
  Phone,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ActionButtonsProps {
  trackingNumber: string;
  status: TrackingStatus;
  deliveryOptions: DeliveryOptions;
}

export default function ActionButtons({ trackingNumber, status, deliveryOptions }: ActionButtonsProps) {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `Track Shipment ${trackingNumber}`,
      text: `Track your shipment with tracking number ${trackingNumber}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Tracking link shared successfully!');
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          toast.error('Failed to share tracking link');
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Tracking link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
    toast.success('Printing tracking information...');
  };

  const handleDownload = () => {
    // Create a PDF or text file with tracking information
    const trackingData = `Tracking Number: ${trackingNumber}\nStatus: ${status}\nDate: ${new Date().toLocaleDateString()}\n\nThank you for using our tracking service.`;
    
    const blob = new Blob([trackingData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tracking-${trackingNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Tracking details downloaded!');
  };

  const handleNotification = () => {
    if (Notification.permission === 'granted') {
      toast.success('Notifications enabled for this shipment!');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          toast.success('Notifications enabled for this shipment!');
        }
      });
    }
  };

  const isActionDisabled = status === 'delivered' || status === 'returned';

  const mainActions = [
    {
      icon: <Calendar className="h-5 w-5" />,
      label: 'Reschedule Delivery',
      description: 'Choose a different delivery date',
      onClick: () => setShowRescheduleModal(true),
      disabled: isActionDisabled || !deliveryOptions.canReschedule,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Redirect Package',
      description: 'Send to a different address',
      onClick: () => setShowRedirectModal(true),
      disabled: isActionDisabled || !deliveryOptions.canRedirect,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Hold at Location',
      description: 'Pick up from nearby facility',
      onClick: () => setShowHoldModal(true),
      disabled: isActionDisabled || !deliveryOptions.canHoldAtLocation,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: 'Delivery Instructions',
      description: 'Add special instructions',
      onClick: () => setShowInstructionsModal(true),
      disabled: isActionDisabled || !deliveryOptions.canAddInstructions,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const utilityActions = [
    {
      icon: <Share2 className="h-4 w-4" />,
      label: 'Share',
      onClick: handleShare,
      color: 'text-blue-600 hover:bg-blue-50'
    },
    {
      icon: <Download className="h-4 w-4" />,
      label: 'Download',
      onClick: handleDownload,
      color: 'text-green-600 hover:bg-green-50'
    },
    {
      icon: <Printer className="h-4 w-4" />,
      label: 'Print',
      onClick: handlePrint,
      color: 'text-purple-600 hover:bg-purple-50'
    },
    {
      icon: <Bell className="h-4 w-4" />,
      label: 'Notify',
      onClick: handleNotification,
      color: 'text-orange-600 hover:bg-orange-50'
    }
  ];

  const contactOptions = [
    {
      icon: <Phone className="h-4 w-4" />,
      label: 'Call Support',
      description: 'Available 24/7',
      action: '+1-800-LOGISTIC',
      color: 'text-blue-600'
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: 'Email Support',
      description: 'Response within 2 hours',
      action: 'support@logistics.com',
      color: 'text-green-600'
    },
    {
      icon: <AlertCircle className="h-4 w-4" />,
      label: 'Report Issue',
      description: 'File a complaint or claim',
      action: 'Report Now',
      color: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {isActionDisabled && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                {status === 'delivered' 
                  ? 'This package has been delivered. Some actions are no longer available.'
                  : 'This package has been returned. Please contact support for assistance.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mainActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`flex items-center space-x-3 p-4 rounded-lg text-white ${action.color} transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md`}
            >
              <div className="shrink-0">{action.icon}</div>
              <div className="text-left">
                <p className="font-medium">{action.label}</p>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Utility Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          {utilityActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${action.color} transition-colors duration-200`}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
        <div className="space-y-3">
          {contactOptions.map((contact, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
              onClick={() => {
                if (contact.label === 'Call Support') {
                  window.location.href = `tel:${contact.action}`;
                } else if (contact.label === 'Email Support') {
                  window.location.href = `mailto:${contact.action}`;
                }
              }}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${contact.color} bg-opacity-10`}>
                  {contact.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{contact.label}</p>
                  <p className="text-sm text-gray-600">{contact.description}</p>
                </div>
              </div>
              <span className={`font-medium ${contact.color}`}>{contact.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Package className="h-5 w-5 text-gray-600" />
          <h4 className="font-medium text-gray-800">Tracking Reference</h4>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tracking Number</span>
            <code className="font-mono font-bold text-gray-800">{trackingNumber}</code>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Status</span>
            <span className="font-medium capitalize">{status.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last Updated</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}