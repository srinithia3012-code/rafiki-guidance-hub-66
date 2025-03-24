
import { useState, useRef, useEffect } from "react";
import { GuidanceCategory } from "@/services/ai";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Message } from "@/types/chat";
import { getCategoryWelcomeMessage } from "@/utils/chatUtils";

export function useSimpleChat(initialCategory: GuidanceCategory = "general") {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<GuidanceCategory>(initialCategory);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check authentication state
  useEffect(() => {
    const checkUser = async () => {
      setIsCheckingAuth(true);
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_, session) => {
            setUser(session?.user || null);
          }
        );
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error checking auth:", error);
        toast.error("Error checking authentication status");
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkUser();
  }, []);

  // Set welcome message
  useEffect(() => {
    setMessages([{
      id: "welcome",
      content: getCategoryWelcomeMessage(category),
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
      // Simple direct API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputValue, 
          category,
          userId: user.id
        }),
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.text || "I understand your message. How can I help further?",
        sender: "ai",
        timestamp: new Date(),
        category,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to help with your questions about academics, career planning, or wellbeing. What would you like to discuss today?",
        sender: "ai",
        timestamp: new Date(),
        category,
        fallback: true,
      };
      
      setMessages((prev) => [...prev, fallbackMessage]);
      toast.error("Using fallback responses due to connection issues");
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
    setMessages([{
      id: "welcome",
      content: getCategoryWelcomeMessage(category),
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
