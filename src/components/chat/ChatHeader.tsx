
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuidanceCategory } from "@/services/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatHeaderProps {
  category: GuidanceCategory;
  onCategoryChange: (value: string) => void;
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  category, 
  onCategoryChange, 
  onClearChat 
}) => {
  return (
    <div className="bg-rafiki-600 text-white p-3 md:p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2 md:space-x-3">
        <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-white/20">
          <AvatarImage src="/placeholder.svg" alt="Rafiki AI" />
          <AvatarFallback className="bg-rafiki-700 text-white">
            <Bot className="h-4 w-4 md:h-5 md:w-5" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-sm md:text-base">Rafiki AI Assistant</h3>
          <div className="flex items-center text-xs text-white/80">
            <span className="flex h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
            Online
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1 md:space-x-2">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="bg-white/10 border-none text-white w-24 md:w-40 h-8 text-xs">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Guidance</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="career">Career</SelectItem>
            <SelectItem value="mental_health">Mental Health</SelectItem>
            <SelectItem value="stress_management">Stress Management</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20 h-8 w-8"
          onClick={onClearChat}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
