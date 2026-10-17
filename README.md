# EventHub — Event Management System

A React-based event discovery and management application built using **React, Redux Toolkit, React Router, Vite, and the Ticketmaster Discovery API**.

EventHub allows users to discover events, search by keyword, filter by category, view event details, register for events, and manage their registrations through a personalized dashboard.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Objectives](#objectives)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Application Architecture](#application-architecture)
6. [Project Structure](#project-structure)
7. [Development Approach](#development-approach)
8. [Challenges and Solutions](#challenges-and-solutions)
9. [Installation and Setup](#installation-and-setup)
10. [Running the Application](#running-the-application)
11. [Testing and Validation](#testing-and-validation)
12. [State Management and Data Persistence](#state-management-and-data-persistence)
13. [API Integration](#api-integration)
14. [Known Limitations](#known-limitations)
15. [Future Improvements](#future-improvements)
16. [Conclusion](#conclusion)

---

## 1. Project Overview

EventHub is a web-based event management system developed as part of a Web Programming assignment. The application combines event discovery with user authentication and event registration functionality.

The application retrieves event information from the Ticketmaster Discovery API and presents it through a responsive React interface. Users can explore available events, search for specific events, filter results by category, view detailed event information, and manage their registered events.

The project also demonstrates client-side state management using Redux Toolkit, navigation using React Router, and persistence using browser local storage.

### Problem Statement

Finding relevant events and keeping track of event registrations can require navigating multiple pages and manually managing event information. EventHub provides a centralized interface where users can discover events and manage their registrations in one place.

### Project Goals

- Develop a responsive, interactive web application using React.
- Integrate a real-world external API to retrieve event information.
- Implement registration, login, and logout functionality.
- Use Redux Toolkit for centralized application state management.
- Implement client-side routing and protected pages.
- Allow users to register for events, cancel registrations, and view upcoming and completed events.
- Maintain relevant application state across page refreshes.
- Apply proper Git and GitHub version control practices.

---

## 2. Objectives

The main objectives of the project are:

1. **Event discovery:** Retrieve and display event information from an external API.
2. **Search and filtering:** Allow users to search by keyword and filter events by category.
3. **Event details:** Display relevant information such as event name, date, time, venue, location, category, and images when provided by the API.
4. **Authentication:** Provide account registration, login, and logout functionality.
5. **Event registration:** Allow authenticated users to register for events while preventing duplicate registrations.
6. **Personalized dashboard:** Display registered events according to their scheduled dates.
7. **State management:** Use Redux Toolkit to organize authentication and registration state.
8. **Navigation:** Use React Router to navigate between pages and restrict access to authenticated pages.
9. **Persistence:** Preserve account and registration information using local storage.
10. **Usability:** Provide a responsive interface and appropriate feedback for common user actions.

---

## 3. Features

### 3.1 Event Discovery

- Retrieve event listings from the Ticketmaster Discovery API.
- Display event cards with available images, names, dates, and venue information.
- Support pagination when multiple pages of results are available.
- Sort event results by date, where supported by the API request.

### 3.2 Search and Category Filtering

- Search events using keywords.
- Filter events by category, including categories such as Music, Sports, Arts & Theatre, Film, and Miscellaneous.
- Combine keyword searches with category filters.
- Display results returned by the API.

### 3.3 Event Details

Users can open an individual event to view its available details, including:

- Event name and image.
- Date and time.
- Venue and location.
- Category and classification information.
- A link to the corresponding Ticketmaster event page, when available.

### 3.4 User Authentication

- Register an account with the required information.
- Validate registration fields.
- Reject duplicate email registrations.
- Log in using stored account credentials.
- Log out and clear the active login session.
- Preserve the logged-in state across page refreshes.

**Implementation note:** Authentication is simulated on the frontend using Redux and browser local storage. It is intended for an academic demonstration, not production-grade authentication.

### 3.5 Event Registration and Cancellation

- Register for an event when logged in.
- Prevent the same user from registering for the same event more than once.
- Display registration status on the event details page.
- Cancel an existing registration.
- Maintain separate registration lists for different accounts.

### 3.6 My Events Dashboard

The My Events page provides two views:

- **Upcoming:** Registered events whose scheduled start times have not yet passed.
- **Completed:** Registered events whose scheduled start times have passed.

Users can open event details and cancel upcoming registrations from their dashboard.

### 3.7 Responsive Interface

The interface uses responsive CSS layouts to support desktop and mobile screen sizes. Event cards, navigation, buttons, and page layouts are designed to adapt to narrower screens.

---

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Development server and production build tooling |
| JavaScript | Application logic |
| Redux Toolkit | Centralized state management |
| React Redux | Connecting React components to Redux |
| React Router | Page navigation and protected routes |
| Ticketmaster Discovery API | External event data |
| HTML and CSS | Structure, styling, and responsive layouts |
| Browser Local Storage | Persisting authentication and registrations |
| Git | Version control |
| GitHub | Source code hosting and submission |

---

## 5. Application Architecture

EventHub follows a component-based frontend architecture.

### High-level workflow

1. The user opens the application.
2. React Router renders the appropriate page.
3. The event discovery page requests data through the Ticketmaster service.
4. The service sends an HTTP request to the Ticketmaster Discovery API.
5. The API response is processed and returned to the React component.
6. Redux Toolkit manages authentication and event registration state.
7. Local storage preserves selected state between sessions and page refreshes.
8. The My Events page filters registrations for the currently logged-in account and classifies them according to event start times.

### Main architectural components

**Presentation layer**

React components render the navigation bar, event cards, forms, event details, and dashboard.

**API service layer**

The Ticketmaster service handles request parameters, API requests, response processing, and HTTP errors.

**State management layer**

Redux Toolkit stores authentication information and event registrations. React components access state through `useSelector` and dispatch actions through `useDispatch`.

**Routing layer**

React Router handles navigation between pages. Protected routes check the authentication state before rendering the My Events page.

**Persistence layer**

Browser local storage stores the active user and registered events so that the demonstration retains its state after refreshing the page.

---

## 6. Project Structure

The main project structure is organized as follows:

```text
event-management-system/
│
├── public/
│
├── src/
│   ├── app/
│   │   └── store.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   └── authUtils.js
│   │   │
│   │   └── events/
│   │       └── registrationsSlice.js
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   │
│   ├── services/
│   │   └── ticketmaster.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env                 # Local configuration; not committed
├── .env.example         # Configuration template
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

The exact contents of some directories may vary as the application develops.

---

## 7. Development Approach

The project was developed incrementally, implementing and testing the major features in stages rather than attempting to build the entire application at once.

### Stage 1: Project Initialization

The project was initialized using Vite with React as the frontend framework.

The initial setup involved:

- Creating the React application.
- Installing project dependencies.
- Organizing source files into appropriate directories.
- Initializing Git.
- Creating the GitHub repository and configuring the remote.
- Establishing a development workflow with meaningful commits.

This provided a working foundation before application features were added.

### Stage 2: Event Discovery and API Integration

The next step was integrating the Ticketmaster Discovery API.

A dedicated service module was used to separate API communication from the UI.

The service was designed to:

1. Check whether the API key is configured.
2. Construct request parameters.
3. Include pagination and sorting options.
4. Add keyword and category filters when provided.
5. Send the API request.
6. Check the HTTP response.
7. Extract event data and pagination information.
8. Return a consistent object for the React components.

The event discovery page was then connected to this service to render event cards and search results.

This separation makes the application easier to maintain because API request logic is not mixed into every UI component.

### Stage 3: Redux Toolkit and Routing

Redux Toolkit was introduced to manage shared application state.

The Redux store was configured using `configureStore`, with separate slices for authentication and event registrations.

The implementation used:

- `createSlice` to define state and reducers.
- `useSelector` to access application state.
- `useDispatch` to dispatch actions.
- React Router to define application routes.
- Protected route logic to restrict access to My Events.

Centralized state management was particularly useful because the navigation bar, event details page, and dashboard all depend on authentication or registration information.

### Stage 4: Registration and Login

Registration and login pages were implemented next.

The registration workflow validates user input, checks for an existing account using the supplied email, and stores the account information.

The login workflow checks the submitted credentials against the stored account data and updates the active user state.

Logout clears the active session, while protected routing redirects unauthenticated users to the login page.

The authentication implementation was tested by creating accounts, attempting duplicate registrations, logging in and out, and refreshing the page.

### Stage 5: Persistent Authentication State

After authentication was implemented, local storage was used to preserve the active user and registered accounts.

This allows the application to restore the current login state after a page refresh.

The implementation also includes defensive handling when stored data cannot be parsed.

This persistence is client-side only and does not replace a server-side user database.

### Stage 6: Event Registration and Cancellation

A separate registration slice was introduced to manage event registrations.

Each registration associates an event with the email address of the user who registered for it.

The registration workflow checks whether the same user has already registered for the same event before adding a new registration.

Cancellation removes the corresponding registration for the relevant user and event.

Storing the user's email with each registration also allows the dashboard to display only the registrations associated with the currently logged-in account.

### Stage 7: My Events Dashboard

The My Events page was developed to provide a personalized view of registered events.

It retrieves registration state from Redux, filters registrations by the active user's email, and displays the events under Upcoming and Completed tabs.

The page also provides:

- Event images and names.
- Event dates and venue information.
- Links to event details.
- Cancellation controls for upcoming registrations.
- Helpful empty-state messages when a tab has no events.

During development, an initial placeholder page displayed only a static message. This was replaced with a component that reads and renders the actual registration data from Redux.

### Stage 8: Date and Time Handling

An important debugging issue appeared when registered events were being displayed under Completed even though their scheduled times had not passed.

The investigation involved inspecting the browser's current date and time, checking the registrations in local storage, and examining Ticketmaster's returned event fields.

This revealed an important distinction between:

- The event's local calendar date.
- The event's local scheduled time.
- The event's absolute timestamp.
- The user's local timezone.

For events with an exact `dateTime` timestamp, the dashboard was updated to compare the scheduled timestamp with the current timestamp. When the timestamp is unavailable, the implementation falls back to comparing the event's local date with the current local date.

This provides more accurate classification for events whose local date differs from the user's calendar date because of timezone differences.

### Stage 9: Testing and Validation

After the major features were implemented, the application was tested through its browser interface.

The checks included account registration, duplicate-account prevention, login persistence, protected routes, event registration, duplicate-registration prevention, cancellation, account separation, event details, and responsive layout.

The application was also prepared for a production build using Vite.

### Stage 10: Git and GitHub Workflow

Git was used throughout development to track progress.

Changes were organized into meaningful commits rather than combining the entire application into one final commit.

The workflow involved staging relevant files, reviewing changes, committing completed milestones, and pushing updates to the remote GitHub repository.

Environment configuration was kept separate from source control to avoid committing the local API key.

---

## 8. Challenges and Solutions

Several practical development challenges helped shape the final implementation.

### Challenge 1: Integrating an External API

**Problem:** Event data depends on an external API, and the application must handle request parameters, response structures, and HTTP failures.

**Approach:** A dedicated Ticketmaster service module was created to centralize API requests and normalize the returned events and pagination information.

**Outcome:** API communication is separated from presentation logic, making it easier to debug and extend.

### Challenge 2: Coordinating Authentication Across Pages

**Problem:** The navigation bar, event registration controls, and protected pages need to know whether a user is logged in.

**Approach:** Authentication was centralized in a Redux slice, allowing components to read the same state and dispatch login or logout actions.

**Outcome:** The application can update the interface consistently when the authentication state changes.

### Challenge 3: Preventing Duplicate Registrations

**Problem:** A user should not be able to register for the same event repeatedly.

**Approach:** Before inserting a registration, the application checks whether a registration already exists for the same user and event ID.

**Outcome:** Duplicate registrations are prevented in the frontend state.

### Challenge 4: Displaying User-Specific Events

**Problem:** A registered event should only appear in the dashboard of the user who registered for it.

**Approach:** Every registration stores the user's email, and the dashboard filters registrations using the currently authenticated user's email.

**Outcome:** Different accounts maintain separate views of their registrations.

### Challenge 5: Diagnosing Missing Events in My Events

**Problem:** Registration data was successfully stored, but the My Events page initially displayed only a placeholder.

**Approach:** The component was updated to read the Redux registration state, filter the current user's registrations, and render event cards.

**Outcome:** Registered events became visible in the dashboard.

### Challenge 6: Timezone Differences

**Problem:** Some events displayed a local date that was already in the past in the user's timezone, even though their scheduled start time had not passed.

**Approach:** The event timestamp was inspected and the dashboard classification was changed to compare exact timestamps whenever available.

**Outcome:** Upcoming and Completed classifications became more accurate for events with timestamp data.

### Challenge 7: API Search and Empty Results

**Problem:** Search behavior needs to be validated independently of the API's initial results, particularly when a keyword has no matching events.

**Approach:** The application was tested with a deliberately unlikely search term, and API request parameters and result state were inspected.

**Outcome:** This provided a repeatable way to identify whether stale results, API behavior, or search-state handling was responsible for unexpected output.

The empty-result and API-failure paths should be considered verified only after the relevant tests have been completed successfully.

### Challenge 8: Protecting API Configuration

**Problem:** An API key should not be accidentally committed to the public repository.

**Approach:** The local `.env` file was added to `.gitignore`, and a separate `.env.example` template was prepared for documentation.

**Outcome:** The repository can explain how to configure the API without intentionally publishing the developer's local key.

---

## 9. Installation and Setup

### Prerequisites

Before running the project, install:

- Node.js (an appropriate current LTS version).
- npm, which is included with Node.js.
- A Ticketmaster Developer account and Discovery API key.
- Git, if cloning the repository.

### Step 1: Clone the repository

Replace the placeholder with the actual GitHub repository URL.

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd event-management-system
```

### Step 2: Install dependencies

```bash
npm install
```

This installs the dependencies specified in `package.json`.

### Step 3: Configure the environment

Create a `.env` file in the project root, alongside `package.json`.

If the application reads `import.meta.env.VITE_TICKETMASTER_API_KEY`, add:

```env
VITE_TICKETMASTER_API_KEY=your_ticketmaster_api_key_here
```

Replace the placeholder with your own API key.

The variable name must match the name used in the Ticketmaster service module.

The `.env.example` file should contain only a placeholder, never the actual key.

### Step 4: Start the development server

```bash
npm run dev
```

Open the URL printed in the terminal. With the default Vite configuration, this is usually:

http://localhost:5173/

### Step 5: Build for production

```bash
npm run build
```

Vite generates the production assets in the `dist` directory when the build succeeds.

---

## 10. Running the Application

Once the development server is running:

1. Open EventHub in your browser.
2. Register a new account or log in.
3. Explore the available events.
4. Search for events by keyword.
5. Filter the event list by category.
6. Open an event to view its details.
7. Register for an event.
8. Open My Events to view registered events.
9. Switch between Upcoming and Completed.
10. Cancel an upcoming registration when needed.
11. Log out to end the active session.

A valid Ticketmaster API key and an internet connection are required for live event retrieval.

---

## 11. Testing and Validation

The following tests were performed through the application interface:

| Test | Expected behavior |
|---|---|
| Account registration | A valid account can be created |
| Duplicate account registration | An existing email is rejected |
| Login and logout | Authentication state updates correctly |
| Login persistence | The active session remains after refresh |
| Protected route | Unauthenticated users are redirected to login |
| Event registration | An event is added to the user's registrations |
| Duplicate event registration | The same event cannot be registered twice by the same user |
| Cancellation | The selected registration is removed |
| Account separation | Users see only their own registrations |
| Event details | Available event information is displayed |
| Responsive layout | The interface adapts to mobile screen sizes |

### Additional verification recommended before submission

- Confirm that an API failure displays a helpful error message.
- Confirm that a search with no matches displays a proper empty state.
- Confirm that the production build completes successfully.
- Confirm that `.env` is ignored and the real API key is not tracked by Git.
- Confirm that the latest source code and README are pushed to GitHub.

---

## 12. State Management and Data Persistence

### Redux Toolkit

The application uses Redux Toolkit to centralize authentication and event registration state.

The authentication state includes information about the active user and locally stored account records.

The registrations state contains the events registered by users, including the associated user email and registration timestamp.

React components access this state through React Redux hooks.

### Browser Local Storage

Local storage is used to persist selected state across page refreshes.

The implementation uses the following keys:

| Key | Purpose |
|---|---|
| `user` | Stores the active user's profile |
| `eventhub_users` | Stores locally registered account records |
| `eventhub_registrations` | Stores event registrations |

These values are stored in the user's browser and are not synchronized across devices or browsers.

**Security limitation:** Client-side authentication and local storage are not suitable for protecting sensitive account information. A production application should use a backend authentication system, secure password hashing, server-side authorization, and a database.

---

## 13. API Integration

EventHub uses the Ticketmaster Discovery API to retrieve event listings.

Official documentation:

https://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/

The service module is responsible for constructing API requests and handling the response.

The application uses parameters for:

- API key authentication.
- Pagination.
- Event sorting.
- Keyword searches.
- Category filtering.
- Start-date filtering.
- Market selection, where configured.

The available event data depends on Ticketmaster's coverage, the selected market, and the API response.

### API Key Considerations

Vite variables prefixed with `VITE_` are included in the client-side application bundle. Therefore, storing a Ticketmaster key in a `.env` file prevents accidental source-control commits but does **not** make the key secret once the application is built and distributed.

For production deployments, API access should be mediated by a backend when appropriate, and provider usage limits and key restrictions should be configured.

---

## 14. Known Limitations

- Authentication is simulated on the frontend and is not backed by a server.
- User accounts and registrations are stored locally in the browser.
- Account data is not shared across devices.
- Event availability depends on the Ticketmaster API and its market coverage.
- API access requires a valid key and internet connectivity.
- Events without an exact start timestamp may be classified using their local calendar date, which can be less precise near timezone boundaries.
- Live API failures and empty search results require explicit validation to ensure they produce appropriate feedback.
- The application does not provide server-side booking or ticket purchasing; it manages registrations within the application and may link to Ticketmaster for external event information.

---

## 15. Future Improvements

Potential future enhancements include:

- A backend service and database for accounts and registrations.
- Secure server-side authentication and authorization.
- Better handling of API rate limits, retries, and network errors.
- More comprehensive empty, loading, and error states.
- Improved event-time formatting and timezone handling.
- Automated unit and integration tests.
- Additional event filters and sorting options.
- Deployment to a public hosting platform.
- Improved accessibility and keyboard navigation.

---

## 16. Conclusion

EventHub demonstrates the development of a modern React application that integrates an external API with client-side state management, routing, authentication simulation, and event registration functionality.

The development process emphasized incremental implementation, separation of concerns, debugging through browser developer tools, validation of user workflows, and version control using Git and GitHub.

The project also highlights practical challenges that arise when working with external APIs, persistent client-side state, duplicate prevention, and date/time handling.

Overall, EventHub provides a foundation for understanding how React, Redux Toolkit, React Router, and a third-party API can work together to build an interactive event management application.

---

## Author and Repository

**Project:** EventHub — Event Management System

**Repository:** YOUR_GITHUB_REPOSITORY_URL

**Course:** Web Programming

Replace the repository placeholder above with the actual GitHub URL before submitting.
