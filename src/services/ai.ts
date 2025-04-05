
import OpenAI from 'openai';

// Define types for messages
export type ChatMessage = {
  role: 'user' | 'model';
  content: string;
};

export type GuidanceCategory = "general" | "career" | "academic" | "wellbeing" | "stress_management" | "mental_health";

// Initialize OpenAI client with safety checks
let openai: OpenAI | null = null;

try {
  // Only initialize OpenAI if API key is available
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (apiKey) {
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // remove this line in production
    });
  } else {
    console.warn('OpenAI API Key not found. Sentiment analysis will use fallback mode.');
  }
} catch (error) {
  console.error('Error initializing OpenAI client:', error);
}

// Simple in-memory cache for AI responses
const responseCache = new Map<string, {text: string, timestamp: number, sourceLinks: string[]}>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour cache lifetime

// Function to send message to AI and get response
export const sendMessageToAI = async (message: string, category: GuidanceCategory = "general", chatHistory: ChatMessage[] = []) => {
  try {
    const controller = new AbortController();
    
    // Set a timeout to abort the request if it takes too long
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 30000); // 30 seconds timeout
    
    // Create a cache key based on message, category and chat history length
    const cacheKey = `${message}-${category}-${chatHistory.length}`;
    
    // Check if we have a cached response that's not expired
    if (responseCache.has(cacheKey)) {
      const cachedResponse = responseCache.get(cacheKey)!;
      if (Date.now() - cachedResponse.timestamp < CACHE_TTL) {
        clearTimeout(timeoutId);
        console.log('Using cached AI response');
        return {
          text: cachedResponse.text,
          sourceLinks: cachedResponse.sourceLinks
        };
      }
    }
    
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
        
        // Cache the response
        responseCache.set(cacheKey, {
          text: data.response || "I'm sorry, I don't have an answer for that.",
          sourceLinks: data.sources || [],
          timestamp: Date.now()
        });
        
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
      
      // Cache the simulated response
      const simulatedResponse = {
        text: "This is a simulated AI response. In production, this would come from an actual AI service.",
        sourceLinks: []
      };
      
      responseCache.set(cacheKey, {
        ...simulatedResponse,
        timestamp: Date.now()
      });
      
      return simulatedResponse;
    }
  } catch (error: any) {
    console.error('Error in AI service:', error);
    throw new Error(error?.message || 'Failed to get AI response');
  }
};

// Simple in-memory cache for sentiment analysis
const sentimentCache = new Map<string, {sentiment: string, score: number, timestamp: number}>();

// Sentiment Analysis function with fallback
export const analyzeSentiment = async (text: string) => {
  try {
    // Check if we have a cached sentiment analysis
    const cacheKey = text.toLowerCase().trim();
    if (sentimentCache.has(cacheKey)) {
      const cachedResult = sentimentCache.get(cacheKey)!;
      if (Date.now() - cachedResult.timestamp < CACHE_TTL) {
        console.log('Using cached sentiment analysis');
        return {
          sentiment: cachedResult.sentiment,
          score: cachedResult.score
        };
      }
    }
  
    // If OpenAI client is available, use it for sentiment analysis
    if (openai) {
      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Analyze the sentiment of the following text and provide a sentiment label (positive, negative, or neutral) and a score between -1 and 1:\n\n${text}\n\nSentiment:`,
        max_tokens: 50,
        temperature: 0.5,
      });

      const result = response.choices[0].text?.trim();
      if (!result) {
        return getFallbackSentiment(text);
      }

      const [sentiment, scoreStr] = result.split(",").map((s) => s.trim());
      const score = parseFloat(scoreStr);

      // Cache the result
      sentimentCache.set(cacheKey, {
        sentiment: sentiment.toLowerCase(),
        score,
        timestamp: Date.now()
      });

      return {
        sentiment: sentiment.toLowerCase(),
        score,
      };
    } else {
      // Use fallback if OpenAI client is not available
      const fallbackResult = getFallbackSentiment(text);
      
      // Cache the fallback result
      sentimentCache.set(cacheKey, {
        ...fallbackResult,
        timestamp: Date.now()
      });
      
      return fallbackResult;
    }
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return getFallbackSentiment(text);
  }
};

// Simple fallback for sentiment analysis when OpenAI is unavailable
function getFallbackSentiment(text: string) {
  // Very basic sentiment analysis based on keywords
  const lowerText = text.toLowerCase();
  
  const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'love', 'like', 'enjoy', 'pleased', 'thanks'];
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'hate', 'dislike', 'angry', 'upset', 'unhappy', 'worried', 'stress', 'anxiety'];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) {
    return { sentiment: 'positive', score: 0.5 };
  } else if (negativeCount > positiveCount) {
    return { sentiment: 'negative', score: -0.5 };
  } else {
    return { sentiment: 'neutral', score: 0 };
  }
}

// Cache for wellness resources
const resourcesCache = new Map<string, {resources: any[], timestamp: number}>();

// New function to get wellness resources based on sentiment
export const getWellnessResources = async (sentiment: string) => {
  // Check if we have cached resources for this sentiment
  if (resourcesCache.has(sentiment)) {
    const cachedResources = resourcesCache.get(sentiment)!;
    if (Date.now() - cachedResources.timestamp < CACHE_TTL) {
      console.log('Using cached wellness resources');
      return cachedResources.resources;
    }
  }

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
  
  let resources;
  switch (sentiment) {
    case "positive":
      resources = positiveResources;
      break;
    case "neutral":
      resources = neutralResources;
      break;
    case "negative":
      resources = negativeResources;
      break;
    default:
      resources = neutralResources;
  }
  
  // Cache the resources
  resourcesCache.set(sentiment, {
    resources,
    timestamp: Date.now()
  });
  
  return resources;
};
