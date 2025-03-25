
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/services/supabase";
import { toast } from "sonner";
import { 
  fetchRandomQuestions, 
  fetchPersonalityQuestions,
  fetchSkillsQuestions,
  fetchInterestQuestions,
  saveAssessmentResult 
} from "@/services/assessment";
import { AssessmentQuestion as AssessmentQuestionType, AssessmentResult } from "@/types/assessment";
import AuthPrompt from "@/components/career/AuthPrompt";
import AssessmentProgress from "@/components/assessment/AssessmentProgress";
import AssessmentQuestion from "@/components/assessment/AssessmentQuestion";
import AssessmentComplete from "@/components/assessment/AssessmentComplete";
import { getAssessmentTitle, getAssessmentType, calculateAssessmentScore } from "@/utils/assessmentHelpers";

const AssessmentTaking: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<AssessmentQuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  
  const assessmentTitle = getAssessmentTitle(assessmentId || "");
  const assessmentType = getAssessmentType(assessmentId || "");
  
  // Load questions based on assessment type
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          setIsLoading(false);
          return;
        }
        
        setUser(currentUser);
        
        // Load different question sets based on assessment ID
        let loadedQuestions: AssessmentQuestionType[] = [];
        
        if (assessmentId === "career-personality") {
          loadedQuestions = await fetchPersonalityQuestions();
        } else if (assessmentId === "skills-assessment") {
          loadedQuestions = await fetchSkillsQuestions();
        } else if (assessmentId === "interest-inventory") {
          loadedQuestions = await fetchInterestQuestions();
        } else {
          // Default to random questions for demonstration
          loadedQuestions = await fetchRandomQuestions(assessmentType, 15);
        }
        
        if (loadedQuestions.length === 0) {
          toast.error("Failed to load assessment questions");
          navigate("/assessments");
          return;
        }
        
        // Limit to 15 questions for this demo
        setQuestions(loadedQuestions.slice(0, 15));
      } catch (error) {
        console.error("Error loading assessment:", error);
        toast.error("Failed to load assessment");
        navigate("/assessments");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (assessmentId) {
      loadData();
    } else {
      navigate("/assessments");
    }
  }, [assessmentId, navigate, assessmentType]);
  
  const handleAnswer = (value: string) => {
    const questionId = questions[currentQuestion]?.id;
    if (questionId) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
  };
  
  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };
  
  const moveToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const completeAssessment = async () => {
    if (!user) {
      toast.error("Please sign in to save your results");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Calculate score
      const score = calculateAssessmentScore(assessmentId || "", answers);
      
      const result: AssessmentResult = {
        user_id: user.id,
        assessment_id: assessmentId || "",
        assessment_type: assessmentType,
        answers,
        score,
        completed_at: new Date().toISOString(),
      };
      
      const success = await saveAssessmentResult(result);
      
      if (success) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Error completing assessment:", error);
      toast.error("Failed to save assessment results");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rafiki-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPrompt />;
  }
  
  if (isCompleted) {
    return (
      <AssessmentComplete 
        assessmentTitle={assessmentTitle} 
        assessmentType={assessmentType} 
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <Helmet>
        <title>{assessmentTitle} | Rafiki AI</title>
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/assessments")} 
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Assessments
          </Button>
          <h1 className="text-2xl font-bold">{assessmentTitle}</h1>
        </div>
        
        <AssessmentProgress 
          currentQuestion={currentQuestion} 
          totalQuestions={questions.length} 
        />
        
        {questions.length > 0 && currentQuestion < questions.length && (
          <AssessmentQuestion
            question={questions[currentQuestion]}
            currentAnswer={answers[questions[currentQuestion].id] || ""}
            onAnswerChange={handleAnswer}
            onPrevious={moveToPreviousQuestion}
            onNext={moveToNextQuestion}
            isFirst={currentQuestion === 0}
            isLast={currentQuestion === questions.length - 1}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default AssessmentTaking;
