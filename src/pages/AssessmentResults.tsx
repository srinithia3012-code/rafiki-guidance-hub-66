
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/services/supabase";
import { AssessmentResult } from "@/types/assessment";
import { toast } from "sonner";
import AuthPrompt from "@/components/career/AuthPrompt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserAssessmentResults } from "@/services/assessment";
import ResultsLoading from "@/components/assessment/ResultsLoading";
import NoResultsFound from "@/components/assessment/NoResultsFound";
import ResultsSummaryTab from "@/components/assessment/ResultsSummaryTab";
import ResultsDetailsTab from "@/components/assessment/ResultsDetailsTab";
import { getAssessmentTitle, getChartData } from "@/utils/assessmentUtils";

const AssessmentResults: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<AssessmentResult | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          const allResults = await getUserAssessmentResults(currentUser.id);
          setResults(allResults);
          
          if (allResults.length > 0) {
            setSelectedResult(allResults[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching user or results:", error);
        toast.error("Failed to load assessment results");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ResultsLoading />
      </div>
    );
  }

  if (!user) {
    return <AuthPrompt />;
  }
  
  if (results.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)} 
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Assessment Results</h1>
          </div>
          
          <NoResultsFound />
          
          <div className="text-center mt-8">
            <Button asChild>
              <a href="/assessments">Take Your First Assessment</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <Helmet>
        <title>Assessment Results | Rafiki AI</title>
        <meta name="description" content="View your assessment results and insights" />
      </Helmet>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Assessment Results</h1>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-indigo-500" />
                Your Assessment Results
              </CardTitle>
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
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;
