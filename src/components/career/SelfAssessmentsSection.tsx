
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BarChart3, ArrowRight } from "lucide-react";
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
  }
];

const SelfAssessmentsSection = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5 text-purple-500" />
          Career Self-Assessments
        </CardTitle>
        <CardDescription>
          Take these assessments to help guide your career decisions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assessments.map((assessment) => (
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
            <Link to="/career/assessments">
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
