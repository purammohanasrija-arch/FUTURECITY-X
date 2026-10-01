import { cityStore } from './memoryStore.js';

export function runWhatIfSimulation(params) {
  const p = {
    population: Number(params.population || 0),
    cars: Number(params.cars || 0),
    factories: Number(params.factories || 0),
    rainfall: Number(params.rainfall || 0),
    solar: Number(params.solar || 0),
    publicTransport: Number(params.publicTransport || 0),
    waterConsumption: Number(params.waterConsumption || 0),
    wasteGeneration: Number(params.wasteGeneration || 0),
  };

  const current = cityStore.telemetry;

  // 1. Calculate Traffic
  // Base 68%. Cars +0.8%, Pop +0.3%, PublicTransport -0.6%, Rainfall +0.15%
  const trafficDelta = (p.cars * 0.8) + (p.population * 0.3) - (p.publicTransport * 0.6) + (p.rainfall * 0.15);
  const afterTraffic = Math.min(99, Math.max(15, Math.round(current.traffic.congestionPercent + trafficDelta)));

  // 2. Calculate Energy Stability
  // Base 92%. Solar +0.3%, Factories -0.5%, Pop -0.2%, Rainfall -0.1%
  const energyDelta = (p.solar * 0.3) - (p.factories * 0.5) - (p.population * 0.2) - (p.rainfall * 0.1);
  const afterEnergy = Math.min(100, Math.max(20, Math.round(current.energy.gridStability + energyDelta)));

  // 3. Calculate Water Level
  // Base 81%. Rainfall +0.3%, WaterConsumption -0.6%, Factories -0.2%, Pop -0.25%
  const waterDelta = (p.rainfall * 0.3) - (p.waterConsumption * 0.6) - (p.factories * 0.2) - (p.population * 0.25);
  const afterWater = Math.min(100, Math.max(15, Math.round(current.water.reservoirLevel + waterDelta)));

  // 4. Calculate Waste
  // Base 74%. WasteGen +0.7%, Pop +0.4%, Factories +0.3%
  const wasteDelta = (p.wasteGeneration * 0.7) + (p.population * 0.4) + (p.factories * 0.3);
  const afterWaste = Math.min(100, Math.max(10, Math.round(current.waste.cityWideFill + wasteDelta)));

  // 5. Calculate Air Quality (AQI) - higher is cleaner in this index
  // Base 68. Solar +0.4, PublicTransport +0.35, Cars -0.6, Factories -0.5
  const aqiDelta = (p.solar * 0.4) + (p.publicTransport * 0.35) - (p.cars * 0.6) - (p.factories * 0.5);
  const afterAQI = Math.min(99, Math.max(10, Math.round(current.environment.aqi + aqiDelta)));

  // 6. Overall City Health Score
  const healthDelta = (energyDelta * 0.25) + (aqiDelta * 0.25) + (waterDelta * 0.2) - (trafficDelta * 0.15) - (wasteDelta * 0.15);
  const afterHealth = Math.min(100, Math.max(25, Math.round(current.cityHealth + healthDelta)));

  // Determine status color shifts
  const getShift = (before, after, inverse = false) => {
    const diff = after - before;
    if (Math.abs(diff) <= 2) return 'stable';
    if (inverse) {
      return diff < 0 ? 'better' : 'worse';
    }
    return diff > 0 ? 'better' : 'worse';
  };

  const results = {
    traffic: {
      before: current.traffic.congestionPercent,
      after: afterTraffic,
      shift: getShift(current.traffic.congestionPercent, afterTraffic, true),
      change: `${trafficDelta >= 0 ? '+' : ''}${Math.round(trafficDelta)}%`,
      unit: '% congestion'
    },
    energy: {
      before: current.energy.gridStability,
      after: afterEnergy,
      shift: getShift(current.energy.gridStability, afterEnergy, false),
      change: `${energyDelta >= 0 ? '+' : ''}${Math.round(energyDelta)}%`,
      unit: '% stability'
    },
    water: {
      before: current.water.reservoirLevel,
      after: afterWater,
      shift: getShift(current.water.reservoirLevel, afterWater, false),
      change: `${waterDelta >= 0 ? '+' : ''}${Math.round(waterDelta)}%`,
      unit: '% reservoir'
    },
    waste: {
      before: current.waste.cityWideFill,
      after: afterWaste,
      shift: getShift(current.waste.cityWideFill, afterWaste, true),
      change: `${wasteDelta >= 0 ? '+' : ''}${Math.round(wasteDelta)}%`,
      unit: '% fill level'
    },
    airQuality: {
      before: current.environment.aqi,
      after: afterAQI,
      shift: getShift(current.environment.aqi, afterAQI, false),
      change: `${aqiDelta >= 0 ? '+' : ''}${Math.round(aqiDelta)} AQI`,
      unit: 'AQI index'
    },
    overallHealth: {
      before: current.cityHealth,
      after: afterHealth,
      shift: getShift(current.cityHealth, afterHealth, false),
      change: `${healthDelta >= 0 ? '+' : ''}${Math.round(healthDelta)} pts`,
      unit: '/100'
    }
  };

  // Generate dynamic contextual AI summary
  let aiSummary = '';
  if (p.cars > 10 || p.population > 15) {
    aiSummary = `Because vehicle volume (${p.cars >= 0 ? '+' : ''}${p.cars}%) and municipal population (${p.population >= 0 ? '+' : ''}${p.population}%) escalated, traffic congestion concentrated heavily across major sectors, causing air quality to drop by ${Math.abs(Math.round(aqiDelta))} points. `;
  } else if (p.publicTransport > 20 || p.solar > 20) {
    aiSummary = `Significant investments in public transit (+${p.publicTransport}%) and solar generation capacity (+${p.solar}%) successfully alleviated road bottlenecks while expanding renewable grid penetration. `;
  } else {
    aiSummary = `The balanced parameter adjustments yielded a moderated shift across municipal systems. `;
  }

  if (p.factories > 15) {
    aiSummary += `Industrial load increases exerted notable stress on energy reserves and local waste sorting nodes.`;
  } else if (p.rainfall > 25) {
    aiSummary += `Elevated precipitation bolstered reservoir levels (+${Math.round(waterDelta)}%) while slightly lowering road transit speeds.`;
  }

  // Generate Actionable Recommendations
  const recommendations = [];
  if (results.traffic.after > 75) {
    recommendations.push('Deploy dynamic congestion tolling and expand high-speed transit corridors.');
  }
  if (results.energy.after < 85) {
    recommendations.push('Activate auxiliary fusion storage buffers to smooth industrial spikes.');
  }
  if (results.waste.after > 80) {
    recommendations.push('Increase automated drone collection frequency and commission secondary plasma recycling.');
  }
  if (results.airQuality.after < 60) {
    recommendations.push('Implement zero-emission delivery zones around Central and Innovation districts.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Parameters maintain an optimal equilibrium. Continue continuous telemetry logging.');
  }

  const simulationRecord = {
    id: 'sim-' + (100 + cityStore.simulations.length + 1),
    title: `Sim #${cityStore.simulations.length + 1} (${p.population >= 0 ? '+' : ''}${p.population}% Pop, ${p.cars >= 0 ? '+' : ''}${p.cars}% Cars, ${p.solar >= 0 ? '+' : ''}${p.solar}% Solar)`,
    parameters: p,
    results,
    aiSummary,
    recommendations,
    createdAt: new Date().toISOString()
  };

  cityStore.simulations.unshift(simulationRecord);

  return simulationRecord;
}
