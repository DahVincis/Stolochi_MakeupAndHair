import { getCloudflareContext } from "@opennextjs/cloudflare";
import { sendContactEmail } from "@/lib/resend";
import { type ContactFormData } from "@/types";

export const dynamic = "force-dynamic";

const MAX = {
  name: 100,
  email: 200,
  phone: 40,
  eventDate: 40,
  message: 5000,
  services: 30,
} as const;

function str(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > max ? null : trimmed;
}

/** Returns the validated payload, or a reason string if the body is unusable. */
function parse(body: unknown): ContactFormData | string {
  if (typeof body !== "object" || body === null) return "Malformed request.";
  const b = body as Record<string, unknown>;

  // Honeypot: a real browser leaves this hidden field empty.
  if (typeof b.website === "string" && b.website !== "") return "Rejected.";

  const name = str(b.name, MAX.name);
  if (!name) return "Please enter your name.";

  const email = str(b.email, MAX.email);
  if (!email || !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  const message = str(b.message, MAX.message);
  if (!message) return "Please enter a message.";

  const phone = str(b.phone ?? "", MAX.phone);
  if (phone === null) return "That phone number is too long.";

  const eventDate = str(b.eventDate ?? "", MAX.eventDate);
  if (eventDate === null) return "That event date is not valid.";

  const raw = b.services ?? [];
  if (!Array.isArray(raw) || raw.length > MAX.services) return "Invalid service selection.";
  const services: string[] = [];
  for (const item of raw) {
    const s = str(item, MAX.name);
    if (!s) return "Invalid service selection.";
    services.push(s);
  }

  return { name, email, phone, eventDate, message, services };
}

export async function POST(request: Request) {
  // This endpoint sends email on demand, so throttle it before doing any work.
  const limiter = getCloudflareContext().env.CONTACT_RATE_LIMIT;
  if (limiter) {
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await limiter.limit({ key: ip });
    if (!success) {
      return Response.json(
        { error: "Too many messages. Please try again in a minute." },
        { status: 429 },
      );
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = parse(body);
  if (typeof parsed === "string") {
    return Response.json({ error: parsed }, { status: 400 });
  }

  try {
    await sendContactEmail(parsed);
  } catch (err) {
    // Log the real cause; never hand Resend's error text to the browser.
    console.error("[contact] send failed:", (err as Error).message);
    return Response.json(
      { error: "Sorry — the message could not be sent. Please call or text instead." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
