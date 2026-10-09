# 🌊 FlowZone — Smart Campus Dynamic Climate & Focus Engine

> **Hackathon MVP** | *Optimizing student cognitive performance and indoor air quality in real-time through IoT telemetry and automated environmental controls.*

![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green?style=flat-square&logo=node.js)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20TailwindCSS-blue?style=flat-square&logo=react)
![Python](https://img.shields.io/badge/IoT%20Simulator-Python%203-yellow?style=flat-square&logo=python)
![ESP32](https://img.shields.io/badge/Hardware-ESP32%20%2B%20MQ135-red?style=flat-square&logo=espressif)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

---THE APP https://share.gemini.google/7gLYMApptCYg

## 📌 Problem Statement
High concentrations of $\text{CO}_2$ (>800 ppm) in enclosed campus study spaces cause drowsiness, reduced cognitive function, and headaches. Coupled with fluctuating ambient noise levels, students frequently experience rapid burnout and poor focus without realizing environmental factors are responsible.

## 💡 The FlowZone Solution
**FlowZone** transforms passive study rooms into dynamic, self-healing environments. By continuously monitoring air quality ($\text{CO}_2$), acoustic levels (dB), and occupancy in real-time:
1. It detects high stress or poor air conditions automatically.
2. It triggers automated actuator state changes: boosting HVAC fresh air intake and shifting ambient lighting to a crisp **Focus-Cool (6000K)** state.
3. It gives students and campus managers instant manual override controls for customized zone comfort.

---

## 🏗 System Architecture & Data Flow

```
+------------------------------------+
|   IoT Edge Sensors / Simulator     |
| (ESP32 + MQ-135 / Python Script)   |
+------------------------------------+
                  |
                  | HTTP POST (JSON Telemetry every 5s)
                  v
+------------------------------------+
|      FlowZone Express API          |
|    - Threshold Rules Engine        |
|    - Time-Series In-Memory Store   |
+------------------------------------+
                  |
                  | REST API / Polling Sync
                  v
+------------------------------------+
|    React Control Dashboard UI      |
|    - Building Filter (A, B, C, Lib)|
|    - Live Charts & Actuator Badges |
|    - Manual Comfort Overrides      |
+------------------------------------+
```

---

## ⚡ Automated Rule Matrix

| Metric Condition | Environmental Status | HVAC Actuator Action | Lighting Actuator Action |
| :--- | :--- | :--- | :--- |
| $\text{CO}_2 \le 600\text{ ppm}$ AND Noise $\le 55\text{ dB}$ | **Optimal** | Eco-Mode | Standard Warm (4000K) |
| $\text{CO}_2 > 600\text{ ppm}$ OR Noise $> 55\text{ dB}$ | **Moderate Activity** | Moderate Airflow | Standard Daylight (4500K) |
| $\text{CO}_2 > 800\text{ ppm}$ OR Noise $> 65\text{ dB}$ | **Needs Ventilation** | **Boosted Fresh Air** | **Focus-Cool (6000K)** |

---

## ✨ Features
<!-- STREAMING_CHUNK:Listing core application features... -->
- 🏢 **Multi-Building Navigation**: Toggle seamlessly between **A BLOCK**, **B BLOCK**, **C BLOCK**, and the **LIBRARY**.
- 📊 **Real-time Sparkline Charts**: Recharts integration showing live $\text{CO}_2$ drift curves.
- 🤖 **Automated Actuator Simulation**: Visual feedback on current HVAC fan speeds and LED Kelvin color temperatures.
- 🎛️ **Student Manual Overrides**: Instant single-click **Boost** or **Relax** mode execution with toast alerts.
- 🧪 **Realistic Random-Walk IoT Simulation**: Python telemetry engine replicating natural gas diffusion and human movement.

---

## 🛠 Tech Stack

- **Frontend**: React (Hooks, Context), Tailwind CSS, Lucide Icons, Recharts
- **Backend**: Node.js, Express, CORS middleware
- **IoT / Hardware**: Python 3 (Requests, Random Walk model), ESP32 Microcontroller, MQ-135 Gas Sensor, Sound Sensor module.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js (v16+)](https://nodejs.org/)
- [Python 3.x](https://www.python.org/)

### 1. Clone & Set Up Project
```bash
git clone https://github.com/your-username/flowzone.git
cd flowzone
```

### 2. Launch Backend API Server
```bash
# Navigate to backend directory or root
npm install express cors
node server.js
```
*Server will start on `http://localhost:3001`*

### 3. Launch Python Sensor Simulator
In a separate terminal tab:
```bash
pip install requests
python simulate_sensors.py
```

### 4. Launch React Frontend
If running as a standalone React app:
```bash
npm install
npm run dev
```

---

## 🔌 Live Hardware Integration Setup (ESP32)

To connect physical hardware during a live hackathon demonstration:

```
+----------------+          +-------------------+
|   MQ-135 Gas   |------->  | GPIO 34 (Analog)  |
|   Sound Module |------->  | GPIO 35 (Analog)  |  ESP32
|   5V Relay Fan |<-------  | GPIO 26 (Digital) |  Board
|   RGB LED      |<-------  | GPIO 27 (PWM)     |
+----------------+          +-------------------+
```

### ESP32 Payload Sample
```json
{
  "room_id": "LIBRARY-Room-302",
  "co2_ppm": 842.5,
  "noise_db": 68.1,
  "occupancy_count": 14,
  "timestamp": "2026-10-09T11:32:00.000Z"
}
```

---

## 🔮 Future Roadmap
- [ ] **Predictive Occupancy Analytics**: Machine Learning algorithm to pre-cool rooms based on class schedules.
- [ ] **MQTT / WebSocket Support**: Bi-directional low-latency hardware control socket.
- [ ] **HVAC Energy Efficiency Scoring**: Displaying kilowatt-hours saved during Eco-Mode periods.

---

## 📜 License
This project is open-source and licensed under the [MIT License](LICENSE).
