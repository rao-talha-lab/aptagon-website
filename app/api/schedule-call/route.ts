import { NextResponse } from "next/server";
import { scheduleCallSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { scheduleCallHrTemplate, scheduleCallUserAckTemplate } from "@/emails/templates";
import { syncToHubSpot } from "@/lib/hubspot";
import { createGoogleMeetEvent } from "@/lib/googleCalendar";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side Zod Validation
    const validation = scheduleCallSchema.safeParse(body);
    if (!validation.success) {
      console.error("Validation errors:", validation.error.flatten().fieldErrors);
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid booking details submitted.",
          errors: validation.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    const hrEmail = process.env.EMAIL_TO || process.env.SMTP_USER!;

    const [year, month, day] = data.date.split("-").map(Number);
    const rawTime = data.pktTime || data.time;

    const timeMatch = rawTime.match(/(\d+): (\d+)\s*(AM|PM)?/i);
    let hours = 9;
    let minutes = 0;

    if(timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      minutes = parseInt(timeMatch[2], 10);
      const modifier = timeMatch[3];

      if(modifier) {
        if(modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
        if(modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
      }
    }

    const startTimeIso = new Date(Date.UTC(year, month - 1, day, hours - 5, minutes)).toISOString();

    const dynamicMeetLink = await createGoogleMeetEvent({
      title: `Consultation: ${data.name} & Aptagon Technologies`,
      description: `Consultaion meeting with ${data.name} (${data.email})`,
      startTimeIso,
      clientEmail: data.email,
      hrEmail: hrEmail,
    });

    const meetingLink = dynamicMeetLink || "https://meet.google.com";

    // Fixed split logic: split by space " " instead of ""
    const nameParts = (data.name || "").trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    await Promise.allSettled([
      // Email for HR (Formatted with Pakistan Time PKT)
      sendEmail({
        to: hrEmail,
        subject: `[Consultation Scheduled] ${data.name} - ${data.date} @ ${data.pktTime || data.time} (PKT)`,
        html: scheduleCallHrTemplate({
          ...data,
          displayTime: `${data.pktTime || data.time} (Asia/Karachi PKT)`,
          meetingLink,
        }),
        replyTo: data.email,
      }),

      // Email for Client (Formatted in their local Time Zone)
      sendEmail({
        to: data.email,
        subject: "Consultation Booking Confirmed - Aptagon Technologies",
        html: scheduleCallUserAckTemplate({
          ...data,
          displayTime: `${data.time} (${data.timezone || "Local Time"})`,
          meetingLink,
        }),
      }),

      // HubSpot CRM Sync
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