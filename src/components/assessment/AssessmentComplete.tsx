
import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface AssessmentCompleteProps {
  assessmentTitle: string;
  assessmentType: string;
}

const AssessmentComplete: React.FC<AssessmentCompleteProps> = ({ 
  assessmentTitle, 
  assessmentType 
}) => {
  const navigate = useNavigate();
  
  const redirectToChat = () => {
    const category = assessmentType === "career" 
      ? "career" 
      : assessmentType === "wellbeing" 
        ? "mental_health" 
        : "academic";
    
    navigate(`/chat?category=${category}`);
  };
  
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
};

export default AssessmentComplete;
