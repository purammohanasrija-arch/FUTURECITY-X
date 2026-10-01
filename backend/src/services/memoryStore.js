import bcrypt from 'bcryptjs';

// Pre-seeded password hash for 'futurecity123'
const salt = bcrypt.genSaltSync(10);
const defaultPasswordHash = bcrypt.hashSync('futurecity123', salt);

class CityStore {
  constructor() {
    this.initData();
  }

  initData() {
    // Current Sim Time & Weather
    this.simulatedTime = '14:30';
    this.timeOfDay = 14.5; // 0 to 24
    this.weather = {
      mode: 'Sunny', // Sunny, Cloudy, Rain, Storm, Fog, Night
      temperature: 24,
      humidity: 52,
      windSpeed: 14,
      aqi: 68,
    };

    // Pre-seeded Users
    this.users = [
      {
        id: 'usr-admin-1',
        name: 'Commander Sarah Vance',
        email: 'admin@futurecity.io',
        password: defaultPasswordHash,
        role: 'admin',
        title: 'Chief City Operations Director',
        sector: 'Central District',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-operator-1',
        name: 'Alex Chen',
        email: 'operator@futurecity.io',
        password: defaultPasswordHash,
        role: 'operator',
        title: 'Emergency & Grid Controller',
        sector: 'Innovation District',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-citizen-1',
        name: 'Elena Rostova',
        email: 'citizen@futurecity.io',
        password: defaultPasswordHash,
        role: 'citizen',
        title: 'Resident & Tech Architect',
        sector: 'Green Valley',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString()
      }
    ];

    // City Telemetry Metrics
    this.telemetry = {
      cityHealth: 88,
      scores: {
        traffic: 78,
        energy: 92,
        water: 85,
        environment: 82,
        safety: 96,
        infrastructure: 89,
      },
      traffic: {
        activeVehicles: 14250,
        averageSpeed: 42, // km/h
        congestionLevel: 'Moderate', // Normal, Moderate, Congested, Blocked
        congestionPercent: 68,
        densityControl: 65, // 0 to 100
        trend: '+8%',
        sectors: {
          'Sector 1': { density: 54, status: 'Normal' },
          'Sector 2': { density: 68, status: 'Moderate' },
          'Sector 3': { density: 84, status: 'Congested' },
          'Central District': { density: 72, status: 'Moderate' },
          'Innovation District': { density: 62, status: 'Normal' },
          'Industrial Zone': { density: 79, status: 'Moderate' },
          'Green Valley': { density: 38, status: 'Normal' },
          'Metro District': { density: 65, status: 'Moderate' },
        }
      },
      energy: {
        totalGeneration: 345, // MW
        totalConsumption: 298, // MW
        renewablePercent: 67, // %
        gridStability: 96, // %
        peakDemand: 360, // MW
        solarOutput: 142, // MW
        windOutput: 88, // MW
        fossilOutput: 115, // MW
        trend: '-2%',
        status: 'Stable',
        controls: {
          solarMultiplier: 1.0,
          windMultiplier: 1.0,
          industrialDemand: 1.0,
          residentialDemand: 1.0,
        }
      },
      water: {
        reservoirLevel: 81, // %
        dailyConsumption: 42.8, // M-liters
        waterPurity: 98.4, // %
        leakageRate: 18, // L/min (normal baseline)
        distributionEfficiency: 94.2, // %
        leakActive: false,
        activeLeakDetails: null,
        trend: '+3%',
        status: 'Normal'
      },
      waste: {
        cityWideFill: 64, // %
        trend: '+12%',
        status: 'Moderate',
        sectors: {
          'Sector 1': 32,
          'Sector 2': 67,
          'Sector 3': 94, // High/Critical
          'Sector 4': 41,
          'Central District': 58,
          'Innovation District': 44,
          'Industrial Zone': 78,
          'Green Valley': 25,
        },
        collectionVehiclesActive: 18,
        optimizedRouteGenerated: true,
        urgentPickups: ['Sector 3 - Smart Bin Node 12', 'Industrial Zone - Heavy Compactor 04']
      },
      transport: {
        activeVehicles: 840,
        metroLinesActive: 3,
        dailyPassengers: 148200,
        onTimeRate: 98.2,
        delaysCount: 2,
        modeBreakdown: {
          metro: 48,
          autonomousBus: 26,
          roboTaxi: 18,
          smartBicycle: 8,
        }
      },
      environment: {
        aqi: 68,
        co2Level: 412, // ppm
        temperature: 24, // C
        noiseLevel: 56, // dB
        greenCanopy: 44, // %
        waterPurity: 98.4,
        healthScore: 82,
        status: 'Good'
      }
    };

    // 20+ Interactive 3D Objects with Coordinates and Metadata
    this.cityObjects = [
      // 4 Hospitals
      { id: 'bld-hosp-1', name: 'Central Regional Hospital', type: 'hospital', sector: 'Central District', position: [8, 0, -12], floors: 16, beds: 420, availableBeds: 42, emergencyCapacity: 78, ambulances: 6, staff: 124, status: 'OPERATIONAL', icon: 'Cross' },
      { id: 'bld-hosp-2', name: 'Innovation Biotech Clinic', type: 'hospital', sector: 'Innovation District', position: [-14, 0, 10], floors: 12, beds: 180, availableBeds: 28, emergencyCapacity: 60, ambulances: 4, staff: 85, status: 'OPERATIONAL', icon: 'Cross' },
      { id: 'bld-hosp-3', name: 'Green Valley Trauma Care', type: 'hospital', sector: 'Green Valley', position: [-26, 0, -18], floors: 8, beds: 120, availableBeds: 35, emergencyCapacity: 45, ambulances: 3, staff: 60, status: 'OPERATIONAL', icon: 'Cross' },
      { id: 'bld-hosp-4', name: 'Industrial Zone Triage Base', type: 'hospital', sector: 'Industrial Zone', position: [24, 0, 22], floors: 6, beds: 90, availableBeds: 18, emergencyCapacity: 82, ambulances: 5, staff: 48, status: 'OPERATIONAL', icon: 'Cross' },

      // 5 Schools / Universities
      { id: 'bld-sch-1', name: 'FutureTech STEM Academy', type: 'school', sector: 'Innovation District', position: [-10, 0, 18], floors: 7, students: 1450, airQualityIndex: 42, renewablePower: 88, status: 'IN_SESSION', icon: 'GraduationCap' },
      { id: 'bld-sch-2', name: 'Central Metropolitan Institute', type: 'school', sector: 'Central District', position: [14, 0, -6], floors: 9, students: 2200, airQualityIndex: 48, renewablePower: 75, status: 'IN_SESSION', icon: 'GraduationCap' },
      { id: 'bld-sch-3', name: 'Green Valley Eco-Polytechnic', type: 'school', sector: 'Green Valley', position: [-22, 0, -26], floors: 5, students: 890, airQualityIndex: 28, renewablePower: 100, status: 'IN_SESSION', icon: 'GraduationCap' },
      { id: 'bld-sch-4', name: 'Sector 2 Primary Smart School', type: 'school', sector: 'Sector 2', position: [2, 0, 24], floors: 4, students: 640, airQualityIndex: 38, renewablePower: 92, status: 'IN_SESSION', icon: 'GraduationCap' },
      { id: 'bld-sch-5', name: 'Aeronautics & Robotics Lab', type: 'school', sector: 'Innovation District', position: [-18, 0, 4], floors: 10, students: 1100, airQualityIndex: 35, renewablePower: 85, status: 'IN_SESSION', icon: 'GraduationCap' },

      // 3 Metro Stations
      { id: 'trn-metro-1', name: 'Grand Central Metro Hub', type: 'metro', sector: 'Central District', position: [0, 0, 0], lines: ['Hyperloop A', 'Blue Line', 'Red Line'], nextArrival: '1 min', crowdDensity: 'Moderate', platforms: 6, status: 'ONLINE', icon: 'Train' },
      { id: 'trn-metro-2', name: 'Innovation Skyway Terminal', type: 'metro', sector: 'Innovation District', position: [-12, 0, -2], lines: ['Blue Line', 'Express Orbit'], nextArrival: '3 min', crowdDensity: 'Low', platforms: 4, status: 'ONLINE', icon: 'Train' },
      { id: 'trn-metro-3', name: 'Industrial South Interchange', type: 'metro', sector: 'Industrial Zone', position: [20, 0, 14], lines: ['Red Line', 'Cargo Loop'], nextArrival: '4 min', crowdDensity: 'High', platforms: 4, status: 'ONLINE', icon: 'Train' },

      // 3 Parks
      { id: 'prk-1', name: 'Cybernetic Bio-Dome Park', type: 'park', sector: 'Central District', position: [4, 0, -4], area: '42 Hectares', treeCount: 14200, co2Absorption: '480 tons/yr', visitors: 1840, status: 'OPTIMAL', icon: 'Trees' },
      { id: 'prk-2', name: 'Green Valley Forest Sanctuary', type: 'park', sector: 'Green Valley', position: [-28, 0, -10], area: '110 Hectares', treeCount: 68000, co2Absorption: '2400 tons/yr', visitors: 620, status: 'OPTIMAL', icon: 'Trees' },
      { id: 'prk-3', name: 'Skyline Waterfront Promenade', type: 'park', sector: 'Innovation District', position: [-6, 0, 26], area: '28 Hectares', treeCount: 8400, co2Absorption: '290 tons/yr', visitors: 2450, status: 'OPTIMAL', icon: 'Trees' },

      // 2 Power Plants
      { id: 'pwr-1', name: 'Solaris Fusion & Photovoltaic Plant', type: 'power', sector: 'Innovation District', position: [-32, 0, 16], generation: '185 MW', consumption: '14 MW', efficiency: 97.4, status: 'STABLE', icon: 'Zap' },
      { id: 'pwr-2', name: 'Industrial Microgrid Generator', type: 'power', sector: 'Industrial Zone', position: [34, 0, 28], generation: '160 MW', consumption: '12 MW', efficiency: 92.8, status: 'STABLE', icon: 'Zap' },

      // 2 Water Facilities
      { id: 'wtr-1', name: 'Deep Horizon Aquifer & Reservoir', type: 'water', sector: 'Green Valley', position: [-34, 0, -28], capacity: '8.4M Liters', currentPurity: '99.1%', flowRate: '3,200 L/s', status: 'SECURE', icon: 'Droplets' },
      { id: 'wtr-2', name: 'Metro Advanced Recycling Plant', type: 'water', sector: 'Industrial Zone', position: [28, 0, 8], capacity: '4.2M Liters', currentPurity: '98.2%', flowRate: '1,800 L/s', status: 'SECURE', icon: 'Droplets' },

      // 2 Waste Facilities
      { id: 'wst-1', name: 'Plasma Arc Bio-Recycling Facility', type: 'waste', sector: 'Industrial Zone', position: [32, 0, -16], dailyThroughput: '850 Tons', recyclingRate: '94.2%', energyRecaptured: '18.4 MWh', status: 'ACTIVE', icon: 'Trash2' },
      { id: 'wst-2', name: 'Automated Sorting Center Beta', type: 'waste', sector: 'Sector 3', position: [18, 0, -28], dailyThroughput: '420 Tons', recyclingRate: '88.5%', energyRecaptured: '9.2 MWh', status: 'CAPACITY_WARNING', icon: 'Trash2' },

      // Skyscrapers & HQ Towers
      { id: 'bld-hq-1', name: 'FutureCity Apex Tower', type: 'skyscraper', sector: 'Central District', position: [0, 0, -16], floors: 64, occupancy: 88, powerUsage: '4.2 MW', structuralIntegrity: 98, status: 'NORMAL', icon: 'Building2' },
      { id: 'bld-hq-2', name: 'Quantum AI Research Spire', type: 'skyscraper', sector: 'Innovation District', position: [-12, 0, -14], floors: 52, occupancy: 92, powerUsage: '5.8 MW', structuralIntegrity: 99, status: 'NORMAL', icon: 'Building2' },
      { id: 'bld-hq-3', name: 'Orbital Logistics Complex', type: 'commercial', sector: 'Central District', position: [16, 0, 8], floors: 34, occupancy: 78, powerUsage: '3.1 MW', structuralIntegrity: 96, status: 'NORMAL', icon: 'Building2' },
      { id: 'bld-hq-4', name: 'Aurora Sky Residences', type: 'residential', sector: 'Sector 2', position: [12, 0, 20], floors: 42, occupancy: 95, powerUsage: '2.6 MW', structuralIntegrity: 97, status: 'NORMAL', icon: 'Building2' },
      { id: 'bld-hq-5', name: 'Verdant Eco-Towers', type: 'residential', sector: 'Green Valley', position: [-20, 0, -4], floors: 28, occupancy: 90, powerUsage: '1.2 MW', structuralIntegrity: 99, status: 'NORMAL', icon: 'Building2' },
      { id: 'bld-hq-6', name: 'Heavy Manufacturing Block Alpha', type: 'industrial', sector: 'Industrial Zone', position: [26, 0, -6], floors: 14, occupancy: 65, powerUsage: '8.4 MW', structuralIntegrity: 94, status: 'NORMAL', icon: 'Factory' },
      { id: 'bld-hq-7', name: 'Automated Drone Port & Hub', type: 'infrastructure', sector: 'Central District', position: [-2, 0, 14], floors: 18, droneFleet: 340, activeDeliveries: 94, status: 'ACTIVE', icon: 'Plane' }
    ];

    // 10 Major Roads
    this.roads = [
      { id: 'rd-01', name: 'Apex Central Boulevard', sector: 'Central District', lengthKm: 6.4, lanes: 6, vehiclesPerMin: 142, avgSpeed: 38, congestion: 'Moderate', color: '#ffaa00', status: 'Moderate' },
      { id: 'rd-02', name: 'Innovation Highway', sector: 'Innovation District', lengthKm: 8.2, lanes: 8, vehiclesPerMin: 98, avgSpeed: 64, congestion: 'Normal', color: '#00ff9d', status: 'Normal' },
      { id: 'rd-03', name: 'Industrial Heavy Freight Corridor', sector: 'Industrial Zone', lengthKm: 12.0, lanes: 4, vehiclesPerMin: 188, avgSpeed: 22, congestion: 'Congested', color: '#ff3344', status: 'Congested' },
      { id: 'rd-04', name: 'Green Valley Park Parkway', sector: 'Green Valley', lengthKm: 5.6, lanes: 4, vehiclesPerMin: 42, avgSpeed: 48, congestion: 'Normal', color: '#00ff9d', status: 'Normal' },
      { id: 'rd-05', name: 'Sector 3 Transit Expressway', sector: 'Sector 3', lengthKm: 7.1, lanes: 6, vehiclesPerMin: 176, avgSpeed: 26, congestion: 'Congested', color: '#ff3344', status: 'Congested' },
      { id: 'rd-06', name: 'Metro Loop Overpass (Bridge #12)', sector: 'Central District', lengthKm: 4.2, lanes: 4, vehiclesPerMin: 110, avgSpeed: 44, congestion: 'Moderate', color: '#ffaa00', status: 'Moderate' },
      { id: 'rd-07', name: 'Cyber Ring Skyway', sector: 'Metro District', lengthKm: 16.5, lanes: 6, vehiclesPerMin: 125, avgSpeed: 58, congestion: 'Moderate', color: '#ffaa00', status: 'Moderate' },
      { id: 'rd-08', name: 'Sub-Zero Tunnel Link', sector: 'Industrial Zone', lengthKm: 3.8, lanes: 4, vehiclesPerMin: 62, avgSpeed: 52, congestion: 'Normal', color: '#00ff9d', status: 'Normal' },
      { id: 'rd-09', name: 'Sector 2 Residential Arterial', sector: 'Sector 2', lengthKm: 4.8, lanes: 4, vehiclesPerMin: 74, avgSpeed: 40, congestion: 'Normal', color: '#00ff9d', status: 'Normal' },
      { id: 'rd-10', name: 'Bio-Corridor Avenue', sector: 'Green Valley', lengthKm: 5.2, lanes: 4, vehiclesPerMin: 36, avgSpeed: 50, congestion: 'Normal', color: '#00ff9d', status: 'Normal' }
    ];

    // 5 Traffic Junctions
    this.junctions = [
      { id: 'junc-07', name: 'Junction 07 - Central Intersection', sector: 'Central District', vehiclesPerMin: 128, avgSpeed: 24, congestion: 'HIGH', signalPhase: 'Green (32s)', aiRecommendation: 'Increase green signal duration by 8 seconds to alleviate northbound backlog.' },
      { id: 'junc-03', name: 'Junction 03 - Innovation Gate', sector: 'Innovation District', vehiclesPerMin: 72, avgSpeed: 48, congestion: 'LOW', signalPhase: 'Green (45s)', aiRecommendation: 'Current timing optimal. Maintain autonomous vehicle priority channel.' },
      { id: 'junc-11', name: 'Junction 11 - Freight Logistics Hub', sector: 'Industrial Zone', vehiclesPerMin: 164, avgSpeed: 18, congestion: 'CRITICAL', signalPhase: 'Amber (Cycle)', aiRecommendation: 'Reroute incoming heavy commercial cargo via Outer Loop bypass.' },
      { id: 'junc-02', name: 'Junction 02 - Valley Crossing', sector: 'Green Valley', vehiclesPerMin: 34, avgSpeed: 54, congestion: 'LOW', signalPhase: 'Adaptive', aiRecommendation: 'Eco-sensor synchronized. Low emissions priority enabled.' },
      { id: 'junc-09', name: 'Junction 09 - Terminal 1 Plaza', sector: 'Metro District', vehiclesPerMin: 96, avgSpeed: 34, congestion: 'MODERATE', signalPhase: 'Green (28s)', aiRecommendation: 'Sync pedestrian crossing pulse with Metro Arrival at T-minus 40 seconds.' }
    ];

    // Infrastructure Monitoring Nodes
    this.infrastructure = [
      { id: 'inf-brg-12', name: 'Bridge #12 (Apex Skyway)', type: 'Bridge', sector: 'Central District', health: 87, currentLoad: 62, lastInspection: '12 days ago', status: 'STABLE', vibrationIndex: '0.04g', strain: '18%' },
      { id: 'inf-tnl-04', name: 'Sub-Zero Tunnel Arterial', type: 'Tunnel', sector: 'Industrial Zone', health: 92, currentLoad: 48, lastInspection: '4 days ago', status: 'STABLE', vibrationIndex: '0.02g', strain: '12%' },
      { id: 'inf-grid-nv', name: 'High-Voltage Grid Interlink 4', type: 'Power Line', sector: 'Innovation District', health: 95, currentLoad: 74, lastInspection: '18 days ago', status: 'STABLE', vibrationIndex: 'N/A', strain: '24%' },
      { id: 'inf-wtr-v17', name: 'Main Sector 4 Water Trunk V-17', type: 'Pipeline', sector: 'Sector 4', health: 91, currentLoad: 68, lastInspection: '6 days ago', status: 'STABLE', vibrationIndex: '0.01g', strain: '15%' },
      { id: 'inf-sky-01', name: 'Central Monorail Guideway', type: 'Rail Infrastructure', sector: 'Central District', health: 94, currentLoad: 55, lastInspection: '2 days ago', status: 'STABLE', vibrationIndex: '0.03g', strain: '14%' }
    ];

    // Pre-seeded Incidents
    this.incidents = [
      {
        id: 'inc-901',
        title: 'Multi-Vehicle Collision',
        type: 'Traffic Accident',
        sector: 'Sector 7',
        location: 'Junction 07 & Apex Boulevard',
        severity: 'High', // Low, Medium, High, Critical
        time: '14:18',
        status: 'Dispatched', // Reported, Dispatched, Responding, Resolved
        nearestUnits: [
          { type: 'Police', unitId: 'P-104', distanceKm: 1.2, etaMin: 2 },
          { type: 'Ambulance', unitId: 'MED-06', distanceKm: 1.8, etaMin: 4 },
          { type: 'Fire Unit', unitId: 'ENG-02', distanceKm: 3.1, etaMin: 6 }
        ],
        dispatchedUnit: 'MED-06 & P-104',
        aiAssessment: 'Two autonomous pods impacted due to lane debris. Traffic backlog extending 400m. Emergency units en route.',
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      },
      {
        id: 'inc-902',
        title: 'Transformer Substation Overheat',
        type: 'Power Failure',
        sector: 'Industrial Zone',
        location: 'Substation B-14',
        severity: 'Medium',
        time: '13:52',
        status: 'Responding',
        nearestUnits: [
          { type: 'Grid Repair', unitId: 'PWR-12', distanceKm: 0.8, etaMin: 1 },
          { type: 'Fire Unit', unitId: 'ENG-05', distanceKm: 2.4, etaMin: 5 }
        ],
        dispatchedUnit: 'PWR-12',
        aiAssessment: 'Coolant circulation sensor tripped. Load automatically diverted to Solaris Substation A.',
        createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString()
      },
      {
        id: 'inc-903',
        title: 'Residential Smart Meter Water Surge',
        type: 'Flood',
        sector: 'Sector 4',
        location: 'Block C Residential Concourse',
        severity: 'Low',
        time: '12:30',
        status: 'Resolved',
        nearestUnits: [
          { type: 'Water Rapid Response', unitId: 'WTR-03', distanceKm: 2.1, etaMin: 5 }
        ],
        dispatchedUnit: 'WTR-03',
        aiAssessment: 'Secondary pressure valve calibrated. Flow stabilized at 42 L/min.',
        createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString()
      }
    ];

    // Pre-seeded Simulation History
    this.simulations = [
      {
        id: 'sim-101',
        title: 'Rapid Population Growth +20% & Vehicle Spike',
        parameters: {
          population: 20,
          cars: 15,
          factories: 5,
          rainfall: 0,
          solar: 10,
          publicTransport: 5,
          waterConsumption: 18,
          wasteGeneration: 22,
        },
        results: {
          traffic: { before: 68, after: 84, shift: 'worse', change: '+16%' },
          energy: { before: 92, after: 85, shift: 'stable', change: '-7%' },
          water: { before: 81, after: 72, shift: 'worse', change: '-9%' },
          waste: { before: 74, after: 88, shift: 'worse', change: '+14%' },
          airQuality: { before: 68, after: 56, shift: 'worse', change: '-12 AQI' },
          overallHealth: { before: 88, after: 77, shift: 'worse', change: '-11 pts' }
        },
        aiSummary: 'Population expansion coupled with a 15% increase in private autonomous vehicles created severe chokepoints along Sector 3 and Central District. Grid held stable through solar reserves, but waste processing reached near-capacity.',
        recommendations: [
          'Expand Hyperloop and autonomous electric bus fleet frequency by 35%.',
          'Deploy secondary plasma recycling compactor in Sector 3.',
          'Incentivize off-peak industrial power shifting.'
        ],
        createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
      },
      {
        id: 'sim-102',
        title: 'Green Grid Transition: Solar +30% & Public Transit +40%',
        parameters: {
          population: 0,
          cars: -20,
          factories: -10,
          rainfall: 15,
          solar: 30,
          publicTransport: 40,
          waterConsumption: -5,
          wasteGeneration: -10,
        },
        results: {
          traffic: { before: 68, after: 44, shift: 'better', change: '-24%' },
          energy: { before: 92, after: 98, shift: 'better', change: '+6%' },
          water: { before: 81, after: 88, shift: 'better', change: '+7%' },
          waste: { before: 74, after: 61, shift: 'better', change: '-13%' },
          airQuality: { before: 68, after: 86, shift: 'better', change: '+18 AQI' },
          overallHealth: { before: 88, after: 95, shift: 'better', change: '+7 pts' }
        },
        aiSummary: 'Aggressive expansion of renewable solar generation and transit network optimization reduced private vehicle congestion by 24% while cutting urban carbon emissions by 32%. City health score peaked at 95.',
        recommendations: [
          'Maintain high battery storage buffer during peak sunlight hours.',
          'Convert freed vehicular roadway space into micro-mobility and bio-canopy zones.'
        ],
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
      }
    ];

    // Live AI Insights
    this.aiInsights = [
      {
        id: 'ins-1',
        category: 'TRAFFIC',
        title: 'Traffic Density Fluctuation',
        message: 'Traffic congestion increased 18% in Sector 5 due to peak delivery window.',
        severity: 'warning',
        timestamp: 'Just now'
      },
      {
        id: 'ins-2',
        category: 'ENERGY',
        title: 'Renewable Generation Milestone',
        message: 'Renewable solar & wind generation currently covers 67% of total municipal demand.',
        severity: 'info',
        timestamp: '5m ago'
      },
      {
        id: 'ins-3',
        category: 'WASTE',
        title: 'Urgent Collection Required',
        message: 'Sector 3 Smart Bin Node 12 at 94% capacity. Automated route scheduled.',
        severity: 'alert',
        timestamp: '12m ago'
      },
      {
        id: 'ins-4',
        category: 'WATER',
        title: 'Distribution Optimization',
        message: 'Water consumption is within seasonal safe thresholds across all 8 sectors.',
        severity: 'success',
        timestamp: '25m ago'
      }
    ];
  }

  // Helper Methods
  getCitySummary() {
    return {
      simulatedTime: this.simulatedTime,
      weather: this.weather,
      telemetry: this.telemetry,
      activeIncidentsCount: this.incidents.filter(i => i.status !== 'Resolved').length,
      onlineSystemsCount: 12,
      totalBuildings: this.cityObjects.length,
      aiInsights: this.aiInsights
    };
  }

  updateTrafficDensity(density) {
    this.telemetry.traffic.densityControl = density;
    const factor = density / 50;
    this.telemetry.traffic.activeVehicles = Math.round(12000 * factor);
    this.telemetry.traffic.congestionPercent = Math.min(98, Math.round(50 * factor));
    this.telemetry.traffic.averageSpeed = Math.max(15, Math.round(60 / factor));
    this.telemetry.traffic.congestionLevel = 
      this.telemetry.traffic.congestionPercent > 75 ? 'Congested' :
      this.telemetry.traffic.congestionPercent > 50 ? 'Moderate' : 'Normal';
    
    // Update road statuses dynamically
    this.roads.forEach(r => {
      if (density > 75) {
        r.congestion = 'Congested';
        r.color = '#ff3344';
      } else if (density > 45) {
        r.congestion = 'Moderate';
        r.color = '#ffaa00';
      } else {
        r.congestion = 'Normal';
        r.color = '#00ff9d';
      }
    });

    return this.telemetry.traffic;
  }

  triggerWaterLeak() {
    this.telemetry.water.leakActive = true;
    this.telemetry.water.leakageRate = 82; // L/min
    this.telemetry.water.distributionEfficiency = 76.5;
    this.telemetry.water.status = 'Warning: Leak Detected';
    this.telemetry.water.activeLeakDetails = {
      location: 'Sector 4 - Trunk Pipeline V-17',
      lossRate: '82 L/min',
      detectedAt: new Date().toLocaleTimeString(),
      aiRecommendation: 'Close Valve V-17, Redirect secondary supply via Line B, Dispatch rapid maintenance unit.'
    };

    // Add alert insight
    this.aiInsights.unshift({
      id: 'ins-' + Date.now(),
      category: 'WATER',
      title: 'Pipeline Leak Detected',
      message: 'Critical leak detected in Sector 4 Trunk V-17 (82 L/min). Immediate valve isolation recommended.',
      severity: 'alert',
      timestamp: 'Just now'
    });

    return this.telemetry.water;
  }

  repairWaterLeak() {
    this.telemetry.water.leakActive = false;
    this.telemetry.water.leakageRate = 18;
    this.telemetry.water.distributionEfficiency = 94.2;
    this.telemetry.water.status = 'Normal';
    this.telemetry.water.activeLeakDetails = null;

    this.aiInsights.unshift({
      id: 'ins-' + Date.now(),
      category: 'WATER',
      title: 'Valve V-17 Isolated & Stabilized',
      message: 'Automated pressure balance restored. Leak safely mitigated with zero service downtime.',
      severity: 'success',
      timestamp: 'Just now'
    });

    return this.telemetry.water;
  }

  optimizeWasteRoute() {
    this.telemetry.waste.sectors['Sector 3'] = 45; // reduced from 94%
    this.telemetry.waste.optimizedRouteGenerated = true;
    this.telemetry.waste.status = 'Optimized';
    this.telemetry.waste.urgentPickups = [];

    this.aiInsights.unshift({
      id: 'ins-' + Date.now(),
      category: 'WASTE',
      title: 'Route Optimization Applied',
      message: 'Autonomous collection drones dispatched to Sector 3. Bin fill reduced to 45%.',
      severity: 'success',
      timestamp: 'Just now'
    });

    return this.telemetry.waste;
  }

  createIncident(data) {
    const newIncident = {
      id: 'inc-' + (900 + this.incidents.length + 1),
      title: data.title || 'Emergency Alert',
      type: data.type || 'Traffic Accident',
      sector: data.sector || 'Sector 1',
      location: data.location || `${data.sector || 'Sector 1'} Central Corridor`,
      severity: data.severity || 'Medium',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Reported',
      nearestUnits: [
        { type: 'Police', unitId: 'P-' + Math.floor(100 + Math.random() * 900), distanceKm: 1.4, etaMin: 3 },
        { type: 'Ambulance', unitId: 'MED-0' + Math.floor(1 + Math.random() * 9), distanceKm: 2.1, etaMin: 4 },
        { type: 'Fire Unit', unitId: 'ENG-0' + Math.floor(1 + Math.random() * 9), distanceKm: 3.5, etaMin: 7 }
      ],
      dispatchedUnit: null,
      aiAssessment: `Sensor correlation confirms incident at ${data.sector}. Emergency corridors cleared for rapid transit.`,
      createdAt: new Date().toISOString()
    };
    this.incidents.unshift(newIncident);
    return newIncident;
  }

  dispatchUnit(id, unitId) {
    const inc = this.incidents.find(i => i.id === id);
    if (!inc) return null;
    inc.status = 'Dispatched';
    inc.dispatchedUnit = unitId || inc.nearestUnits[0].unitId;
    return inc;
  }

  updateIncidentStatus(id, status) {
    const inc = this.incidents.find(i => i.id === id);
    if (!inc) return null;
    inc.status = status;
    return inc;
  }

  applyCityOptimization() {
    this.telemetry.cityHealth = 95;
    this.telemetry.scores.traffic = 91;
    this.telemetry.scores.energy = 98;
    this.telemetry.scores.water = 94;
    this.telemetry.scores.waste = 92;
    this.telemetry.traffic.congestionPercent = 42;
    this.telemetry.traffic.congestionLevel = 'Normal';
    this.telemetry.energy.renewablePercent = 78;
    this.telemetry.energy.gridStability = 99;

    this.aiInsights.unshift({
      id: 'ins-' + Date.now(),
      category: 'AI OPTIMIZATION',
      title: 'City-Wide Optimization Active',
      message: 'Adaptive signals synchronized, renewable battery buffers routed, and smart collection engaged.',
      severity: 'success',
      timestamp: 'Just now'
    });

    return this.getCitySummary();
  }
}

export const cityStore = new CityStore();
