import GeolocationComponent from "@/components/GeolocationComponent";
import { getAthlete } from "@/lib/strava";
import Link from "next/link";

export default async function Home() {
  const data = await getAthlete();

  return (
    <main>
      {data ? (
        <div>
          <h1>Strava User</h1>
          <p>{data.firstname}</p>
          <p>{data.lastname}</p>
          <img
            className="rounded-full"
            src={data.profile_medium}
            alt="Strava User"
          />
          <Link href="/api/logout">Log out</Link>
        </div>
      ) : (
        <Link href="/api/login">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center max-w-xs md:max-w-sm">
            <span className="mr-2">Connect with</span>
            <img
              src="/strava-logo.svg"
              className="w-16 h-4"
              alt="Strava logo"
            />
          </button>
        </Link>
      )}
      <GeolocationComponent />
    </main>
  );
}
