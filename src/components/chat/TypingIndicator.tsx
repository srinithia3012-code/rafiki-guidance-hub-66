
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Clock } from "lucide-react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[85%] md:max-w-[70%]">
        <Avatar className="h-8 w-8 md:h-9 md:w-9 mr-2 mt-1 flex-shrink-0">
          <AvatarFallback className="bg-rafiki-100 text-rafiki-700">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="rounded-2xl p-3 md:p-4 bg-gray-100 text-gray-800 rounded-tl-none">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-rafiki-600 animate-pulse" />
            <span className="text-xs md:text-sm loading-dots">Typing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
