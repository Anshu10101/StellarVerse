interface APODResponse {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  date: string;
  copyright?: string;
}

// Use environment variable or fallback to DEMO_KEY
const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';

export async function getNasaAPOD(): Promise<APODResponse> {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'StellarVerse/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch NASA APOD');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching NASA APOD:', error);
    throw error;
  }
} 