
import { AssessmentResult } from "@/types/assessment";

// Get assessment title
export const getAssessmentTitle = (assessmentId: string) => {
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

// Generate assessment summary for chat context
export const getAssessmentSummary = (assessment: any) => {
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

// Generate prompt context from assessment data
export const getAssessmentPromptContext = (assessment: any) => {
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
  
  // Add score data
  Object.entries(assessment.score).forEach(([key, value]) => {
    const formattedKey = key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    contextString += `- ${formattedKey}: ${value}%\n`;
  });
  
  contextString += "\nPlease use this assessment data to provide personalized guidance to the user. Do not explicitly mention that you are using their assessment data unless they ask about it.";
  
  return contextString;
};

// Transform assessment data for chart visualization
export const getChartData = (result: AssessmentResult) => {
  if (!result.score) return [];
  
  return Object.entries(result.score).map(([key, value]) => {
    // Format key for display (e.g., "problem_solving" -> "Problem Solving")
    const formattedKey = key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      name: formattedKey,
      value: typeof value === 'number' ? value : parseFloat(value)
    };
  });
};

