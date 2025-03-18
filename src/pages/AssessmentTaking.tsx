
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getCurrentUser } from "@/services/supabase";
import { toast } from "sonner";
import { 
  fetchRandomQuestions, 
  fetchPersonalityQuestions,
  fetchSkillsQuestions,
  fetchInterestQuestions,
  saveAssessmentResult 
} from "@/services/assessment";
import { AssessmentQuestion, AssessmentResult } from "@/types/assessment";
import AuthPrompt from "@/components/career/AuthPrompt";

const AssessmentTaking: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
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
        let loadedQuestions: AssessmentQuestion[] = [];
        
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
  }, [assessmentId, navigate]);
  
  // Calculate progress percentage
  const progressPercentage = questions.length > 0 
    ? Math.round((currentQuestion / questions.length) * 100) 
    : 0;
  
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
      // Calculate basic score (in a real app, you'd have more sophisticated scoring)
      const score = calculateScore();
      
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
  
  const calculateScore = () => {
    // Basic scoring - in a real app, this would be more sophisticated
    // For demonstration purposes, we'll just count the answers and create a simple score
    
    const score: Record<string, number> = {};
    
    // For personality assessments
    if (assessmentId === "career-personality") {
      const answerCounts: Record<string, number> = {};
      
      // Count the frequency of each answer
      Object.values(answers).forEach(answer => {
        answerCounts[answer] = (answerCounts[answer] || 0) + 1;
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
  
  const redirectToChat = () => {
    const category = assessmentType === "career" 
      ? "career" 
      : assessmentType === "wellbeing" 
        ? "mental_health" 
        : "academic";
    
    navigate(`/chat?category=${category}`);
  };
  
  // Get assessment title from ID
  function getAssessmentTitle(id: string): string {
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
  }
  
  // Get assessment type from ID
  function getAssessmentType(id: string): string {
    if (id.includes("career") || id.includes("skills") || id.includes("interest")) {
      return "career";
    } else if (id.includes("mental") || id.includes("anxiety") || id.includes("wellbeing")) {
      return "wellbeing";
    } else if (id.includes("learning") || id.includes("academic")) {
      return "academic";
    } else {
      return "general";
    }
  }
  
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
      <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
        <Helmet>
          <title>Assessment Complete | Rafiki AI</title>
        </Helmet>
        
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                Assessment Completed!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">
                Thank you for completing the {assessmentTitle}. Your results have been saved and will be used to provide you with personalized guidance.
              </p>
              
              <div className="flex justify-center items-center my-8">
                <div className="bg-green-100 rounded-full p-8">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              
              <p className="mb-8">
                Would you like to chat with Rafiki AI about your results? Our AI assistant can provide personalized guidance based on your assessment.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => navigate("/assessments")} variant="outline">
                Back to Assessments
              </Button>
              <Button onClick={redirectToChat}>
                Chat with Rafiki AI
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
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
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm">{progressPercentage}% complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        {questions.length > 0 && currentQuestion < questions.length && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={answers[questions[currentQuestion].id] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${index}`} 
                      className="h-5 w-5"
                    />
                    <label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
              
              {!answers[questions[currentQuestion].id] && (
                <Alert className="mt-4" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please select an answer to continue.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                onClick={moveToPreviousQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button 
                onClick={moveToNextQuestion}
                disabled={!answers[questions[currentQuestion].id]}
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Complete Assessment"
                  )
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AssessmentTaking;
