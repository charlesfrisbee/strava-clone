import GeolocationComponent from "@/components/GeolocationComponent";
import Navbar from "@/components/NavBar";
import { getAthlete } from "@/lib/strava";
import Link from "next/link";

export default async function Home() {
  const data = await getAthlete();

  return (
    <main>
      <Navbar data={data} />

      <GeolocationComponent />
    </main>
  );
}
