
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { AssessmentResult } from "@/types/assessment";

interface ResultsDetailsTabProps {
  results: AssessmentResult[];
  getAssessmentTitle: (assessmentId: string) => string;
}

const ResultsDetailsTab: React.FC<ResultsDetailsTabProps> = ({ 
  results, 
  getAssessmentTitle 
}) => {
  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.id} className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {getAssessmentTitle(result.assessment_id)}
            </CardTitle>
            <CardDescription>
              Completed on {format(new Date(result.completed_at), "MMMM d, yyyy 'at' h:mm a")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="font-medium">Key Insights:</p>
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-gray-700">
                {result.score ? (
                  Object.entries(result.score).map(([key, value], index) => (
                    <li key={index}>
                      {key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}: {value}%
                    </li>
                  ))
                ) : (
                  <li>No detailed insights available</li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResultsDetailsTab;
