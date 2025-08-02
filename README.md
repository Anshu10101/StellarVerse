# StellarVerse - Space Exploration & Astronomy Hub

A comprehensive space exploration and astronomy web application that combines real-time space data, historical events, and interactive features.

## 🌟 Features

### 🚀 Enhanced Events System
- **Historical Space Events**: Displays events from Wikipedia's "On This Day" API filtered for space-related content
- **NASA APOD Integration**: Shows historical Astronomy Pictures of the Day for the selected date across multiple years
- **Tabbed Navigation**: Switch between "All Events", "Wikipedia Events", and "NASA APOD" views
- **Interactive Cards**: Each event card includes:
  - Year badges and descriptions
  - Wikipedia links for historical events
  - High-resolution NASA images for APOD events
  - Text-to-speech functionality
  - Hover animations and visual effects

### 📅 Calendar Integration
- **Date Picker**: Select any date to view historical space events
- **Real-time Updates**: Events update automatically when date changes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🛰️ Space Data Integration
- **NASA APOD**: Daily astronomy pictures with detailed explanations
- **Space Weather**: Real-time solar activity and space weather data
- **Historical Events**: Wikipedia-based space history events
- **Interactive Features**: Speech synthesis, animations, and responsive UI

### 🎨 Modern UI/UX
- **Space-themed Design**: Dark theme with cosmic gradients and animations
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Optimized for all screen sizes
- **Accessibility**: Text-to-speech and keyboard navigation support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd StellarVerse

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your NASA API key to .env.local
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key_here

# Run the development server
npm run dev
```

### NASA API Key
To enable NASA APOD features, get a free API key from:
https://api.nasa.gov/

## 📁 Project Structure

```
StellarVerse/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── calendar/          # Calendar page with date picker
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── Events/            # Events system components
│   │   │   ├── HistoricalEvents.tsx    # Main events container
│   │   │   ├── EventCard.tsx          # Wikipedia events card
│   │   │   └── NASAEventCard.tsx      # NASA APOD events card
│   │   ├── Calendar/          # Date picker components
│   │   ├── NASA/              # NASA API components
│   │   └── Weather/           # Space weather components
│   ├── services/
│   │   ├── eventService.ts    # Events API integration
│   │   ├── nasaService.ts     # NASA API integration
│   │   └── spaceWeatherService.ts
│   └── utils/                 # Utility functions
```

## 🔧 API Integrations

### Events System
- **Wikipedia API**: Fetches historical events filtered for space-related content
- **NASA APOD API**: Retrieves historical astronomy pictures for specific dates
- **Fallback System**: Mock data when APIs are unavailable

### Data Sources
- **Wikipedia On This Day**: Historical space events
- **NASA APOD**: Astronomy pictures with explanations
- **Space Weather**: Solar activity and space weather data

## 🎯 Key Features

### Events Display
- **Dual Source**: Combines Wikipedia events with NASA APOD data
- **Smart Filtering**: Automatically filters for space-related content
- **Rich Media**: High-resolution images from NASA APOD
- **Interactive Elements**: Speech synthesis, external links, hover effects

### Calendar Functionality
- **Date Selection**: Pick any date to view historical events
- **Real-time Updates**: Events refresh when date changes
- **Smooth Transitions**: Animated transitions between dates

### User Experience
- **Tabbed Interface**: Switch between different event types
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful fallbacks when APIs fail
- **Accessibility**: Screen reader support and keyboard navigation

## 🛠️ Technologies Used

- **Next.js 14**: React framework with app router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **NASA APIs**: APOD and space data
- **Wikipedia API**: Historical events data

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Touch interfaces

## 🎨 Customization

### Styling
- Space-themed dark color scheme
- Cosmic gradients and animations
- Custom CSS variables for easy theming

### Components
- Modular component architecture
- Reusable UI components
- Custom hooks for data fetching

## 🚀 Deployment

The application can be deployed to:
- Vercel (recommended)
- Netlify
- Any static hosting service

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- NASA for their Open APIs
- Space Weather Prediction Center
- Wikipedia for historical events data
- All contributors and space enthusiasts

---
Built with 💫 by [Anshul Yadav] for space enthusiasts everywhere
