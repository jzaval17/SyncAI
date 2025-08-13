import { google } from "googleapis";
import { Shift } from "../types/shift";

export async function syncShiftsToCalendar(shifts: Shift[]) {
  const auth = new google.auth.OAuth2(
    process.env.GCAL_CLIENT_ID,
    process.env.GCAL_CLIENT_SECRET,
    process.env.GCAL_REDIRECT_URI
  );
  auth.setCredentials({
    refresh_token: process.env.GCAL_REFRESH_TOKEN
  });

  const calendar = google.calendar({ version: "v3", auth });

  for (const s of shifts) {
    await calendar.events.insert({
      calendarId: process.env.GCAL_CALENDAR_ID!,
      requestBody: {
        summary: `${s.title} shift`,
        start: { dateTime: s.start, timeZone: "America/Los_Angeles" },
        end: { dateTime: s.end, timeZone: "America/Los_Angeles" }
      }
    });
  }
}
