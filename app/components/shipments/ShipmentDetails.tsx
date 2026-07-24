export default function ShipmentDetails({ shipmentId }: { shipmentId: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Shipment Details
      </h2>
      <div className="space-y-4">
        <p>Shipment ID: {shipmentId}</p>
        <p>Coming soon: Detailed shipment information</p>
      </div>
    </div>
  );
}