
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Check, CircleHelp, User } from "lucide-react";
import { Message } from "@/types/chat";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isAI = message.sender === "ai";
  
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div className="flex max-w-[85%] md:max-w-[70%]">
        {isAI && (
          <Avatar className="h-8 w-8 md:h-9 md:w-9 mr-2 mt-1 flex-shrink-0">
            <AvatarFallback className="bg-rafiki-100 text-rafiki-700">
              <Bot className="h-3 w-3 md:h-4 md:w-4" />
            </AvatarFallback>
          </Avatar>
        )}
        
        <div
          className={`rounded-2xl p-3 md:p-4 ${
            isAI
              ? "bg-gray-100 text-gray-800 rounded-tl-none"
              : "bg-rafiki-600 text-white rounded-tr-none"
          }`}
        >
          <div className="text-xs md:text-sm whitespace-pre-wrap">{message.content}</div>
          <div className="mt-1 flex justify-end items-center">
            <span className="text-xs opacity-60">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            {!isAI && message.sentiment && (
              <div className="ml-1.5">
                {message.sentiment === "positive" && (
                  <div className="bg-green-100 text-green-800 text-xs rounded-full px-1.5 py-0.5">
                    <Check className="h-3 w-3 inline-block" />
                  </div>
                )}
                {message.sentiment === "negative" && (
                  <div className="bg-red-100 text-red-800 text-xs rounded-full px-1.5 py-0.5">
                    <CircleHelp className="h-3 w-3 inline-block" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {!isAI && (
          <Avatar className="h-8 w-8 md:h-9 md:w-9 ml-2 mt-1 flex-shrink-0">
            <AvatarFallback className="bg-gray-200">
              <User className="h-3 w-3 md:h-4 md:w-4" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
