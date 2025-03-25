
import { useRef, useState, useEffect } from "react";
import { GuidanceCategory } from "@/services/ai";
import { toast } from "sonner";
import { Message } from "@/types/chat";
import { getCategoryWelcomeMessage } from "@/utils/chatUtils";
import { supabase } from "@/integrations/supabase/client";

export function useSimpleChat(initialCategory: GuidanceCategory = "general") {
  const [category, setCategory] = useState<GuidanceCategory>(initialCategory);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check user authentication status
  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setUser(session?.user || null);
          }
        );
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = getCategoryWelcomeMessage(category);
    setMessages([{
      id: "welcome",
      content: welcomeMessage,
      sender: "ai",
      timestamp: new Date(),
      category,
    }]);
  }, [category]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    if (!user) {
      toast.error("Please sign in to use the chat feature");
      return;
    }
    
    // Add user message to chat
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
      // Fetch response from static JSON file based on category
      let url = "/api/chat.json";
      if (category !== "general") {
        url = `/api/chat-${category}.json`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch response: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Create AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.text || "I'm here to help. What would you like to know?",
        sender: "ai",
        timestamp: new Date(),
        category,
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting chat response:", error);
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to help with your questions. What would you like to know more about?",
        sender: "ai",
        timestamp: new Date(),
        category,
        fallback: true,
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      toast.error("Could not connect to the server. Using offline mode.");
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
  };
  
  const clearChat = () => {
    // Reset to welcome message
    const welcomeMessage = getCategoryWelcomeMessage(category);
    setMessages([{
      id: "welcome",
      content: welcomeMessage,
      sender: "ai",
      timestamp: new Date(),
      category,
    }]);
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    category,
    user,
    isCheckingAuth,
    messagesEndRef,
    inputRef,
    handleSend,
    handleKeyDown,
    handleCategoryChange,
    clearChat,
  };
}
