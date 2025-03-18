
export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  type: "multiple_choice" | "scale" | "text";
}

export interface AssessmentResult {
  id?: string;
  user_id: string;
  assessment_id: string;
  assessment_type: string;
  answers: Record<string, any>;
  score?: Record<string, number>;
  completed_at: string;
  created_at?: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  category: "career" | "wellbeing" | "academic";
  icon?: React.ReactNode;
}
