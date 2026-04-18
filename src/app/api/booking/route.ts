import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message, type } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Numonics Booking <onboarding@resend.dev>",
    to: "numonics@gmail.com",
    replyTo: email,
    subject: `Booking Inquiry from ${name}${type ? ` — ${type}` : ""}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#050505;color:#fff;padding:32px;border-left:4px solid #ff0099;">
        <h2 style="color:#ff0099;margin-top:0;text-transform:uppercase;letter-spacing:0.1em;">New Booking Inquiry</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#aaa;width:100px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#ff0099;">${email}</a></td></tr>
          ${type ? `<tr><td style="padding:8px 0;color:#aaa;">Type</td><td style="padding:8px 0;">${type}</td></tr>` : ""}
        </table>
        <hr style="border:none;border-top:1px solid #222;margin:24px 0;"/>
        <p style="color:#aaa;margin:0 0 8px;text-transform:uppercase;font-size:12px;letter-spacing:0.1em;">Message</p>
        <p style="margin:0;line-height:1.6;white-space:pre-wrap;">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
