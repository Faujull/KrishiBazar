# KrishiBazar 🌾

**KrishiBazar** is an AI-assisted smart agriculture web application designed to help farmers make informed farming decisions using crop recommendations, weather information, disease analysis, farm planning, and marketplace features.

> **Project status:** Farmer-side frontend with API integrations. The other stakeholder portals and a full production backend/database are not implemented. Farm-monitoring sensor readings are simulated; no physical IoT device is connected.

## Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Requirements](#requirements)
- [Install on Windows](#install-on-windows)
- [Install on Linux](#install-on-linux)
- [Configure Gemini API](#configure-gemini-api)
- [Run the Application](#run-the-application)
- [User Manual](#user-manual)
- [Testing and Documentation](#testing-and-documentation)
- [Screenshots](#screenshots)
- [Limitations and Future Work](#limitations-and-future-work)
- [Team](#team)
- [Project Links](#project-links)

## Features

- **Farmer Dashboard:** Overview of farm information, weather, and farming activities.
- **Smart Farm Registration:** Step-by-step farm setup and AI-assisted crop recommendations.
- **AI Farm Intelligence Center:** Crop-related guidance for disease, pests, fertilizer, irrigation, yield, costs/profit, market information, and crop lifecycle.
- **AI Daily Advisory:** Farming suggestions informed by farm context and weather data.
- **Leaf Disease Analysis:** Image-based crop disease analysis using the configured Gemini API.
- **Seasonal Farming Planner:** Crop timeline and recommended farming activities.
- **Farm Monitoring Prototype:** Displays simulated sensor readings alongside weather information.
- **Marketplace and Orders:** Farmer produce listings and order-related screens.
- **Notifications:** Farming and marketplace updates.
- **Bangla and English:** Bilingual interface.

## Technology Stack

- React, TypeScript, React Router, Tailwind CSS
- Express server for Gemini API requests
- Google Gemini API for AI-assisted features
- Open-Meteo API for weather data
- Vite and npm for development

## Requirements

Install the following before running the project:

- **Node.js:** 20.x or later
- **npm:** Included with Node.js
- **Git:** Current stable version
- A modern web browser, such as Chrome, Firefox, or Edge

No separate database installation is required for the current version.

## Install on Windows

1. Install Node.js from [nodejs.org](https://nodejs.org/) and Git from [git-scm.com](https://git-scm.com/).
2. Open PowerShell.
3. Clone the repository:

   ```powershell
   git clone https://github.com/Faujull/KrishiBazar.git
   cd KrishiBazar
   ```

4. Install project dependencies:

   ```powershell
   npm install
   ```

5. Complete the [Gemini API configuration](#configure-gemini-api).
6. Start the application using the command documented in [Run the Application](#run-the-application).

## Install on Linux

1. Install Node.js 20.x or later, npm, and Git using your distribution's package manager or the official [Node.js website](https://nodejs.org/).
2. Open a terminal.
3. Clone the repository:

   ```bash
   git clone https://github.com/Faujull/KrishiBazar.git
   cd KrishiBazar
   ```

4. Install project dependencies:

   ```bash
   npm install
   ```

5. Complete the [Gemini API configuration](#configure-gemini-api).
6. Start the application using the command documented in [Run the Application](#run-the-application).

## Configure Gemini API

Some AI features require a Gemini API key.

1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2. Check the project's server configuration to confirm the expected environment-variable name.
3. Create the required `.env` file in the location expected by the server and add your key, for example:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Keep `.env` private. **Never commit your real API key to GitHub.** If the project uses a different variable name or `.env` location, follow the names used in the source code.
5. If the key is missing or the API request fails, AI features may use the application's fallback behavior.

## Run the Application

From the project directory, use the development script defined in `package.json`. In a typical Vite setup, this is:

```bash
npm run dev
```

If the project starts successfully, Vite will print a local URL in the terminal, commonly `http://localhost:5173`. Open the exact URL printed by your terminal.

If the command is unavailable, check the `scripts` section in `package.json` and use the configured development command. The project may require its Express server to be started separately depending on the scripts provided.

## User Manual

1. **Open the application** using the local URL shown in the terminal.
2. **Register or log in** through the authentication screen.
3. **Set up a farm** from Add Farm. Enter the requested farm, location, soil, drainage, and other details.
4. **Review crop recommendations** and the reasons, risks, and farming information shown for your farm.
5. **Open the Dashboard** to review farm information and available weather updates.
6. **Open AI Farm Intelligence** for crop-related advisory modules and daily recommendations.
7. **Use Disease Detection** to submit a suitable crop-leaf image for AI-assisted analysis.
8. **Open Seasonal Planner** to review the crop schedule and suggested activities.
9. **Open Farm Monitoring** to explore the monitoring dashboard. Its sensor values are simulated and should not be treated as real measurements.
10. **Explore Marketplace and Orders** to view the available produce-listing and order interfaces.
11. **Change the language** using the language control to switch between Bangla and English, where available.

The available screens and behavior depend on the current implementation. AI-generated advice is informational and should be checked against local agricultural expertise before taking action.

## Testing and Documentation

Add the files below to the repository if they are part of your submission. The links will work after the files exist at these exact paths.

- [Testing Report (PDF)](https://github.com/Faujull/KrishiBazar/blob/main/docs/KrishiBazar_Final_Showcase.pptx)
- [Editable Presentation (PPTX)](docs/KrishiBazar_Final_Showcase.pptx)

The testing report should record the tests actually performed, results, screenshots/evidence, API and fallback behavior, browser checks, and known limitations. Do not mark a test as passed unless it was performed.


## Limitations and Future Work

- The current submission focuses on farmer-facing functionality; the other planned stakeholder portals remain future work.
- A complete production backend and persistent database are not implemented.
- Farm-monitoring telemetry is simulated; physical IoT sensors and device connectivity are future work.
- Deployment to a public live website is not currently provided in this README.
- Future work may include the remaining stakeholder portals, a full backend/database, real IoT integration, and production deployment.

## Team

- Muhammad Faujul Kabir
- Md. Rakib Hasan
- Md. Mahmud Hossain
- Rohan

## Project Links

- **GitHub Repository:** https://github.com/Faujull/KrishiBazar
- **Live Website:** Not currently deployed. Follow the installation instructions above to run the project locally.
