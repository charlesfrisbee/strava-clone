import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";
export async function GET(request: Request, response: Response) {
  cookies().delete("auth");

  revalidatePath("/");

  return new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });
}
