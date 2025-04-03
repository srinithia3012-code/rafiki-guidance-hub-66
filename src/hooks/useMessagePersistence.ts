import { useEffect } from 'react';
import { saveChatHistory, getSavedChatHistory } from '@/services/cache';
import { GuidanceCategory } from '@/services/ai';

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  category?: GuidanceCategory;
}

// Hook for chat message persistence
export const useMessagePersistence = (
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  category: GuidanceCategory,
  userId: string | null,
  shouldRestore: boolean = true
) => {
  // Save messages to localStorage when they change
  useEffect(() => {
    if (userId && messages.length > 0) {
      saveChatHistory(userId, category, messages);
    }
  }, [messages, userId, category]);

  // Restore messages from localStorage when component mounts or category changes
  useEffect(() => {
    if (shouldRestore && userId && messages.length === 0) {
      const savedMessages = getSavedChatHistory<Message>(userId, category);
      if (savedMessages && savedMessages.length > 0) {
        // Update message timestamps to be current Date objects (fixes serialization issues)
        const updatedMessages = savedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(updatedMessages);
      }
    }
  }, [userId, category, shouldRestore, setMessages, messages.length]);

  return {
    clearPersistedMessages: () => {
      if (userId) {
        saveChatHistory(userId, category, []);
      }
    }
  };
}; 