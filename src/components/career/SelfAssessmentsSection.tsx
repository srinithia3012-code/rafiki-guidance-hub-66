
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BarChart3, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const assessments = [
  {
    id: "personality",
    title: "Career Personality Assessment",
    description: "Discover which career paths align with your personality traits",
    duration: "15 min",
    questions: 45,
  },
  {
    id: "skills",
    title: "Skills Assessment",
    description: "Identify your strongest skills and areas for improvement",
    duration: "20 min",
    questions: 60,
  },
  {
    id: "interests",
    title: "Interest Inventory",
    description: "Explore careers that match your interests and passions",
    duration: "10 min",
    questions: 30,
  },
  {
    id: "wellbeing",
    title: "Mental Wellbeing Assessment",
    description: "Evaluate your stress levels and mental health status",
    duration: "8 min",
    questions: 25,
    category: "wellbeing"
  }
];

const SelfAssessmentsSection = ({ filter }: { filter?: string }) => {
  // Filter assessments based on category if provided
  const filteredAssessments = filter 
    ? assessments.filter(assessment => assessment.category === filter)
    : assessments;
  
  const displayedAssessments = filteredAssessments.length > 0 ? filteredAssessments : assessments.slice(0, 3);
  
  const icon = filter === "wellbeing" ? Heart : Brain;
  const title = filter === "wellbeing" ? "Mental Health Self-Assessments" : "Career Self-Assessments";
  const description = filter === "wellbeing" 
    ? "Take these assessments to understand your mental wellbeing" 
    : "Take these assessments to help guide your career decisions";

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          {React.createElement(icon, { className: "mr-2 h-5 w-5 text-purple-500" })}
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayedAssessments.map((assessment) => (
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
          ))}
        </div>
        <div className="mt-4 text-right">
          <Button variant="link" asChild>
            <Link to={filter === "wellbeing" ? "/wellbeing/assessments" : "/career/assessments"}>
              View all assessments
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfAssessmentsSection;
