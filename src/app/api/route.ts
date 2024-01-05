import { buildStravaAuthUrl } from "@/lib/strava";

export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";
export async function GET(request: Request, response: Response) {
  const clientID = process.env.STRAVA_CLIENT_ID;
  const redirectURI = encodeURIComponent(
    `${process.env.BASE_URL}/api/strava-callback`
  );
  const stravaAuthURL = buildStravaAuthUrl(clientID!, redirectURI);
  return new Response(null, {
    status: 302,
    headers: { Location: stravaAuthURL },
  });
}
