import { exchangeCodeForToken } from "@/lib/threadsClient";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    return Response.redirect(new URL(`/admin/threads?error=${error ?? "no_code"}`, url.origin));
  }

  try {
    await exchangeCodeForToken(code, process.env.THREADS_REDIRECT_URI!);
    return Response.redirect(new URL("/admin/threads?connected=1", url.origin));
  } catch (err) {
    console.error("Threads OAuth callback error:", err);
    return Response.redirect(new URL("/admin/threads?error=exchange_failed", url.origin));
  }
}
