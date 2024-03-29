import { Activity } from "@/lib/types";
import { calculatePace } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type ActivityListProps = {
  activities: Activity[];
};

const ActivityList = ({ activities }: ActivityListProps) => {
  if (activities.length === 0) {
    return (
      <div className="container text-center">
        <h1 className="text-4xl font-bold">Activities</h1>
        <p className="text-xl mt-4">No activities found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <h1 className="text-4xl font-bold">Activities</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <li key={activity.id} className="border p-4">
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
  );
};

export default ActivityList;
