
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { getWellnessResources } from "@/services/ai";
import AIWellbeingChat from "@/components/wellbeing/AIWellbeingChat";
import SelfAssessmentsSection from "@/components/career/SelfAssessmentsSection";
import SpaceMindfulness from "@/components/wellbeing/SpaceMindfulness";
import MoodTracking from "@/components/wellbeing/MoodTracking";
import ResourcesTab from "@/components/wellbeing/tabs/ResourcesTab";
import ActivitiesTab from "@/components/wellbeing/tabs/ActivitiesTab";
import CommunityTab from "@/components/wellbeing/tabs/CommunityTab";
import ProfessionalHelpTab from "@/components/wellbeing/tabs/ProfessionalHelpTab";
import WellbeingCallToAction from "@/components/wellbeing/WellbeingCallToAction";

const WellbeingPage: React.FC = () => {
  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      
      const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user || null);
      });
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    getUser();
  }, []);
  
  useEffect(() => {
    if (moodRating !== null) {
      const fetchResources = async () => {
        const sentiment = moodRating <= 2 ? "negative" : moodRating === 3 ? "neutral" : "positive";
        const wellnessResources = await getWellnessResources(sentiment);
        setResources(wellnessResources);
      };
      
      fetchResources();
    }
  }, [moodRating]);
  
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
        
        <SpaceMindfulness />
        
        <MoodTracking 
          moodRating={moodRating} 
          setMoodRating={setMoodRating} 
          resources={resources} 
          user={user} 
        />
        
        <div className="mb-8">
          <AIWellbeingChat moodRating={moodRating} />
        </div>
        
        <div className="mb-8">
          <SelfAssessmentsSection filter="wellbeing" />
        </div>

        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="activities">Self-Care</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="professional">Professional Help</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources">
            <ResourcesTab />
          </TabsContent>
          
          <TabsContent value="activities">
            <ActivitiesTab />
          </TabsContent>
          
          <TabsContent value="community">
            <CommunityTab />
          </TabsContent>
          
          <TabsContent value="professional">
            <ProfessionalHelpTab />
          </TabsContent>
        </Tabs>
        
        <WellbeingCallToAction />
      </div>
    </div>
  );
};

export default WellbeingPage;
