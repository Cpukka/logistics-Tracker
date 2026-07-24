export default function ShipmentActions({ shipmentId }: { shipmentId: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Actions
      </h3>
      <div className="space-y-3">
        <p>Actions for shipment: {shipmentId}</p>
        <p>Coming soon: Shipment management actions</p>
      </div>
    </div>
  );
}