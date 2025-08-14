import os
import sys
import datetime as dt
from zoneinfo import ZoneInfo

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Scopes required for inserting events
SCOPES = ['https://www.googleapis.com/auth/calendar']
TOKEN_URI = 'https://oauth2.googleapis.com/token'

def env_or_fail(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        print(f"Missing required environment variable: {name}", file=sys.stderr)
        sys.exit(1)
    return value

def get_credentials() -> Credentials:
    client_id = env_or_fail('GCAL_CLIENT_ID')
    client_secret = env_or_fail('GCAL_CLIENT_SECRET')
    refresh_token = env_or_fail('GCAL_REFRESH_TOKEN')
    # Note: Redirect URI is not needed at runtime when you already have a refresh token.

    creds = Credentials(
        token=None,
        refresh_token=refresh_token,
        token_uri=TOKEN_URI,
        client_id=client_id,
        client_secret=client_secret,
        scopes=SCOPES,
    )
    # Exchange refresh token for an access token
    creds.refresh(Request())
    return creds

def build_service(creds: Credentials):
    return build('calendar', 'v3', credentials=creds, cache_discovery=False)

def next_top_of_hour(now):
    return (now.replace(minute=0, second=0, microsecond=0) + dt.timedelta(hours=1))

def create_sample_event(calendar_id: str, timezone: str, service):
    now = dt.datetime.now(ZoneInfo(timezone))
    start = next_top_of_hour(now)
    end = start + dt.timedelta(hours=1)

    event_body = {
        'summary': 'SyncAI test event',
        'description': 'Created by GitHub Action to verify Google Calendar access.',
        'start': {
            'dateTime': start.isoformat(),
            'timeZone': timezone,
        },
        'end': {
            'dateTime': end.isoformat(),
            'timeZone': timezone,
        },
    }

    created = service.events().insert(calendarId=calendar_id, body=event_body).execute()
    return created

def main():
    calendar_id = env_or_fail('GCAL_CALENDAR_ID')
    timezone = os.environ.get('GCAL_TIMEZONE', 'America/Los_Angeles')

    creds = get_credentials()
    service = build_service(creds)

    event = create_sample_event(calendar_id, timezone, service)
    print(f"Event created: {event.get('htmlLink')} (id: {event.get('id')})")

if __name__ == '__main__':
    main()
