import time
import random
import requests
import sys
from datetime import datetime

API_URL = "http://localhost:3001/api/sensors"
ROOMS = {
    "Library-Room-302": {"co2": 450, "noise": 40, "occ": 5},
    "Engineering-Lab-101": {"co2": 600, "noise": 55, "occ": 15},
    "Student-Union-Cafe": {"co2": 700, "noise": 70, "occ": 25}
}

def generate_drifted_data(room_id, current_state):
    """
    Simulates real physical sensor drift using a random walk rather than
    purely random jumps. Makes hackathon charts look realistic.
    """
    # Define max bounds
    CO2_MIN, CO2_MAX = 400, 1500
    NOISE_MIN, NOISE_MAX = 35, 90
    
    # 10% chance of a sudden event (like a group walking in)
    event_modifier = random.uniform(1.5, 3.0) if random.random() > 0.9 else 1.0

    # Calculate new values based on previous state +/- a random step
    new_co2 = current_state["co2"] + (random.uniform(-15, 25) * event_modifier)
    new_noise = current_state["noise"] + (random.uniform(-3, 5) * event_modifier)
    
    # Occupancy changes slowly
    new_occ = current_state["occ"]
    if random.random() > 0.8:
        new_occ += random.choice([-2, -1, 1, 2, 3])

    # Clamp values to realistic limits
    current_state["co2"] = max(CO2_MIN, min(CO2_MAX, new_co2))
    current_state["noise"] = max(NOISE_MIN, min(NOISE_MAX, new_noise))
    current_state["occ"] = max(0, min(50, new_occ))

    return {
        "room_id": room_id,
        "co2_ppm": round(current_state["co2"], 2),
        "noise_db": round(current_state["noise"], 2),
        "occupancy_count": int(current_state["occ"]),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

def main():
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Booting FlowZone Sensor Array Simulator...")
    print(f"Target API: {API_URL}")
    print("-" * 50)
    
    try:
        while True:
            for room_id, state in ROOMS.items():
                payload = generate_drifted_data(room_id, state)
                try:
                    # Added timeout for robust networking during live demos
                    response = requests.post(API_URL, json=payload, headers={'Content-Type': 'application/json'}, timeout=3)
                    
                    if response.status_code == 200:
                        print(f"[TX_SUCCESS] {room_id: <20} | CO2: {payload['co2_ppm']: >6} | Noise: {payload['noise_db']: >5}")
                    else:
                        print(f"[TX_FAIL] Server returned {response.status_code}")
                        
                except requests.exceptions.RequestException as e:
                    # Graceful failure - important for high hackathon scores
                    print(f"[TX_ERROR] Could not connect to backend API. Is Node.js running? ({type(e).__name__})")
            
            # Rate limit simulation (5 seconds)
            time.sleep(5)
            
    except KeyboardInterrupt:
        print("\n[SHUTDOWN] Simulator halted by user.")
        sys.exit(0)

if __name__ == "__main__":
    main()