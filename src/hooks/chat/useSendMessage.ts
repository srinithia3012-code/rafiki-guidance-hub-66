
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
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

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
      
      if (!response) {
        throw new Error("Failed to get response from AI service");
      }
      
      if (response.error) {
        console.error("Error from AI service:", response.error);
        if (retryCount < MAX_RETRIES) {
          // Increment retry count and try again
          setRetryCount(prev => prev + 1);
          toast.info("Trying to reconnect...");
          throw new Error(`Error from AI service: ${response.error}`);
        } else {
          // Create message with error state
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: response.text || "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
            sender: "ai",
            timestamp: new Date(),
            category,
            error: true,
          };
          
          setMessages((prev) => [...prev, errorMessage]);
          
          toast.error("Failed to get a response after multiple attempts. Please try again later.");
          setRetryCount(0); // Reset retry count
          return;
        }
      }
      
      // Reset retry count on success
      setRetryCount(0);
      
      const responseText = response.text || response.message || "I'm sorry, I couldn't generate a response.";
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "ai",
        timestamp: new Date(),
        category,
        fallback: response.fallback,
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
      
      // If using fallback response, show a subtle notification
      if (response.fallback) {
        toast.info("Using offline response mode due to connectivity issues", { 
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Different error messages based on type of error
      if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) {
        toast.error("Network error. Please check your internet connection.");
      } else if (error.message?.includes("API key")) {
        toast.error("The AI service is not properly configured. Please contact support.");
      } else if (retryCount >= MAX_RETRIES) {
        toast.error("Failed to get a response after multiple attempts. Please try again later.");
        
        // Add error message to chat
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          sender: "ai",
          timestamp: new Date(),
          category,
          error: true,
        };
        
        setMessages((prev) => [...prev, errorMessage]);
        
        // Reset retry count
        setRetryCount(0);
      } else {
        toast.error("Failed to get a response. Please try again.");
      }
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
