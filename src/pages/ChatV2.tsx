import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GuidanceCategory } from "@/services/ai";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

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

const ChatV2Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<GuidanceCategory>("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, isCheckingAuth } = useAuth();
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Send initial welcome message when component mounts
  useEffect(() => {
    if (!isCheckingAuth && user && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: "Hello! I'm Rafiki, your AI guidance counselor. How can I help you today?",
        sender: "ai",
        timestamp: new Date(),
        category
      };
      
      setMessages([welcomeMessage]);
      
      // Send an initial prompt to the API
      sendInitialPrompt();
    }
  }, [isCheckingAuth, user, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Get system prompt based on category
  const getSystemPrompt = (selectedCategory: GuidanceCategory): string => {
    let systemPrompt = "You are Rafiki, a helpful AI guidance counselor for university students. ";
    
    switch (selectedCategory) {
      case "academic":
        systemPrompt += "Focus on providing academic advice, study strategies, and educational guidance.";
        break;
      case "career":
        systemPrompt += "Focus on career planning, job opportunities, and professional development advice.";
        break;
      case "mental_health":
        systemPrompt += "Focus on mental health support, emotional well-being, and self-care strategies. " +
          "Provide empathetic responses and practical coping mechanisms for stress, anxiety, depression, and other mental health concerns. " +
          "If someone appears to be in crisis, suggest they reach out to professional mental health services. " +
          "Always validate their feelings and provide evidence-based suggestions when appropriate.";
        break;
      case "stress_management":
        systemPrompt += "Focus on stress management techniques, work-life balance, mindfulness practices, and coping mechanisms. " +
          "Provide specific breathing exercises, grounding techniques, and practical strategies to reduce stress. " +
          "Suggest ways to incorporate self-care into daily routines and build resilience.";
        break;
      default:
        systemPrompt += "Provide general guidance on university life, academics, career, and well-being.";
    }
    
    return systemPrompt;
  };

  // Send a message directly to the Gemini API
  const sendToGeminiAPI = async (
    prompt: string, 
    messageHistory: Message[], 
    specificCategory?: GuidanceCategory
  ): Promise<string> => {
    if (!apiKey) {
      throw new Error("Gemini API key not found. Please check your environment variables.");
    }

    // Use provided category or fall back to the current state
    const categoryToUse = specificCategory || category;

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
        parts: [{ text: getSystemPrompt(categoryToUse) }]
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
      const initialPrompt = "Tell me briefly about what you can help me with as a guidance counselor.";
      
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as GuidanceCategory;
    setCategory(newCategory);
    
    // Send a message to the API indicating the category change
    sendCategoryChangePrompt(newCategory);
  };

  const sendCategoryChangePrompt = async (newCategory: GuidanceCategory) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Indicate to the user that we're changing focus
      const systemMessage: Message = {
        id: Date.now().toString(),
        content: `Switching to ${getCategoryDisplayName(newCategory)} mode...`,
        sender: "ai",
        timestamp: new Date(),
        category: newCategory,
      };
      
      setMessages(prev => [...prev, systemMessage]);
      
      // Get information about the new category
      const prompt = `Please provide a brief introduction about how you can help with ${newCategory} related questions.`;
      
      // Get response from Gemini API with the new category context
      const responseText = await sendToGeminiAPI(prompt, [], newCategory);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "ai",
        timestamp: new Date(),
        category: newCategory,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending category change prompt:", error);
      toast.error("Failed to update guidance mode. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to get a display name for the category
  const getCategoryDisplayName = (cat: GuidanceCategory): string => {
    switch (cat) {
      case "academic": return "Academic Support";
      case "career": return "Career Advice";
      case "mental_health": return "Mental Health Support";
      case "stress_management": return "Stress Management";
      default: return "General Guidance";
    }
  };

  // If checking auth, show loading
  if (isCheckingAuth) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 mt-16 md:mt-20">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rafiki-600"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, show a sign-in prompt
  if (!user) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 mt-16 md:mt-20">
        <Helmet>
          <title>Chat with Rafiki AI | Your AI Guidance Counselor</title>
        </Helmet>
        
        <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-6 text-center">Chat with Rafiki</h1>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center p-6">
            <div className="bg-gray-100 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Please sign in to use the chat feature</h3>
            <p className="text-gray-500 mb-4">Sign in to get personalized guidance from Rafiki AI</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 mt-16 md:mt-20">
      <Helmet>
        <title>Chat with Rafiki AI | Your AI Guidance Counselor</title>
      </Helmet>
      
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-6 text-center">Chat with Rafiki</h1>
      <p className="text-center text-gray-600 mb-4 md:mb-8 text-sm md:text-base px-2">
        Ask Rafiki about career guidance, academic advice, or wellbeing support.
      </p>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Chat header with category selection */}
        <div className="bg-rafiki-50 p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-rafiki-800">Conversation</h2>
            <select 
              value={category}
              onChange={handleCategoryChange}
              className="p-2 border rounded-md text-sm"
            >
              <option value="general">General Guidance</option>
              <option value="career">Career Advice</option>
              <option value="academic">Academic Support</option>
              <option value="mental_health">Mental Health</option>
              <option value="stress_management">Stress Management</option>
            </select>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              <p>Start a conversation with Rafiki</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === "user" 
                        ? "bg-rafiki-600 text-white rounded-tr-none" 
                        : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-rafiki-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-lg p-3 bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-rafiki-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-rafiki-500 animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 rounded-full bg-rafiki-600 animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !inputValue.trim()}
              className="bg-rafiki-600 hover:bg-rafiki-700"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatV2Page; 