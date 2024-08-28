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
- **Unit Tests**: Comprehensive unit tests to ensure the reliability and correctness of the codebase.

## Demo

Check out the live demo of the application hosted on GitHub Pages: [Demo Link](#)

## Tech Stack

- **Framework**: Vue.js
- **Styling**: TailwindCSS (recommended, but optional)
- **State Management**: (Optional) Vuex or Pinia

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
