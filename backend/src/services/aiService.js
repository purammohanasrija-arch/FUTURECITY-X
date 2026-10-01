import { GoogleGenerativeAI } from '@google/generative-ai';
import { cityStore } from './memoryStore.js';

let geminiClient = null;

if (process.env.GEMINI_API_KEY) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    geminiClient = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('⚡ [FutureCity X] Google Gemini AI Model initialized successfully.');
  } catch (err) {
    console.warn('⚠️ [FutureCity X] Gemini initialization warning:', err.message);
  }
}

/**
 * Generates a prompt grounded in current live city data
 */
function buildCityContextPrompt(userQuery) {
  const t = cityStore.telemetry;
  const activeInc = cityStore.incidents.filter(i => i.status !== 'Resolved');
  
  return `
You are the central AI Core of "FutureCity X", an advanced futuristic smart city digital twin.
You are professional, concise, technologically sophisticated, and grounded in real-time city telemetry.

Current Live City Telemetry:
- City Health Score: ${t.cityHealth}/100
- Simulated Time: ${cityStore.simulatedTime} | Weather: ${cityStore.weather.mode} (${cityStore.weather.temperature}°C)
- Traffic: Congestion is ${t.traffic.congestionLevel} (${t.traffic.congestionPercent}%), ${t.traffic.activeVehicles} active vehicles, avg speed ${t.traffic.averageSpeed} km/h. Sector 3 density: ${t.traffic.sectors['Sector 3'].density}%.
- Energy: Generation ${t.energy.totalGeneration} MW, Consumption ${t.energy.totalConsumption} MW, Renewable ${t.energy.renewablePercent}%, Grid Stability ${t.energy.gridStability}%.
- Water: Reservoir at ${t.water.reservoirLevel}%, Quality ${t.water.waterPurity}%, Leakage status: ${t.water.leakActive ? 'CRITICAL LEAK ACTIVE in Sector 4 (82 L/min)' : 'Normal (18 L/min)'}.
- Waste: City-wide fill ${t.waste.cityWideFill}%. Highest waste sector: Sector 3 (${t.waste.sectors['Sector 3']}%).
- Public Safety: ${activeInc.length} active incidents: ${activeInc.map(i => `${i.title} (${i.severity}) in ${i.sector} [Status: ${i.status}]`).join('; ') || 'None'}.

Instructions:
1. Answer the citizen/operator query directly using the exact telemetry data provided above.
2. If data is unavailable or not tracked, clearly state that telemetry is outside current sensor coverage.
3. Keep the tone futuristic, authoritative, yet friendly and helpful (HUD / Sci-fi command center style).
4. Provide actionable insights or recommendations where appropriate.

User Query: "${userQuery}"
`;
}

/**
 * Intelligent fallback generator when Gemini API key is not present or offline
 */
function generateContextualOfflineReply(query) {
  const q = query.toLowerCase();
  const t = cityStore.telemetry;
  const activeInc = cityStore.incidents.filter(i => i.status !== 'Resolved');

  if (q.includes('traffic') || q.includes('congest') || q.includes('sector 5') || q.includes('car')) {
    return `🚦 **Traffic Analysis**: Current city-wide congestion is **${t.traffic.congestionLevel}** at **${t.traffic.congestionPercent}%** with ${t.traffic.activeVehicles.toLocaleString()} active autonomous and manual vehicles. Sector 3 and Sector 5 are experiencing elevated density (84%) due to scheduled freight logistics. Recommendation: Adaptive green-wave signaling has been queued for Apex Boulevard.`;
  }

  if (q.includes('energy') || q.includes('power') || q.includes('solar') || q.includes('grid')) {
    return `⚡ **Energy Grid Telemetry**: Total municipal generation is **${t.energy.totalGeneration} MW** against **${t.energy.totalConsumption} MW** consumption, leaving a secure surplus. Renewable solar and wind sources supply **${t.energy.renewablePercent}%** of total load with grid stability rated at **${t.energy.gridStability}%**. Microgrid buffers are holding at 94% reserve capacity.`;
  }

  if (q.includes('waste') || q.includes('trash') || q.includes('bin')) {
    const highestSector = Object.entries(t.waste.sectors).sort((a,b) => b[1] - a[1])[0];
    return `♻️ **Waste Management Diagnostics**: The highest accumulation is currently in **${highestSector[0]}** at **${highestSector[1]}% capacity**. Plasma recycling facilities are running at 94.2% reclamation efficiency. Automated compaction collection drones are scheduled to deploy along Sector 3 chokepoints.`;
  }

  if (q.includes('water') || q.includes('leak') || q.includes('reservoir')) {
    if (t.water.leakActive) {
      return `💧 **URGENT WATER ALERT**: A pipeline breach is active in **Sector 4 Trunk V-17** at a rate of 82 L/min. Distribution efficiency dropped to ${t.water.distributionEfficiency}%. Recommended action: Execute automated Valve V-17 isolation immediately via the Water Command module.`;
    }
    return `💧 **Water Infrastructure Status**: The Deep Horizon Aquifer & Reservoir is currently at **${t.water.reservoirLevel}% capacity** with purity at ${t.water.waterPurity}%. Distribution efficiency is optimal at ${t.water.distributionEfficiency}%, with no active trunk anomalies detected.`;
  }

  if (q.includes('incident') || q.includes('emergency') || q.includes('accident') || q.includes('fire') || q.includes('safety')) {
    if (activeInc.length === 0) {
      return `🛡️ **Public Safety Report**: All sectors are currently clear of active emergencies. Public safety index is at an optimal **${t.scores.safety}/100**. Emergency response units are on standby at designated sector stations.`;
    }
    const list = activeInc.map(i => `• **${i.title}** (${i.severity} severity) in ${i.sector} — Status: ${i.status} [Unit: ${i.dispatchedUnit || 'Awaiting dispatch'}]`).join('\n');
    return `🛡️ **Active Incident Log** (${activeInc.length} ongoing):\n${list}\n\nAI Protocol: Emergency corridors have been synchronized for rapid responder transit.`;
  }

  if (q.includes('optimize') || q.includes('recommend') || q.includes('first') || q.includes('priority')) {
    return `🎯 **AI Core Optimization Priorities**:
1. **Traffic**: Reallocate signal timing on Junction 07 to relieve northern freight backlog (+8s green phase).
2. **Waste**: Deploy autonomous collection drone sweep to Sector 3 (Node 12).
3. **Energy**: Shift 12 MW of peak industrial demand to off-peak solar buffer windows.
4. **Safety**: Confirm resolution on Incident #901 at Sector 7.`;
  }

  // Default smart futuristic answer
  return `🌐 **FutureCity X AI Core Online**: Systems operational. City Health Index is **${t.cityHealth}/100**. Current weather is ${cityStore.weather.mode} (${cityStore.weather.temperature}°C). All primary networks (Traffic, Energy, Water, Transport, Public Safety) are synchronized. How can I assist with telemetry analysis or simulation modeling?`;
}

export async function askAIChat(query) {
  if (geminiClient) {
    try {
      const fullPrompt = buildCityContextPrompt(query);
      const result = await geminiClient.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.warn('⚠️ [Gemini API call failed, using fallback]:', err.message);
      return generateContextualOfflineReply(query);
    }
  }

  // Graceful, smart fallback using live data
  return generateContextualOfflineReply(query);
}

export async function getCityOptimizationPlan() {
  const t = cityStore.telemetry;
  return {
    timestamp: new Date().toISOString(),
    cityHealthScore: t.cityHealth,
    potentialScoreImprovement: '+7 to +9 pts',
    optimizations: [
      {
        id: 'opt-1',
        system: 'Traffic Network',
        action: 'Dynamic Signal Balancing on Sector 3 & Junction 07',
        impact: 'Reduces vehicle wait time by 22% and relieves freight corridor',
        confidence: 96,
        status: 'Ready'
      },
      {
        id: 'opt-2',
        system: 'Energy Grid',
        action: 'Activate Battery Storage Feed & Solar Peak Smoothing',
        impact: 'Increases renewable utilization from 67% to 78%',
        confidence: 94,
        status: 'Ready'
      },
      {
        id: 'opt-3',
        system: 'Waste Management',
        action: 'Reroute Smart Collection Fleet to Sector 3 Node 12',
        impact: 'Prevents overflow breach, reducing fill from 94% to 45%',
        confidence: 98,
        status: 'Ready'
      },
      {
        id: 'opt-4',
        system: 'Public Transport',
        action: 'Increase Hyperloop & Autonomous Bus Frequency (+25%)',
        impact: 'Absorbs 3,400 daily private vehicular trips',
        confidence: 92,
        status: 'Ready'
      }
    ],
    summary: 'Execution of these 4 automated protocols will elevate city performance to 95/100 and stabilize all sector metrics.'
  };
}
