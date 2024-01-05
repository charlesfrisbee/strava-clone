import ActivityList from "@/components/ActivityList";
import StravaTracker from "@/components/StravaTracker";
import { getActivities } from "@/lib/strava";
import { Suspense } from "react";

export default async function Home() {
  const activities = await getActivities();

  if (!activities) {
    return;
  }

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <ActivityList activities={activities} />
      </Suspense>
      <StravaTracker />
    </main>
  );
}
