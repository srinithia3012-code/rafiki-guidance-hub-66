
import { supabase } from "@/integrations/supabase/client";
import { Assessment, AssessmentQuestion, AssessmentResult } from "@/types/assessment";
import { toast } from "sonner";

// Sample assessments
export const ASSESSMENTS: Assessment[] = [
  {
    id: "career-personality",
    title: "Career Personality",
    description: "Discover your work style and career preferences",
    duration: "10-15 min",
    questions: 15,
    category: "career",
  },
  {
    id: "skills-assessment",
    title: "Skills Assessment",
    description: "Identify your strengths and areas for development",
    duration: "5-10 min",
    questions: 15,
    category: "career",
  },
  {
    id: "interest-inventory",
    title: "Interest Inventory",
    description: "Explore your interests and potential career paths",
    duration: "8-12 min",
    questions: 15,
    category: "career",
  },
  {
    id: "mental-wellbeing",
    title: "Mental Wellbeing Check",
    description: "Assess your current mental health and wellbeing",
    duration: "8-10 min",
    questions: 15,
    category: "wellbeing",
  },
  {
    id: "anxiety-screening",
    title: "Anxiety Screening",
    description: "Check your anxiety levels and get guidance",
    duration: "5-7 min",
    questions: 15,
    category: "wellbeing",
  },
  {
    id: "learning-style",
    title: "Learning Style Assessment",
    description: "Discover how you learn best for academic success",
    duration: "7-10 min",
    questions: 15,
    category: "academic",
  },
];

// Sample personality assessment questions
const personalityQuestions: AssessmentQuestion[] = [
  {
    id: "p1",
    question: "How do you feel about working in teams?",
    options: [
      "I thrive in collaborative environments",
      "I prefer a mix of team and individual work",
      "I prefer working independently most of the time",
      "I strongly prefer working alone"
    ],
    type: "multiple_choice"
  },
  {
    id: "p2",
    question: "When solving problems, do you prefer:",
    options: [
      "Following established procedures",
      "Adapting existing methods to the situation",
      "Creating new approaches",
      "Experimenting with multiple solutions"
    ],
    type: "multiple_choice"
  },
  {
    id: "p3",
    question: "How do you handle deadlines?",
    options: [
      "I work steadily and finish well ahead of time",
      "I create a schedule and stick to it",
      "I work in bursts of productivity",
      "I work best under pressure near the deadline"
    ],
    type: "multiple_choice"
  },
  {
    id: "p4",
    question: "In a leadership role, which approach do you prefer?",
    options: [
      "Providing clear direction and structure",
      "Coaching and supporting team members",
      "Inspiring and motivating others",
      "Leading by example"
    ],
    type: "multiple_choice"
  },
  {
    id: "p5",
    question: "How do you prefer to communicate at work?",
    options: [
      "Written communication (email, documents)",
      "One-on-one conversations",
      "Group discussions or meetings",
      "Visual communication (charts, presentations)"
    ],
    type: "multiple_choice"
  },
  {
    id: "p6",
    question: "When learning something new, you prefer:",
    options: [
      "Reading instructions or manuals",
      "Watching demonstrations",
      "Hands-on practice",
      "Discussing with others"
    ],
    type: "multiple_choice"
  },
  {
    id: "p7",
    question: "How do you handle criticism?",
    options: [
      "I appreciate detailed feedback for improvement",
      "I prefer constructive criticism delivered privately",
      "I sometimes get defensive but reflect later",
      "I find it difficult to receive criticism"
    ],
    type: "multiple_choice"
  },
  {
    id: "p8",
    question: "Which work environment do you prefer?",
    options: [
      "Structured with clear expectations",
      "Collaborative with team interaction",
      "Dynamic and fast-paced",
      "Creative and flexible"
    ],
    type: "multiple_choice"
  },
  {
    id: "p9",
    question: "When making decisions, you typically:",
    options: [
      "Rely on data and logical analysis",
      "Consider the impact on people involved",
      "Trust your intuition and experience",
      "Weigh multiple perspectives before deciding"
    ],
    type: "multiple_choice"
  },
  {
    id: "p10",
    question: "How do you handle workplace changes?",
    options: [
      "I prefer stability and may resist change",
      "I adapt if given time and information",
      "I accept change as necessary",
      "I embrace change and new opportunities"
    ],
    type: "multiple_choice"
  },
  {
    id: "p11",
    question: "When working on projects, you prefer:",
    options: [
      "Focusing on one task until completion",
      "Working on a few related tasks",
      "Multitasking across various responsibilities",
      "Switching between tasks based on priorities"
    ],
    type: "multiple_choice"
  },
  {
    id: "p12",
    question: "Your approach to risk is:",
    options: [
      "Very cautious, preferring to avoid risks",
      "Calculated risks after careful consideration",
      "Comfortable with moderate risk-taking",
      "Embracing risks as opportunities"
    ],
    type: "multiple_choice"
  },
  {
    id: "p13",
    question: "How do you handle stress at work?",
    options: [
      "I stay organized to prevent stress",
      "I take breaks and practice self-care",
      "I talk through issues with colleagues",
      "I focus on solutions rather than problems"
    ],
    type: "multiple_choice"
  },
  {
    id: "p14",
    question: "Your ideal career would offer:",
    options: [
      "Stability and security",
      "Growth and advancement opportunities",
      "Creativity and innovation",
      "Purpose and meaning"
    ],
    type: "multiple_choice"
  },
  {
    id: "p15",
    question: "How important is work-life balance to you?",
    options: [
      "Very important - I strictly separate work and personal life",
      "Important - I try to maintain boundaries",
      "Somewhat important - I'm flexible when needed",
      "Less important - I often blend work and personal life"
    ],
    type: "multiple_choice"
  },
];

// Sample skills assessment questions
const skillsQuestions: AssessmentQuestion[] = [
  {
    id: "s1",
    question: "Rate your communication skills:",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s2",
    question: "How would you rate your problem-solving abilities?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s3",
    question: "Rate your organizational skills:",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s4",
    question: "How proficient are you with technology and digital tools?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s5",
    question: "Rate your leadership abilities:",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s6",
    question: "How would you rate your time management skills?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s7",
    question: "Rate your analytical thinking skills:",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s8",
    question: "How would you rate your teamwork abilities?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s9",
    question: "Rate your creativity and innovation skills:",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s10",
    question: "How would you rate your adaptability?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s11",
    question: "Rate your research skills:",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s12",
    question: "How would you rate your negotiation skills?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s13",
    question: "Rate your conflict resolution abilities:",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s14",
    question: "How would you rate your project management skills?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
  {
    id: "s15",
    question: "Rate your public speaking abilities:",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "multiple_choice"
  },
];

// Sample interest inventory questions
const interestQuestions: AssessmentQuestion[] = [
  {
    id: "i1",
    question: "How interested are you in analyzing data and statistics?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i2",
    question: "How interested are you in designing or creating visual artwork?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i3",
    question: "How interested are you in helping others with their problems?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i4",
    question: "How interested are you in leading or managing teams?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i5",
    question: "How interested are you in working with technology and computers?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i6",
    question: "How interested are you in teaching or training others?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i7",
    question: "How interested are you in writing or editing content?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i8",
    question: "How interested are you in organizing and planning events?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i9",
    question: "How interested are you in scientific research?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i10",
    question: "How interested are you in performing or entertaining?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i11",
    question: "How interested are you in starting or running a business?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i12",
    question: "How interested are you in working outdoors or with nature?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i13",
    question: "How interested are you in building or fixing things?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i14",
    question: "How interested are you in healthcare or medical fields?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
  {
    id: "i15",
    question: "How interested are you in legal work or policy making?",
    options: ["Not interested", "Somewhat interested", "Interested", "Very interested"],
    type: "multiple_choice"
  },
];

// Get all assessments
export const getAssessments = (category?: "career" | "wellbeing" | "academic"): Assessment[] => {
  if (category) {
    return ASSESSMENTS.filter(assessment => assessment.category === category);
  }
  return ASSESSMENTS;
};

// Fetch personality assessment questions
export const fetchPersonalityQuestions = async (): Promise<AssessmentQuestion[]> => {
  return personalityQuestions;
};

// Fetch skills assessment questions
export const fetchSkillsQuestions = async (): Promise<AssessmentQuestion[]> => {
  return skillsQuestions;
};

// Fetch interest inventory questions
export const fetchInterestQuestions = async (): Promise<AssessmentQuestion[]> => {
  return interestQuestions;
};

// Fetch random questions for an assessment
export const fetchRandomQuestions = async (
  category: string, 
  count: number = 15
): Promise<AssessmentQuestion[]> => {
  // For now, return random questions from our predefined sets based on category
  let questionPool: AssessmentQuestion[] = [];
  
  switch (category) {
    case "career":
      questionPool = [...personalityQuestions, ...skillsQuestions, ...interestQuestions];
      break;
    case "wellbeing":
      // In a real app, we'd have wellbeing-specific questions
      questionPool = personalityQuestions.map(q => ({...q, id: `w${q.id.slice(1)}`}));
      break;
    case "academic":
      // In a real app, we'd have academic-specific questions
      questionPool = skillsQuestions.map(q => ({...q, id: `a${q.id.slice(1)}`}));
      break;
    default:
      questionPool = [...personalityQuestions, ...skillsQuestions, ...interestQuestions];
  }
  
  // Shuffle and slice to get random questions
  return questionPool
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

// Save an assessment result to Supabase
export const saveAssessmentResult = async (result: AssessmentResult): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('assessment_results')
      .insert(result);
    
    if (error) {
      console.error("Error saving assessment result:", error);
      toast.error("Failed to save assessment result");
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Exception saving assessment result:", err);
    toast.error("An error occurred while saving your assessment");
    return false;
  }
};

// Get all assessment results for a user
export const getUserAssessmentResults = async (userId: string): Promise<AssessmentResult[]> => {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching assessment results:", error);
      throw error;
    }
    
    return data as AssessmentResult[];
  } catch (err) {
    console.error("Exception fetching assessment results:", err);
    return [];
  }
};

// Get a specific assessment result
export const getAssessmentResult = async (resultId: string): Promise<AssessmentResult | null> => {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('id', resultId)
      .single();
    
    if (error) {
      console.error("Error fetching assessment result:", error);
      return null;
    }
    
    return data as AssessmentResult;
  } catch (err) {
    console.error("Exception fetching assessment result:", err);
    return null;
  }
};

// Get the latest assessment result of a specific type for a user
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
        // No data found - this is not really an error
        return null;
      }
      console.error("Error fetching latest assessment:", error);
      return null;
    }
    
    return data as AssessmentResult;
  } catch (err) {
    console.error("Exception fetching latest assessment:", err);
    return null;
  }
};
