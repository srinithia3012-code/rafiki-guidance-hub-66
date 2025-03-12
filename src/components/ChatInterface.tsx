
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleHelp, SendHorizontal, Sparkles, User, Check, Clock, Trash, Bot } from "lucide-react";
import { GuidanceCategory, sendMessageToAI, analyzeSentiment } from "@/services/ai";
import { saveChat, getCurrentUser } from "@/services/firebase";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  category?: GuidanceCategory;
  sentiment?: "positive" | "negative" | "neutral";
}

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

  const getCategoryWelcomeMessage = (cat: GuidanceCategory): string => {
    const welcomeMessages: Record<GuidanceCategory, string> = {
      career: "Hi there! I'm Rafiki, your AI career advisor. I can help with career planning, job searches, resume building, and interview preparation. What career-related questions do you have today?",
      academic: "Hello! I'm Rafiki, your AI academic advisor. I can help with study strategies, course selections, research skills, and academic planning. How can I assist with your academic journey today?",
      mental_health: "Hi, I'm Rafiki, your AI wellbeing assistant. I'm here to provide support for emotional challenges, stress, and mental wellness. Remember, while I can offer guidance, I'm not a replacement for professional mental health services. How are you feeling today?",
      stress_management: "Hello! I'm Rafiki, your AI stress management coach. I can suggest techniques for managing academic pressure, anxiety, and building resilience. What's causing you stress right now?",
      general: "Hello! I'm Rafiki, your AI guidance counselor. I'm here to help with academics, career planning, and personal wellbeing. What would you like guidance on today?",
    };
    return welcomeMessages[cat];
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
      {/* Chat header */}
      <div className="bg-rafiki-600 text-white p-3 md:p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-3">
          <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-white/20">
            <AvatarImage src="/placeholder.svg" alt="Rafiki AI" />
            <AvatarFallback className="bg-rafiki-700 text-white">
              <Bot className="h-4 w-4 md:h-5 md:w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm md:text-base">Rafiki AI Assistant</h3>
            <div className="flex items-center text-xs text-white/80">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
              Online
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="bg-white/10 border-none text-white w-24 md:w-40 h-8 text-xs">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Guidance</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="mental_health">Mental Health</SelectItem>
              <SelectItem value="stress_management">Stress Management</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={clearChat}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat messages */}
      <ScrollArea className="flex-1 p-3 md:p-4 bg-white/80">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-[85%] md:max-w-[70%]">
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8 md:h-9 md:w-9 mr-2 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-rafiki-100 text-rafiki-700">
                      <Bot className="h-3 w-3 md:h-4 md:w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`rounded-2xl p-3 md:p-4 ${
                    message.sender === "user"
                      ? "bg-rafiki-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <div className="text-xs md:text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="mt-1 flex justify-end items-center">
                    <span className="text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {message.sender === "user" && message.sentiment && (
                      <div className="ml-1.5">
                        {message.sentiment === "positive" && (
                          <div className="bg-green-100 text-green-800 text-xs rounded-full px-1.5 py-0.5">
                            <Check className="h-3 w-3 inline-block" />
                          </div>
                        )}
                        {message.sentiment === "negative" && (
                          <div className="bg-red-100 text-red-800 text-xs rounded-full px-1.5 py-0.5">
                            <CircleHelp className="h-3 w-3 inline-block" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 md:h-9 md:w-9 ml-2 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-gray-200">
                      <User className="h-3 w-3 md:h-4 md:w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[85%] md:max-w-[70%]">
                <Avatar className="h-8 w-8 md:h-9 md:w-9 mr-2 mt-1 flex-shrink-0">
                  <AvatarFallback className="bg-rafiki-100 text-rafiki-700">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl p-3 md:p-4 bg-gray-100 text-gray-800 rounded-tl-none">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-rafiki-600 animate-pulse" />
                    <span className="text-xs md:text-sm loading-dots">Typing</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="p-3 md:p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="pr-10 py-4 md:py-6 focus-visible:ring-rafiki-500"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Sparkles className="h-4 w-4 text-rafiki-400" />
            </div>
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="bg-rafiki-600 hover:bg-rafiki-700 text-white h-10 w-10 p-0 flex-shrink-0"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          Rafiki provides general guidance. For serious concerns, please contact professional services.
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
