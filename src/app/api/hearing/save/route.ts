import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const slug: string = data?.slug || `unknown-${Date.now()}`;

    const { error } = await supabaseAdmin.from("hearings").upsert(
      {
        slug,
        name: data?.name ?? null,
        subtitle: data?.subtitle ?? null,
        data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );

    if (error) throw error;

    return Response.json({ success: true, slug });
  } catch (err) {
    console.error("Save error:", err);
    return Response.json({ success: false }, { status: 500 });
  }
}
