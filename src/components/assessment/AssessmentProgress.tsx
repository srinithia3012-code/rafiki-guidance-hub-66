
import React from "react";
import { Progress } from "@/components/ui/progress";

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

const AssessmentProgress: React.FC<AssessmentProgressProps> = ({
  currentQuestion,
  totalQuestions
}) => {
  const progressPercentage = totalQuestions > 0 
    ? Math.round((currentQuestion / totalQuestions) * 100) 
    : 0;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span className="text-sm">{progressPercentage}% complete</span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-slate-200" 
        indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-600"
      />
    </div>
  );
};

export default AssessmentProgress;
