
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/chat";
import { GuidanceCategory } from "@/services/ai";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";

interface MessageItemProps {
  message: Message;
  onRetry?: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onRetry }) => {
  // Helper function to get category-specific avatar color
  const getCategoryColor = (category?: GuidanceCategory) => {
    switch (category) {
      case "career":
        return "bg-blue-100";
      case "academic":
        return "bg-purple-100";
      case "mental_health":
        return "bg-rose-100";
      case "stress_management":
        return "bg-orange-100";
      default:
        return "bg-rafiki-100";
    }
  };

  const avatarClass = message.sender === "ai" ? getCategoryColor(message.category) : "bg-gray-100";
  
  const AvatarContent = () => {
    if (message.sender === "ai") {
      return (
        <div className={`${avatarClass} rounded-full p-1 flex items-center justify-center`}>
          <span className="text-rafiki-600 font-semibold text-sm">AI</span>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-100 rounded-full p-1 flex items-center justify-center">
          <span className="text-gray-600 font-semibold text-sm">You</span>
        </div>
      );
    }
  };

  return (
    <div className={`flex gap-3 ${message.sender === "user" ? "justify-end flex-row-reverse" : "justify-start"}`}>
      <Avatar className="h-8 w-8">
        <AvatarFallback>{message.sender === "ai" ? "AI" : "U"}</AvatarFallback>
        <AvatarContent />
      </Avatar>
      
      <div className="space-y-1 max-w-[80%]">
        {message.error ? (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 py-2 px-3 rounded-lg text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {message.content}
              {onRetry && (
                <button 
                  onClick={onRetry}
                  className="ml-2 inline-flex items-center text-xs font-medium text-red-700 hover:text-red-900"
                >
                  <RefreshCw className="h-3 w-3 mr-1" /> Retry
                </button>
              )}
            </AlertDescription>
          </Alert>
        ) : message.fallback ? (
          <div className={`p-3 rounded-lg text-sm ${message.sender === "user" ? "bg-rafiki-600 text-white" : "bg-blue-50 border border-blue-100"}`}>
            <div className="flex items-start">
              <div className="flex-1">
                {message.content}
                <div className="text-xs mt-1 opacity-75">
                  (Using offline response mode)
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`p-3 rounded-lg text-sm ${message.sender === "user" ? "bg-rafiki-600 text-white" : "bg-gray-100"}`}>
            {message.content}
          </div>
        )}
        
        <div className={`text-xs ${message.sender === "user" ? "text-right" : ""} text-gray-500`}>
          {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
