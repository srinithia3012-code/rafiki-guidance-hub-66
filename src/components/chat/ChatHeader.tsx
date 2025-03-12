
import React from "react";
import { GuidanceCategory } from "@/services/ai";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  category: GuidanceCategory;
  onCategoryChange: (value: string) => void;
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  category,
  onCategoryChange,
  onClearChat,
}) => {
  const categories = {
    general: "General Guidance",
    career: "Career Advice",
    academic: "Academic Support",
    mental_health: "Mental Health",
    stress_management: "Stress Management",
  };

  return (
    <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 text-gray-700"
              size="sm"
            >
              {categories[category]}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {Object.entries(categories).map(([value, label]) => (
              <DropdownMenuItem
                key={value}
                onClick={() => onCategoryChange(value)}
                className="flex items-center justify-between"
              >
                {label}
                {value === category && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClearChat}
        className="text-gray-500 hover:text-gray-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatHeader;
