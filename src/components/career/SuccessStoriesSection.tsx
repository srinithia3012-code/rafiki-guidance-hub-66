
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Quote, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const SuccessStoriesSection = () => {
  // In a real implementation, these stories would be fetched from Supabase
  const successStories = [
    {
      id: "story1",
      name: "Alex Rivera",
      program: "Computer Science",
      graduationYear: 2020,
      currentRole: "Software Engineer at Google",
      story: "Taking advantage of the university's career services and AI career guidance helped me land my dream job. The personalized recommendations led me to focus on the right skills.",
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: "story2",
      name: "Zara Khan",
      program: "Data Science",
      graduationYear: 2021,
      currentRole: "Data Analyst at Microsoft",
      story: "The AI-powered career assessments accurately identified my strengths and suggested roles I hadn't considered. Now I'm thriving in a career I love!",
      image: "https://i.pravatar.cc/150?img=8"
    }
  ];
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-amber-500" />
          Student Success Stories
        </CardTitle>
        <CardDescription>
          Learn how other students found their career paths
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {successStories.map((story) => (
            <div key={story.id} className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={story.image} alt={story.name} />
                  <AvatarFallback>{story.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.currentRole}</p>
                </div>
              </div>
              <div className="pl-2 border-l-2 border-gray-200 italic">
                <Quote className="h-4 w-4 text-gray-400 mb-1" />
                <p className="text-sm">{story.story}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{story.program}</Badge>
                <Badge variant="outline">Class of {story.graduationYear}</Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Button variant="link" asChild>
            <Link to="/career/success-stories">
              Read more stories
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessStoriesSection;
