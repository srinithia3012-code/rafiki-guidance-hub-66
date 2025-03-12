
import { GuidanceCategory } from "@/services/ai";

export const getCategoryWelcomeMessage = (category: GuidanceCategory): string => {
  switch (category) {
    case "academic":
      return "Hello! I'm Rafiki, your academic guidance assistant. I can help you with study strategies, academic planning, and educational resources. What academic questions do you have today?";
    
    case "career":
      return "Hello! I'm Rafiki, your career guidance assistant. I can help with career planning, job search strategies, and professional development. What career questions can I help you with?";
    
    case "mental_health":
      return "Hello! I'm Rafiki, here to support your mental wellbeing. I can provide resources, coping strategies, and guidance for maintaining good mental health. How can I support you today?";
    
    case "stress_management":
      return "Hello! I'm Rafiki, your stress management guide. I can help with relaxation techniques, time management, and ways to reduce stress. What's causing you stress that I can help with?";
    
    case "general":
    default:
      return "Hello! I'm Rafiki, your AI guidance counselor. I'm here to assist with academic, career, and wellbeing questions. How can I help you today?";
  }
};
