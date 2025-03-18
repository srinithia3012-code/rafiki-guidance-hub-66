
import { AssessmentResult } from "@/types/assessment";

export const getAssessmentTitle = (assessmentId: string): string => {
  switch (assessmentId) {
    case "career-personality":
      return "Career Personality";
    case "skills-assessment":
      return "Skills Assessment";
    case "interest-inventory":
      return "Interest Inventory";
    case "mental-wellbeing":
      return "Mental Wellbeing";
    case "anxiety-screening":
      return "Anxiety Screening";
    case "learning-style":
      return "Learning Style";
    default:
      return assessmentId;
  }
};

export const getChartData = (result: AssessmentResult) => {
  if (!result.score) return [];
  
  return Object.entries(result.score).map(([key, value]) => ({
    name: key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    value: value
  }));
};
