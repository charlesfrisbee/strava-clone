export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";
export async function GET(request: Request, response: Response) {
  const clientID = process.env.STRAVA_CLIENT_ID;
  const redirectURI = encodeURIComponent(
    `${process.env.BASE_URL}/api/strava-callback`
  );
  const scopes = encodeURIComponent("activity:write,activity:read_all");
  const stravaAuthURL = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&approval_prompt=force&scope=activity:write,activity:read_all`;
  return new Response(null, {
    status: 302,
    headers: { Location: stravaAuthURL },
  });
}
