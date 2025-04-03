import React, { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Check, CircleHelp, User } from "lucide-react";
import { Message } from "@/types/chat";

interface MessageItemProps {
  message: Message;
}

// Component for displaying a single chat message
const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isAI = message.sender === 'ai';
  
  // Format timestamp to readable time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className={`flex items-start gap-3 mb-4 ${isAI ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <Avatar className={`h-8 w-8 ${isAI ? 'bg-primary/10' : 'bg-gray-200'}`}>
        {isAI ? (
          <>
            <AvatarImage src="/icons/logo-small.png" alt="Rafiki AI" />
            <AvatarFallback className="text-primary text-xs">AI</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarFallback className="text-gray-700 text-xs">U</AvatarFallback>
          </>
        )}
      </Avatar>
      
      {/* Message content */}
      <div className={`max-w-[85%] ${isAI ? 'text-left' : 'text-right'}`}>
        <div className={`p-3 rounded-lg ${
          isAI 
            ? 'bg-gray-100 text-gray-800 rounded-tl-none' 
            : 'bg-primary text-white rounded-tr-none'
        }`}>
          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {formatTime(new Date(message.timestamp))}
        </div>
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(MessageItem, (prevProps, nextProps) => {
  // Only re-render if the message ID changes
  return prevProps.message.id === nextProps.message.id && 
         prevProps.message.content === nextProps.message.content;
});
