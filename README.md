# EventHub — Event Management System

EventHub is a React-based event management web application that allows users to discover events, view event details, register for events, and manage their registrations.

Event information is retrieved from the Ticketmaster Discovery API.

## Features

- **User Authentication:** Register, log in, and log out.
- **Event Discovery:** Browse events retrieved from Ticketmaster.
- **Search and Filtering:** Search events by keyword and filter by category.
- **Event Details:** View event names, dates, times, venues, images, and categories.
- **Event Registration:** Register for events and prevent duplicate registrations.
- **My Events:** View upcoming and completed registered events.
- **Cancellation:** Cancel event registrations.
- **Persistent State:** Persist authentication and registration data using browser local storage.
- **Responsive Interface:** Use the application on desktop and mobile screens.
- **Protected Routes:** Restrict access to the My Events page to logged-in users.

## Technologies Used

- React
- Vite
- JavaScript
- Redux Toolkit
- React Redux
- React Router
- Ticketmaster Discovery API
- HTML and CSS
- Browser Local Storage

## Prerequisites

Install the following before running the project:

- Node.js (LTS version recommended)
- npm
- A Ticketmaster Developer account and Discovery API key

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd event-management-system
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API key

Create a `.env` file in the project root, alongside `package.json`.

Add your Ticketmaster API key:

```env
VITE_TICKETMASTER_API_KEY=YOUR_TICKETMASTER_API_KEY
```

Replace the placeholder with your own API key.

**Security:** Never commit your `.env` file or publish your API key. Vite environment variables prefixed with `VITE_` are exposed in the client-side application, so this key should not be considered secret. For a production application, API access should be handled through a backend.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

`http://localhost:5173/`

### 5. Create a production build

```bash
npm run build
```

Vite generates the production build in the `dist` directory.

## Usage

1. Register for an account or log in.
2. Browse events on the Explore Events page.
3. Search by keyword or select an event category.
4. Open an event to view its details.
5. Register for an event.
6. Open My Events to view registered events.
7. Cancel a registration when needed.
8. Log out when finished.

## Data Persistence

Authentication state and registered events are stored in browser local storage. This is a frontend demonstration and does not provide server-side authentication or a shared database.

## API Documentation

Ticketmaster Discovery API:

https://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/

## Notes

- Event availability and information depend on the Ticketmaster API response.
- A valid API key and internet connection are required to retrieve events.
- API coverage varies by market and event category.
