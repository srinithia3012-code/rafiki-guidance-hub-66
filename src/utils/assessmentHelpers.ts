
import { AssessmentResult } from "@/types/assessment";

export const getAssessmentTitle = (id: string): string => {
  switch (id) {
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
      return "Assessment";
  }
};

export const getAssessmentType = (id: string): string => {
  if (id.includes("career") || id.includes("skills") || id.includes("interest")) {
    return "career";
  } else if (id.includes("mental") || id.includes("anxiety") || id.includes("wellbeing")) {
    return "wellbeing";
  } else if (id.includes("learning") || id.includes("academic")) {
    return "academic";
  } else {
    return "general";
  }
};

export const calculateAssessmentScore = (
  assessmentId: string,
  answers: Record<string, any>
): Record<string, number> => {
  const score: Record<string, number> = {};
  
  // For personality assessments
  if (assessmentId === "career-personality") {
    const answerCounts: Record<string, number> = {};
    
    // Count the frequency of each answer
    Object.values(answers).forEach(answer => {
      answerCounts[answer as string] = (answerCounts[answer as string] || 0) + 1;
    });
    
    // Normalize to a 0-100 scale
    const totalAnswers = Object.keys(answers).length;
    
    Object.entries(answerCounts).forEach(([answer, count]) => {
      score[answer] = Math.round((count / totalAnswers) * 100);
    });
    
    // Add some trait scores for demonstration
    score["analytical"] = Math.round(Math.random() * 40) + 60; // 60-100
    score["creative"] = Math.round(Math.random() * 40) + 60;  // 60-100
    score["leadership"] = Math.round(Math.random() * 40) + 60; // 60-100
    score["teamwork"] = Math.round(Math.random() * 40) + 60;  // 60-100
  } 
  // For skills assessment
  else if (assessmentId === "skills-assessment") {
    // Map answers to skill levels
    const skillLevels: Record<string, number> = {
      "Beginner": 25,
      "Intermediate": 50,
      "Advanced": 75,
      "Expert": 100
    };
    
    // Calculate average skill levels
    let communicationSum = 0;
    let problemSolvingSum = 0;
    let leadershipSum = 0;
    let technicalSum = 0;
    let count = 0;
    
    Object.entries(answers).forEach(([_, answer]) => {
      const level = skillLevels[answer as string] || 0;
      communicationSum += level * Math.random();
      problemSolvingSum += level * Math.random();
      leadershipSum += level * Math.random();
      technicalSum += level * Math.random();
      count++;
    });
    
    if (count > 0) {
      score["communication"] = Math.round(communicationSum / count);
      score["problem_solving"] = Math.round(problemSolvingSum / count);
      score["leadership"] = Math.round(leadershipSum / count);
      score["technical"] = Math.round(technicalSum / count);
    }
  }
  // For interest inventory
  else if (assessmentId === "interest-inventory") {
    // Map answers to interest levels
    const interestLevels: Record<string, number> = {
      "Not interested": 0,
      "Somewhat interested": 33,
      "Interested": 66,
      "Very interested": 100
    };
    
    // Calculate interest scores for different categories
    let creativeSum = 0;
    let analyticalSum = 0;
    let socialSum = 0;
    let enterprisingSum = 0;
    let count = 0;
    
    Object.entries(answers).forEach(([_, answer]) => {
      const level = interestLevels[answer as string] || 0;
      creativeSum += level * Math.random();
      analyticalSum += level * Math.random();
      socialSum += level * Math.random();
      enterprisingSum += level * Math.random();
      count++;
    });
    
    if (count > 0) {
      score["creative"] = Math.round(creativeSum / count);
      score["analytical"] = Math.round(analyticalSum / count);
      score["social"] = Math.round(socialSum / count);
      score["enterprising"] = Math.round(enterprisingSum / count);
    }
  }
  
  return score;
};
