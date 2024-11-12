
# StormReport Component

The **StormReport** component is a reusable, configurable React module for displaying storm reports from the Xweather API based on location, time range, and event type filters.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [Dependencies](#dependencies)

---

## Project Overview

The **StormReport** component retrieves and displays storm reports for a specified location, allowing users to filter by time range and event type. Built with Tailwind CSS for styling and designed to be embedded into various React applications.

## Features

- **Dynamic Time Filter**: Filter reports for the past 24 hours, 48 hours, or 7 days.
- **Event Type Filter**: Display reports related to wind, hail, tornadoes, or floods.
- **Reusable Component**: Self-contained module that can be integrated into any React application.
- **User-Friendly Design**: Optimized for touch screens and adaptable to various screen sizes.
- **Dynamic Configuration**: Event types, time filters, and colors/icons are dynamically configurable.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/brandon0505/vaisala.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd vaisala/vaisala-app
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

---

## Configuration

Before using the component, ensure the following configurations are set up:

### Required Props for **StormReport Component**

| Prop           | Type       | Description                                                                 |
|----------------|------------|-----------------------------------------------------------------------------|
| `client_id`    | `string`   | Xweather API client ID                                                     |
| `client_secret`| `string`   | Xweather API client secret                                                 |
| `defaultLocation` | `string` | Default search location (latitude/longitude, ZIP code, or city/state)       |
| `defaultTimeFilter` | `TimeFilterKeys` | Default time filter (e.g., `24H`, `48H`, `7D`)                        |
| `defaultEventTypes` | `EventTypeKeys[]` | Default array of event types to display (e.g., `["flood", "wind"]`) |

### Constants Configuration

The component uses dynamic time filter and event type configurations, defined in `/src/constants/TimeFilterConfig.js` and `/src/constants/EventTypeConfig.js`:

- **Time Filters**: Specify key, label, and API parameter for time filters.
- **Event Types**: Specify event types with labels, icons, and color styles.

Example Configuration:
```javascript
// TimeFilterConfig.js
export const timeFilterOptions = [
  { key: '24H', label: 'Past 24 Hours', urlParam: '-24hours' },
  { key: '48H', label: 'Past 48 Hours', urlParam: '-48hours' },
  { key: '7D', label: 'Past 7 Days', urlParam: '-7days' }
];

// EventTypeConfig.js
export const eventTypeOptions = [
  { key: 'flood', label: 'Flood', icon: 'water', color: 'text-blue-500' },
  { key: 'hail', label: 'Hail', icon: 'cloud-meatball', color: 'text-gray-500' },
  { key: 'tornado', label: 'Tornado', icon: 'tornado', color: 'text-red-500' },
  { key: 'wind', label: 'Wind', icon: 'wind', color: 'text-green-500' }
];
```

---

## Usage Guide

To use the **StormReport** component in your project:

1. **Import the Component**:
   ```javascript
   import StormReport from './components/StormReport';
   ```

2. **Use the Component in Your App**:
   ```javascript
   function App() {
     return (
       <StormReport
         client_id="YOUR_CLIENT_ID"
         client_secret="YOUR_CLIENT_SECRET"
         defaultLocation="New York, NY"
         defaultTimeFilter="24H"
         defaultEventTypes={["flood", "hail"]}
       />
     );
   }
   ```

3. **Customize with Props**: You can adjust `defaultLocation`, `defaultTimeFilter`, and `defaultEventTypes` based on the initial display requirements.

---

## Dependencies

- **React**: UI Library
- **Tailwind CSS**: For styling
- **Font Awesome**: Icon library for event type icons

Ensure all dependencies are installed to avoid missing features or styling issues.

---

This component is now ready to be integrated and customized based on your application’s specific needs. Enjoy using the StormReport component!
