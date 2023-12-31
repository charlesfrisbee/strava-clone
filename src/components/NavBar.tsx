import { Athlete } from "@/lib/types";
import Link from "next/link";

type NavbarProps = {
  data: Athlete | undefined;
};

const Navbar = ({ data }: NavbarProps) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-2xl font-bold cursor-pointer">Strava App</span>
      </Link>
      {data ? (
        <div className="flex items-center">
          <img
            className="rounded-full w-10 h-10 mr-4"
            src={data.profile_medium}
            alt="Strava User"
          />
          <div className="mr-6">
            <p>
              {data.firstname} {data.lastname}
            </p>
          </div>
          <Link href="/api/logout">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Log out
            </button>
          </Link>
        </div>
      ) : (
        <Link href="/api/login">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <span className="mr-2">Connect with</span>
            <img
              src="/strava-logo.svg"
              className="w-16 h-4"
              alt="Strava logo"
            />
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
