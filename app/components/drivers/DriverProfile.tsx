export default function DriverProfile({ driverId }: { driverId: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Driver Profile
      </h2>
      <div className="space-y-4">
        <p>Driver ID: {driverId}</p>
        <p>Coming soon: Detailed driver profile information</p>
      </div>
    </div>
  );
}