
import { supabase } from "@/integrations/supabase/client";

// Define the guidance categories
export type GuidanceCategory = "general" | "career" | "academic" | "mental_health" | "stress_management";

// Mock function for sending message to AI
export const sendMessageToAI = async (
  message: string,
  category: GuidanceCategory = "general",
  history: { role: "user" | "model"; content: string }[] = []
) => {
  // This would normally be a call to an AI API like OpenAI
  console.log("Sending to AI:", { message, category, history });
  
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
      response = "It sounds like you're going through a challenging time. Remember that self-care is important - even small acts like taking a walk or talking to a friend can help. Have you considered speaking with a counselor at your university?";
      break;
    case "stress_management":
      response = "When feeling overwhelmed, try the 5-5-5 technique: name 5 things you can see, 5 things you can hear, and 5 things you can feel. This can help ground you in the present moment. What specific stressors are you facing?";
      break;
    default:
      response = "I'm here to help with any questions you have about your academic journey, career planning, or personal wellbeing. What specific area would you like guidance on today?";
  }
  
  return { text: response };
};

// Mock function for sentiment analysis
export const analyzeSentiment = async (text: string) => {
  // This would normally call a sentiment analysis API
  console.log("Analyzing sentiment:", text);
  
  // Simple mock implementation based on keywords
  const lowerText = text.toLowerCase();
  const positiveWords = ["happy", "excited", "grateful", "good", "great", "excellent", "fantastic"];
  const negativeWords = ["anxious", "worried", "stressed", "depressed", "sad", "unhappy", "hate", "angry", "overwhelmed"];
  
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
