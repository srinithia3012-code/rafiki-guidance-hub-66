
import { toast } from "sonner";

// NASA API types
export interface NasaApodResponse {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

const NASA_API_KEY = "yIKAB1Kq2F6YnYiaRdSCDu0cG3GAyvhHNgiRoawl";

/**
 * Fetches the Astronomy Picture of the Day from NASA's API
 */
export const getNasaApod = async (): Promise<NasaApodResponse | null> => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    
    const data: NasaApodResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch NASA APOD:", error);
    toast.error("Could not load space imagery");
    return null;
  }
};

// Mindfulness prompts to pair with space imagery
export const spaceMindfulnessPrompts = [
  "Take a deep breath as you gaze into the vastness of space.",
  "Imagine yourself floating peacefully among the stars.",
  "Let the cosmic perspective help you see beyond daily worries.",
  "Feel yourself expanding with the universe, limitless and free.",
  "As you observe this celestial view, let your earthly concerns fade away.",
  "Find peace in the quiet beauty of the cosmos.",
  "Breathe in stardust, breathe out tension.",
  "Let the vastness of space remind you how small our problems truly are.",
  "Focus on the infinite possibilities that exist, just like the countless stars.",
  "Ground yourself in this moment while gazing at the boundless universe."
];

// Get a random mindfulness prompt
export const getRandomSpacePrompt = (): string => {
  const randomIndex = Math.floor(Math.random() * spaceMindfulnessPrompts.length);
  return spaceMindfulnessPrompts[randomIndex];
};
