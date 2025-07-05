interface WikiEvent {
  year: number;
  description: string;
  links?: {
    title: string;
    url: string;
  }[];
}

// Define data source types for clarity
export type DataSourceType = 'space_events_today' | 'mock_space_events';

interface EventResponse {
  date: string;
  events: WikiEvent[];
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
 * Fetches astronomical events that occurred on a specific date in history
 * from the Wikipedia API, with fallback to mock data if the API call fails
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
      
      // If no astronomy events found, use mock data instead of general events
      if (astronomyEvents.length === 0) {
        return {
          date: formattedDate,
          events: mockSpaceEvents,
          loading: false,
          error: null,
          dataSource: 'mock_space_events'
        };
      }
      
      return {
        date: formattedDate,
        events: astronomyEvents,
        loading: false,
        error: null,
        dataSource: 'space_events_today'
      };
      
    } catch (apiError) {
      console.error('Error fetching from Wikipedia API, using mock data:', apiError);
      
      // Return mock data when API fails
      return {
        date: formattedDate,
        events: mockSpaceEvents,
        loading: false,
        error: null,
        dataSource: 'mock_space_events'
      };
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      date: new Date().toLocaleDateString(),
      events: mockSpaceEvents,
      loading: false,
      error: null,
      dataSource: 'mock_space_events'
    };
  }
} 