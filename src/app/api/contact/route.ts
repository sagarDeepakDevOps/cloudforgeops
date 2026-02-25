import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Resend client (initialised lazily so missing key gives a clear error) ─────
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY environment variable is not set.");
  }
  return new Resend(key);
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  description: string;
  /** Honeypot — must remain empty; bots autofill it */
  website?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: object, status = 200) {
  return NextResponse.json(data, { status });
}

// ── HTML email template ───────────────────────────────────────────────────────
function buildHtml(p: Required<Omit<ContactPayload, "website">>): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;font-weight:600;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;width:130px">${label}</td>
      <td style="padding:10px 16px;color:#f1f5f9;font-size:14px;line-height:1.6">${escape(value)}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New contact enquiry</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:ui-sans-serif,system-ui,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px">
        <table role="presentation" width="600" style="max-width:600px;width:100%">

          <!-- Header -->
          <tr>
            <td style="background:#111827;border-radius:12px 12px 0 0;padding:28px 32px;border-bottom:1px solid #1e293b">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#818cf8">RelientOps</p>
              <h1 style="margin:8px 0 0;font-size:20px;font-weight:700;color:#f1f5f9">New contact enquiry</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#111827;padding:8px 0">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                ${row("Name", p.name)}
                <tr><td colspan="2" style="padding:0 16px"><hr style="border:none;border-top:1px solid #1e293b;margin:0" /></td></tr>
                ${row("Email", p.email)}
                <tr><td colspan="2" style="padding:0 16px"><hr style="border:none;border-top:1px solid #1e293b;margin:0" /></td></tr>
                ${row("Company", p.company || "—")}
                <tr><td colspan="2" style="padding:0 16px"><hr style="border:none;border-top:1px solid #1e293b;margin:0" /></td></tr>
                <tr>
                  <td style="padding:10px 16px;font-weight:600;color:#94a3b8;vertical-align:top;font-size:13px;width:130px">Project</td>
                  <td style="padding:10px 16px;color:#f1f5f9;font-size:14px;line-height:1.7;white-space:pre-wrap">${escape(p.description)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f172a;border-radius:0 0 12px 12px;padding:20px 32px;border-top:1px solid #1e293b">
              <p style="margin:0;font-size:12px;color:#475569">
                Sent from the <a href="https://relientops.io/contact" style="color:#818cf8;text-decoration:none">relientops.io contact form</a>
                &nbsp;·&nbsp; ${new Date().toUTCString()}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // ── 1. Parse body ──────────────────────────────────────────────────────────
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, error: "Invalid request body." }, 400);
  }

  const { name, email, company = "", description, website = "" } = body;

  // ── 2. Honeypot — silently discard bot submissions ─────────────────────────
  if (website.trim() !== "") {
    // Return 200 to not reveal bot detection
    return json({ success: true });
  }

  // ── 3. Validate required fields ────────────────────────────────────────────
  const fieldErrors: Record<string, string> = {};

  if (!name?.trim()) {
    fieldErrors.name = "Name is required.";
  }
  if (!email?.trim()) {
    fieldErrors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email.trim())) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (!description?.trim()) {
    fieldErrors.description = "Project description is required.";
  } else if (description.trim().length < 20) {
    fieldErrors.description = "Please add more detail (at least 20 characters).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return json({ success: false, fieldErrors }, 422);
  }

  // ── 4. Resolve recipient ───────────────────────────────────────────────────
  const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  if (!to) {
    console.error("[contact] NEXT_PUBLIC_CONTACT_EMAIL is not configured.");
    return json({ success: false, error: "Server misconfiguration — please email directly." }, 500);
  }

  // ── 5. Send via Resend ─────────────────────────────────────────────────────
  try {
    const resend = getResend();

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      description: description.trim(),
    };

    const { error } = await resend.emails.send({
      from: "RelientOps Contact <onboarding@resend.dev>",
      to: [to],
      replyTo: payload.email,
      subject: `[RelientOps] New enquiry from ${payload.name}${payload.company ? ` · ${payload.company}` : ""}`,
      html: buildHtml(payload),
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || "—"}`,
        "",
        `Project description:`,
        payload.description,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return json({ success: false, error: "Failed to send email. Please try again." }, 502);
    }

    return json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      500
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return json({ error: "Method not allowed." }, 405);
}
