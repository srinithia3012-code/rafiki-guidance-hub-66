
import { GuidanceCategory } from "@/services/ai";

export const getCategoryWelcomeMessage = (category: GuidanceCategory): string => {
  const welcomeMessages: Record<GuidanceCategory, string> = {
    career: "Hi there! I'm Rafiki, your AI career advisor. I can help with career planning, job searches, resume building, and interview preparation. What career-related questions do you have today?",
    academic: "Hello! I'm Rafiki, your AI academic advisor. I can help with study strategies, course selections, research skills, and academic planning. How can I assist with your academic journey today?",
    mental_health: "Hi, I'm Rafiki, your AI wellbeing assistant. I'm here to provide support for emotional challenges, stress, and mental wellness. Remember, while I can offer guidance, I'm not a replacement for professional mental health services. How are you feeling today?",
    stress_management: "Hello! I'm Rafiki, your AI stress management coach. I can suggest techniques for managing academic pressure, anxiety, and building resilience. What's causing you stress right now?",
    general: "Hello! I'm Rafiki, your AI guidance counselor. I'm here to help with academics, career planning, and personal wellbeing. What would you like guidance on today?",
  };
  return welcomeMessages[category];
};
