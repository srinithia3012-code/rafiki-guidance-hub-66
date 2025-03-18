
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chat, Brain, Heart, BookOpen, Bell, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SelfAssessmentsSection from "@/components/career/SelfAssessmentsSection";
import AuthPrompt from "@/components/career/AuthPrompt";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New career assessment available",
      description: "Try our latest career assessment to discover new job opportunities",
      date: "1 hour ago",
      read: false
    },
    {
      id: 2,
      title: "Wellbeing tip of the day",
      description: "Practice mindful breathing for 5 minutes to reduce stress",
      date: "3 hours ago",
      read: false
    }
  ]);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error checking authentication:", error);
        toast.error("Authentication error. Please sign in again.");
        navigate("/");
        return;
      }
      
      if (!data.session) {
        navigate("/");
        return;
      }
      
      setUser(data.session.user);
      setLoading(false);
    };

    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/");
        } else if (session) {
          setUser(session.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rafiki-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPrompt />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user.email?.split('@')[0] || 'User'}</h1>
        <p className="text-gray-600 mt-2">
          Your personal AI guidance counselor is here to help you succeed
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Chat className="mr-2 h-5 w-5 text-blue-500" />
              AI Chat
            </CardTitle>
            <CardDescription>Get instant answers to your questions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Chat with Rafiki AI for personalized advice, academic guidance, and emotional support.
            </p>
            <Button asChild className="w-full">
              <Link to="/chat">Start Chatting</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-500" />
              Career Guidance
            </CardTitle>
            <CardDescription>Explore career paths tailored to you</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Discover career opportunities, get course recommendations, and connect with mentors.
            </p>
            <Button asChild className="w-full">
              <Link to="/career">Explore Careers</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              Wellbeing Support
            </CardTitle>
            <CardDescription>Resources for your mental health</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Access stress management tools, mood tracking, and professional mental health resources.
            </p>
            <Button asChild className="w-full">
              <Link to="/wellbeing">Support Me</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Self-Assessments Section */}
      <SelfAssessmentsSection />

      {/* Notifications */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-yellow-500" />
            Notifications
          </CardTitle>
          <CardDescription>Stay updated with the latest information</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-100"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No new notifications</p>
          )}
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-green-500" />
            Recommended Resources
          </CardTitle>
          <CardDescription>Curated learning materials for your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Effective Study Techniques</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Learn research-backed methods to improve retention and study efficiency.
                </p>
                <Button variant="link" size="sm" className="px-0" asChild>
                  <Link to="#">
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Time Management for Students</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Master your schedule with these proven time management strategies.
                </p>
                <Button variant="link" size="sm" className="px-0" asChild>
                  <Link to="#">
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
