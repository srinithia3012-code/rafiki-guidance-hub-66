
// Google AI API integration for Rafiki AI
// Using Google Gemini API for generating responses

const GEMINI_API_KEY = "AIzaSyA70s3cQXLM73NY1sQaMxdxdQDKNtkEgjs";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export interface AIResponse {
  text: string;
  sources?: {
    title: string;
    url: string;
  }[];
}

// Categories for different types of guidance
export type GuidanceCategory = 
  | "career" 
  | "academic" 
  | "mental_health" 
  | "stress_management"
  | "general";

// Custom prompts for different categories
const CATEGORY_PROMPTS: Record<GuidanceCategory, string> = {
  career: "As a professional career advisor for university students, provide thoughtful, practical guidance on career paths, job opportunities, and skill development. Focus on personalized advice relevant to modern job markets.",
  academic: "As an experienced academic advisor for university students, provide thoughtful, practical guidance on study techniques, course selection, and academic planning. Offer specific, actionable strategies for academic success.",
  mental_health: "As a supportive mental health counselor for university students, provide compassionate, evidence-based guidance for emotional wellbeing. Offer practical coping strategies while being clear that you're not a replacement for professional therapy.",
  stress_management: "As a stress management coach for university students, provide practical, evidence-based techniques for managing academic pressure, balancing responsibilities, and maintaining wellbeing. Focus on actionable strategies.",
  general: "As Rafiki, a supportive AI counselor for university students, provide thoughtful guidance on academic, career, and personal wellbeing topics. Offer practical, relevant advice while maintaining a supportive tone."
};

// Function to generate system prompt based on category
const getSystemPrompt = (category: GuidanceCategory): string => {
  return `${CATEGORY_PROMPTS[category]} 
  
Your name is Rafiki, an AI counselor specifically designed to help university students. Your responses should be:
- Supportive and empathetic but not overly emotional
- Evidence-based and practical
- Tailored to university student needs and concerns
- Balanced with both encouragement and realistic advice
- Clear about your limitations (you're not a replacement for professional services)

Keep responses concise (under 250 words) unless detailed explanations are requested.`;
};

export const sendMessageToAI = async (
  message: string, 
  category: GuidanceCategory = "general",
  chatHistory: ChatMessage[] = []
): Promise<AIResponse> => {
  try {
    // Construct our conversation with system prompt
    const systemPrompt = getSystemPrompt(category);
    
    const fullPrompt = [
      { role: "user" as const, content: systemPrompt },
      ...chatHistory,
      { role: "user" as const, content: message }
    ];
    
    const requestBody = {
      contents: fullPrompt.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
    
    console.log("Sending request to Gemini API:", message);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        "I'm sorry, I couldn't generate a response at this time.";
    
    console.log("Received response from Gemini API");
    
    return {
      text: responseText
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      text: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment."
    };
  }
};

// Function for sentiment analysis (simplified implementation)
export const analyzeSentiment = async (text: string): Promise<{
  sentiment: "positive" | "negative" | "neutral";
  score: number;
}> => {
  // This is a placeholder for the Google NLP API integration
  // In a real implementation, you would call the Google NLP API here

  // Simple sentiment detection for development
  const positiveWords = ["good", "great", "happy", "excited", "excellent", "helpful", "thank", "thanks"];
  const negativeWords = ["bad", "sad", "disappointed", "anxious", "worried", "stressed", "unhappy", "angry"];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
  });
  
  const total = words.length;
  const positiveScore = positiveCount / total;
  const negativeScore = negativeCount / total;
  const score = positiveScore - negativeScore;
  
  let sentiment: "positive" | "negative" | "neutral" = "neutral";
  if (score > 0.05) sentiment = "positive";
  if (score < -0.05) sentiment = "negative";
  
  return {
    sentiment,
    score: score
  };
};
