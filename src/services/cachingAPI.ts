import { cacheApiResponse, getCachedApiResponse, generateCacheKey } from './cache';

// Type definitions matching the original implementations in ChatV2.tsx
interface GeminiContent {
  role: "user" | "model";
  parts: { text: string }[];
}

interface GeminiRequest {
  contents: GeminiContent[];
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
  };
  safetySettings?: {
    category: string;
    threshold: string;
  }[];
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  category?: string;
}

// Cached API call to Gemini API
export const cachedGeminiApiCall = async (
  apiKey: string,
  prompt: string,
  messageHistory: Message[],
  systemPrompt: string,
  skipCache: boolean = false
): Promise<string> => {
  if (!apiKey) {
    throw new Error("Gemini API key not found. Please check your environment variables.");
  }

  // Create a cache key from inputs
  const cacheParams = {
    prompt,
    historyLength: messageHistory.length,
    historyFingerprint: messageHistory.length > 0 ? 
      messageHistory[messageHistory.length - 1].id + messageHistory[messageHistory.length - 1].content : '',
    systemPrompt
  };
  const cacheKey = generateCacheKey(cacheParams);

  // Try to get from cache if not skipping cache
  if (!skipCache) {
    const cachedResponse = getCachedApiResponse(cacheKey);
    if (cachedResponse) {
      console.log('🔄 Using cached response for prompt');
      return cachedResponse;
    }
  }

  // Convert messages to the format expected by Gemini API
  const formattedHistory = messageHistory
    .filter(msg => msg.id !== "welcome")
    .map(msg => ({
      role: msg.sender === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.content }]
    }));

  // Add the system prompt as the first message from the model
  const contents: GeminiContent[] = [
    {
      role: "model",
      parts: [{ text: systemPrompt }]
    },
    ...formattedHistory,
    {
      role: "user",
      parts: [{ text: prompt }]
    }
  ];

  // Prepare request body
  const requestBody: GeminiRequest = {
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  };

  console.log('📡 Sending request to Gemini API');
  
  try {
    // Make the API request
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the AI's response text
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
    
    // Format the response text to remove asterisks
    const formattedResponse = formatResponseText(aiResponse);
    
    // Cache the response
    cacheApiResponse(cacheKey, formattedResponse, 60 * 60 * 1000); // Cache for 1 hour
    
    console.log('✅ Cached new response from Gemini API');
    
    return formattedResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

// Format response text to remove asterisks and other markdown formatting
const formatResponseText = (text: string): string => {
  // Replace markdown headings/formatting indicators
  let formattedText = text
    // Remove asterisks used for emphasis/bold
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    // Replace markdown bullets with clean bullets
    .replace(/\* /g, '• ');
  
  return formattedText;
}; 