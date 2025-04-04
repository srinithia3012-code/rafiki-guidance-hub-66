import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Send, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { GuidanceCategory } from "@/services/ai";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  category?: GuidanceCategory;
}

// Type definitions for Gemini API request/response
interface GeminiContent {
  role: "user" | "model";
  parts: { text: string }[];
}

interface GeminiRequest {
  contents: GeminiContent[];
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
  };
  safetySettings?: {
    category: string;
    threshold: string;
  }[];
}

const AIWellbeingChat = ({ moodRating }: { moodRating?: number | null }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  // Category is fixed to mental_health for wellbeing chat
  const category: GuidanceCategory = "mental_health";

  // Send initial welcome message when component mounts
  useEffect(() => {
    if (user && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: "Hello! I'm Rafiki, your AI wellbeing assistant. How are you feeling today?",
        sender: "ai",
        timestamp: new Date(),
        category
      };
      
      setMessages([welcomeMessage]);
      
      // Send an initial prompt to the API if not triggered by mood rating
      if (moodRating === undefined || moodRating === null) {
        sendInitialPrompt();
      }
    }
  }, [user, messages.length, moodRating]);

  // Process mood rating to send initial message if provided
  useEffect(() => {
    if (moodRating !== undefined && moodRating !== null && !initialMessageSent && user && messages.length > 0) {
      const moodMessages = {
        1: "I'm feeling really down today, can you help me?",
        2: "I'm not feeling great today. Any advice?",
        3: "I'm feeling okay but could use some tips to improve my mood.",
        4: "I'm feeling good today, but would like to maintain this positive mood.",
        5: "I'm feeling great! Any tips to maintain this positivity?"
      };
      
      // Set the initial message based on mood rating
      const initialMessage = moodMessages[moodRating as keyof typeof moodMessages];
      if (initialMessage) {
        setInputValue(initialMessage);
        setTimeout(() => {
          handleMoodBasedMessage(initialMessage);
          setInitialMessageSent(true);
        }, 500);
      }
    }
  }, [moodRating, user, initialMessageSent, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Get system prompt for mental health
  const getSystemPrompt = (): string => {
    return "You are Rafiki, a helpful AI guidance counselor for university students. " +
      "Focus on mental health support, emotional well-being, and self-care strategies. " +
      "Provide empathetic responses and practical coping mechanisms for stress, anxiety, depression, and other mental health concerns. " +
      "If someone appears to be in crisis, suggest they reach out to professional mental health services. " +
      "Always validate their feelings and provide evidence-based suggestions when appropriate.";
  };

  // Send a message directly to the Gemini API
  const sendToGeminiAPI = async (
    prompt: string, 
    messageHistory: Message[]
  ): Promise<string> => {
    if (!apiKey) {
      throw new Error("Gemini API key not found. Please check your environment variables.");
    }

    // Convert messages to the format expected by Gemini API
    const formattedHistory = messageHistory
      .filter(msg => msg.id !== "welcome")
      .map(msg => ({
        role: msg.sender === "user" ? "user" as const : "model" as const,
        parts: [{ text: msg.content }]
      }));

    // Add the system prompt as the first message from the model
    const contents: GeminiContent[] = [
      {
        role: "model",
        parts: [{ text: getSystemPrompt() }]
      },
      ...formattedHistory,
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ];

    // Prepare request body
    const requestBody: GeminiRequest = {
      contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    };

    try {
      // Make the API request
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      // Extract the AI's response text
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
      
      // Format the response text to remove asterisks
      const formattedResponse = formatResponseText(aiResponse);
      
      return formattedResponse;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  // Format response text to remove asterisks and other markdown formatting
  const formatResponseText = (text: string): string => {
    // Replace markdown headings/formatting indicators
    let formattedText = text
      // Remove asterisks used for emphasis/bold
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      // Replace markdown bullets with clean bullets
      .replace(/\* /g, '• ');
    
    return formattedText;
  };

  const sendInitialPrompt = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const initialPrompt = "Tell me briefly about how you can support me with mental health and wellbeing issues.";
      
      // Get response from Gemini API
      const responseText = await sendToGeminiAPI(initialPrompt, messages);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responseText,
        sender: "ai",
        timestamp: new Date(),
        category,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending initial prompt:", error);
      toast.error("Failed to connect to AI service. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodBasedMessage = async (content: string) => {
    if (!user) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      category,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get response from Gemini API
      const responseText = await sendToGeminiAPI(content, [...messages, userMessage]);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "ai",
        timestamp: new Date(),
        category,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get a response. Please try again.");
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

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get response from Gemini API
      const responseText = await sendToGeminiAPI(inputValue, [...messages, userMessage]);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "ai",
        timestamp: new Date(),
        category,
      };

      setMessages(prev => [...prev, aiMessage]);
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
  
  const clearChat = () => {
    // Create welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: "Hello! I'm Rafiki, your AI wellbeing assistant. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
      category,
    };
    
    setMessages([welcomeMessage]);
    setInitialMessageSent(false);
  };

  return (
    <Card className="mb-6 h-[500px] flex flex-col shadow-lg">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="flex items-center text-lg">
          <Heart className="mr-2 h-5 w-5 text-rose-500" />
          AI Wellbeing Support
        </CardTitle>
        <CardDescription>
          Talk with Rafiki AI about your mental health and wellbeing
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 overflow-hidden p-0">
        {!user ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6 max-w-md mx-auto">
              <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign in to access AI Wellbeing Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI assistant can provide personalized emotional support and mental wellbeing guidance.
              </p>
              <Button asChild>
                <a href="/auth">Sign In</a>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  <p>Start a conversation with Rafiki</p>
                </div>
              ) : (
                <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 rounded-tl-none'
                  }`}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center mb-1">
                        <Heart className="h-4 w-4 text-rose-500 mr-1" />
                        <span className="text-xs font-medium text-rose-500">Rafiki</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    )}
                    <div className={`text-sm ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {message.content}
                    </div>
                    {message.sender === 'user' && (
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-white/70">
                          {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex items-center mb-1">
                      <Heart className="h-4 w-4 text-rose-500 mr-1" />
                      <span className="text-xs font-medium text-rose-500">Rafiki</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1"
                  ref={inputRef}
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={isLoading || !inputValue.trim()}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={clearChat} 
                  variant="outline" 
                  size="icon" 
                  title="Start over"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Rafiki provides general guidance. For serious concerns, please contact professional services.
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIWellbeingChat;
