interface WikiEvent {
  year: number;
  description: string;
  links?: {
    title: string;
    url: string;
  }[];
}

interface NASAEvent {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
}

// Define data source types for clarity
export type DataSourceType = 'space_events_today' | 'mock_space_events' | 'general_events_today' | 'nasa_apod_events';

interface EventResponse {
  date: string;
  events: WikiEvent[];
  nasaEvents: NASAEvent[];
  loading: boolean;
  error: string | null;
  dataSource: DataSourceType;
}

// Space-related keywords categorized for better filtering
const spaceKeywords = {
  celestialBodies: [
    "planet", "moon", "star", "galaxy", "asteroid", "comet", "meteor", "nebula",
    "supernova", "constellation", "black hole", "pulsar", "quasar", "mars", "venus",
    "jupiter", "saturn", "uranus", "neptune", "pluto", "mercury", "sun", "solar",
    "lunar", "eclipse"
  ],
  spaceExploration: [
    "nasa", "esa", "spacex", "space shuttle", "spacecraft", "satellite", "orbit",
    "astronaut", "cosmonaut", "space station", "iss", "international space station",
    "launch", "rocket", "mission", "space program", "space flight", "space walk",
    "space probe", "rover", "lander", "apollo", "gemini", "mercury program",
    "voyager", "hubble", "telescope", "observatory", "space telescope"
  ],
  spaceScience: [
    "astronomy", "astrophysics", "cosmology", "space research", "astronomical",
    "celestial", "cosmic", "cosmos", "universe", "galaxy", "deep space",
    "interstellar", "planetary", "exoplanet", "space discovery"
  ]
};

// Fallback mock data for space-related historical events
const mockSpaceEvents: WikiEvent[] = [
  {
    year: 1969,
    description: "Apollo 11 astronauts Neil Armstrong and Edwin 'Buzz' Aldrin became the first humans to land on the Moon.",
    links: [
      { title: "Apollo 11", url: "https://en.wikipedia.org/wiki/Apollo_11" },
      { title: "Neil Armstrong", url: "https://en.wikipedia.org/wiki/Neil_Armstrong" }
    ]
  },
  {
    year: 1957,
    description: "The Soviet Union launched Sputnik 1, the first artificial satellite to orbit Earth, beginning the Space Age.",
    links: [
      { title: "Sputnik 1", url: "https://en.wikipedia.org/wiki/Sputnik_1" },
      { title: "Space Age", url: "https://en.wikipedia.org/wiki/Space_Age" }
    ]
  },
  {
    year: 1990,
    description: "The Hubble Space Telescope was deployed from Space Shuttle Discovery, revolutionizing astronomy with its deep space observations.",
    links: [
      { title: "Hubble Space Telescope", url: "https://en.wikipedia.org/wiki/Hubble_Space_Telescope" }
    ]
  },
  {
    year: 1997,
    description: "NASA's Mars Pathfinder mission landed on Mars, delivering the Sojourner rover, the first rover to operate on the Red Planet.",
    links: [
      { title: "Mars Pathfinder", url: "https://en.wikipedia.org/wiki/Mars_Pathfinder" },
      { title: "Sojourner (rover)", url: "https://en.wikipedia.org/wiki/Sojourner_(rover)" }
    ]
  },
  {
    year: 1961,
    description: "Yuri Gagarin became the first human to journey into outer space, completing one orbit of Earth aboard the Vostok 1 spacecraft.",
    links: [
      { title: "Yuri Gagarin", url: "https://en.wikipedia.org/wiki/Yuri_Gagarin" },
      { title: "Vostok 1", url: "https://en.wikipedia.org/wiki/Vostok_1" }
    ]
  }
];

// NASA API configuration
const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';

// Function to check if text contains any of the space-related keywords
function isSpaceRelated(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  // Check each category of keywords
  for (const category of Object.values(spaceKeywords)) {
    for (const keyword of category) {
      // Use word boundaries to avoid partial matches
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(lowerText)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Fetches historical NASA APOD data for the current date across different years
 */
async function getHistoricalNASAEvents(date: Date = new Date()): Promise<NASAEvent[]> {
  const nasaEvents: NASAEvent[] = [];
  const currentYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Get APOD data for the current date from the last 10 years
  const yearsToFetch = Array.from({ length: 10 }, (_, i) => currentYear - i - 1);
  
  try {
    console.log(`Fetching NASA APOD events for ${month}/${day} across ${yearsToFetch.length} years`);
    
    const promises = yearsToFetch.map(async (year) => {
      try {
        const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const url = `https://api.nasa.gov/planetary/apod?date=${dateString}&api_key=${NASA_API_KEY}`;
        
        console.log(`Fetching NASA APOD for ${dateString}`);
        
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'StellarVerse/1.0'
          }
        });

        if (!response.ok) {
          console.warn(`Failed to fetch NASA APOD for ${year}: ${response.status} ${response.statusText}`);
          return null;
        }

        const data = await response.json();
        
        // Only include image type APODs
        if (data.media_type === 'image') {
          return {
            ...data,
            date: dateString
          };
        }
        
        return null;
      } catch (error) {
        console.error(`Error fetching NASA APOD for ${year}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const validResults = results.filter(result => result !== null) as NASAEvent[];
    
    console.log(`Successfully fetched ${validResults.length} NASA APOD events`);
    return validResults;
  } catch (error) {
    console.error('Error fetching historical NASA events:', error);
    return [];
  }
}

/**
 * Fetches astronomical events that occurred on a specific date in history
 * from the Wikipedia API and NASA APOD API, with fallback to mock data if the API calls fail
 */
export async function getHistoricalAstronomyEvents(date: Date = new Date()): Promise<EventResponse> {
  try {
    const month = date.getMonth() + 1; // JavaScript months are 0-based
    const day = date.getDate();
    
    // Format date for display
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Fetch both Wikipedia events and NASA APOD events in parallel
    const [wikiEvents, nasaEvents] = await Promise.allSettled([
      fetchWikipediaEvents(month, day),
      getHistoricalNASAEvents(date)
    ]);
    
    let events: WikiEvent[] = [];
    let dataSource: DataSourceType = 'mock_space_events';
    
    // Process Wikipedia events
    if (wikiEvents.status === 'fulfilled' && wikiEvents.value.length > 0) {
      events = wikiEvents.value;
      dataSource = 'space_events_today';
    } else {
      events = mockSpaceEvents;
      dataSource = 'mock_space_events';
    }
    
    // Process NASA events
    const nasaEventList = nasaEvents.status === 'fulfilled' ? nasaEvents.value : [];
    
    return {
      date: formattedDate,
      events,
      nasaEvents: nasaEventList,
      loading: false,
      error: null,
      dataSource
    };
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      date: new Date().toLocaleDateString(),
      events: mockSpaceEvents,
      nasaEvents: [],
      loading: false,
      error: null,
      dataSource: 'mock_space_events'
    };
  }
}

/**
 * Fetches Wikipedia events for a specific date
 */
async function fetchWikipediaEvents(month: number, day: number): Promise<WikiEvent[]> {
  try {
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month}/${day}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'StellarVerse/1.0 (education project)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Filter events related to astronomy using strict keyword matching
    const astronomyEvents = data.events
      .filter((event: any) => isSpaceRelated(event.text))
      .map((event: any) => ({
        year: event.year,
        description: event.text,
        links: event.pages?.map((page: any) => ({
          title: page.normalizedtitle || page.title,
          url: page.content_urls?.desktop?.page || ""
        })) || []
      }));
    
    return astronomyEvents;
  } catch (error) {
    console.error('Error fetching Wikipedia events:', error);
    return [];
  }
} 