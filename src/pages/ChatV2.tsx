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

interface GeminiModel {
  name: string;
  supportedGenerationMethods?: string[];
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

  const [geminiModel, setGeminiModel] = useState<string>("gemini-1.5-flash-latest");

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Load available Gemini models
  useEffect(() => {
    const fetchModel = async () => {
      if (!apiKey) {
        console.warn("No Gemini API key - using default model");
        return;
      }

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const models: GeminiModel[] = data.models || [];

        const modelWithGenerateContent = models.find(m =>
          m.supportedGenerationMethods?.includes("generateContent")
        );

        if (modelWithGenerateContent) {
          const modelName = modelWithGenerateContent.name.replace(/^models\//, "");
          setGeminiModel(modelName);
          console.log("Using model:", modelName);
        } else {
          console.warn("No generateContent model found, using safe fallback");
          setGeminiModel("gemini-1.5-flash-latest");
        }
      } catch (err) {
        console.error("Error fetching models:", err);
        setGeminiModel("gemini-1.5-flash-latest");
      }
    };

    fetchModel();
  }, [apiKey]);

  // Welcome message when ready
  useEffect(() => {
    if (!isCheckingAuth && user && messages.length === 0 && geminiModel) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: "Hello! I'm Rafiki, your AI guidance counselor. How can I help you today?",
        sender: "ai",
        timestamp: new Date(),
        category
      };
      setMessages([welcomeMessage]);
      
      setTimeout(() => sendInitialPrompt(), 800);
    }
  }, [isCheckingAuth, user, geminiModel]);

  const getSystemPrompt = (selectedCategory: GuidanceCategory): string => {
    let systemPrompt = "You are Rafiki, a helpful AI guidance counselor for university students. ";

    switch (selectedCategory) {
      case "academic":
        systemPrompt += "Focus on academic advice, study strategies, and educational guidance.";
        break;
      case "career":
        systemPrompt += "Focus on career planning, job opportunities, and professional development.";
        break;
      case "mental_health":
        systemPrompt += 
          "Focus on mental health support and self-care. Provide empathetic responses. ";
        break;
      case "stress_management":
        systemPrompt += "Focus on stress management techniques and coping strategies.";
        break;
      default:
        systemPrompt += "Provide guidance on university life, academics, career, and well-being.";
    }
    return systemPrompt;
  };

  const sendToGeminiAPI = async (
    prompt: string,
    messageHistory: Message[],
    specificCategory?: GuidanceCategory
  ): Promise<string> => {
    if (!apiKey) throw new Error("Gemini API key missing");
    if (!geminiModel) throw new Error("AI model not loaded");

    const categoryToUse = specificCategory || category;
    const formattedHistory = messageHistory
      .filter(msg => msg.id !== "welcome")
      .map(msg => ({
        role: msg.sender === "user" ? "user" as const : "model" as const,
        parts: [{ text: msg.content }]
      }));

    const contents: GeminiContent[] = [
      { role: "user", parts: [{ text: getSystemPrompt(categoryToUse) }] },
      ...formattedHistory,
      { role: "user", parts: [{ text: prompt }] }
    ];

    const requestBody: GeminiRequest = {
      contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
      ]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    return formatResponseText(aiResponse);
  };

  const formatResponseText = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "• $1")
      .replace(/^\s*- /gm, "• ");
  };

  const sendInitialPrompt = async () => {
    if (!user || !geminiModel || messages.length === 0) return;

    try {
      setIsLoading(true);
      const initialPrompt = "Briefly tell me what you can help with as a guidance counselor.";
      const responseText = await sendToGeminiAPI(initialPrompt, messages);
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: responseText,
          sender: "ai",
          timestamp: new Date(),
          category
        }
      ]);
    } catch (error) {
      console.error("Initial prompt error:", error);
      toast.error("AI service temporarily unavailable");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !user) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      category
    };

    setMessages(prev => [...prev, userMessage]);
    const tempInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const responseText = await sendToGeminiAPI(tempInput, [...messages, userMessage]);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: responseText,
          sender: "ai",
          timestamp: new Date(),
          category
        }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Sorry, try again");
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Sorry, I had trouble responding. Please try again.",
          sender: "ai",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
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
    
    const systemMessage: Message = {
      id: `cat-${Date.now()}`,
      content: `🔄 Switched to ${getCategoryDisplayName(newCategory)} mode`,
      sender: "ai",
      timestamp: new Date(),
      category: newCategory
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  // **FIXED**: Added all possible GuidanceCategory values including 'wellbeing'
  const getCategoryDisplayName = (cat: GuidanceCategory): string => {
    const names: Record<GuidanceCategory, string> = {
      general: "General Guidance",
      academic: "Academic Support",
      career: "Career Advice",
      mental_health: "Mental Health",
      stress_management: "Stress Management",
      wellbeing: "Wellbeing Support" // Added missing wellbeing
    };
    return names[cat] || "General";
  };

  if (isCheckingAuth) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 mt-16 md:mt-20">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rafiki-600"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 mt-16 md:mt-20">
        <Helmet><title>Chat with Rafiki AI</title></Helmet>
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Chat with Rafiki</h1>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <div className="bg-gray-100 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Please sign in</h3>
          <p className="text-gray-500">Sign in for personalized AI guidance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 mt-16 md:mt-20">
      <Helmet><title>Chat with Rafiki AI | Your AI Guidance Counselor</title></Helmet>
      
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-6 text-center">Chat with Rafiki</h1>
      <p className="text-center text-gray-600 mb-8 text-sm md:text-base px-2">
        Ask about career guidance, academic advice, or wellbeing support
      </p>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-rafiki-50 p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-rafiki-800">Rafiki AI</h2>
            <select 
              value={category} 
              onChange={handleCategoryChange} 
              disabled={isLoading}
              className="p-2 border rounded-md text-sm bg-white"
            >
              <option value="general">General</option>
              <option value="career">Career</option>
              <option value="academic">Academic</option>
              <option value="mental_health">Mental Health</option>
              <option value="stress_management">Stress</option>
              <option value="wellbeing">Wellbeing</option>
            </select>
          </div>
        </div>

        <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              <p>Loading Rafiki...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-lg p-3 ${
                    message.sender === "user" 
                      ? "bg-rafiki-600 text-white rounded-tr-none" 
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-rafiki-100" : "text-gray-500"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-lg p-3 bg-white border border-gray-200 rounded-tl-none shadow-sm">
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

        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? "Rafiki is typing..." : "Type your message..."}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !inputValue.trim()} 
              className="bg-rafiki-600 hover:bg-rafiki-700 min-w-[70px]"
            >
              {isLoading ? "..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatV2Page;
