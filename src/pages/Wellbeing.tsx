
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, BookOpen, Users, Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const WellbeingPage: React.FC = () => {
  const [moodRating, setMoodRating] = useState<number | null>(null);
  
  return (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <Helmet>
        <title>Wellbeing Support | Rafiki AI</title>
        <meta name="description" content="Access mental health resources and wellbeing support from Rafiki AI" />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mental Health & Wellbeing</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tools, resources, and support to help you manage stress, improve your mental health,
            and maintain your overall wellbeing.
          </p>
        </header>
        
        {/* Daily Mood Tracker */}
        <div className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setMoodRating(rating)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
                  moodRating === rating 
                    ? "bg-purple-600 text-white scale-110 shadow-md" 
                    : "bg-white text-gray-700 hover:bg-purple-100"
                }`}
              >
                {rating === 1 && "😔"}
                {rating === 2 && "😕"}
                {rating === 3 && "😐"}
                {rating === 4 && "🙂"}
                {rating === 5 && "😄"}
              </button>
            ))}
          </div>
          {moodRating && (
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-3">
                {moodRating < 3 
                  ? "I'm sorry you're not feeling great today. Here are some resources that might help:" 
                  : moodRating === 3 
                  ? "Thanks for sharing how you're feeling. Here are some ways to boost your mood:" 
                  : "Great to hear you're doing well! Here are some ways to maintain your positive mood:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {moodRating < 3 && (
                  <>
                    <Button size="sm" variant="outline">Stress Relief Exercises</Button>
                    <Button size="sm" variant="outline">Mood-Boosting Activities</Button>
                    <Button size="sm" variant="outline">Talk to Someone</Button>
                  </>
                )}
                {moodRating === 3 && (
                  <>
                    <Button size="sm" variant="outline">Mindfulness Practices</Button>
                    <Button size="sm" variant="outline">Creative Activities</Button>
                    <Button size="sm" variant="outline">Outdoor Suggestions</Button>
                  </>
                )}
                {moodRating > 3 && (
                  <>
                    <Button size="sm" variant="outline">Gratitude Exercises</Button>
                    <Button size="sm" variant="outline">Share Your Positivity</Button>
                    <Button size="sm" variant="outline">Wellness Tips</Button>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="mt-3 text-sm text-gray-500 flex justify-between items-center">
            <span>Your mood data is private and only used to provide personalized support.</span>
            <Button variant="link" size="sm" className="text-purple-600">View Mood History</Button>
          </div>
        </div>

        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="activities">Self-Care</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="professional">Professional Help</TabsTrigger>
          </TabsList>
          
          {/* Resources Tab Content */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <CardTitle>Self-Assessment Tools</CardTitle>
                  </div>
                  <CardDescription>
                    Evaluate aspects of your mental health and wellbeing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-1">Stress Level Assessment</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Evaluate your current stress levels and get personalized recommendations.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">5 minutes</span>
                        <Button size="sm">Take Assessment</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-1">Sleep Quality Questionnaire</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Analyze your sleep patterns and learn how to improve your rest.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">3 minutes</span>
                        <Button size="sm">Take Assessment</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-1">Mental Wellbeing Check</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Based on the WHO-5 Well-Being Index to assess your overall mental health.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">4 minutes</span>
                        <Button size="sm">Take Assessment</Button>
                      </div>
                    </div>
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
          </TabsContent>
          
          {/* Self-Care Activities Tab Content */}
          <TabsContent value="activities" className="space-y-6">
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
          </TabsContent>
          
          {/* Community Tab Content */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle>Support Groups & Communities</CardTitle>
                </div>
                <CardDescription>
                  Connect with peers who understand what you're going through
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-5">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">Stress Management Group</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      A supportive community for students dealing with academic pressure 
                      and learning effective stress management techniques.
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">M</div>
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">J</div>
                      <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">R</div>
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">+43</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Next meeting: Today, 7:00 PM</span>
                      <Button size="sm">Join Group</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">Mindfulness Practice Circle</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Weekly</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Weekly guided meditation sessions followed by discussions on 
                      incorporating mindfulness into daily student life.
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">L</div>
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">K</div>
                      <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">A</div>
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">+28</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Next meeting: Wed, 6:30 PM</span>
                      <Button size="sm">Join Group</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">Balance & Wellbeing Forum</h3>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Online</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      An online forum for discussing strategies to maintain work-life 
                      balance and overall wellbeing as a student.
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">P</div>
                      <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs">S</div>
                      <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs">D</div>
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">+91</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Active discussions: 17</span>
                      <Button size="sm">Join Forum</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">Peer Support Network</h3>
                      <span className="text-xs bg-rose-100 text-rose-800 px-2 py-1 rounded">Supervised</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      A moderated peer support group where students can share experiences 
                      and offer support in a safe environment.
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">N</div>
                      <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs">T</div>
                      <div className="w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center text-xs">G</div>
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">+52</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Next meeting: Thu, 5:00 PM</span>
                      <Button size="sm">Join Network</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Start Your Own Support Group</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Create a new community focused on a specific wellbeing topic or interest.
                    Our staff will help you get started and provide moderation support.
                  </p>
                  <Button>Create Group</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle>Upcoming Wellbeing Events</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 border rounded-lg p-4">
                    <div className="bg-purple-100 text-purple-800 rounded-lg p-3 text-center min-w-[60px]">
                      <div className="text-sm font-medium">OCT</div>
                      <div className="text-xl font-bold">15</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Stress Management Workshop</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Learn practical techniques to manage stress during midterms and finals.
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded">7:00 PM - 8:30 PM</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">Student Center, Room 204</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">25 spots left</span>
                      </div>
                      <Button size="sm">Register</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 border rounded-lg p-4">
                    <div className="bg-blue-100 text-blue-800 rounded-lg p-3 text-center min-w-[60px]">
                      <div className="text-sm font-medium">OCT</div>
                      <div className="text-xl font-bold">18</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Mindfulness Meditation Session</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        A guided meditation session for beginners and experienced practitioners.
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded">5:30 PM - 6:30 PM</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">Wellness Center</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">40 spots left</span>
                      </div>
                      <Button size="sm">Register</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 border rounded-lg p-4">
                    <div className="bg-emerald-100 text-emerald-800 rounded-lg p-3 text-center min-w-[60px]">
                      <div className="text-sm font-medium">OCT</div>
                      <div className="text-xl font-bold">22</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Mental Health Awareness Talk</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Guest speaker Dr. Sarah Johnson on understanding and managing anxiety in college.
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded">3:00 PM - 4:30 PM</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">Lecture Hall B</span>
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">10 spots left</span>
                      </div>
                      <Button size="sm">Register</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline">View All Events</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Professional Help Tab Content */}
          <TabsContent value="professional" className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-white p-4 rounded-full">
                  <Phone className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-bold mb-2">Crisis Support - Available 24/7</h2>
                  <p className="text-gray-600 mb-4">
                    If you're experiencing a mental health emergency or crisis, help is available right now.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <h3 className="font-medium text-sm">National Crisis Line</h3>
                      <a href="tel:988" className="text-xl font-bold text-purple-600 block mt-1">988</a>
                      <p className="text-xs text-gray-500 mt-1">Text or Call - 24/7 Support</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <h3 className="font-medium text-sm">Campus Crisis Center</h3>
                      <a href="tel:5551234567" className="text-xl font-bold text-purple-600 block mt-1">(555) 123-4567</a>
                      <p className="text-xs text-gray-500 mt-1">Available 24/7 for Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Counseling Services</CardTitle>
                <CardDescription>
                  Connect with licensed therapists and counselors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border rounded-lg p-5">
                    <h3 className="font-medium mb-3">University Counseling Center</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Free confidential counseling services available to all enrolled students.
                    </p>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mt-0.5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>Student Health Center, 2nd Floor</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mt-0.5">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mt-0.5">
                          <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>(555) 123-4567</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button>Schedule Appointment</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <h3 className="font-medium mb-3">Virtual Counseling Options</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Online therapy sessions with licensed counselors via secure video platform.
                    </p>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Flexible scheduling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Access from anywhere</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Covered by student health insurance</span>
                      </li>
                    </ul>
                    <div className="flex gap-3">
                      <Button>Schedule Virtual Session</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-medium mb-3">Specialized Support Services</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Academic Stress Counseling</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Free for Students
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Specialized support for dealing with academic pressure, test anxiety, and study-related stress.
                    </p>
                    <Button size="sm">Learn More</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Grief & Loss Support</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Free for Students
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Counseling and support groups for students dealing with grief, loss, or major life transitions.
                    </p>
                    <Button size="sm">Learn More</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Substance Use Counseling</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Confidential
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Confidential assessment, counseling, and referrals for students concerned about substance use.
                    </p>
                    <Button size="sm">Learn More</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Off-Campus Resources</CardTitle>
                <CardDescription>
                  Additional mental health services in the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Community Mental Health Center</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Offers sliding scale fees based on income and comprehensive mental health services.
                    </p>
                    <div className="text-sm space-y-1 mb-3">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                          <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>(555) 987-6543</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>123 Main Street, Suite 202</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Visit Website</Button>
                      <Button size="sm" variant="outline">Get Directions</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Student Health Insurance Providers</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Find therapists and mental health professionals covered by your student insurance plan.
                    </p>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium text-xs">A</div>
                        <span>Aetna Student Health</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium text-xs">U</div>
                        <span>UnitedHealthcare StudentResources</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium text-xs">B</div>
                        <span>Blue Cross Blue Shield Student Plan</span>
                      </div>
                    </div>
                    <Button size="sm">Find In-Network Providers</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Online Therapy Platforms</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Digital mental health services with special student discounts or insurance coverage.
                    </p>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>BetterHelp</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">15% Student Discount</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Talkspace</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Covered by Many Plans</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Calm App (Meditation)</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Free with Student Email</span>
                      </div>
                    </div>
                    <Button size="sm">Explore Online Options</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-lg text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Need personalized wellbeing guidance?</h2>
              <p className="text-white/80 mb-4">
                Our AI assistant can provide tailored advice for your specific mental health and wellbeing concerns.
              </p>
              <div className="flex gap-3">
                <Button asChild className="bg-white text-purple-700 hover:bg-white/90">
                  <Link to="/chat">Chat with Rafiki AI</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  Find Support Resources
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellbeingPage;
