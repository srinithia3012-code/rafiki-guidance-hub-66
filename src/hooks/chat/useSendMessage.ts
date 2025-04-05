
import { useState, RefObject, useEffect, useCallback } from "react";
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
  const [hasInitialPromptBeenSent, setHasInitialPromptBeenSent] = useState(false);

  // Send initial prompt automatically when component mounts
  useEffect(() => {
    if (user && messages.length === 1 && !hasInitialPromptBeenSent) {
      sendInitialPrompt();
      setHasInitialPromptBeenSent(true);
    }
  }, [user, messages.length, hasInitialPromptBeenSent]);

  // Memoize the chat history preparation function for better performance
  const prepareChatHistory = useCallback((msgs: Message[]) => {
    return msgs
      .filter(msg => msg.id !== "welcome") // Remove welcome message
      .map(msg => ({
        role: msg.sender === "user" ? "user" as const : "model" as const,
        content: msg.content
      }));
  }, []);

  // Memoize the context preparation function
  const prepareContextMessage = useCallback((data: any) => {
    if (data && data.score) {
      return getAssessmentPromptContext(data);
    }
    return "";
  }, []);

  const sendInitialPrompt = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const initialPrompt = "Tell me briefly about what you can help me with as a guidance counselor in this category.";
      
      // Convert messages to format expected by AI service
      const chatHistory = prepareChatHistory(messages);

      // Prepare additional context from assessment data
      let contextMessage = prepareContextMessage(assessmentData);

      // Get response from AI
      const response = await sendMessageToAI(
        initialPrompt, 
        category, 
        chatHistory
      );
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.text,
        sender: "ai",
        timestamp: new Date(),
        category,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending initial prompt:", error);
      toast.error("Failed to connect to AI service. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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
      
      // Convert messages to format expected by AI service using memoized function
      const chatHistory = prepareChatHistory(messages);

      // Analyze sentiment of user message (optional)
      const sentimentResult = await analyzeSentiment(inputValue);
      // Add sentiment to user message
      if (sentimentResult && typeof sentimentResult.sentiment === 'string') {
        userMessage.sentiment = sentimentResult.sentiment as "neutral" | "positive" | "negative";
      }

      // Prepare additional context from assessment data using memoized function
      let contextMessage = prepareContextMessage(assessmentData);

      // Get response from AI
      const response = await sendMessageToAI(
        contextMessage ? `${contextMessage}\n\nUser message: ${inputValue}` : inputValue, 
        category, 
        chatHistory
      );
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text,
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
    handleKeyDown,
    sendInitialPrompt
  };
}
