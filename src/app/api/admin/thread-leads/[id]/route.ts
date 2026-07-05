import { supabaseAdmin } from "@/lib/supabaseAdmin";

const VALID_STATUSES = ["new", "contacted", "ignored"];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json();

  if (!VALID_STATUSES.includes(status)) {
    return Response.json({ success: false, error: "invalid_status" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("thread_leads").update({ status }).eq("id", id);

  if (error) {
    console.error("Failed to update thread_lead status:", error);
    return Response.json({ success: false }, { status: 500 });
  }

  return Response.json({ success: true });
}
