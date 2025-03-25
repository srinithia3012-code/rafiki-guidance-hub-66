
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { getUserAssessmentResults } from "@/services/assessment";
import { AssessmentResult } from "@/types/assessment";

// Import extracted components
import ResultsLoading from "./ResultsLoading";
import NoResultsFound from "./NoResultsFound";
import ResultsSummaryTab from "./ResultsSummaryTab";
import ResultsDetailsTab from "./ResultsDetailsTab";

// Import utility functions
import { getAssessmentTitle, getChartData } from "@/utils/assessmentUtils";

interface AssessmentResultsProps {
  userId: string;
  category?: "career" | "wellbeing" | "academic";
  maxResults?: number;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ 
  userId, 
  category,
  maxResults = 5
}) => {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<AssessmentResult | null>(null);
  
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const allResults = await getUserAssessmentResults(userId);
        
        // Filter by category if provided
        const filteredResults = category 
          ? allResults.filter(result => {
              if (category === "career") {
                return result.assessment_type === "career";
              } else if (category === "wellbeing") {
                return result.assessment_type === "wellbeing";
              } else if (category === "academic") {
                return result.assessment_type === "academic";
              }
              return true;
            })
          : allResults;
        
        setResults(filteredResults.slice(0, maxResults));
        
        if (filteredResults.length > 0) {
          setSelectedResult(filteredResults[0]);
        }
      } catch (error) {
        console.error("Error fetching assessment results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (userId) {
      fetchResults();
    }
  }, [userId, category, maxResults]);
  
  if (isLoading) {
    return <ResultsLoading />;
  }
  
  if (results.length === 0) {
    return <NoResultsFound />;
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-indigo-500" />
          Assessment Results
        </CardTitle>
        <CardDescription>
          View your recent assessment results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            {selectedResult && (
              <ResultsSummaryTab 
                selectedResult={selectedResult}
                results={results}
                setSelectedResult={setSelectedResult}
                getAssessmentTitle={getAssessmentTitle}
                getChartData={getChartData}
              />
            )}
          </TabsContent>
          
          <TabsContent value="details">
            <ResultsDetailsTab 
              results={results}
              getAssessmentTitle={getAssessmentTitle}
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-center">
          <Button asChild>
            <a href="/assessments">Take Another Assessment</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentResults;
