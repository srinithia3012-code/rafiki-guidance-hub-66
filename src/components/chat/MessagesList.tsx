
import React, { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";
import { Message } from "@/types/chat";

interface MessagesListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessagesList: React.FC<MessagesListProps> = ({ 
  messages, 
  isLoading, 
  messagesEndRef 
}) => {
  // Automatically scroll to the bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, messagesEndRef]);

  return (
    <ScrollArea className="flex-1 px-2 py-4 sm:px-3 md:px-4 bg-white/80 w-full">
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>Start a conversation with Rafiki</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))
        )}
        
        {isLoading && <TypingIndicator />}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
