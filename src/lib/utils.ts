export function calculatePace(averageSpeedMetersPerSecond: number): string {
  if (averageSpeedMetersPerSecond <= 0) {
    return "N/A"; // or any appropriate representation for invalid or zero speed
  }

  const speedKmPerHr = averageSpeedMetersPerSecond * 3.6; // Convert m/s to km/h
  const paceHrPerKm = 1 / speedKmPerHr; // Convert to hours per kilometer
  const paceMinPerKm = paceHrPerKm * 60; // Convert to minutes per kilometer

  // Format the pace to a readable string, e.g., "5.2 min/km"
  return `${paceMinPerKm.toFixed(2)} min/km`;
}
