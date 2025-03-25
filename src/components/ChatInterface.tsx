
import React from "react";
import { useSimpleChat } from "@/hooks/chat/useSimpleChat";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import ChatHeader from "./chat/ChatHeader";
import MessagesList from "./chat/MessagesList";
import MessageInput from "./chat/MessageInput";
import { GuidanceCategory } from "@/services/ai";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatInterfaceProps {
  initialCategory?: GuidanceCategory;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialCategory = "general" }) => {
  const { user, isLoading: authLoading } = useAuthStatus();
  
  const { 
    messages, 
    inputValue, 
    setInputValue, 
    isLoading, 
    category, 
    messagesEndRef, 
    inputRef, 
    handleSend, 
    handleKeyDown, 
    handleCategoryChange, 
    clearChat
  } = useSimpleChat(initialCategory);

  // If checking auth in the outer component, we already handled it
  if (authLoading) {
    return (
      <div className="flex flex-col h-[80vh] md:h-[70vh] rounded-lg overflow-hidden glass-card">
        <ChatHeader 
          category={category} 
          onCategoryChange={handleCategoryChange} 
          onClearChat={clearChat} 
        />
        <div className="flex-1 flex items-center justify-center bg-white/80">
          <div className="text-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rafiki-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium mb-2">Loading chat...</h3>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, show a sign-in prompt
  if (!user) {
    return (
      <div className="flex flex-col h-[80vh] md:h-[70vh] rounded-lg overflow-hidden glass-card">
        <ChatHeader 
          category={category} 
          onCategoryChange={handleCategoryChange} 
          onClearChat={clearChat} 
        />
        <div className="flex-1 flex items-center justify-center bg-white/80">
          <div className="text-center p-6">
            <div className="bg-rafiki-100 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rafiki-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Please sign in to use the chat feature</h3>
            <p className="text-gray-500 mb-4">Sign in to get personalized guidance from Rafiki AI</p>
            <Button asChild>
              <a href="/signin">Sign In</a>
            </Button>
          </div>
        </div>
      </div>
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
