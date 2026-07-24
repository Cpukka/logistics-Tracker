export default function DriverStats({ driverId }: { driverId: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Driver Statistics
      </h3>
      <div className="space-y-3">
        <p>Statistics for driver: {driverId}</p>
        <p>Coming soon: Performance metrics and statistics</p>
      </div>
    </div>
  );
}