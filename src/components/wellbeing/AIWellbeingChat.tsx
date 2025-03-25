
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Send, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useChat } from "@/hooks/useChat";
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
  }, [moodRating, user, initialMessageSent]);

  return (
    <Card className="mb-6 h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Heart className="mr-2 h-5 w-5 text-rose-500" />
          AI Wellbeing Support
        </CardTitle>
        <CardDescription>
          Talk with Rafiki AI about your mental health and wellbeing
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 overflow-hidden">
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
            <div className="flex-1 overflow-y-auto mb-4 px-1">
              {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2 mt-auto">
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIWellbeingChat;
