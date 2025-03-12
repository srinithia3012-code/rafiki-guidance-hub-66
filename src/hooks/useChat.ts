
import { useState, useRef } from "react";
import { GuidanceCategory, sendMessageToAI, analyzeSentiment } from "@/services/ai";
import { Message } from "@/types/chat";
import { toast } from "sonner";
import { getCategoryWelcomeMessage } from "@/utils/chatUtils";

export function useChat(initialCategory: GuidanceCategory = "general", user: any) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: getCategoryWelcomeMessage(initialCategory),
      sender: "ai",
      timestamp: new Date(),
      category: initialCategory,
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<GuidanceCategory>(initialCategory);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

      // Get response from AI
      const response = await sendMessageToAI(inputValue, category, chatHistory);
      
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
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Need additional support?</span>
            <span className="text-sm">Remember that professional help is available. Consider reaching out to your university's counseling services.</span>
          </div>,
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

  const handleCategoryChange = (value: string) => {
    const newCategory = value as GuidanceCategory;
    setCategory(newCategory);
    // Reset chat with new welcome message
    setMessages([
      {
        id: "welcome",
        content: getCategoryWelcomeMessage(newCategory),
        sender: "ai",
        timestamp: new Date(),
        category: newCategory,
      },
    ]);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content: getCategoryWelcomeMessage(category),
        sender: "ai",
        timestamp: new Date(),
        category,
      },
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    category,
    handleSend,
    handleKeyDown,
    handleCategoryChange,
    clearChat,
    inputRef,
    messagesEndRef,
    scrollToBottom
  };
}
