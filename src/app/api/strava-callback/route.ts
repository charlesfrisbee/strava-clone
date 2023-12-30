import { getAccessToken } from "@/lib/strava";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  if (!code) {
    return new Response("No code found", { status: 400 });
  }

  const token = await getAccessToken(code);

  console.log("strava callback called");

  return new Response("Hello world");
}
