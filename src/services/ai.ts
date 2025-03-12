
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

// Re-export the sentiment analysis function for backward compatibility
export { analyzeSentiment, type Sentiment } from "@/utils/sentimentAnalysis";
