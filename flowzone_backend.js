const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const MAX_HISTORY = 20;

app.use(cors());
app.use(express.json());

// In-memory robust data store
let roomData = {
  "Library-Room-302": { room_id: "Library-Room-302", co2_ppm: 400, noise_db: 40, occupancy_count: 5, history: [] },
  "Engineering-Lab-101": { room_id: "Engineering-Lab-101", co2_ppm: 450, noise_db: 55, occupancy_count: 12, history: [] },
  "Student-Union-Cafe": { room_id: "Student-Union-Cafe", co2_ppm: 600, noise_db: 70, occupancy_count: 25, history: [] }
};

const evaluateRoomState = (data) => {
  let hvac_status = "Eco-Mode";
  let lighting_mode = "Standard (4000K)";
  let room_status = "Optimal";

  if (data.co2_ppm > 800 || data.noise_db > 65) {
    hvac_status = "Boosted Fresh Air";
    lighting_mode = "Focus-Cool (6000K)";
    room_status = "Needs Ventilation / High Activity";
  } else if (data.co2_ppm > 600 || data.noise_db > 55) {
     hvac_status = "Moderate Airflow";
     room_status = "Moderate Activity";
  }

  return {
    ...data,
    hvac_status,
    lighting_mode,
    room_status,
    last_updated: new Date().toISOString()
  };
};

// Health check for Hackathon monitors
app.get('/health', (req, res) => res.status(200).json({ status: 'OK', timestamp: new Date() }));

// POST endpoint to receive sensor telemetry
app.post('/api/sensors', (req, res) => {
  const sensorData = req.body;
  
  // Validation Check
  if (!sensorData || !sensorData.room_id || typeof sensorData.co2_ppm !== 'number') {
    return res.status(400).json({ error: "Invalid payload format." });
  }

  const roomId = sensorData.room_id;
  
  // Initialize if new room
  if (!roomData[roomId]) {
      roomData[roomId] = { room_id: roomId, history: [] };
  }

  // Process data through logic engine
  const processedData = evaluateRoomState(sensorData);
  
  // Maintain Time-Series History for charts
  const timePoint = { time: Date.now(), co2: sensorData.co2_ppm, noise: sensorData.noise_db };
  const currentHistory = roomData[roomId].history || [];
  currentHistory.push(timePoint);
  
  if (currentHistory.length > MAX_HISTORY) {
      currentHistory.shift(); // Remove oldest
  }

  // Update store
  roomData[roomId] = { ...processedData, history: currentHistory };
  
  console.log(`[DATA] Processed ${roomId} | CO2: ${Math.round(sensorData.co2_ppm)} | Status: ${processedData.room_status}`);
  res.status(200).json({ message: "ACK", state: processedData });
});

// GET endpoint to serve dashboard
app.get('/api/rooms', (req, res) => {
  try {
      const data = Object.values(roomData).map(room => evaluateRoomState(room));
      res.json(data);
  } catch (error) {
      res.status(500).json({ error: "Internal server error reading data." });
  }
});

// POST endpoint for manual override
app.post('/api/rooms/:roomId/override', (req, res) => {
  const { roomId } = req.params;
  const { action } = req.body;

  if (roomData[roomId]) {
      if (action === 'focus_mode') {
         roomData[roomId].hvac_status = "Boosted Fresh Air (Manual)";
         roomData[roomId].lighting_mode = "Deep Focus (6500K)";
         roomData[roomId].room_status = "Manual Override: Focus Mode";
      } else if (action === 'relax_mode') {
         roomData[roomId].hvac_status = "Gentle Airflow (Manual)";
         roomData[roomId].lighting_mode = "Warm Ambient (3000K)";
         roomData[roomId].room_status = "Manual Override: Relax Mode";
      }
      roomData[roomId].last_updated = new Date().toISOString();
      console.log(`[OVERRIDE] Applied ${action} to ${roomId}`);
      res.json({ message: `Override applied`, state: roomData[roomId] });
  } else {
      res.status(404).json({ error: "Room not found" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 FlowZone API running on http://localhost:${PORT}`);
  console.log(`Endpoints:\n- GET /api/rooms\n- POST /api/sensors\n- POST /api/rooms/:id/override`);
});