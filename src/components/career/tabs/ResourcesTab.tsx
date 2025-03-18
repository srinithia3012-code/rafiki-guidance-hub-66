
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResourcesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle>Educational Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-1">Machine Learning Fundamentals</h3>
              <p className="text-sm text-gray-600 mb-2">Stanford University | Coursera</p>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Beginner</span>
                <span className="mx-2">•</span>
                <span>12 weeks</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">View Course</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-1">UX Research Certification</h3>
              <p className="text-sm text-gray-600 mb-2">Google | Coursera</p>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Intermediate</span>
                <span className="mx-2">•</span>
                <span>6 months</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">View Course</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-1">Full-Stack Web Development</h3>
              <p className="text-sm text-gray-600 mb-2">Udemy</p>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">All Levels</span>
                <span className="mx-2">•</span>
                <span>64 hours</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">View Course</Button>
            </div>
            
            <Button variant="link" className="w-full">View All Courses</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 text-emerald-600" />
              </div>
              <CardTitle>Skill Development</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-1">Technical Skills</h3>
              <p className="text-sm text-gray-600 mb-3">Based on your career interests:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Python Programming</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                  </div>
                </li>
                <li className="flex justify-between">
                  <span>Data Visualization</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                  </div>
                </li>
                <li className="flex justify-between">
                  <span>SQL & Database</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                  </div>
                </li>
              </ul>
              <Button size="sm" className="w-full mt-3">View Skill Path</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-1">Soft Skills</h3>
              <p className="text-sm text-gray-600 mb-3">Essential for career advancement:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Communication</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                  </div>
                </li>
                <li className="flex justify-between">
                  <span>Problem Solving</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                  </div>
                </li>
                <li className="flex justify-between">
                  <span>Teamwork</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 my-auto"></div>
                  </div>
                </li>
              </ul>
              <Button size="sm" className="w-full mt-3">View Skill Path</Button>
            </div>
            
            <Button variant="link" className="w-full">Take Skills Assessment</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <CardTitle>Resume & Interview Prep</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-1">Resume Builder</h3>
              <p className="text-sm text-gray-600 mb-3">
                Create a professional resume with templates optimized for your target roles.
              </p>
              <Button size="sm" className="w-full">Build Resume</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-1">Interview Simulator</h3>
              <p className="text-sm text-gray-600 mb-3">
                Practice with AI-powered mock interviews tailored to specific job roles.
              </p>
              <Button size="sm" className="w-full">Start Practice</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-1">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Top 50 Interview Questions</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Resume Do's and Don'ts</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Salary Negotiation Guide</a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesTab;
