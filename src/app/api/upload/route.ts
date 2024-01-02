// give the code for a next 13 route handler

import { uploadActivity } from "@/lib/strava";

export const dynamic = "force-dynamic"; // defaults to auto
// export const runtime = "edge";

export async function POST(request: Request, response: Response) {
  try {
    const geolocationData = await request.json();
    console.log(geolocationData);
    const hehe = await uploadActivity(geolocationData);
    return new Response(JSON.stringify({ res: "success" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ res: "fail" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
