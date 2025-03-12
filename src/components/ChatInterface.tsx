
import React, { useState, useRef, useEffect } from "react";
import { GuidanceCategory, sendMessageToAI, analyzeSentiment } from "@/services/ai";
import { saveChat, getCurrentUser } from "@/services/firebase";
import { toast } from "sonner";
import { Message } from "@/types/chat";
import { getCategoryWelcomeMessage } from "@/utils/chatUtils";
import ChatHeader from "./chat/ChatHeader";
import MessagesList from "./chat/MessagesList";
import MessageInput from "./chat/MessageInput";

interface ChatInterfaceProps {
  initialCategory?: GuidanceCategory;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialCategory = "general" }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<GuidanceCategory>(initialCategory);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: "welcome",
      content: getCategoryWelcomeMessage(category),
      sender: "ai" as const,
      timestamp: new Date(),
      category,
    };
    setMessages([welcomeMessage]);
  }, [category]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    // Check if user is authenticated
    const user = getCurrentUser();
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

      // Save chat to Firebase
      await saveChat(user.uid, userMessage.content, aiMessage.content, category);

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

  return (
    <div className="flex flex-col h-[80vh] md:h-[70vh] rounded-lg overflow-hidden glass-card">
      <ChatHeader 
        category={category} 
        onCategoryChange={handleCategoryChange} 
        onClearChat={clearChat} 
      />
      
      <MessagesList 
        messages={messages} 
        isLoading={isLoading} 
        messagesEndRef={messagesEndRef} 
      />
      
      <MessageInput 
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
        isLoading={isLoading}
        inputRef={inputRef}
      />
    </div>
  );
};

export default ChatInterface;
