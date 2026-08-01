import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { contactHrTemplate, contactUserAckTemplate } from "@/emails/templates";

export async function POST(request: Request){
    try {
        const body = await request.json();

        const validation = contactSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json(
                {success: false, errors: validation.error.flatten().fieldErrors},
                {status: 400}
            );
        }
        const {name, email, subject, message} = validation.data;
        const hrEmail = process.env.EMAIL_TO || process.env.SMTP_USER!;

        await Promise.all([
            sendEmail({
                to: hrEmail,
                subject: `[Get In Touch] ${subject}`,
                html: contactHrTemplate({name, email, subject, message}),
                replyTo: email,
            }),
            sendEmail({
                to: email,
                subject: "We received your message - Aptagon Technologies",
                html: contactUserAckTemplate({name}),
            }),
        ]);

        return NextResponse.json(
            {success: true, message: "Message Sent Successfully"},
            {status: 200}
        );
    } catch (error) {
        console.error("API Error (/api/contact):", error);
        return NextResponse.json(
            {success: false, message: "Internal server error. Failed to send message."},
            {status: 500}
        );
    }
}