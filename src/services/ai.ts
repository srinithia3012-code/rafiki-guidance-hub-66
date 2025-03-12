
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type GuidanceCategory = "general" | "academic" | "career" | "mental_health" | "stress_management";

interface Message {
  role: "user" | "model";
  content: string;
}

export const sendMessageToAI = async (message: string, category: GuidanceCategory, chatHistory: Message[] = []) => {
  console.log("Sending message to AI:", { message, category, chatHistoryLength: chatHistory.length });
  
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    console.error("No session found");
    toast.error("You must be logged in to use this feature");
    throw new Error("You must be logged in to use this feature");
  }

  try {
    console.log("Calling Supabase function with session:", session.user.email);
    
    const response = await supabase.functions.invoke("gemini-chat", {
      body: {
        message,
        category,
        chatHistory,
      },
    });

    if (response.error) {
      console.error("Error from Supabase function:", response.error);
      throw new Error(response.error.message || "Failed to get a response");
    }

    console.log("Received response from AI:", response.data);
    return { text: response.data.text };
  } catch (error) {
    console.error("Error sending message to AI:", error);
    toast.error("Failed to get a response. Please try again.");
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
