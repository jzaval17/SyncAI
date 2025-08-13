# Calendar Sync App

This application synchronizes shifts from the Target MyTime calendar with Google Calendar, allowing users to view their work schedules seamlessly.

## Features

- Authenticate with Target MyTime API to fetch shifts.
- Sync shifts with Google Calendar by creating and updating events.
- Handle date formatting and API responses efficiently.

## Project Structure

```
calendar-sync-app
├── src
│   ├── main.ts                # Entry point of the application
│   ├── services
│   │   ├── mytimeService.ts   # Service for interacting with MyTime API
│   │   └── googleCalendarService.ts # Service for interacting with Google Calendar API
│   ├── utils
│   │   └── syncHelper.ts      # Utility functions for synchronization
│   └── types
│       └── index.ts           # Type definitions for the application
├── package.json                # NPM package configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/calendar-sync-app.git
   cd calendar-sync-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your API keys for Target MyTime and Google Calendar in the environment variables or configuration file.

## Usage

To start the synchronization process, run:
```
npm start
```

This will initialize the application and begin syncing shifts from the Target MyTime calendar to your Google Calendar.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.