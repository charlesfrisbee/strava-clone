// give the code for a next 13 route handler

import { getAccessTokenFromCookie, getNewAccessToken } from "@/lib/strava";

export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";

export async function GET(request: Request, response: Response) {
  const accessToken = await getAccessTokenFromCookie();

  try {
    const stravaResponse = await fetch(
      "https://www.strava.com/api/v3/athlete",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (stravaResponse.ok) {
      const stravaResponseData = await stravaResponse.json();
      return new Response(
        JSON.stringify({ isLoggedIn: true, res: stravaResponseData }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // Handle token expiration and refresh here if possible
      return new Response(JSON.stringify({ isLoggedIn: false }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ isLoggedIn: false }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
