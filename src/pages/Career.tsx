
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/services/supabase";
import { useCareerData } from "@/hooks/useCareerData";
import { supabase } from "@/integrations/supabase/client";
import CareerProfileSection from "@/components/career/CareerProfile";
import ExploreTab from "@/components/career/tabs/ExploreTab";
import AssessmentsTab from "@/components/career/tabs/AssessmentsTab";
import ResourcesTab from "@/components/career/tabs/ResourcesTab";
import AuthPrompt from "@/components/career/AuthPrompt";
import GuidanceCallout from "@/components/career/GuidanceCallout";
import AICareerRecommendations from "@/components/career/AICareerRecommendations";
import SelfAssessmentsSection from "@/components/career/SelfAssessmentsSection";
import CourseRecommendationsSection from "@/components/career/CourseRecommendationsSection";
import MentorshipSection from "@/components/career/MentorshipSection";
import SuccessStoriesSection from "@/components/career/SuccessStoriesSection";

const CareerPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  
  const { careerProfile, isLoading, refreshData } = useCareerData(user);

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
    return <AuthPrompt />;
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
        <CareerProfileSection
          isCheckingAuth={isCheckingAuth}
          isLoading={isLoading}
          user={user}
          careerProfile={careerProfile}
          isProfileFormOpen={isProfileFormOpen}
          setIsProfileFormOpen={setIsProfileFormOpen}
          handleProfileSuccess={handleProfileSuccess}
        />

        {/* AI Recommendations Section */}
        {careerProfile && (
          <AICareerRecommendations 
            user={user} 
            careerProfile={careerProfile} 
            isLoading={isLoading} 
          />
        )}

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore">
            <ExploreTab 
              user={user} 
              careerProfile={careerProfile} 
              setIsProfileFormOpen={setIsProfileFormOpen} 
            />
            {careerProfile && (
              <>
                <CourseRecommendationsSection careerProfile={careerProfile} />
                <MentorshipSection careerProfile={careerProfile} />
                <SuccessStoriesSection />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="assessments">
            <SelfAssessmentsSection />
            <AssessmentsTab />
          </TabsContent>
          
          <TabsContent value="resources">
            <ResourcesTab />
          </TabsContent>
        </Tabs>
        
        <GuidanceCallout />
      </div>
    </div>
  );
};

export default CareerPage;
