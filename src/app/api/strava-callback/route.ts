import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  if (!code) {
    return new Response("No code found", { status: 400 });
  }

  const clientID = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  // Prepare the data for the body
  const params = new URLSearchParams();
  params.append("client_id", clientID!);
  params.append("client_secret", clientSecret!);
  params.append("code", code);
  params.append("grant_type", "authorization_code");

  // Exchange code for an access token
  const tokenResponse = await fetch(
    "https://www.strava.com/api/v3/oauth/token",
    {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Specify the content type
      },
      body: params, // Pass the URLSearchParams object as the body
    }
  );

  // Process the response here
  // For example, convert the response to JSON and then do something with it
  const responseData = await tokenResponse.json();
  console.log(responseData);
  console.log("strava callback called");

  return new Response("Hello world");
}
