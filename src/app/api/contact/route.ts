import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const inquiry = await request.json();

    console.log("New Photographer Booking Commission Received:", inquiry);

    // In production, send confirmation email via Resend/Postmark/SendGrid
    // and deliver push/SMS notification to photographer.

    return NextResponse.json({
      status: "success",
      inquiryId: "inq_" + Date.now(),
      receivedAt: new Date().toISOString(),
      message: "Commission inquiry received. Photographer has been notified.",
    });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
