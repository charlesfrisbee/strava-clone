import GeolocationComponent from "@/components/GeolocationComponent";
import Navbar from "@/components/NavBar";
import { getActivities, getAthlete } from "@/lib/strava";
import { calculatePace } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const data = await getAthlete();
  const activities = await getActivities();

  return (
    <main>
      <Navbar data={data} />
      {activities ? (
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Activities</h1>

          <ul className="flex flex-col gap-4">
            {activities.map((activity) => (
              <li key={activity.id}>
                <Link href={`/activity/${activity.id}`}>
                  <span className="text-xl hover:text-blue-500">
                    {activity.name}
                  </span>
                  <p>{`${Math.round(activity.distance / 1000)} km`}</p>
                  <p>{`${Math.round(activity.elapsed_time / 60)} min`}</p>
                  <p>{calculatePace(activity.average_speed)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">No activities found</h1>
        </div>
      )}

      <GeolocationComponent />
    </main>
  );
}
