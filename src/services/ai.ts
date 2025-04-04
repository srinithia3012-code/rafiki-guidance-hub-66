
import OpenAI from 'openai';

// Define types for messages
export type ChatMessage = {
  role: 'user' | 'model';
  content: string;
};

export type GuidanceCategory = "general" | "career" | "academic" | "wellbeing" | "stress_management" | "mental_health";

// Initialize OpenAI client (replace with your actual API key)
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // remove this line in production
});

// Mock API response type
type MockApiResponse = {
  response: string;
  sources?: string[];
};

// Function to send message to AI and get response
export const sendMessageToAI = async (message: string, category: GuidanceCategory = "general", chatHistory: ChatMessage[] = []) => {
  try {
    const controller = new AbortController();
    
    // Set a timeout to abort the request if it takes too long
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 30000); // 30 seconds timeout
    
    // In development, use the local mock API
    if (import.meta.env.MODE === 'development' || import.meta.env.MODE === 'preview') {
      // Determine which mock API endpoint to use based on category
      const endpoint = category !== 'general' 
        ? `/api/chat-${category}.json`
        : '/api/chat.json';
      
      try {
        const response = await fetch(endpoint, { 
          signal: controller.signal
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch from mock API');
        }
        
        const data = await response.json();
        clearTimeout(timeoutId);
        
        return {
          text: data.response || "I'm sorry, I don't have an answer for that.",
          sourceLinks: data.sources || []
        };
      } catch (error: any) {
        clearTimeout(timeoutId);
        console.error('Error fetching from mock API:', error);
        throw new Error(error.message || 'Failed to get AI response');
      }
    } else {
      // In production, we would use a real API
      console.log('Production AI call with message:', message);
      console.log('Category:', category);
      console.log('Chat history length:', chatHistory.length);
      
      // Simulating a production response for now
      clearTimeout(timeoutId);
      return {
        text: "This is a simulated AI response. In production, this would come from an actual AI service.",
        sourceLinks: []
      };
    }
  } catch (error: any) {
    console.error('Error in AI service:', error);
    throw new Error(error?.message || 'Failed to get AI response');
  }
};

// Sentiment Analysis function
export const analyzeSentiment = async (text: string) => {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Analyze the sentiment of the following text and provide a sentiment label (positive, negative, or neutral) and a score between -1 and 1:\n\n${text}\n\nSentiment:`,
      max_tokens: 50,
      temperature: 0.5,
    });

    const result = response.choices[0].text?.trim();
    if (!result) {
      throw new Error("Could not determine sentiment.");
    }

    const [sentiment, scoreStr] = result.split(",").map((s) => s.trim());
    const score = parseFloat(scoreStr);

    return {
      sentiment: sentiment.toLowerCase(),
      score,
    };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return {
      sentiment: "neutral",
      score: 0,
    };
  }
};

// New function to get wellness resources based on sentiment
export const getWellnessResources = async (sentiment: string) => {
  // This is a mock function that returns resources based on sentiment
  // In a real application, this would fetch from a database or API
  
  const positiveResources = [
    { title: "Maintaining Positive Mental Health", link: "/resources/positive-mental-health" },
    { title: "Gratitude Practices", link: "/resources/gratitude" },
    { title: "Mindfulness for Daily Life", link: "/resources/mindfulness" }
  ];
  
  const neutralResources = [
    { title: "Stress Management Techniques", link: "/resources/stress-management" },
    { title: "Understanding Your Emotions", link: "/resources/emotional-awareness" },
    { title: "Building Resilience", link: "/resources/resilience" }
  ];
  
  const negativeResources = [
    { title: "Coping with Difficult Emotions", link: "/resources/coping-strategies" },
    { title: "Self-Care During Hard Times", link: "/resources/self-care" },
    { title: "When to Seek Professional Help", link: "/resources/professional-help" },
    { title: "Crisis Support Resources", link: "/resources/crisis-support" }
  ];
  
  switch (sentiment) {
    case "positive":
      return positiveResources;
    case "neutral":
      return neutralResources;
    case "negative":
      return negativeResources;
    default:
      return neutralResources;
  }
};
