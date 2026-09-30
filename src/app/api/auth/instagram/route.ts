import { NextResponse } from "next/server";
import { getInstagramAuthUrl, DEFAULT_META_CONFIG } from "@/lib/instagramApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customClientId = searchParams.get("client_id");
  const customRedirect = searchParams.get("redirect_uri");

  const config = {
    ...DEFAULT_META_CONFIG,
    ...(customClientId ? { clientId: customClientId } : {}),
    ...(customRedirect ? { redirectUri: customRedirect } : {}),
  };

  const authUrl = getInstagramAuthUrl(config);

  return NextResponse.json({
    status: "ok",
    authUrl,
    scope: config.scope,
    instructions: "Redirect the user to authUrl to grant official Meta permissions for Instagram Graph API.",
  });
}
