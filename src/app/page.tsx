import ActivityList from "@/components/ActivityList";
import StravaTracker from "@/components/StravaTracker";
import { getActivities } from "@/lib/strava";

export default async function Home() {
  const activities = await getActivities();

  if (!activities) {
    return (
      <div className="container mx-auto text-center">
        <p className="text-xl mt-4">
          There was a problem fetching your activities
        </p>
      </div>
    );
  }

  return (
    <main>
      <ActivityList activities={activities} />
      <StravaTracker />
    </main>
  );
}
