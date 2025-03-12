
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Sparkles } from "lucide-react";

interface MessageInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  setInputValue,
  handleSend,
  handleKeyDown,
  isLoading,
  inputRef,
}) => {
  return (
    <div className="p-3 md:p-4 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="pr-10 py-4 md:py-6 focus-visible:ring-rafiki-500"
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Sparkles className="h-4 w-4 text-rafiki-400" />
          </div>
        </div>
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
          className="bg-rafiki-600 hover:bg-rafiki-700 text-white h-10 w-10 p-0 flex-shrink-0"
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center">
        Rafiki provides general guidance. For serious concerns, please contact professional services.
      </div>
    </div>
  );
};

export default MessageInput;
