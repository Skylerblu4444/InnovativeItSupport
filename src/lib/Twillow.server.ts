// src/lib/twilio.server.ts
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM;

if (!accountSid || !authToken || !from) {
  // Twilio not configured; exports will be no-op
}

export const twilioClient = accountSid && authToken ? new Twilio(accountSid, authToken) : null;

export async function sendEmergencySms(to: string, body: string) {
  if (!twilioClient) {
    console.warn('Twilio not configured, skipping SMS:', body);
    return null;
  }
  return twilioClient.messages.create({ body, from: from!, to });
}
