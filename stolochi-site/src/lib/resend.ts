import { type ContactFormData } from "@/types";

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!apiKey || !ownerEmail) {
    throw new Error("Email configuration is missing. Set RESEND_API_KEY and OWNER_EMAIL.");
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const servicesLine =
    data.services.length > 0 ? data.services.join(", ") : "Not specified";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2C2C2C;">
      <div style="background: #2C2C2C; padding: 32px; text-align: center;">
        <h1 style="color: #C8A96E; font-size: 24px; margin: 0; font-family: Georgia, serif;">
          Stolochi Makeup &amp; Hair
        </h1>
        <p style="color: #FAF7F5; margin: 8px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">
          New Inquiry
        </p>
      </div>

      <div style="padding: 32px; background: #FAF7F5; border: 1px solid #E8E2DC;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 13px; color: #6B6B6B; width: 140px; vertical-align: top;">
              Name
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 14px; font-weight: 600;">
              ${data.name}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 13px; color: #6B6B6B; vertical-align: top;">
              Email
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 14px;">
              <a href="mailto:${data.email}" style="color: #C8A96E;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 13px; color: #6B6B6B; vertical-align: top;">
              Phone
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 14px;">
              <a href="tel:${data.phone}" style="color: #C8A96E;">${data.phone || "Not provided"}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 13px; color: #6B6B6B; vertical-align: top;">
              Services
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 14px;">
              ${servicesLine}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 13px; color: #6B6B6B; vertical-align: top;">
              Event Date
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #E8E2DC; font-size: 14px;">
              ${data.eventDate || "Not specified"}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #6B6B6B; vertical-align: top;">
              Message
            </td>
            <td style="padding: 10px 0; font-size: 14px; line-height: 1.6;">
              ${data.message.replace(/\n/g, "<br>")}
            </td>
          </tr>
        </table>
      </div>

      <div style="padding: 20px 32px; text-align: center; font-size: 11px; color: #6B6B6B;">
        Sent via stolochimakeuphair.com
      </div>
    </div>
  `;

  await resend.emails.send({
    // TODO: change to "Stolochi Website <noreply@stolochimakeuphair.com>" once domain is verified in Resend
    from: "Stolochi Website <onboarding@resend.dev>",
    to: [ownerEmail],
    replyTo: data.email,
    subject: `New inquiry from ${data.name}${data.eventDate ? ` — ${data.eventDate}` : ""}`,
    html,
  });
}
