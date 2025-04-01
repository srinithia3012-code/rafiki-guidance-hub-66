import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Send, RefreshCw, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useChat } from "@/hooks/chat/useChat";
import MessageItem from "@/components/chat/MessageItem";
import TypingIndicator from "@/components/chat/TypingIndicator";

const AIWellbeingChat = ({ moodRating }: { moodRating?: number | null }) => {
  const { 
    messages, 
    inputValue, 
    setInputValue, 
    isLoading, 
    handleSend, 
    handleKeyDown, 
    clearChat, 
    messagesEndRef,
    user
  } = useChat("mental_health");
  
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Send initial message based on mood if provided
  useEffect(() => {
    if (moodRating !== undefined && moodRating !== null && !initialMessageSent && user) {
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
          handleSend();
          setInitialMessageSent(true);
        }, 500);
      }
    }
  }, [moodRating, user, initialMessageSent, handleSend, setInputValue]);

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
