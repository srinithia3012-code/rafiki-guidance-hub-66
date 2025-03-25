
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { toast } from "sonner";
import AuthPrompt from "@/components/career/AuthPrompt";
import QuickAccessSection from "@/components/dashboard/QuickAccessSection";
import NotificationsSection from "@/components/dashboard/NotificationsSection";
import SelfAssessmentsSection from "@/components/career/SelfAssessmentsSection";
import RecommendedResourcesSection from "@/components/dashboard/RecommendedResourcesSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStatus();
  const [notifications, setNotifications] = React.useState([
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

  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  if (isLoading) {
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
      <QuickAccessSection />

      {/* Self-Assessments Section */}
      <SelfAssessmentsSection />

      {/* Notifications */}
      <NotificationsSection 
        notifications={notifications} 
        onMarkAsRead={markAsRead} 
      />

      {/* Learning Resources */}
      <RecommendedResourcesSection />
    </div>
  );
};

export default Dashboard;
