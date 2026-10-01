export const getTrafficAnalytics = async (req, res) => {
  try {
    const hourlyData = [
      { time: '00:00', vehicles: 4200, avgSpeed: 58, congestion: 18 },
      { time: '02:00', vehicles: 2100, avgSpeed: 64, congestion: 10 },
      { time: '04:00', vehicles: 3100, avgSpeed: 62, congestion: 14 },
      { time: '06:00', vehicles: 8900, avgSpeed: 48, congestion: 42 },
      { time: '08:00', vehicles: 16800, avgSpeed: 28, congestion: 82 },
      { time: '10:00', vehicles: 13400, avgSpeed: 38, congestion: 64 },
      { time: '12:00', vehicles: 14200, avgSpeed: 36, congestion: 68 },
      { time: '14:00', vehicles: 13900, avgSpeed: 40, congestion: 62 },
      { time: '16:00', vehicles: 15400, avgSpeed: 32, congestion: 76 },
      { time: '18:00', vehicles: 18200, avgSpeed: 24, congestion: 88 },
      { time: '20:00', vehicles: 12100, avgSpeed: 44, congestion: 52 },
      { time: '22:00', vehicles: 7600, avgSpeed: 54, congestion: 28 },
    ];

    res.json({
      success: true,
      data: hourlyData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEnergyAnalytics = async (req, res) => {
  try {
    const hourlyEnergy = [
      { time: '00:00', solar: 0, wind: 92, fossil: 120, totalDemand: 212 },
      { time: '03:00', solar: 0, wind: 98, fossil: 105, totalDemand: 203 },
      { time: '06:00', solar: 24, wind: 85, fossil: 130, totalDemand: 239 },
      { time: '09:00', solar: 110, wind: 82, fossil: 115, totalDemand: 307 },
      { time: '12:00', solar: 185, wind: 74, fossil: 95, totalDemand: 354 },
      { time: '15:00', solar: 160, wind: 80, fossil: 100, totalDemand: 340 },
      { time: '18:00', solar: 65, wind: 92, fossil: 140, totalDemand: 297 },
      { time: '21:00', solar: 0, wind: 104, fossil: 150, totalDemand: 254 },
    ];

    res.json({
      success: true,
      data: hourlyEnergy
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEnvironmentAnalytics = async (req, res) => {
  try {
    const envTrends = [
      { day: 'Mon', aqi: 72, co2: 418, temp: 23, greenCanopy: 44 },
      { day: 'Tue', aqi: 68, co2: 415, temp: 25, greenCanopy: 44 },
      { day: 'Wed', aqi: 64, co2: 412, temp: 26, greenCanopy: 44 },
      { day: 'Thu', aqi: 78, co2: 422, temp: 28, greenCanopy: 44 },
      { day: 'Fri', aqi: 82, co2: 428, temp: 27, greenCanopy: 44 },
      { day: 'Sat', aqi: 58, co2: 405, temp: 24, greenCanopy: 44 },
      { day: 'Sun', aqi: 52, co2: 398, temp: 23, greenCanopy: 44 },
    ];

    res.json({
      success: true,
      data: envTrends
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
