
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BarChart3, ArrowRight, Heart, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const assessments = [
  {
    id: "personality",
    title: "Career Personality Assessment",
    description: "Discover which career paths align with your personality traits",
    duration: "15 min",
    questions: 45,
    category: "career"
  },
  {
    id: "skills",
    title: "Skills Assessment",
    description: "Identify your strongest skills and areas for improvement",
    duration: "20 min",
    questions: 60,
    category: "career"
  },
  {
    id: "interests",
    title: "Interest Inventory",
    description: "Explore careers that match your interests and passions",
    duration: "10 min",
    questions: 30,
    category: "career"
  },
  {
    id: "wellbeing",
    title: "Mental Wellbeing Assessment",
    description: "Evaluate your stress levels and mental health status",
    duration: "8 min",
    questions: 25,
    category: "wellbeing"
  },
  {
    id: "anxiety",
    title: "Anxiety Screening",
    description: "Screen for anxiety symptoms and get personalized recommendations",
    duration: "5 min",
    questions: 15,
    category: "wellbeing"
  },
  {
    id: "learning",
    title: "Learning Style Assessment",
    description: "Discover your preferred learning style to study more effectively",
    duration: "12 min",
    questions: 35,
    category: "academic"
  }
];

interface SelfAssessmentsSectionProps {
  filter?: string;
  limit?: number;
  title?: string;
  description?: string;
  showAll?: boolean;
}

const SelfAssessmentsSection = ({ 
  filter,
  limit = 3,
  title,
  description,
  showAll = true
}: SelfAssessmentsSectionProps) => {
  // Filter assessments based on category if provided
  const filteredAssessments = filter 
    ? assessments.filter(assessment => assessment.category === filter)
    : assessments;
  
  // Limit the number of displayed assessments if specified
  const displayedAssessments = filteredAssessments.slice(0, limit);
  
  const getIcon = () => {
    if (filter === "wellbeing") return Heart;
    if (filter === "academic") return Lightbulb;
    return Brain;
  };
  
  const Icon = getIcon();
  
  const defaultTitle = filter === "wellbeing" 
    ? "Mental Health Self-Assessments" 
    : filter === "academic"
      ? "Academic Self-Assessments"
      : "Career Self-Assessments";
  
  const defaultDescription = filter === "wellbeing" 
    ? "Take these assessments to understand your mental wellbeing" 
    : filter === "academic"
      ? "Take these assessments to improve your academic performance"
      : "Take these assessments to help guide your career decisions";

  const allAssessmentsLink = filter === "wellbeing" 
    ? "/wellbeing/assessments" 
    : filter === "academic"
      ? "/academic/assessments"
      : "/career/assessments";

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Icon className="mr-2 h-5 w-5 text-purple-500" />
          {title || defaultTitle}
        </CardTitle>
        <CardDescription>
          {description || defaultDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayedAssessments.length > 0 ? (
            displayedAssessments.map((assessment) => (
              <Card key={assessment.id} className="border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{assessment.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {assessment.duration} • {assessment.questions} questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{assessment.description}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/assessments/${assessment.id}`}>
                      Start Assessment
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-6">
              <p className="text-gray-500">No assessments found for this category</p>
            </div>
          )}
        </div>
        
        {showAll && filteredAssessments.length > limit && (
          <div className="mt-4 text-right">
            <Button variant="link" asChild>
              <Link to={allAssessmentsLink}>
                View all assessments
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SelfAssessmentsSection;
