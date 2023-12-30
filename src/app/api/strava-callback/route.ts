export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request, response: Response) {
  return new Response("Hello from the API");
}
