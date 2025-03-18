
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CareerProfile } from "@/services/career";
import { Link } from "react-router-dom";

interface ExploreTabProps {
  user: any | null;
  careerProfile: CareerProfile | null;
  setIsProfileFormOpen: (open: boolean) => void;
}

const ExploreTab: React.FC<ExploreTabProps> = ({ user, careerProfile, setIsProfileFormOpen }) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default ExploreTab;
