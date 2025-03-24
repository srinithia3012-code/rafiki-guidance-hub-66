
import { supabase } from "@/integrations/supabase/client";

// Define the guidance categories
export type GuidanceCategory = "general" | "career" | "academic" | "mental_health" | "stress_management";

// Function for sending message to AI
export const sendMessageToAI = async (
  message: string,
  category: GuidanceCategory = "general",
  history: { role: "user" | "model"; content: string }[] = []
) => {
  // Check if we're using the mock or the real Gemini API
  if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_AI) {
    // Use mock in development unless overridden
    console.log("Using mock AI response for category:", category);
    return getMockResponse(message, category);
  } else {
    try {
      console.log("Sending message to Gemini API via edge function:", { message, category });
      
      // Create a controller for the timeout but don't use the signal directly
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      try {
        // Call the Gemini AI API through our Supabase edge function
        // Note: We don't pass the signal directly to supabase.functions.invoke
        const { data, error } = await supabase.functions.invoke("gemini-chat", {
          body: { message, category, chatHistory: history }
        });
        
        clearTimeout(timeoutId);
        
        console.log("Gemini API response:", data, "Error:", error);

        if (error) {
          console.error("Error calling Gemini AI:", error);
          throw new Error(`AI service error: ${error.message}`);
        }

        return data;
      } catch (error) {
        clearTimeout(timeoutId);
        
        // Check if this is an abort error (timeout)
        if (error.name === 'AbortError' || controller.signal.aborted) {
          console.error("Request timed out");
          return { 
            text: "I'm sorry, the request took too long to process. Please try again.", 
            error: "Request timeout",
            fallback: true
          };
        }
        
        throw error; // Re-throw for the outer catch block
      }
    } catch (error) {
      console.error("Failed to send message to AI:", error);
      
      // Check for network errors
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        return { 
          text: "I'm having trouble connecting right now. Please check your internet connection and try again.", 
          error: "Network error",
          fallback: true
        };
      }
      
      // For other errors, provide a generic fallback
      return { 
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.", 
        error: error.message,
        fallback: true
      };
    }
  }
};

// Mock function for getting response - useful for development
const getMockResponse = async (message: string, category: GuidanceCategory) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock response based on category
  let response = "";
  
  switch (category) {
    case "career":
      response = "Based on your career interests, I'd suggest exploring internship opportunities that align with your studies. Would you like me to help you prepare a resume or cover letter?";
      break;
    case "academic":
      response = "For academic improvement, consider forming a study group with classmates. Research shows collaborative learning can improve retention. What subject are you finding most challenging?";
      break;
    case "mental_health":
      // More detailed mental health responses
      if (message.toLowerCase().includes("anxiety") || message.toLowerCase().includes("anxious")) {
        response = "Anxiety can be challenging to deal with. Some proven strategies include deep breathing exercises, progressive muscle relaxation, and cognitive reframing. Would you like me to guide you through a quick grounding technique?";
      } else if (message.toLowerCase().includes("stress")) {
        response = "Managing stress is important for your wellbeing. Consider trying the 5-5-5 technique: name 5 things you can see, 5 things you can hear, and 5 things you can feel. This can help bring you back to the present moment. What specific stressors are you facing?";
      } else if (message.toLowerCase().includes("sad") || message.toLowerCase().includes("depress")) {
        response = "I'm sorry to hear you're feeling down. It's important to reach out for support. Simple activities like taking a walk outside, connecting with friends, or practicing self-care can help improve your mood. Have you spoken with your university's counseling services?";
      } else if (message.toLowerCase().includes("sleep")) {
        response = "Good sleep is crucial for mental health. Try establishing a consistent sleep schedule, avoiding screens before bed, and creating a relaxing bedtime routine. The Sleep Foundation recommends 7-9 hours for most adults. Is there something specific affecting your sleep?";
      } else {
        response = "Taking care of your mental health is important. Remember that it's okay to prioritize self-care and seek support when needed. Would you like to talk about specific strategies for managing your mental wellbeing?";
      }
      break;
    case "stress_management":
      response = "When feeling overwhelmed, try the 5-5-5 technique: name 5 things you can see, 5 things you can hear, and 5 things you can feel. This can help ground you in the present moment. Other effective stress management techniques include mindful breathing, progressive muscle relaxation, and regular physical activity. What specific stressors are you facing?";
      break;
    default:
      response = "I'm here to help with any questions you have about your academic journey, career planning, or personal wellbeing. What specific area would you like guidance on today?";
  }
  
  return { text: response };
};

// Function for sentiment analysis
export const analyzeSentiment = async (text: string) => {
  // This would normally call a sentiment analysis API
  console.log("Analyzing sentiment:", text);
  
  // Simple mock implementation based on keywords
  const lowerText = text.toLowerCase();
  const positiveWords = ["happy", "excited", "grateful", "good", "great", "excellent", "fantastic", "better", "positive", "calm", "relaxed", "joy", "peaceful"];
  const negativeWords = ["anxious", "worried", "stressed", "depressed", "sad", "unhappy", "hate", "angry", "overwhelmed", "tired", "exhausted", "lonely", "afraid", "fear", "panic", "anxiety", "hopeless"];
  
  let score = 0;
  
  // Check for positive words
  for (const word of positiveWords) {
    if (lowerText.includes(word)) score += 0.2;
  }
  
  // Check for negative words
  for (const word of negativeWords) {
    if (lowerText.includes(word)) score -= 0.2;
  }
  
  // Clamp score between -1 and 1
  score = Math.max(-1, Math.min(1, score));
  
  let sentiment: "positive" | "negative" | "neutral";
  
  if (score > 0.1) {
    sentiment = "positive";
  } else if (score < -0.1) {
    sentiment = "negative";
  } else {
    sentiment = "neutral";
  }
  
  return { sentiment, score };
};

// Function to get wellness resources based on sentiment and category
export const getWellnessResources = async (sentiment: "positive" | "negative" | "neutral", category?: string) => {
  // This would normally fetch from Supabase based on sentiment and category
  // For now, return mock data
  
  const resources = {
    negative: [
      {
        title: "Crisis Support Hotlines",
        description: "Immediate support for mental health emergencies",
        link: "/wellbeing#professional"
      },
      {
        title: "Grounding Techniques",
        description: "Quick exercises to manage overwhelming feelings",
        link: "/wellbeing#activities"
      },
      {
        title: "University Counseling Services",
        description: "Professional support available to students",
        link: "/wellbeing#professional"
      }
    ],
    neutral: [
      {
        title: "Mindfulness Practices",
        description: "Daily mindfulness exercises for mental wellbeing",
        link: "/wellbeing#activities"
      },
      {
        title: "Student Support Groups",
        description: "Connect with peers facing similar challenges",
        link: "/wellbeing#community"
      },
      {
        title: "Wellness Self-Assessments",
        description: "Understand your current mental health status",
        link: "/wellbeing#resources"
      }
    ],
    positive: [
      {
        title: "Gratitude Practices",
        description: "Enhance positive emotions through gratitude",
        link: "/wellbeing#activities"
      },
      {
        title: "Wellness Challenges",
        description: "Join community challenges to maintain wellbeing",
        link: "/wellbeing#activities"
      },
      {
        title: "Peer Support Network",
        description: "Share your positivity with others who need support",
        link: "/wellbeing#community"
      }
    ]
  };
  
  return resources[sentiment];
};
