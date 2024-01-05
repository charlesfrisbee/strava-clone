import ActivityList from "@/components/ActivityList";
import Navbar from "@/components/NavBar";
import StravaTracker from "@/components/StravaTracker";
import { getActivities, getAthlete } from "@/lib/strava";

export default async function Home() {
  const activities = await getActivities();

  return (
    <main>
      {activities && (
        <>
          <ActivityList activities={activities} />
          <StravaTracker />
        </>
      )}
    </main>
  );
}
