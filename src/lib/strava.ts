import { NextRequest } from "next/server";
import {
  Activity,
  Athlete,
  GeolocationDataPoint,
  StravaAuthResponse,
} from "./types";
import { cookies } from "next/headers";
import { buildGPXFile } from "./gpx";

export const getNewAccessToken = async (code?: string) => {
  if (!code) {
    throw new Error("No code found");
  }
  const clientID = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  if (!clientID || !clientSecret) {
    throw new Error("Client ID or Client Secret is not set");
    // or handle the missing values appropriately
  }
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
      method: "POST",
      // Specify the method
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }
  );
  // Process the response here
  // For example, convert the response to JSON and then do something with it
  const responseData = await tokenResponse.json();
  console.log(responseData);
  return responseData as StravaAuthResponse;
};

export const getAccessTokenFromCookie = async () => {
  //   const cookieHeader = request.headers.get("cookie");
  const requestCookies = cookies().get("auth");
  if (!requestCookies) {
    return;
  }
  return requestCookies.value;
};

export const getAthlete = async () => {
  const accessToken = await getAccessTokenFromCookie();

  if (!accessToken) {
    return;
  }
  const stravaResponse = await fetch("https://www.strava.com/api/v3/athlete", {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { tags: ["strava"] },
  });

  if (!stravaResponse.ok) {
    return;
  }

  const stravaResponseData = await stravaResponse.json();
  return stravaResponseData as Athlete;
};

export const getActivities = async () => {
  const accessToken = await getAccessTokenFromCookie();

  if (!accessToken) {
    return;
  }
  const stravaResponse = await fetch(
    "https://www.strava.com/api/v3/athlete/activities/?per_page=5",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      // next: { tags: ["strava"] },
    }
  );

  if (!stravaResponse.ok) {
    const stravaResponseData = await stravaResponse.json();
    console.log(stravaResponseData);
    return;
  }

  const stravaResponseData = await stravaResponse.json();

  return stravaResponseData as Activity[];
};

export const uploadActivity = async (
  geolocationData: GeolocationDataPoint[]
) => {
  const accessToken = await getAccessTokenFromCookie();

  if (!accessToken) {
    return;
  }

  const gpxString = buildGPXFile(geolocationData);
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([gpxString], { type: "application/gpx+xml" }),
    "activity.gpx"
  );
  formData.append("data_type", "gpx");
  const stravaResponse = await fetch("https://www.strava.com/api/v3/uploads", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
    // next: { tags: ["strava"] },
  });

  if (!stravaResponse.ok) {
    console.log(stravaResponse.status);
    const stravaResponseData = await stravaResponse.json();
    console.log(stravaResponseData);
    return;
  }

  const stravaResponseData = await stravaResponse.json();
  console.log(stravaResponseData);

  return stravaResponseData as any;
};
