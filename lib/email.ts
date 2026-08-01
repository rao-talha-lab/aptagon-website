import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT) || 465;

const tranporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo}: SendEmailParams){
    const mailOptions = {
        from: process.env.Email_FROM || process.env.SMTP_USER,
        to,
        subject,
        html,
        replyTo: replyTo || undefined,
    };

    return await tranporter.sendMail(mailOptions);
}