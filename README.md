# FLOW-ZONE-control-centre-
# 🌿 FlowZone: Smart Campus Environmental Optimization & Focus Engine

> **FlowZone** is a smart campus IoT & automation platform that dynamically monitors study room conditions (CO₂ levels, ambient noise, and occupancy) and automatically modulates environmental actuators (LED color temperature and HVAC/ventilation) to optimize student focus, cognitive performance, and well-being.

---

## 🚀 Key Features

- **Real-Time IoT Telemetry Simulation:** Simulates ESP32/Arduino microcontrollers streaming environmental metrics (`CO₂`, `Noise`, `Occupancy`) every 5 seconds.
- **Automated Logic & Actuator Control Engine:** Instantly evaluates environmental stress thresholds and switches actuators:
  - *Optimal Mode:* Eco-friendly ventilation & warm/neutral lighting (4000K).
  - *Boost Mode (`CO₂ > 800 ppm` or `Noise > 65 dB`):* Triggers "Boosted Fresh Air" HVAC and switches to "Focus-Cool (6000K)" high-alert lighting.
- **Futuristic Dark-Mode Control Center:** A sleek, responsive dashboard built for live hackathon demos featuring live metric cards, actuator status badges, and interactive telemetry logs.
- **Manual Student Override:** Allows students or facility managers to manually override zones or request immediate climate adjustments.
- **Hardware-Ready Architecture:** Designed to seamlessly transition from simulation to real physical ESP32 microcontrollers.

---

## 🛠️ Tech Stack

- **Frontend & Dashboard UI:** React, Tailwind CSS, Lucide Icons, Recharts (all bundled into a zero-setup standalone client or web app).
- **Backend & Simulation Engine:** Node.js / Express (or embedded state-machine logic in-browser for zero-config hackathon demos).
- **Communication Protocol:** REST API & JSON Payloads over HTTP / MQTT compatible schema.

---

## 📁 Repository Structure

```tree
FlowZone/
├── index.html            # Standalone Full-Stack MVP Dashboard (Ready for GitHub Pages)
├── server.js             # Optional Node.js/Express Backend API & Telemetry Receiver
├── sensor_simulator.py   # Python ESP32/IoT Microcontroller Sensor Simulator
└── README.md             # Project Documentation & Pitch Guide
