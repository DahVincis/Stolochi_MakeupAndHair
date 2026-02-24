import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/resend";
import { type ContactFormData } from "@/types";

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Basic validation
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    await sendContactEmail(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] Error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or call us directly." },
      { status: 500 },
    );
  }
}
