
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, BookOpen, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/services/supabase";
import { Assessment } from "@/types/assessment";
import { toast } from "sonner";
import AuthPrompt from "@/components/career/AuthPrompt";

const Assessments: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const careerAssessments: Assessment[] = [
    {
      id: "career-personality",
      title: "Career Personality Assessment",
      description: "Discover which career paths align with your personality traits",
      duration: "15 min",
      questions: 45,
      category: "career",
      icon: <Brain className="h-5 w-5 text-purple-600" />
    },
    {
      id: "skills-assessment",
      title: "Skills Assessment",
      description: "Identify your strongest skills and areas for improvement",
      duration: "20 min",
      questions: 60,
      category: "career",
      icon: <BookOpen className="h-5 w-5 text-blue-600" />
    },
    {
      id: "interest-inventory",
      title: "Interest Inventory",
      description: "Explore careers that match your interests and passions",
      duration: "10 min",
      questions: 30,
      category: "career",
      icon: <Heart className="h-5 w-5 text-red-600" />
    }
  ];
  
  const wellbeingAssessments: Assessment[] = [
    {
      id: "mental-wellbeing",
      title: "Mental Wellbeing Check",
      description: "Evaluate your stress levels and mental health status",
      duration: "8 min",
      questions: 25,
      category: "wellbeing",
      icon: <Heart className="h-5 w-5 text-rose-600" />
    },
    {
      id: "anxiety-screening",
      title: "Anxiety Screening",
      description: "Screen for anxiety symptoms and get personalized recommendations",
      duration: "5 min",
      questions: 15,
      category: "wellbeing",
      icon: <Heart className="h-5 w-5 text-amber-600" />
    }
  ];
  
  const academicAssessments: Assessment[] = [
    {
      id: "learning-style",
      title: "Learning Style Assessment",
      description: "Discover your preferred learning style to study more effectively",
      duration: "12 min",
      questions: 35,
      category: "academic",
      icon: <BookOpen className="h-5 w-5 text-emerald-600" />
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rafiki-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPrompt />;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <Helmet>
        <title>Assessments | Rafiki AI</title>
        <meta name="description" content="Take assessments to get personalized guidance" />
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
          <h1 className="text-3xl font-bold">Assessments</h1>
        </div>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Brain className="mr-2 h-6 w-6 text-purple-600" />
              Career Assessments
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              These assessments will help you understand your career preferences, skills, and interests.
              Your results will be used to provide personalized career guidance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {careerAssessments.map((assessment) => (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      {assessment.icon && <span className="mr-2">{assessment.icon}</span>}
                      {assessment.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {assessment.duration} • {assessment.questions} questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{assessment.description}</p>
                    <Button className="w-full" asChild>
                      <Link to={`/assessments/${assessment.id}`}>
                        Start Assessment
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Heart className="mr-2 h-6 w-6 text-rose-600" />
              Wellbeing Assessments
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              These assessments will help you understand your mental health and wellbeing.
              Your results will be used to provide personalized support and resources.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wellbeingAssessments.map((assessment) => (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      {assessment.icon && <span className="mr-2">{assessment.icon}</span>}
                      {assessment.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {assessment.duration} • {assessment.questions} questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{assessment.description}</p>
                    <Button className="w-full" asChild>
                      <Link to={`/assessments/${assessment.id}`}>
                        Start Assessment
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <BookOpen className="mr-2 h-6 w-6 text-emerald-600" />
              Academic Assessments
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              These assessments will help you understand your learning style and academic preferences.
              Your results will be used to provide personalized academic guidance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {academicAssessments.map((assessment) => (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      {assessment.icon && <span className="mr-2">{assessment.icon}</span>}
                      {assessment.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {assessment.duration} • {assessment.questions} questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{assessment.description}</p>
                    <Button className="w-full" asChild>
                      <Link to={`/assessments/${assessment.id}`}>
                        Start Assessment
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Assessments;
