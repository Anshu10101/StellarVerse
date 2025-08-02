import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Space Journey - Timeline of Space Exploration | StellarVerse",
  description: "Explore the incredible milestones of human space exploration through an interactive timeline. From Sputnik to Artemis, discover the key moments that shaped our journey into space.",
  keywords: [
    "space journey",
    "space exploration timeline",
    "space history",
    "NASA missions",
    "space milestones",
    "astronomy timeline",
    "space technology",
    "space missions",
    "space exploration history",
    "stellarverse"
  ],
  openGraph: {
    title: "Space Journey - Timeline of Space Exploration | StellarVerse",
    description: "Explore the incredible milestones of human space exploration through an interactive timeline. From Sputnik to Artemis, discover the key moments that shaped our journey into space.",
    type: "website",
    url: "https://stellarverse.vercel.app/journey",
    images: [
      {
        url: "/demo.png",
        width: 1200,
        height: 630,
        alt: "Space Journey Timeline - StellarVerse"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Journey - Timeline of Space Exploration | StellarVerse",
    description: "Explore the incredible milestones of human space exploration through an interactive timeline.",
    images: ["/demo.png"]
  }
}; 