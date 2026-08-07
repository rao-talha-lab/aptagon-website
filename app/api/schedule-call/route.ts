// import { NextResponse } from "next/server";
// import { scheduleCallSchema } from "@/lib/validation";
// import { sendEmail } from "@/lib/email";
// import { scheduleCallHrTemplate, scheduleCallUserAckTemplate } from "@/emails/templates";
// import { syncToHubSpot } from "@/lib/hubspot";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     // Server-side Zod Validation
//     const validation = scheduleCallSchema.safeParse(body);
//     if (!validation.success) {
//       return NextResponse.json(
//         { success: false, errors: validation.error.flatten().fieldErrors },
//         { status: 400 }
//       );
//     }

//     const data = validation.data;
//     const hrEmail = process.env.EMAIL_TO || process.env.SMTP_USER!;

//     const nameParts = (data.name || "").trim().split("");
//     const firstname = nameParts[0] || "";
//     const lastname = nameParts.slice(1).join("") || "";

//     await Promise.allSettled([
//       sendEmail({
//         to: hrEmail,
//         subject: `[Consultation Scheduled] ${data.name} - ${data.date} @ ${data.time}`,
//         html: scheduleCallHrTemplate(data),
//         replyTo: data.email,
//       }),
//       sendEmail({
//         to: data.email,
//         subject: "Consultation Booking Confirmed - Aptagon Technologies",
//         html: scheduleCallUserAckTemplate(data),
//       }),
//       syncToHubSpot({
//         email: data.email,
//         firstname: firstname,
//         lastname: lastname,
//       }),
//     ]);

//     return NextResponse.json(
//       { success: true, message: "Booking confirmed successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("API Error (/api/schedule-call):", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error. Failed to confirm booking." },
//       { status: 500 }
//     );
//   }
// }
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