
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const ResourcesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-lg">
                <Brain className="h-5 w-5 text-teal-600" />
              </div>
              <CardTitle>Mental Health Resources</CardTitle>
            </div>
            <CardDescription>
              Articles, videos, and tools to support your mental wellbeing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="h-36 bg-gray-100 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80" 
                    alt="A person meditating" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">Understanding Anxiety: Causes and Management</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn about the science behind anxiety and effective techniques to manage symptoms.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">Read Article</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-sm mb-2">Stress Management Techniques</h3>
                  <p className="text-xs text-gray-600 mb-2">10-minute video guide</p>
                  <Button variant="ghost" size="sm" className="w-full flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                    Watch Video
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-sm mb-2">Sleep Improvement Guide</h3>
                  <p className="text-xs text-gray-600 mb-2">Better sleep for better health</p>
                  <Button variant="ghost" size="sm" className="w-full">Read Guide</Button>
                </div>
              </div>
              
              <Button variant="link" className="w-full">View All Resources</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-lg">
              <Heart className="h-5 w-5 text-rose-600" />
            </div>
            <CardTitle>Featured Wellbeing Topics</CardTitle>
          </div>
          <CardDescription>
            Curated collections of resources on common wellbeing concerns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-6">
                <h3 className="text-xl font-bold text-white text-center">Managing Academic Stress</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Strategies to handle pressure during exams, assignments, and busy academic periods.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-purple-500 mt-2"></div>
                    <span>Time management techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-purple-500 mt-2"></div>
                    <span>Stress reduction practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-purple-500 mt-2"></div>
                    <span>Study-life balance tips</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full">Explore Resources</Button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center p-6">
                <h3 className="text-xl font-bold text-white text-center">Anxiety & Depression</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Understanding symptoms and finding strategies to cope with anxiety and depression.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-500 mt-2"></div>
                    <span>Recognizing symptoms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-500 mt-2"></div>
                    <span>Self-help techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-500 mt-2"></div>
                    <span>When to seek help</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full">Explore Resources</Button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center p-6">
                <h3 className="text-xl font-bold text-white text-center">Building Resilience</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Develop skills to adapt to challenges and bounce back from difficult experiences.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2"></div>
                    <span>Cultivating positive mindset</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2"></div>
                    <span>Building support networks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2"></div>
                    <span>Coping skills practice</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full">Explore Resources</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
