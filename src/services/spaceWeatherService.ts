import type {
  SpaceWeatherData,
  SpaceWeatherStatus,
  SpaceWeatherState
} from '@/types/spaceWeather';

const NOAA_BASE_URL = 'https://services.swpc.noaa.gov/json';

// Helper function to determine overall space weather status
function determineWeatherStatus(data: SpaceWeatherData): SpaceWeatherStatus {
  const { kpIndex } = data.geomagneticActivity;
  const hasActiveAlerts = data.alerts.length > 0;
  
  if (kpIndex >= 7 || hasActiveAlerts) {
    return 'severe';
  } else if (kpIndex >= 5) {
    return 'storm';
  } else if (kpIndex >= 3) {
    return 'active';
  }
  return 'quiet';
}

// Helper to format the timestamp
function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC'
  }) + ' UTC';
}

export async function fetchSpaceWeather(): Promise<SpaceWeatherState> {
  try {
    // Fetch data from multiple NOAA endpoints in parallel
    const [solarWindRes, kpIndexRes, alertsRes, solarActivityRes] = await Promise.all([
      fetch(`${NOAA_BASE_URL}/solar-wind/mag-2-day.json`),
      fetch(`${NOAA_BASE_URL}/planetary-k-index-dst.json`),
      fetch(`${NOAA_BASE_URL}/alerts.json`),
      fetch(`${NOAA_BASE_URL}/goes/primary/xrays-6-hour.json`)
    ]);

    // Process solar wind data
    const solarWindData = await solarWindRes.json();
    const latestSolarWind = solarWindData[solarWindData.length - 1];
    
    // Process Kp index data
    const kpIndexData = await kpIndexRes.json();
    const latestKp = kpIndexData[kpIndexData.length - 1];
    
    // Process alerts
    const alertsData = await alertsRes.json();
    
    // Process solar activity data
    const solarActivityData = await solarActivityRes.json();
    const latestSolarActivity = solarActivityData[solarActivityData.length - 1];

    const weatherData: SpaceWeatherData = {
      solarWind: {
        speed: latestSolarWind.speed || 0,
        density: latestSolarWind.density || 0,
        temperature: latestSolarWind.temperature || 0,
        timestamp: latestSolarWind.time_tag
      },
      geomagneticActivity: {
        kpIndex: latestKp.kp_index || 0,
        timestamp: latestKp.time_tag
      },
      solarActivity: {
        xrayFlux: latestSolarActivity.flux || 0,
        flareClass: latestSolarActivity.class || 'N/A',
        sunspotNumber: latestSolarActivity.ssn || 0,
        timestamp: latestSolarActivity.time_tag
      },
      alerts: alertsData.map((alert: any) => ({
        messageType: alert.messageType,
        messageID: alert.messageID,
        issueTime: formatTimestamp(alert.issueTime),
        message: alert.message,
        severity: alert.severity
      })),
      lastUpdated: new Date().toISOString()
    };

    return {
      ...weatherData,
      isLoading: false,
      error: null,
      status: determineWeatherStatus(weatherData)
    };

  } catch (error) {
    console.error('Error fetching space weather data:', error);
    return {
      solarWind: {
        speed: 0,
        density: 0,
        temperature: 0,
        timestamp: ''
      },
      geomagneticActivity: {
        kpIndex: 0,
        timestamp: ''
      },
      solarActivity: {
        xrayFlux: 0,
        flareClass: 'N/A',
        sunspotNumber: 0,
        timestamp: ''
      },
      alerts: [],
      lastUpdated: new Date().toISOString(),
      isLoading: false,
      error: 'Failed to fetch space weather data',
      status: 'quiet'
    };
  }
}

// Function to determine if conditions warrant a notification
export function shouldNotifyWeatherConditions(data: SpaceWeatherData): boolean {
  return data.geomagneticActivity.kpIndex >= 5 || data.alerts.length > 0;
} 