
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CareerProfile } from "@/services/career";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

interface AICareerRecommendationsProps {
  user: User | null;
  careerProfile: CareerProfile | null;
  isLoading: boolean;
}

const AICareerRecommendations: React.FC<AICareerRecommendationsProps> = ({
  user,
  careerProfile,
  isLoading,
}) => {
  // This would ideally come from an AI recommendation API call
  const getRecommendedCareers = () => {
    if (!careerProfile) return [];
    
    // Simple logic to simulate AI recommendations based on interests and skills
    // In a real implementation, this would come from an AI model
    const recommendations: {title: string; match: number; description: string}[] = [];
    
    if (careerProfile.interests.includes("Data Analysis") || careerProfile.skills.includes("Python")) {
      recommendations.push({
        title: "Data Scientist",
        match: 95,
        description: "Analyze complex data to help organizations make better decisions."
      });
    }
    
    if (careerProfile.interests.includes("Programming") || careerProfile.skills.includes("JavaScript")) {
      recommendations.push({
        title: "Software Developer",
        match: 92,
        description: "Design and build applications for web and mobile platforms."
      });
    }
    
    if (careerProfile.interests.includes("Design") || careerProfile.skills.includes("UX/UI Design")) {
      recommendations.push({
        title: "UX/UI Designer",
        match: 90,
        description: "Create intuitive user experiences for digital products."
      });
    }
    
    if (careerProfile.interests.includes("Research") || careerProfile.skills.includes("Statistical Analysis")) {
      recommendations.push({
        title: "Research Analyst",
        match: 88,
        description: "Conduct research to solve complex problems in various fields."
      });
    }
    
    if (careerProfile.interests.includes("Finance") || careerProfile.preferred_industries.includes("Finance")) {
      recommendations.push({
        title: "Financial Analyst",
        match: 85,
        description: "Assess financial data and market trends to guide investment decisions."
      });
    }
    
    return recommendations.slice(0, 3); // Return top 3 recommendations
  };
  
  const recommendedCareers = careerProfile ? getRecommendedCareers() : [];
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  if (!careerProfile) {
    return null; // Don't show this section if no profile exists
  }
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
          AI Career Recommendations
        </CardTitle>
        <CardDescription>
          Based on your interests, skills, and education background
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recommendedCareers.length > 0 ? (
          <div className="space-y-4">
            {recommendedCareers.map((career, index) => (
              <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div>
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium text-lg mr-2">{career.title}</h3>
                    <Badge variant="secondary">{career.match}% Match</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{career.description}</p>
                </div>
                <Button variant="outline" size="sm">Explore</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-3">We need more information to provide accurate career recommendations.</p>
            <Button>Update Your Profile</Button>
          </div>
        )}
        
        <div className="mt-4 text-right">
          <Button variant="link" asChild>
            <Link to="/career/explore">
              View all recommendations
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICareerRecommendations;
