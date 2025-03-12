import { supabase } from "@/integrations/supabase/client";

export type GuidanceCategory = "general" | "academic" | "career" | "mental_health" | "stress_management";

interface Message {
  role: "user" | "model";
  content: string;
}

export const sendMessageToAI = async (message: string, category: GuidanceCategory, chatHistory: Message[] = []) => {
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error("You must be logged in to use this feature");
  }

  try {
    const response = await fetch(`${window.location.origin}/functions/v1/gemini-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        message,
        category,
        chatHistory,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get a response");
    }

    const data = await response.json();
    return { text: data.text };
  } catch (error) {
    console.error("Error sending message to AI:", error);
    throw error;
  }
};

// Simple sentiment analysis function (to keep this functionality)
export const analyzeSentiment = async (text: string) => {
  // Simple keywords-based sentiment analysis
  const positiveWords = ["happy", "great", "excellent", "good", "wonderful", "fantastic", "excited"];
  const negativeWords = ["sad", "bad", "terrible", "anxious", "worried", "stressed", "depressed", "overwhelmed"];
  
  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeCount++;
  });
  
  let sentiment: "positive" | "negative" | "neutral" = "neutral";
  let score = 0;
  
  if (positiveCount > negativeCount) {
    sentiment = "positive";
    score = positiveCount / (positiveCount + negativeCount);
  } else if (negativeCount > positiveCount) {
    sentiment = "negative";
    score = -negativeCount / (positiveCount + negativeCount);
  }
  
  return { sentiment, score };
};
