
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AssessmentsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Career Assessments</CardTitle>
          <CardDescription>
            Discover your strengths, interests, and suitable career paths through these assessment tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Personality Assessment</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Understand your personality traits and how they align with different career options.
                This 15-minute assessment will reveal your work style and preferences.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">15 minutes</span>
                <Button>Start Assessment</Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Skills Analysis</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Identify your core skills and areas for development. This assessment helps
                match your skill set with potential career paths.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">20 minutes</span>
                <Button>Start Assessment</Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Interest Inventory</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Explore your interests and passions to find careers that align with what you enjoy.
                Based on the Holland Code assessment framework.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">25 minutes</span>
                <Button>Start Assessment</Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-rose-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Work Values Assessment</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Identify what motivates you in a job and what workplace values are most important 
                to you for long-term career satisfaction.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">15 minutes</span>
                <Button>Start Assessment</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentsTab;
