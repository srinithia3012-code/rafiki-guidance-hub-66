
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AssessmentQuestion as AssessmentQuestionType } from "@/types/assessment";

interface AssessmentQuestionProps {
  question: AssessmentQuestionType;
  currentAnswer: string;
  onAnswerChange: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
  onPrevious,
  onNext,
  isFirst,
  isLast,
  isSubmitting
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={currentAnswer || ""}
          onValueChange={onAnswerChange}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
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
        
        {!currentAnswer && (
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
          onClick={onPrevious}
          disabled={isFirst}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!currentAnswer}
        >
          {!isLast ? (
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
  );
};

export default AssessmentQuestion;
