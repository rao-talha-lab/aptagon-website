import { NextResponse } from "next/server";
import { scheduleCallSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { scheduleCallHrTemplate, scheduleCallUserAckTemplate } from "@/emails/templates";
import { syncToHubSpot } from "@/lib/hubspot";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side Zod Validation
    const validation = scheduleCallSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;
    const hrEmail = process.env.EMAIL_TO || process.env.SMTP_USER!;

    const nameParts = (data.name || "").trim().split("");
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join("") || "";

    await Promise.allSettled([
      sendEmail({
        to: hrEmail,
        subject: `[Consultation Scheduled] ${data.name} - ${data.date} @ ${data.time}`,
        html: scheduleCallHrTemplate(data),
        replyTo: data.email,
      }),
      sendEmail({
        to: data.email,
        subject: "Consultation Booking Confirmed - Aptagon Technologies",
        html: scheduleCallUserAckTemplate(data),
      }),
      syncToHubSpot({
        email: data.email,
        firstname: firstname,
        lastname: lastname,
      }),
    ]);

    return NextResponse.json(
      { success: true, message: "Booking confirmed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error (/api/schedule-call):", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Failed to confirm booking." },
      { status: 500 }
    );
  }
}