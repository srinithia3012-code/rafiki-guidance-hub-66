
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Clock, Users, ArrowRight } from "lucide-react";
import { CareerProfile } from "@/services/career";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CourseRecommendationsSectionProps {
  careerProfile: CareerProfile | null;
}

const CourseRecommendationsSection: React.FC<CourseRecommendationsSectionProps> = ({
  careerProfile,
}) => {
  // In a real implementation, these would be dynamically fetched from Supabase
  // based on the user's career profile
  const getRecommendedCourses = () => {
    if (!careerProfile) return [];
    
    // Simple logic to recommend courses based on user's interests
    const allCourses = [
      {
        id: "data-science-101",
        title: "Introduction to Data Science",
        provider: "University of Technology",
        description: "Learn the fundamentals of data science and analytics",
        rating: 4.8,
        students: 1420,
        duration: "8 weeks",
        tags: ["Data Analysis", "Python", "Statistics"],
        relevance: "data"
      },
      {
        id: "web-dev-fundamentals",
        title: "Web Development Fundamentals",
        provider: "Tech Academy",
        description: "Master HTML, CSS, and JavaScript to build modern websites",
        rating: 4.7,
        students: 2350,
        duration: "10 weeks",
        tags: ["Programming", "JavaScript", "Web Design"],
        relevance: "web"
      },
      {
        id: "ux-design-principles",
        title: "UX Design Principles",
        provider: "Design Institute",
        description: "Learn user-centered design methodologies for digital products",
        rating: 4.9,
        students: 980,
        duration: "6 weeks",
        tags: ["Design", "UX/UI Design", "User Research"],
        relevance: "design"
      }
    ];
    
    // Filter courses relevant to the user's interests
    const relevantCourses = allCourses.filter(course => {
      return course.tags.some(tag => 
        careerProfile.interests.includes(tag) || 
        careerProfile.skills.includes(tag)
      );
    });
    
    return relevantCourses.length > 0 ? relevantCourses : allCourses.slice(0, 3);
  };
  
  const recommendedCourses = careerProfile ? getRecommendedCourses() : [];
  
  if (!careerProfile) {
    return null; // Don't show this section if no profile exists
  }
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
          Course Recommendations
        </CardTitle>
        <CardDescription>
          Courses to help you build skills for your career path
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-base">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{course.provider}</p>
                    <p className="text-sm mb-2">{course.description}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Enroll</Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Button variant="link" asChild>
            <Link to="/career/courses">
              View all courses
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseRecommendationsSection;
