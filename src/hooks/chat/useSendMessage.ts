
import { useState, RefObject } from "react";
import { User } from "@supabase/supabase-js";
import { GuidanceCategory, sendMessageToAI, analyzeSentiment } from "@/services/ai";
import { toast } from "sonner";
import { Message } from "@/types/chat";
import { getAssessmentPromptContext } from "@/utils/assessmentUtils";

export function useSendMessage(
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  category: GuidanceCategory,
  user: User | null,
  assessmentData: any,
  inputRef: RefObject<HTMLInputElement>
) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    // Check if user is authenticated
    if (!user) {
      toast.error("Please sign in to use the chat feature");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      category,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      console.log("Sending message with user:", user.email);
      
      // Convert messages to format expected by AI service
      const chatHistory = messages
        .filter(msg => msg.id !== "welcome") // Remove welcome message
        .map(msg => ({
          role: msg.sender === "user" ? "user" as const : "model" as const,
          content: msg.content
        }));

      // Analyze sentiment of user message (optional)
      const sentimentResult = await analyzeSentiment(inputValue);
      userMessage.sentiment = sentimentResult.sentiment;

      // Prepare additional context from assessment data
      let contextMessage = "";
      if (assessmentData && assessmentData.score) {
        contextMessage = getAssessmentPromptContext(assessmentData);
      }

      // Get response from AI
      const finalMessage = contextMessage ? 
        `${contextMessage}\n\nUser message: ${inputValue}` : 
        inputValue;
        
      console.log("Final message to send:", finalMessage);
      
      const response = await sendMessageToAI(finalMessage, category, chatHistory);
      
      console.log("Received AI response:", response);
      
      if (!response || (!response.text && !response.message)) {
        throw new Error("Received empty response from AI service");
      }
      
      const responseText = response.text || response.message || "I'm sorry, I couldn't generate a response.";
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "ai",
        timestamp: new Date(),
        category,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // If message shows signs of distress, show additional resources
      if (sentimentResult.sentiment === "negative" && sentimentResult.score < -0.2) {
        toast.info(
          "Need additional support? Remember that professional help is available. Consider reaching out to your university's counseling services.",
          {
            duration: 8000,
          }
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    inputValue,
    setInputValue,
    isLoading,
    handleSend,
    handleKeyDown
  };
}
