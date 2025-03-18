
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CareerProfile } from "@/services/career";

interface MentorshipSectionProps {
  careerProfile: CareerProfile | null;
}

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  availability: string;
  imageSrc?: string;
}

const MentorshipSection: React.FC<MentorshipSectionProps> = ({
  careerProfile,
}) => {
  // In a real implementation, mentors would be fetched from Supabase
  // and filtered based on the user's interests and career path
  const getRecommendedMentors = (): Mentor[] => {
    const allMentors: Mentor[] = [
      {
        id: "mentor1",
        name: "Sarah Johnson",
        role: "Senior Data Scientist",
        company: "TechCorp",
        expertise: ["Data Analysis", "Machine Learning", "Python"],
        availability: "Next week",
        imageSrc: "https://i.pravatar.cc/150?img=1"
      },
      {
        id: "mentor2",
        name: "Michael Chen",
        role: "Software Engineering Manager",
        company: "GlobalSoft",
        expertise: ["Programming", "Leadership", "JavaScript"],
        availability: "Tomorrow",
        imageSrc: "https://i.pravatar.cc/150?img=3"
      },
      {
        id: "mentor3",
        name: "Priya Patel",
        role: "UX Design Director",
        company: "DesignHub",
        expertise: ["Design", "UX/UI Design", "User Research"],
        availability: "This week",
        imageSrc: "https://i.pravatar.cc/150?img=5"
      }
    ];
    
    if (!careerProfile) return allMentors.slice(0, 2);
    
    // Filter mentors based on user's interests and skills
    const relevantMentors = allMentors.filter(mentor => {
      return mentor.expertise.some(skill => 
        careerProfile.interests.includes(skill) || 
        careerProfile.skills.includes(skill)
      );
    });
    
    return relevantMentors.length > 0 ? relevantMentors.slice(0, 2) : allMentors.slice(0, 2);
  };
  
  const mentors = getRecommendedMentors();
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-green-500" />
          Mentorship & Counseling
        </CardTitle>
        <CardDescription>
          Connect with industry professionals for personalized guidance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex items-start space-x-4 border-b pb-4 last:border-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mentor.imageSrc} alt={mentor.name} />
                <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.role} at {mentor.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {mentor.availability}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {mentor.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3">
                  <Button size="sm">Schedule Session</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Button variant="link" asChild>
            <Link to="/career/mentors">
              View all mentors
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorshipSection;
