export default function ShipmentTracking({ shipmentId }: { shipmentId: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Tracking Information
      </h3>
      <div className="space-y-3">
        <p>Tracking for shipment: {shipmentId}</p>
        <p>Coming soon: Real-time tracking updates</p>
      </div>
    </div>
  );
}