
import { supabase } from "@/integrations/supabase/client";
import { AssessmentQuestion, AssessmentResult } from "@/types/assessment";
import { toast } from "sonner";

// Get random questions from Open Trivia DB (used as placeholder)
export const fetchRandomQuestions = async (
  category: string,
  count: number = 15
): Promise<AssessmentQuestion[]> => {
  try {
    // This is a placeholder API for demonstration. In production, you'd use a
    // specialized assessment API or your own curated questions
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${count}&type=multiple`
    );
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error("Failed to fetch questions");
    }
    
    // Transform the Open Trivia DB format to our AssessmentQuestion format
    return data.results.map((q: any, index: number) => ({
      id: `q-${index}`,
      question: q.question,
      options: [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5),
      type: "multiple_choice",
      correct_answer: q.correct_answer, // For scoring purposes
    }));
  } catch (error) {
    console.error("Error fetching random questions:", error);
    toast.error("Failed to load assessment questions");
    return [];
  }
};

// For career personality questions
export const fetchPersonalityQuestions = async (): Promise<AssessmentQuestion[]> => {
  // In a real app, these would come from your database or a specialized API
  const questions: AssessmentQuestion[] = [
    {
      id: "p1",
      question: "When working on a project, I prefer to:",
      options: [
        "Follow a detailed plan",
        "Adapt as I go",
        "Brainstorm multiple approaches first",
        "Work with others to decide the approach"
      ],
      type: "multiple_choice"
    },
    {
      id: "p2",
      question: "In a group setting, I typically:",
      options: [
        "Take the lead naturally",
        "Contribute ideas but don't need to lead",
        "Focus on supporting the team's goals",
        "Observe first, then participate strategically"
      ],
      type: "multiple_choice"
    },
    {
      id: "p3",
      question: "I feel most energized when:",
      options: [
        "Solving complex problems alone",
        "Collaborating with a team",
        "Working on creative tasks",
        "Organizing and creating structure"
      ],
      type: "multiple_choice"
    },
    {
      id: "p4",
      question: "When faced with a challenge, I typically:",
      options: [
        "Analyze all available information",
        "Trust my intuition and experience",
        "Ask others for their input",
        "Look for creative, unconventional solutions"
      ],
      type: "multiple_choice"
    },
    {
      id: "p5",
      question: "I prefer work environments that are:",
      options: [
        "Structured and organized",
        "Flexible and adaptable",
        "Collaborative and team-oriented",
        "Innovative and changing"
      ],
      type: "multiple_choice"
    },
    {
      id: "p6",
      question: "I am most motivated by:",
      options: [
        "Achieving concrete goals",
        "Helping others",
        "Learning new things",
        "Recognition for my work"
      ],
      type: "multiple_choice"
    },
    {
      id: "p7",
      question: "When communicating, I tend to be:",
      options: [
        "Direct and to the point",
        "Thoughtful and considerate",
        "Enthusiastic and expressive",
        "Careful and precise"
      ],
      type: "multiple_choice"
    },
  ];
  
  // Return at least 15 questions by duplicating if needed
  while (questions.length < 15) {
    const moreQuestions = [...questions].map((q, i) => ({
      ...q,
      id: `${q.id}-dup-${i}`,
      question: `${q.question} (continued)`
    }));
    questions.push(...moreQuestions.slice(0, 15 - questions.length));
  }
  
  return questions;
};

// For skills assessment questions
export const fetchSkillsQuestions = async (): Promise<AssessmentQuestion[]> => {
  const questions: AssessmentQuestion[] = [
    {
      id: "s1",
      question: "Rate your ability to communicate complex ideas clearly:",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      type: "multiple_choice"
    },
    {
      id: "s2",
      question: "How comfortable are you with public speaking?",
      options: ["Not comfortable", "Somewhat comfortable", "Comfortable", "Very comfortable"],
      type: "multiple_choice"
    },
    {
      id: "s3",
      question: "Rate your problem-solving abilities:",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      type: "multiple_choice"
    },
    {
      id: "s4",
      question: "How would you rate your teamwork abilities?",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      type: "multiple_choice"
    },
    {
      id: "s5",
      question: "Rate your ability to manage time effectively:",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      type: "multiple_choice"
    },
    {
      id: "s6",
      question: "How would you rate your leadership capabilities?",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      type: "multiple_choice"
    },
    {
      id: "s7",
      question: "Rate your ability to adapt to new technologies:",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      type: "multiple_choice"
    },
    {
      id: "s8",
      question: "How would you rate your analytical thinking skills?",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      type: "multiple_choice"
    },
  ];
  
  // Return at least 15 questions by duplicating if needed
  while (questions.length < 15) {
    const moreQuestions = [...questions].map((q, i) => ({
      ...q,
      id: `${q.id}-dup-${i}`,
      question: `${q.question} (continued)`
    }));
    questions.push(...moreQuestions.slice(0, 15 - questions.length));
  }
  
  return questions;
};

// For interest inventory questions
export const fetchInterestQuestions = async (): Promise<AssessmentQuestion[]> => {
  const questions: AssessmentQuestion[] = [
    {
      id: "i1",
      question: "How interested are you in designing or creating visual content?",
      options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
      type: "multiple_choice"
    },
    {
      id: "i2",
      question: "How interested are you in analyzing data and finding patterns?",
      options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
      type: "multiple_choice"
    },
    {
      id: "i3",
      question: "How interested are you in teaching or mentoring others?",
      options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
      type: "multiple_choice"
    },
    {
      id: "i4",
      question: "How interested are you in managing projects or teams?",
      options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
      type: "multiple_choice"
    },
    {
      id: "i5",
      question: "How interested are you in writing or content creation?",
      options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
      type: "multiple_choice"
    },
    {
      id: "i6",
      question: "How interested are you in performing or public speaking?",
      options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
      type: "multiple_choice"
    },
    {
      id: "i7",
      question: "How interested are you in researching and exploring new ideas?",
      options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
      type: "multiple_choice"
    },
  ];
  
  // Return at least 15 questions by duplicating if needed
  while (questions.length < 15) {
    const moreQuestions = [...questions].map((q, i) => ({
      ...q,
      id: `${q.id}-dup-${i}`,
      question: `${q.question} (continued)`
    }));
    questions.push(...moreQuestions.slice(0, 15 - questions.length));
  }
  
  return questions;
};

// Store assessment results
export const saveAssessmentResult = async (result: AssessmentResult): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .insert(result)
      .select()
      .single();
    
    if (error) {
      console.error("Error saving assessment result:", error);
      toast.error("Failed to save assessment results");
      return false;
    }
    
    toast.success("Assessment results saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving assessment result:", error);
    toast.error("Failed to save assessment results");
    return false;
  }
};

// Get user's assessment results
export const getUserAssessmentResults = async (userId: string): Promise<AssessmentResult[]> => {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching assessment results:", error);
      return [];
    }
    
    return data as AssessmentResult[];
  } catch (error) {
    console.error("Error fetching assessment results:", error);
    return [];
  }
};

// Get user's latest assessment result by type
export const getLatestAssessmentByType = async (
  userId: string, 
  assessmentType: string
): Promise<AssessmentResult | null> => {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', userId)
      .eq('assessment_type', assessmentType)
      .order('completed_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No results found - this is not an error
        return null;
      }
      console.error("Error fetching assessment result:", error);
      return null;
    }
    
    return data as AssessmentResult;
  } catch (error) {
    console.error("Error fetching assessment result:", error);
    return null;
  }
};
