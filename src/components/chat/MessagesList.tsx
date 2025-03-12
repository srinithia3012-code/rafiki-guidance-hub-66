
import React from "react";
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
  return (
    <ScrollArea className="flex-1 p-2 sm:p-3 md:p-4 bg-white/80 w-full">
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        
        {isLoading && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
