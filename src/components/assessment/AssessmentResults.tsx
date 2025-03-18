
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { getUserAssessmentResults } from "@/services/assessment";
import { AssessmentResult } from "@/types/assessment";
import { FileText, BarChart2 } from "lucide-react";

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
  
  const getChartData = (result: AssessmentResult) => {
    if (!result.score) return [];
    
    return Object.entries(result.score).map(([key, value]) => ({
      name: key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      value: value
    }));
  };
  
  const getAssessmentTitle = (assessmentId: string) => {
    switch (assessmentId) {
      case "career-personality":
        return "Career Personality";
      case "skills-assessment":
        return "Skills Assessment";
      case "interest-inventory":
        return "Interest Inventory";
      case "mental-wellbeing":
        return "Mental Wellbeing";
      case "anxiety-screening":
        return "Anxiety Screening";
      case "learning-style":
        return "Learning Style";
      default:
        return assessmentId;
    }
  };
  
  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
          <CardDescription>Loading your assessment results...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rafiki-600"></div>
        </CardContent>
      </Card>
    );
  }
  
  if (results.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
          <CardDescription>
            You haven't completed any assessments yet
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="mb-4">
            Take some assessments to get personalized guidance from Rafiki AI
          </p>
          <Button asChild>
            <a href="/assessments">Take an Assessment</a>
          </Button>
        </CardContent>
      </Card>
    );
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
                      {results.map((result, index) => (
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
            )}
          </TabsContent>
          
          <TabsContent value="details">
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
