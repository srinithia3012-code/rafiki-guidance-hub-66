
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const ProfessionalHelpTab: React.FC = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default ProfessionalHelpTab;
