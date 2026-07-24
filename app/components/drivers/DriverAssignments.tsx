export default function DriverAssignments({ driverId }: { driverId: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Current Assignments
      </h3>
      <div className="space-y-3">
        <p>Assignments for driver: {driverId}</p>
        <p>Coming soon: Route assignments and schedule</p>
      </div>
    </div>
  );
}