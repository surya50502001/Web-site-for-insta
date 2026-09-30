import { NextResponse } from "next/server";
import { exchangeCodeForToken, fetchInstagramProfile, fetchInstagramMedia } from "@/lib/instagramApi";
import { autoOrganizePosts } from "@/lib/categorizer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorReason = searchParams.get("error_reason");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    return NextResponse.json(
      {
        status: "error",
        error,
        errorReason,
        errorDescription,
      },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      {
        status: "error",
        message: "No authorization code provided in callback.",
      },
      { status: 400 }
    );
  }

  // Exchange code for official access token
  const tokenResult = await exchangeCodeForToken(code);

  if (!tokenResult.success || !tokenResult.accessToken) {
    return NextResponse.json(
      {
        status: "error",
        message: tokenResult.error || "Token exchange failed.",
      },
      { status: 400 }
    );
  }

  // Retrieve official profile & media
  const profile = await fetchInstagramProfile(tokenResult.accessToken);
  const media = await fetchInstagramMedia(tokenResult.accessToken, 30);
  const organized = autoOrganizePosts(media);

  return NextResponse.json({
    status: "success",
    profile,
    postsCount: media.length,
    categories: organized.categoryCounts,
    message: "Instagram account connected and initial media ingested.",
  });
}
