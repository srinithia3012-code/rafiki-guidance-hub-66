
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Resource {
  title: string;
  description: string;
  link: string;
}

const RecommendedResourcesSection = () => {
  const resources: Resource[] = [
    {
      title: "Effective Study Techniques",
      description: "Learn research-backed methods to improve retention and study efficiency.",
      link: "#",
    },
    {
      title: "Time Management for Students",
      description: "Master your schedule with these proven time management strategies.",
      link: "#",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-green-500" />
          Recommended Resources
        </CardTitle>
        <CardDescription>Curated learning materials for your journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {resource.description}
                </p>
                <Button variant="link" size="sm" className="px-0" asChild>
                  <Link to={resource.link}>
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedResourcesSection;
