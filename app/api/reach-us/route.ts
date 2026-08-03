import { NextResponse } from "next/server";
import { reachUsSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { reachUsHrTemplate, reachUsUserAckTemplate } from "@/emails/templates";
import { syncToHubSpot } from "@/lib/hubspot";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side Zod Validation
    const validation = reachUsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;
    const hrEmail = process.env.EMAIL_TO || process.env.SMTP_USER!;

    await Promise.allSettled([
      sendEmail({
        to: hrEmail,
        subject: `[Reach Us] ${data.subject}`,
        html: reachUsHrTemplate(data),
        replyTo: data.user_email,
      }),
      sendEmail({
        to: data.user_email,
        subject: "Thank you for reaching out - Aptagon Technologies",
        html: reachUsUserAckTemplate({ user_first_name: data.user_first_name }),
      }),
      syncToHubSpot({
        email: data.user_email,
        firstname: data.user_first_name,
        lastname: data.user_last_name,
        phone: data.user_phone,
        message: `[Subject: ${data.subject}] ${data.message}`,
      }),
    ]);

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error (/api/reach-us):", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Failed to send message." },
      { status: 500 }
    );
  }
}