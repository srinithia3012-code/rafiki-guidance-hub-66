import { useState, useRef, useEffect } from "react";
import { GuidanceCategory, sendMessageToAI, analyzeSentiment } from "@/services/ai";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Message } from "@/types/chat";
import { getCategoryWelcomeMessage } from "@/utils/chatUtils";
import { User } from "@supabase/supabase-js";
import { getLatestAssessmentByType } from "@/services/assessment";

export function useChat(initialCategory: GuidanceCategory = "general") {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<GuidanceCategory>(initialCategory);
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      setIsCheckingAuth(true);
      try {
        const { data } = await supabase.auth.getSession();
        console.log("Auth session:", data.session);
        setUser(data.session?.user || null);
        
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            console.log("Auth state changed:", session?.user?.email);
            setUser(session?.user || null);
          }
        );
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error checking auth:", error);
        toast.error("Error checking authentication status");
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkUser();
  }, []);

  useEffect(() => {
    const loadAssessmentData = async () => {
      if (!user) return;
      
      try {
        let assessmentType = "";
        if (category === "career") {
          assessmentType = "career";
        } else if (category === "mental_health" || category === "stress_management") {
          assessmentType = "wellbeing";
        } else if (category === "academic") {
          assessmentType = "academic";
        }
        
        if (assessmentType) {
          const result = await getLatestAssessmentByType(user.id, assessmentType);
          if (result) {
            console.log(`Found assessment data for ${assessmentType}:`, result);
            setAssessmentData(result);
          } else {
            console.log(`No assessment data found for ${assessmentType}`);
            setAssessmentData(null);
          }
        }
      } catch (error) {
        console.error("Error loading assessment data:", error);
      }
    };
    
    loadAssessmentData();
  }, [user, category]);

  useEffect(() => {
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
  }, [category, assessmentData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    if (!user) {
      toast.error("Please sign in to use the chat feature");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      category,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      console.log("Sending message with user:", user.email);
      
      const chatHistory = messages
        .filter(msg => msg.id !== "welcome")
        .map(msg => ({
          role: msg.sender === "user" ? "user" as const : "model" as const,
          content: msg.content
        }));

      const sentimentResult = await analyzeSentiment(inputValue);
      userMessage.sentiment = sentimentResult.sentiment as "neutral" | "positive" | "negative";

      let contextMessage = "";
      if (assessmentData && assessmentData.score) {
        contextMessage = getAssessmentPromptContext(assessmentData);
      }

      const response = await sendMessageToAI(
        contextMessage ? `${contextMessage}\n\nUser message: ${inputValue}` : inputValue, 
        category, 
        chatHistory
      );
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text,
        sender: "ai",
        timestamp: new Date(),
        category,
      };

      setMessages((prev) => [...prev, aiMessage]);

      if (sentimentResult.sentiment === "negative" && sentimentResult.score < -0.2) {
        toast.info(
          "Need additional support? Remember that professional help is available. Consider reaching out to your university's counseling services.",
          {
            duration: 8000,
          }
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const getAssessmentPromptContext = (assessment: any) => {
    if (!assessment || !assessment.score) return "";
    
    let contextString = `The user has completed the ${getAssessmentTitle(assessment.assessment_id)} assessment. Here are their results:\n\n`;
    
    if (assessment.assessment_id === "career-personality") {
      contextString += "Career Personality Assessment Results:\n";
    } else if (assessment.assessment_id === "skills-assessment") {
      contextString += "Skills Assessment Results:\n";
    } else if (assessment.assessment_id === "interest-inventory") {
      contextString += "Interest Inventory Results:\n";
    } else if (assessment.assessment_id === "mental-wellbeing") {
      contextString += "Mental Wellbeing Assessment Results:\n";
    }
    
    Object.entries(assessment.score).forEach(([key, value]) => {
      const formattedKey = key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      contextString += `- ${formattedKey}: ${value}%\n`;
    });
    
    contextString += "\nPlease use this assessment data to provide personalized guidance to the user. Do not explicitly mention that you are using their assessment data unless they ask about it.";
    
    return contextString;
  };

  const getAssessmentSummary = (assessment: any) => {
    if (!assessment || !assessment.score) return "";
    
    if (assessment.assessment_id === "career-personality") {
      return "Based on your results, I can provide personalized career guidance aligned with your personality traits.";
    } else if (assessment.assessment_id === "skills-assessment") {
      return "I can offer tailored advice on developing your skills further and how to leverage your strengths.";
    } else if (assessment.assessment_id === "interest-inventory") {
      return "I can suggest career paths and opportunities that align with your interests and passions.";
    } else if (assessment.assessment_id === "mental-wellbeing") {
      return "I can provide personalized wellbeing support based on your assessment results.";
    }
    
    return "I can provide personalized guidance based on your assessment results.";
  };

  const getAssessmentTitle = (assessmentId: string) => {
    switch (assessmentId) {
      case "career-personality":
        return "Career Personality Assessment";
      case "skills-assessment":
        return "Skills Assessment";
      case "interest-inventory":
        return "Interest Inventory";
      case "mental-wellbeing":
        return "Mental Wellbeing Check";
      case "anxiety-screening":
        return "Anxiety Screening";
      case "learning-style":
        return "Learning Style Assessment";
      default:
        return assessmentId;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value as GuidanceCategory;
    setCategory(newCategory);
  };

  const clearChat = () => {
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
    inputValue,
    setInputValue,
    isLoading,
    category,
    user,
    isCheckingAuth,
    messagesEndRef,
    inputRef,
    handleSend,
    handleKeyDown,
    handleCategoryChange,
    clearChat,
    assessmentData,
  };
}
