
import { useRef, useState } from "react";
import { GuidanceCategory } from "@/services/ai";
import { useAuthCheck } from "./useAuthCheck";
import { useAssessmentData } from "./useAssessmentData";
import { useMessages } from "./useMessages";
import { useSendMessage } from "./useSendMessage";
import { useMessagePersistence } from "@/hooks/useMessagePersistence";

export function useChat(initialCategory: GuidanceCategory = "general") {
  const [category, setCategory] = useState<GuidanceCategory>(initialCategory);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auth checking
  const { user, isCheckingAuth } = useAuthCheck();
  
  // Assessment data loading
  const { assessmentData } = useAssessmentData(user, category);
  
  // Messages handling
  const { messages, setMessages, messagesEndRef, clearMessages } = useMessages(category, assessmentData);
  
  // Message sending
  const { 
    inputValue, 
    setInputValue, 
    isLoading, 
    handleSend, 
    handleKeyDown
    // Remove reference to sendInitialPrompt which doesn't exist
  } = useSendMessage(messages, setMessages, category, user, assessmentData, inputRef);
  
  const handleCategoryChange = (value: string) => {
    const newCategory = value as GuidanceCategory;
    
    // Only process change if category actually changes
    if (newCategory !== category) {
      setCategory(newCategory);
      
      // Clear existing messages
      clearMessages();
    }
  };

  const clearChat = () => {
    clearMessages();
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
    assessmentData,
  };
}
