
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar } from "lucide-react";

const CommunityTab: React.FC = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default CommunityTab;
