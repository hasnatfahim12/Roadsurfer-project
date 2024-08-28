 # Campervan Rental Dashboard

## Introduction

Welcome to the Campervan Rental Dashboard, a web application designed to streamline the operations of a campervan rental business, similar to Roadsurfer. This dashboard provides a calendar-like interface where station personnel can easily view and manage the pickup and return schedules of campervans across various rental stations globally.

## Features

- **Autocomplete Component**: A reusable component that allows users to search and select rental stations using a remote API.
- **Responsive Week View**: A calendar-like week view that displays campervan bookings, with the ability to paginate between weeks.
- **Station Selector**: Integrated with the autocomplete component to choose a station where bookings start or end.
- **Booking Detail View**: Displays detailed information about a selected booking, including customer name, booking dates, and station information.
- **Drag-and-Drop Rescheduling (Optional)**: Allows station employees to reschedule pickups or returns by dragging and dropping bookings within the calendar.
- **State Management (Optional)**: Introduces state management for better handling of application data and UI state.

## Demo

Check out the live demo of the application hosted on GitHub Pages: [Demo Link](https://hasnatfahim12.github.io/Roadsurfer-project/). Click on SurferRoad to go the application.

## Tech Stack

- **Framework**: Vue.js
- **Styling**: TailwindCSS 
- **State Management**: Pinia

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Install dependencies:

```
npm install
```
### Run the development server:

```
npm run serve
```

## Usage

### Autocomplete Component
The autocomplete component allows users to search for rental stations. As the user types, the component queries the remote API and suggests stations based on the input. After selecting a station, the component triggers an event to notify other components of the selection.

### Week View
The week view displays a 7-day calendar where bookings are shown on their respective start and end dates. Users can paginate through different weeks and view bookings for the selected station.

### Booking Detail View
Clicking on a booking in the week view opens a detailed view with information such as the customer's name, booking dates, and the station name. Users can return to the calendar view from this page.

### Drag-and-Drop Rescheduling 
Station employees can reschedule bookings by dragging and dropping them within the calendar. The changes are stored locally and an imaginary API call is logged to the console.

