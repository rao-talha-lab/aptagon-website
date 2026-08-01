const BRAND_COLOR = "#335ECE";
const COMPANY_NAME = "Aptagon Technologies";

const layout = (content: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .header { background-color: ${BRAND_COLOR}; color: #ffffff; padding: 24px; text-align: center; }
        .content { padding: 30px; color: #333333; line-height: 1.6; }
        .field-box { background: #f8fafc; border-left: 4px solid ${BRAND_COLOR}; padding: 12px 16px; margin-bottom: 12px; }
        .field-label { font-size: 12px; text-transform: uppercase; color: #666666; font-weight: bold; }
        .field-value { font-size: 15px; color: #111111; margin-top: 2px; }
        .footer { background-color: #f8fafc; text-align: center; padding: 16px; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin:0;">${COMPANY_NAME}</h2>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.
        </div>
      </div>
    </body>
  </html>
`;

// Get in Touch Template
export const contactHrTemplate = (data: { name: string; email: string; subject: string; message: string }) => layout(`
    <h3 style="color: ${BRAND_COLOR}; margin-top:0;">New "Get In Touch" Submission</h3>
    <div class="field-box"><div class="field-label">Name</div><div class="field-value">${data.name}</div></div>
    <div class="field-box"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
    <div class="field-box"><div class="field-label">Project Type / Subject</div><div class="field-value">${data.subject}</div></div>
    <div class="field-box"><div class="field-label">Message</div><div class="field-value">${data.message}</div></div>
  `);
  
  export const contactUserAckTemplate = (data: { name: string }) => layout(`
    <h3 style="color: ${BRAND_COLOR}; margin-top:0;">Thank You for Reaching Out!</h3>
    <p>Hi <strong>${data.name}</strong>,</p>
    <p>We have received your message regarding your project details. A representative from the Aptagon team will review your inquiry and get back to you shortly.</p>
    <p>Best Regards,<br/><strong>Aptagon Technologies Team</strong></p>
  `);
  
  // --- Reach Us Templates ---
  export const reachUsHrTemplate = (data: { user_first_name: string; user_last_name: string; user_email: string; user_phone: string; subject: string; message: string }) => layout(`
    <h3 style="color: ${BRAND_COLOR}; margin-top:0;">New "Reach Us" Submission</h3>
    <div class="field-box"><div class="field-label">Full Name</div><div class="field-value">${data.user_first_name} ${data.user_last_name}</div></div>
    <div class="field-box"><div class="field-label">Email</div><div class="field-value">${data.user_email}</div></div>
    <div class="field-box"><div class="field-label">Phone</div><div class="field-value">${data.user_phone}</div></div>
    <div class="field-box"><div class="field-label">Subject</div><div class="field-value">${data.subject}</div></div>
    <div class="field-box"><div class="field-label">Message</div><div class="field-value">${data.message}</div></div>
  `);
  
  export const reachUsUserAckTemplate = (data: { user_first_name: string }) => layout(`
    <h3 style="color: ${BRAND_COLOR}; margin-top:0;">We Received Your Message</h3>
    <p>Hi <strong>${data.user_first_name}</strong>,</p>
    <p>Thank you for contacting Aptagon Technologies. We have successfully logged your inquiry and will be in touch with you very soon.</p>
    <p>Best Regards,<br/><strong>Aptagon Technologies Team</strong></p>
  `);
  
  // --- Schedule Call Templates ---
  export const scheduleCallHrTemplate = (data: { name: string; email: string; date: string; time: string }) => layout(`
    <h3 style="color: ${BRAND_COLOR}; margin-top:0;">New Consultation Scheduled</h3>
    <div class="field-box"><div class="field-label">Client Name</div><div class="field-value">${data.name}</div></div>
    <div class="field-box"><div class="field-label">Client Email</div><div class="field-value">${data.email}</div></div>
    <div class="field-box"><div class="field-label">Scheduled Date</div><div class="field-value">${data.date}</div></div>
    <div class="field-box"><div class="field-label">Scheduled Time</div><div class="field-value">${data.time}</div></div>
  `);
  
  export const scheduleCallUserAckTemplate = (data: { name: string; date: string; time: string }) => layout(`
    <h3 style="color: ${BRAND_COLOR}; margin-top:0;">Consultation Booking Confirmed!</h3>
    <p>Hi <strong>${data.name}</strong>,</p>
    <p>Your free 30-minute consultation with the Aptagon Team is officially scheduled for:</p>
    <div class="field-box">
      <div class="field-value"><strong>${data.date}</strong> at <strong>${data.time}</strong></div>
    </div>
    <p>Web conferencing link and meeting details will be sent prior to the call.</p>
    <p>Best Regards,<br/><strong>Aptagon Technologies Team</strong></p>
  `);