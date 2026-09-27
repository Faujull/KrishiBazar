# KrishiBazar

KrishiBazar is a Bangladesh-focused smart agriculture web platform designed to assist farmers throughout the cultivation lifecycle. By unifying real-time agro-meteorology, AI-driven farm recommendations, crop planning, simulated field telemetry, leaf disease screening, and a wholesale produce marketplace into a single bilingual interface (বাংলা and English), the application solves the problem of fragmented tools and information for local farming communities.

## 🌾 Key Features

- **Farmer Dashboard**: Real-time localized weather widget, urgent hazard alerts, daily AI recommendations, active crop health tracking, and regional wholesale market prices.
- **5-Step Farm Registration**: Streamlined onboarding capturing soil classification, irrigation methods, water sources, and an interactive 4-direction neighbor boundary map.
- **Daily AI Farm Advisory**: Context-aware daily farm guidance that blends live Open-Meteo weather with individual crop growth stages, soil types, and priority field checklists.
- **AI Crop Intelligence Center**: 8 specialized decision-support modules covering crop diseases, pest threats, NPK fertilizer plans, smart AWD irrigation, yield forecasting, production cost/profit analysis, market trends, and lifecycle management.
- **Crop Lifecycle Tracker**: Interactive task management across 7 phenological stages, from seed treatment to post-harvest storage.
- **Seasonal Farming Planner**: 16-week timeline with scheduled tasks, input requirements, budget estimates, and a printable farm advisory blueprint.
- **Leaf Disease Detection**: Photo upload or mobile camera capture for leaf disease screening, complete with organic/chemical remedies and spoken audio readouts.
- **Farmer Marketplace & Orders**: Direct wholesale produce listings, price-per-kg management, and order fulfillment tracking (*Processing* ➔ *Shipped* ➔ *Delivered*).
- **Contextual Notifications**: Categorized alerts for heavy rainfall, AWD irrigation windows, disease risks, and wholesale buyer orders.
- **Bilingual Interface**: Seamless one-tap language switching between Bengali (বাংলা) and English with local storage persistence.

## 🧠 Smart Agriculture

KrishiBazar integrates agricultural intelligence at multiple levels:
- **Daily Farm Recommendations**: Powered by a server-side Google Gemini (`gemini-3.8-flash`) integration that processes farm characteristics, crop stage, and actual Open-Meteo weather data to produce structured, actionable field advice.
- **Leaf Disease Analysis**: Server-side image processing providing diagnostic severity ratings, symptom lists, and cautious organic and chemical treatment advice.
- **Resilient Fallback Engine**: If an API key is absent or network access fails, deterministic agronomic rule-based engines automatically supply reliable advisories so the UI never breaks.

## 🌦️ Weather & Monitoring

- **Open-Meteo Integration**: Fetches real-time temperature, humidity, precipitation, wind speed, and 7-day daily forecasts without inventing meteorological measurements. Includes built-in coordinate resolution for major Bangladesh districts and in-memory caching.
- **Prototype IoT Telemetry**: Displays ambient temperature, soil moisture, humidity, rainfall, soil pH, and NPK macronutrient levels alongside fire/smoke and perimeter security sensors. *Note: Current IoT sensor telemetry is simulated for prototype demonstration and structured for future physical hardware integration.*

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, React Router 7, Tailwind CSS 4, Lucide React
- **Backend / Server**: Express 4, tsx (Node.js runtime)
- **AI & Data APIs**: `@google/genai` (Gemini 3.8 Flash), Open-Meteo Weather API
- **Tooling & Build**: Vite 6, esbuild

