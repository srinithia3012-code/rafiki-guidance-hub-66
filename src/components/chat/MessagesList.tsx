import React, { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";
import { Message } from "@/types/chat";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface MessagesListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, isLoading, messagesEndRef }) => {
  // If no messages yet, show empty state
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 bg-white/80">
        <div className="h-full flex items-center justify-center text-gray-400">
          <p>No messages yet. Start a conversation!</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-hidden bg-white/80">
      {messages.length <= 10 ? (
        // For smaller message lists, render normally
        <div className="h-full overflow-y-auto p-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        // For larger message lists, use virtualized rendering
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={messages.length + (isLoading ? 1 : 0)}
              itemSize={100} // Approximate height of each message
              initialScrollOffset={messages.length * 100} // Auto-scroll to bottom
            >
              {({ index, style }) => {
                // Check if this is the typing indicator item
                if (isLoading && index === messages.length) {
                  return (
                    <div style={style}>
                      <TypingIndicator />
                    </div>
                  );
                }
                
                // Otherwise render a message
                const message = messages[index];
                return (
                  <div style={style}>
                    <MessageItem key={message.id} message={message} />
                    {index === messages.length - 1 && <div ref={messagesEndRef} />}
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(MessagesList);
