import { NextResponse } from "next/server";
import { SAMPLE_POSTS, PRIMARY_PHOTOGRAPHER } from "@/lib/mockData";
import { categorizePost } from "@/lib/categorizer";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username = "elena.visuals", simulatedPost } = body;

    // Categorize simulated post if provided
    let newPost = null;
    if (simulatedPost) {
      const cat = categorizePost(simulatedPost.caption || "", simulatedPost.mediaType || "IMAGE");
      newPost = {
        ...simulatedPost,
        category: cat.category,
      };
    }

    return NextResponse.json({
      status: "success",
      username,
      syncedAt: new Date().toISOString(),
      newPost,
      message: `Successfully synchronized Instagram posts for @${username}. Portfolio updated.`,
    });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
