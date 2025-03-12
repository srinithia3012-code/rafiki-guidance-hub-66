
import React, { useEffect } from "react";
import { GuidanceCategory } from "@/services/ai";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useChat } from "@/hooks/useChat";
import ChatHeader from "./chat/ChatHeader";
import MessagesList from "./chat/MessagesList";
import MessageInput from "./chat/MessageInput";
import AuthScreen from "./chat/AuthScreen";

interface ChatInterfaceProps {
  initialCategory?: GuidanceCategory;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialCategory = "general" }) => {
  const { user, isCheckingAuth } = useAuthStatus();
  const { 
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
  } = useChat(initialCategory, user);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // If checking auth or not authenticated, show appropriate screens
  if (isCheckingAuth || !user) {
    return (
      <AuthScreen 
        category={category}
        onCategoryChange={handleCategoryChange}
        onClearChat={clearChat}
        isCheckingAuth={isCheckingAuth}
      />
    );
  }

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
