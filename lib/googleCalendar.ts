import {google} from "googleapis";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({version: "v3", auth: oauth2Client});

export async function createGoogleMeetEvent({
    title,
    description,
    startTimeIso,
    clientEmail,
    hrEmail,
}: {
    title: string;
    description: string;
    startTimeIso: string;
    clientEmail: string;
    hrEmail?: string;
}): Promise<string | null> {
    try{
        const startDate = new Date(startTimeIso);
        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

        const attendees = [{ email: clientEmail}];
        if(hrEmail) {
            attendees.push({ email: hrEmail})
        }
        const response = await calendar.events.insert({
            calendarId: "primary",
            conferenceDataVersion: 1,
            requestBody: {
                summary: title,
                description: description,
                start: {dateTime: startDate.toISOString()},
                end: {dateTime: endDate.toISOString()},
                attendees: attendees,
                conferenceData: {
                    createRequest: {
                        requestId: `meeting-${Date.now()}`,
                        conferenceSolutionKey: {type: "hangoutsMeet"},
                    },
                },
            },
        });

        return response.data.hangoutLink || response.data.htmlLink || null;
    } catch (error) {
        console.error("Error creating Google Meet event:", error);
        return null;
    }
}