import {Client} from "@hubspot/api-client";

const hubspotClient = process.env.HUBSPOT_ACCESS_TOKEN
    ? new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN})
    : null;

    interface ContactProperties {
        email: string;
        firstname?: string;
        lastname?: string;
        phone?: string;
        message?: string;
        [key: string]: string | undefined;
    }

    export async function syncToHubSpot(properties: ContactProperties) {
        if(!hubspotClient || !process.env.HUBSPOT_ACCESS_TOKEN) {
            console.warn("Hubspot Access Token missing. Skipping CRM sync.");
            return null;
        }

        try {
            const cleanProperties: Record<string, string> = {};
            Object.entries(properties).forEach(([key, value]) => {
                if(value) cleanProperties[key] = value;
            });

            const response = await hubspotClient.crm.contacts.basicApi.create({
                properties: cleanProperties,
                associations: [],
            });
            return response;
        } catch (error: any){
            if (error?.body?.category === "CONFLICT" || error?.statusCode === 409) {
                try {
                    const updateResponse = await hubspotClient.crm.contacts.basicApi.update(
                        properties.email,
                        { properties: {...properties}},
                        "email"
                    );
                    return updateResponse;
                } catch(updateError){
                    console.error("Failed to update existing Hubspot contact:", updateError);
                }
            } else {
                console.error("Hubspot Sync Error:", error?.body || error.message);
            }
            return null;
        }
    }