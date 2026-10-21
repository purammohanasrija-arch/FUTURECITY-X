# FUTURECITY X — AI-POWERED SMART CITY DIGITAL TWIN & SIMULATION PLATFORM

> **"SEE THE CITY. SIMULATE THE FUTURE."**

![FutureCity X Banner](https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1600&q=80)

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r168-black?logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**FutureCity X** is an interactive, futuristic smart-city digital twin and simulation command platform. It merges a **3D WebGL spatial representation of a living metropolis** with **real-time municipal telemetry, AI-driven urban optimization, emergency response systems, and a What-If City Policy Simulator**.

---

## 🌟 CORE HIGHLIGHTS

* **Interactive 3D Digital Twin**: Rendered with Three.js and React Three Fiber featuring 28+ procedural skyscrapers, hospitals, solar power plants, water facilities, and metro stations.
* **Live Telemetry & Holographic HUD**: Click any building, junction, or facility in the 3D city to open an animated holographic telemetry modal with live operational metrics.
* **Moving Traffic Fleet**: Procedural autonomous cars, buses, and ambulances with flashing sirens whose density and speed react dynamically to weather and user slider inputs.
* **Atmospheric & Day/Night Engines**: Simulated city clock slider (00:00 to 24:00) controlling dynamic sunlight angles, stars, and building illumination alongside 6 weather modes (*Sunny, Cloudy, Rain, Storm with lightning, Fog, Night*).
* **AI City Assistant & Neural Optimizer**: Persistent holographic assistant powered by Google Gemini (with state-grounded heuristic fallback) that answers questions using current city telemetry and applies automated multi-point civic optimizations.
* **Signature What-If Simulation Lab**: Change population, vehicles, industrial activity, rainfall, solar penetration, and transit capacity to observe before/after impacts, radar profiles, and AI causal explanations.
* **Emergency Dispatch System**: Live incident radar feed with rapid dispatch workflows (Reported → Dispatched → Responding → Resolved).
* **Role-Based Access Control**: Citizen, City Operator, and Administrator permissions with quick 1-click evaluation sign-in switchers.
* **Zero External Audio Dependencies**: Pure Web Audio API synthesized cyber sound cues for clicks, boot chord arpeggios, and emergency alerts.

---

## 📐 SYSTEM ARCHITECTURE

```
                               ┌────────────────────────────────────────┐
                               │       FUTURECITY X WEB CLIENT          │
                               │  (React 18 + Vite + Tailwind + R3F)    │
                               └──────────────────┬─────────────────────┘
                                                  │
                                                  │ REST APIs & Telemetry Bus
                                                  ▼
                               ┌────────────────────────────────────────┐
                               │       CENTRAL COMMAND BACKEND          │
                               │    (Node.js + Express.js API)          │
                               └──────┬──────────────────────┬──────────┘
                                      │                      │
                   ┌──────────────────┴────────┐   ┌─────────┴────────────────┐
                   │   TELEMETRY & MOCK STORE  │   │     AI NEURAL ENGINE     │
                   │   - Traffic & Road Grid   │   │  - Google Gemini 1.5     │
                   │   - Microgrid & Hydro     │   │  - Grounded Context      │
                   │   - Incidents & Dispatch  │   │  - Fallback Knowledge    │
                   └───────────────────────────┘   └──────────────────────────┘
```

---

## 🏙️ CITY SUBSYSTEMS

| Subsystem | Key Capabilities |
| :--- | :--- |
| **Command Center** | 6 Core KPI cards (*Traffic, Energy, Water, Waste, Air Quality, Safety*), overall City Health Score (88/100), AI insight feed. |
| **3D Digital Twin** | Fullscreen 3D metropolis with camera presets (Isometric, Top-Down, Downtown, Eco-Valley), type filters, and object inspectors. |
| **Autonomous Traffic** | Vehicle density slider (Low to High), congestion heatmaps, road inspector with signal phase recommendations. |
| **Smart Energy** | Solar, wind, and clean core microgrid flow architecture, interactive generation and demand sliders. |
| **Aqua-Net Telemetry**| Reservoir level, purity index, interactive *"CREATE WATER LEAK"* emergency drill and automated valve isolation. |
| **Smart Waste** | Ultrasonic bin fill bars for Sectors 1–8, autonomous compactor drone fleet tracking, and AI route optimizer. |
| **Multi-Modal Transit** | Hyperloop, Blue Line, autonomous bus routes, interactive metro stations with arrival countdowns. |
| **Environment Center** | AQI index, CO2 (ppm), ambient temperature, acoustic noise (dB), urban tree canopy, and 7-day trend graphs. |
| **Public Safety** | Live incident radar (Traffic Accident, Fire, Flood, Medical, Power, Security) with dispatch progression. |
| **Simulation Lab** | 8-variable civic shock simulator with Before vs. After comparison cards, radar charts, and history archive. |

---

## 🚀 GETTING STARTED

### Prerequisites

* **Node.js**: v18.0 or higher (Tested on v24.13)
* **npm**: v9.0 or higher

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/your-username/futurecity-x.git
cd futurecity-x

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

You can run both backend and frontend servers simultaneously:

**Terminal 1 (Backend Server on Port 5000):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend Dev Server on Port 3000):**
```bash
cd frontend
npm run dev
```

Open your browser at **`http://localhost:3000`**.

---

## 🔐 ENVIRONMENT CONFIGURATION

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=futurecity-x-ultra-secure-jwt-secret-key-2026

# Optional: Add your Google Gemini API Key for live AI Assistant responses
GEMINI_API_KEY=

# Optional: MongoDB Atlas URI (Falls back to high-performance In-Memory store if omitted)
MONGODB_URI=
```

### Frontend (`frontend/.env`)

```env
# Optional: In development Vite proxies /api to http://localhost:5000 automatically.
# Set this only in production when pointing to a deployed backend.
VITE_API_URL=
```

---

## 📡 REST API ENDPOINTS

### Core & Authentication
* `POST /api/auth/register` — Create citizen or operator account
* `POST /api/auth/login` — Sign in and obtain JWT
* `GET  /api/auth/me` — Retrieve active profile
* `POST /api/auth/demo/:role` — Quick evaluation login (`admin`, `operator`, `citizen`)

### City Systems & 3D Objects
* `GET  /api/city/status` — Live summary, weather, and telemetric indices
* `GET  /api/city/health` — Decomposed City Health Score (0-100)
* `POST /api/city/weather` — Modify weather mode (`Sunny`, `Cloudy`, `Rain`, `Storm`, `Fog`, `Night`)
* `POST /api/city/time` — Set simulated time of day (0 to 24)
* `GET  /api/city/objects` — Retrieve 28+ interactive 3D facilities
* `POST /api/city/optimize` — Execute AI city-wide optimization protocols

### Subsystem Simulation Actions
* `POST /api/traffic/simulate` — Set traffic density (0 to 100)
* `POST /api/energy/simulate` — Adjust solar, wind, and demand multipliers
* `POST /api/water/simulate` — Trigger simulated pipeline breach in Sector 4
* `POST /api/water/repair` — Execute valve isolation and restore normal pressure
* `POST /api/waste/optimize` — AI dispatch to clear Sector 3 bin overflows
* `POST /api/incidents` — Report new civic emergency
* `POST /api/incidents/:id/dispatch` — Dispatch nearest police, medical, or fire unit
* `POST /api/simulation/run` — Run 8-variable What-If scenario
* `POST /api/ai/chat` — Query AI Core grounded in live sensor state

---

## 🌐 DEPLOYMENT GUIDE

### ⚡ 1-Click Deploy Links

| Service | Platform | 1-Click Link |
| :--- | :--- | :--- |
| **Backend API** | Render | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/purammohanasrija-arch/FUTURECITY-X) |
| **Frontend UI** | Vercel | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpurammohanasrija-arch%2FFUTURECITY-X) |

---

### Step 1: Deploy Backend (Render)
1. Click the **Deploy to Render** button above, or go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Blueprint** (or **Web Service**).
3. Connect your GitHub repository `purammohanasrija-arch/FUTURECITY-X`.
4. Render will automatically detect `render.yaml` and configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`
5. (Optional) In Environment Variables, add your `GEMINI_API_KEY` for live AI generation. (If omitted, the backend automatically falls back to the adaptive telemetry knowledge engine).
6. Click **Apply** / **Deploy**.
7. Once deployed, copy your Render service URL (e.g., `https://futurecity-x-backend.onrender.com`).

---

### Step 2: Deploy Frontend (Vercel)
1. Click the **Deploy with Vercel** button above, or go to [Vercel New Project](https://vercel.com/new).
2. Import repository `purammohanasrija-arch/FUTURECITY-X`.
3. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` (or leave default root `/` as root `vercel.json` is configured)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://<YOUR-RENDER-BACKEND-URL>/api` (e.g. `https://futurecity-x-backend.onrender.com/api`)
5. Click **Deploy**.
6. The included `vercel.json` provides automated proxy rewrites and full SPA routing with zero 404 errors.

---

## 📜 LICENSE

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
