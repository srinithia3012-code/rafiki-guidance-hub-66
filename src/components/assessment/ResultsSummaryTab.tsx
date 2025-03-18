
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { AssessmentResult } from "@/types/assessment";
import { BarChart2 } from "lucide-react";

interface ResultsSummaryTabProps {
  selectedResult: AssessmentResult;
  results: AssessmentResult[];
  setSelectedResult: (result: AssessmentResult) => void;
  getAssessmentTitle: (assessmentId: string) => string;
  getChartData: (result: AssessmentResult) => Array<{ name: string; value: number }>;
}

const ResultsSummaryTab: React.FC<ResultsSummaryTabProps> = ({
  selectedResult,
  results,
  setSelectedResult,
  getAssessmentTitle,
  getChartData
}) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">
          {getAssessmentTitle(selectedResult.assessment_id)}
        </h3>
        <p className="text-sm text-muted-foreground">
          Completed on {format(new Date(selectedResult.completed_at), "MMMM d, yyyy")}
        </p>
      </div>
      
      {selectedResult.score && Object.keys(selectedResult.score).length > 0 ? (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getChartData(selectedResult)}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="py-4 text-center">
          <BarChart2 className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p>No score data available for this assessment</p>
        </div>
      )}
      
      <div className="mt-4">
        {results.length > 1 && (
          <div className="space-x-2">
            {results.map((result) => (
              <Button
                key={result.id}
                variant={selectedResult.id === result.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedResult(result)}
              >
                {getAssessmentTitle(result.assessment_id)}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsSummaryTab;
