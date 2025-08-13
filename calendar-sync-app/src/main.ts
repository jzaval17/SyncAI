import { MyTimeService } from './services/mytimeService';
import { GoogleCalendarService } from './services/googleCalendarService';
import { authorize } from './utils/googleAuth';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    // Load config from .env
    const myTimeApiUrl = process.env.MYTIME_API_URL!;
    const myTimeApiKey = process.env.MYTIME_API_KEY!;
    const googleCredentialsPath = process.env.GOOGLE_CREDENTIALS_PATH!;

    // Authenticate with MyTime
    const myTimeService = new MyTimeService(myTimeApiUrl, myTimeApiKey);
    const isAuthenticated = await myTimeService.authenticate();
    if (!isAuthenticated) {
        console.error('Failed to authenticate with MyTime API.');
        return;
    }

    // Fetch shifts
    const shifts = await myTimeService.fetchShifts();
    if (shifts.length === 0) {
        console.log('No shifts found.');
        return;
    }

    // Authenticate with Google
    const auth = await authorize(googleCredentialsPath);
    const googleCalendarService = new GoogleCalendarService(auth);

    // Add shifts to Google Calendar
    await googleCalendarService.addShifts(shifts);
    console.log('Shifts synced to Google Calendar!');
}

main().catch(console.error);