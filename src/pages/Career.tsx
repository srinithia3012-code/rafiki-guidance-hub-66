
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BookOpen, TrendingUp, GraduationCap, Users, FileText, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import CareerProfileForm from "@/components/career/CareerProfileForm";
import JobApplicationsList from "@/components/career/JobApplicationsList";
import { getCurrentUser } from "@/services/supabase";
import { useCareerData } from "@/hooks/useCareerData";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const CareerPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const { toast: uiToast } = useToast();
  
  const { careerProfile, jobApplications, isLoading, refreshData } = useCareerData(user);

  // Authentication check
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleProfileSuccess = () => {
    setIsProfileFormOpen(false);
    refreshData();
  };

  // If not logged in, show auth prompt
  if (!isCheckingAuth && !user) {
    return (
      <div className="container mx-auto px-4 py-10 mt-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="mb-6">Please sign in to access your career dashboard and personalized resources.</p>
          <Button asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <Helmet>
        <title>Career Guidance | Rafiki AI</title>
        <meta name="description" content="Get personalized career guidance and resources from Rafiki AI" />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Career Guidance & Planning</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore career paths, develop your professional skills, and get personalized recommendations
            to help you achieve your career goals.
          </p>
        </header>

        {/* Profile Status Section */}
        {isCheckingAuth || isLoading ? (
          <Card className="mb-8">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ) : !careerProfile ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Complete Your Career Profile</CardTitle>
              <CardDescription>
                Set up your profile to get personalized career recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your career profile helps us tailor job recommendations and learning resources to your interests and skills.</p>
              <Button onClick={() => setIsProfileFormOpen(true)}>Create Profile</Button>
              
              <Dialog open={isProfileFormOpen} onOpenChange={setIsProfileFormOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create Your Career Profile</DialogTitle>
                  </DialogHeader>
                  {user && (
                    <CareerProfileForm 
                      userId={user.id} 
                      onSuccess={handleProfileSuccess}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Your Career Profile</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsProfileFormOpen(true)}>Edit Profile</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Education Level</h3>
                  <p>{careerProfile.education_level || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-1">
                    {careerProfile.interests.length > 0 ? (
                      careerProfile.interests.map((interest) => (
                        <span key={interest} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">No interests specified</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {careerProfile.skills.length > 0 ? (
                      careerProfile.skills.map((skill) => (
                        <span key={skill} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">No skills specified</span>
                    )}
                  </div>
                </div>
              </div>
              
              <Dialog open={isProfileFormOpen} onOpenChange={setIsProfileFormOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Edit Your Career Profile</DialogTitle>
                  </DialogHeader>
                  {user && (
                    <CareerProfileForm 
                      userId={user.id}
                      existingProfile={careerProfile}
                      onSuccess={handleProfileSuccess}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                    </div>
                    <CardTitle>Career Paths</CardTitle>
                  </div>
                  <CardDescription>
                    Explore various career options based on your interests and skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {(!careerProfile && user) ? (
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-800 mb-3">Create your career profile to get personalized recommendations</p>
                      <Button variant="outline" size="sm" onClick={() => setIsProfileFormOpen(true)}>Create Profile</Button>
                    </div>
                  ) : !user ? (
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-800 mb-3">Sign in to get personalized career recommendations</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/signin">Sign In</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Based on your profile</h3>
                        <p className="text-sm text-gray-600 mb-3">Here are some careers that might be a good fit:</p>
                        <ul className="space-y-2">
                          {careerProfile?.skills.includes("Python") || careerProfile?.skills.includes("Data Visualization") ? (
                            <li className="flex items-center gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              Data Scientist (95% match)
                            </li>
                          ) : null}
                          
                          {careerProfile?.skills.includes("UX/UI Design") ? (
                            <li className="flex items-center gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              UX/UI Designer (92% match)
                            </li>
                          ) : null}
                          
                          {careerProfile?.skills.includes("JavaScript") ? (
                            <li className="flex items-center gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              Software Engineer (88% match)
                            </li>
                          ) : null}
                          
                          {careerProfile?.skills.includes("Project Management") ? (
                            <li className="flex items-center gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              Project Manager (90% match)
                            </li>
                          ) : null}
                          
                          {careerProfile?.skills.includes("Leadership") ? (
                            <li className="flex items-center gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              Product Manager (87% match)
                            </li>
                          ) : null}
                          
                          {/* Fallback options if no matches */}
                          {!careerProfile?.skills.some(skill => 
                            ["Python", "Data Visualization", "UX/UI Design", "JavaScript", "Project Management", "Leadership"].includes(skill)
                          ) && (
                            <>
                              <li className="flex items-center gap-2 text-sm">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                Data Scientist (85% match)
                              </li>
                              <li className="flex items-center gap-2 text-sm">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                UX/UI Designer (82% match)
                              </li>
                              <li className="flex items-center gap-2 text-sm">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                Software Engineer (78% match)
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                      <Button className="w-full">View All Career Matches</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle>Job Market Insights</CardTitle>
                  </div>
                  <CardDescription>
                    Current trends and opportunities in your field of interest
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-1">Industry Outlook</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {careerProfile && careerProfile.preferred_industries.length > 0
                          ? `Growth projections for ${careerProfile.preferred_industries[0]}`
                          : "Tech Industry Growth Projections"}
                      </p>
                      <div className="space-y-3">
                        {careerProfile && careerProfile.preferred_industries.includes("Technology") ? (
                          <>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Machine Learning</span>
                                <span>+35%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>UX Design</span>
                                <span>+28%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Full-stack Development</span>
                                <span>+22%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                              </div>
                            </div>
                          </>
                        ) : careerProfile && careerProfile.preferred_industries.includes("Healthcare") ? (
                          <>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Telemedicine</span>
                                <span>+45%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Healthcare Data Analysis</span>
                                <span>+30%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Mental Health Services</span>
                                <span>+25%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Machine Learning</span>
                                <span>+35%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>UX Design</span>
                                <span>+28%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Full-stack Development</span>
                                <span>+22%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <Button className="w-full">View Detailed Market Analysis</Button>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-amber-600" />
                    </div>
                    <CardTitle>Mentorship Opportunities</CardTitle>
                  </div>
                  <CardDescription>
                    Connect with professionals in your field of interest
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-medium">JD</div>
                        <div>
                          <h3 className="font-medium">John Doe</h3>
                          <p className="text-sm text-gray-600">Senior Data Scientist</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Specializes in machine learning and AI applications. 8+ years of experience.</p>
                      <Button variant="outline" size="sm" className="w-full">Request Mentorship</Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-medium">AS</div>
                        <div>
                          <h3 className="font-medium">Alice Smith</h3>
                          <p className="text-sm text-gray-600">UX Research Lead</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Expert in user research and product design. Works at a major tech company.</p>
                      <Button variant="outline" size="sm" className="w-full">Request Mentorship</Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-medium">RJ</div>
                        <div>
                          <h3 className="font-medium">Robert Johnson</h3>
                          <p className="text-sm text-gray-600">Engineering Manager</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Specializes in engineering leadership and career development. 12+ years experience.</p>
                      <Button variant="outline" size="sm" className="w-full">Request Mentorship</Button>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="link">View All Mentors</Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
          
          <TabsContent value="assessments" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Application Tracker</CardTitle>
                <CardDescription>
                  Keep track of your job applications, interviews, and follow-ups
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isCheckingAuth || isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-40 w-full" />
                  </div>
                ) : !user ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Sign in to track your job applications</p>
                    <Button asChild>
                      <Link to="/signin">Sign In</Link>
                    </Button>
                  </div>
                ) : (
                  <JobApplicationsList 
                    userId={user.id}
                    applications={jobApplications}
                    onApplicationChange={refreshData}
                  />
                )}
                
                {user && jobApplications.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Application Insights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Total Applications</div>
                        <div className="text-2xl font-bold">{jobApplications.length}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Interviews Scheduled</div>
                        <div className="text-2xl font-bold">
                          {jobApplications.filter(app => 
                            ["Interview Scheduled", "Interview Completed", "Technical Interview", "Final Interview"].includes(app.status)
                          ).length}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Response Rate</div>
                        <div className="text-2xl font-bold">
                          {jobApplications.length === 0 ? "0%" : 
                            `${Math.round((jobApplications.filter(app => 
                              !["Application Submitted"].includes(app.status)
                            ).length / jobApplications.length) * 100)}%`
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Need personalized career guidance?</h2>
              <p className="text-gray-600 mb-4">
                Our AI assistant can provide tailored advice based on your individual career goals, interests, and skills.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link to="/chat">Chat with Rafiki AI</Link>
                </Button>
                <Button variant="outline">Schedule Career Counseling</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
