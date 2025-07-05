export interface SpaceWeatherAlert {
  messageType: string;
  messageID: string;
  issueTime: string;
  message: string;
  severity: 'Minor' | 'Moderate' | 'Strong' | 'Severe' | 'Extreme';
}

export interface SolarWind {
  speed: number; // km/s
  density: number; // n/cm^3
  temperature: number; // K
  timestamp: string;
}

export interface GeomagneticActivity {
  kpIndex: number; // 0-9 scale
  timestamp: string;
}

export interface SolarActivity {
  xrayFlux: number;
  flareClass: string;
  sunspotNumber: number;
  timestamp: string;
}

export interface SpaceWeatherData {
  solarWind: SolarWind;
  geomagneticActivity: GeomagneticActivity;
  solarActivity: SolarActivity;
  alerts: SpaceWeatherAlert[];
  lastUpdated: string;
}

export type SpaceWeatherStatus = 'quiet' | 'active' | 'storm' | 'severe';

export interface SpaceWeatherState extends SpaceWeatherData {
  isLoading: boolean;
  error: string | null;
  status: SpaceWeatherStatus;
} 