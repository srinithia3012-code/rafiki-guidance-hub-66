
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ActivitiesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Wellness Plan</CardTitle>
          <CardDescription>
            Activities and practices tailored to your needs and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Your Recommended Daily Activities</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">5-Minute Mindfulness Meditation</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Morning</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    A brief meditation to center yourself and prepare for the day ahead.
                  </p>
                  <Button size="sm">Start Activity</Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">Gratitude Journaling</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Evening</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Write down three things you're grateful for today to improve positivity.
                  </p>
                  <Button size="sm">Start Activity</Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">Stress Relief Breathing Exercise</h4>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Anytime</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    A 3-minute deep breathing technique to reduce stress and anxiety.
                  </p>
                  <Button size="sm">Start Activity</Button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">Customize Your Wellness Plan</Button>
            </div>
          </div>
          
          <h3 className="font-medium mb-3">Activity Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="bg-blue-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h4 className="font-medium text-sm">Mindfulness</h4>
              <p className="text-xs text-gray-600 mt-1">12 activities</p>
            </div>
            
            <div className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="bg-green-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
              </div>
              <h4 className="font-medium text-sm">Physical Activity</h4>
              <p className="text-xs text-gray-600 mt-1">8 activities</p>
            </div>
            
            <div className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="bg-amber-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h4 className="font-medium text-sm">Mood Boosters</h4>
              <p className="text-xs text-gray-600 mt-1">15 activities</p>
            </div>
            
            <div className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="bg-purple-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </div>
              <h4 className="font-medium text-sm">Journaling</h4>
              <p className="text-xs text-gray-600 mt-1">6 activities</p>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="font-medium mb-3">Wellness Challenges</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">7-Day Mindfulness Challenge</h4>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Practice different mindfulness techniques each day for a week to reduce stress and improve focus.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">428 participants</div>
                  <Button size="sm">Join Challenge</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">21-Day Gratitude Practice</h4>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Popular
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Build a daily gratitude habit with guided prompts and reflection exercises.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">1,243 participants</div>
                  <Button size="sm">Join Challenge</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitiesTab;
