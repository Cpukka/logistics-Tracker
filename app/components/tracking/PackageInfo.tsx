import { PackageDetails, ContactInfo } from '../../types/tracking';
import { Package, User, MapPin, Phone, Mail, DollarSign, Box, Weight, Ruler } from 'lucide-react';

interface PackageInfoProps {
  packageDetails: PackageDetails;
  sender: ContactInfo;
  recipient: ContactInfo;
}

export default function PackageInfo({ packageDetails, sender, recipient }: PackageInfoProps) {
  return (
    <div className="space-y-6">
      {/* Package Details */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Package className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Package Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Weight className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Weight</p>
              <p className="font-medium">{packageDetails.weight}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Ruler className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Dimensions</p>
              <p className="font-medium">{packageDetails.dimensions}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Box className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Package Type</p>
              <p className="font-medium">{packageDetails.packageType}</p>
            </div>
          </div>
          {packageDetails.declaredValue && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Declared Value</p>
                <p className="font-medium">${packageDetails.declaredValue.toFixed(2)}</p>
              </div>
            </div>
          )}
          <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Contents</p>
            <p className="font-medium">{packageDetails.contents}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Sender Information */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Sender</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <User className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">{sender.name}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">{sender.address}</p>
              <p className="text-sm text-gray-600">{sender.city}</p>
            </div>
          </div>
          {sender.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <p className="font-medium">{sender.phone}</p>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Recipient Information */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Recipient</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <User className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">{recipient.name}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">{recipient.address}</p>
              <p className="text-sm text-gray-600">{recipient.city}</p>
            </div>
          </div>
          {recipient.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <p className="font-medium">{recipient.phone}</p>
            </div>
          )}
          {recipient.email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <p className="font-medium">{recipient.email}</p>
            </div>
          )}
        </div>
      </div>

      {/* Package ID Summary */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-700 font-medium">Shipment ID</p>
            <p className="text-xs text-blue-600">Use this ID for reference</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono font-bold text-blue-800">PKG-{Date.now().toString().slice(-8)}</p>
            <p className="text-xs text-blue-600">Package ID</p>
          </div>
        </div>
      </div>
    </div>
  );
}