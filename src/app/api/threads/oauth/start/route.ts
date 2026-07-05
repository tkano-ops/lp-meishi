const SCOPES = [
  "threads_basic",
  "threads_read_replies",
  "threads_manage_replies",
  "threads_manage_mentions",
].join(",");

export function GET() {
  const url = new URL("https://threads.net/oauth/authorize");
  url.searchParams.set("client_id", process.env.THREADS_APP_ID!);
  url.searchParams.set("redirect_uri", process.env.THREADS_REDIRECT_URI!);
  url.searchParams.set("scope", SCOPES);
  url.searchParams.set("response_type", "code");

  return Response.redirect(url.toString());
}
