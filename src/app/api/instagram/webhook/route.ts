import { NextResponse } from "next/server";

const META_VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || "postfolio_meta_verify_secret_token";

/**
 * Meta Webhook verification handshake
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === META_VERIFY_TOKEN) {
    console.log("Meta Webhook successfully verified!");
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

/**
 * Meta Webhook receiver for new Instagram media publications
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log("Received Instagram Webhook Event:", JSON.stringify(payload, null, 2));

    // When an Instagram creator posts a new photo/video, Meta sends:
    // { object: "instagram", entry: [{ id: "...", time: ..., changes: [{ field: "media", value: { media_id: "..." } }] }] }
    const entries = payload.entry || [];
    for (const entry of entries) {
      if (entry.changes) {
        for (const change of entry.changes) {
          if (change.field === "media") {
            const mediaId = change.value?.media_id;
            console.log(`Processing new media publication event for mediaId: ${mediaId}`);
            // In a production deployment, this triggers background task to fetch media details,
            // categorize it, and update the photographer's portfolio website.
          }
        }
      }
    }

    return NextResponse.json({ status: "EVENT_RECEIVED", received: true });
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
