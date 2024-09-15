import { google } from "googleapis";
import { config } from "dotenv";
config();

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID, //YOUR_CLIENT_ID
  process.env.GOOGLE_CLIENT_SECRET, //YOUR_CLIENT_SECRET
  "postmessage" //YOUR_REDIRECT_URL
);
