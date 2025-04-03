import { useState, useRef, useEffect } from "react";
import { GuidanceCategory } from "@/services/ai";
import { Message } from "@/types/chat";
import { getCategoryWelcomeMessage } from "@/utils/chatUtils";
import { getAssessmentSummary, getAssessmentTitle } from "@/utils/assessmentUtils";

export function useMessages(category: GuidanceCategory, assessmentData: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add welcome message with assessment data
  useEffect(() => {
    // Only set welcome message if there are no messages yet
    if (messages.length === 0) {
      // Create base welcome message
      let welcomeMessage = getCategoryWelcomeMessage(category);
      
      // Add assessment data context if available
      if (assessmentData) {
        const assessmentInfo = getAssessmentSummary(assessmentData);
        if (assessmentInfo) {
          welcomeMessage += `\n\nI can see you've completed the ${getAssessmentTitle(assessmentData.assessment_id)} recently. ${assessmentInfo}`;
        }
      }
      
      setMessages([{
        id: "welcome",
        content: welcomeMessage,
        sender: "ai",
        timestamp: new Date(),
        category,
      }]);
    }
  }, [category, assessmentData, messages.length]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearMessages = () => {
    // Create welcome message with assessment data if available
    let welcomeMessage = getCategoryWelcomeMessage(category);
    
    if (assessmentData) {
      const assessmentInfo = getAssessmentSummary(assessmentData);
      if (assessmentInfo) {
        welcomeMessage += `\n\nI can see you've completed the ${getAssessmentTitle(assessmentData.assessment_id)} recently. ${assessmentInfo}`;
      }
    }
    
    setMessages([{
      id: "welcome",
      content: welcomeMessage,
      sender: "ai",
      timestamp: new Date(),
      category,
    }]);
  };

  return { 
    messages, 
    setMessages, 
    messagesEndRef, 
    clearMessages
  };
}
