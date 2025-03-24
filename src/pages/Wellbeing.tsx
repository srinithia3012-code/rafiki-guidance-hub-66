
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
import ProfessionalHelpTab from "@/components/wellbeing/tabs/ProfessionalHelpTab";
import WellbeingCallToAction from "@/components/wellbeing/WellbeingCallToAction";
import { toast } from "sonner";

const WellbeingPage: React.FC = () => {
  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth error:", error);
          toast.error("There was a problem checking your login status");
          return;
        }
        
        setUser(data.session?.user || null);
        
        const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
          setUser(session?.user || null);
        });
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getUser();
  }, []);
  
  useEffect(() => {
    if (moodRating !== null) {
      const fetchResources = async () => {
        try {
          const sentiment = moodRating <= 2 ? "negative" : moodRating === 3 ? "neutral" : "positive";
          // Adding fallback resources if the API call fails
          const defaultResources = [
            { title: "Mindfulness Exercises", link: "#mindfulness" },
            { title: "Stress Management", link: "#stress" },
            { title: "Mental Health Support", link: "#support" }
          ];
          
          try {
            const wellnessResources = await getWellnessResources(sentiment);
            setResources(wellnessResources.length > 0 ? wellnessResources : defaultResources);
          } catch (error) {
            console.error("Failed to fetch wellness resources:", error);
            setResources(defaultResources);
            toast.error("Could not load personalized resources. Showing defaults instead.");
          }
        } catch (error) {
          console.error("Error in mood resources:", error);
        }
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
        
        <div className="space-y-8 backdrop-blur-sm bg-white/30 rounded-xl p-6 shadow-lg border border-white/40">
          <MoodTracking 
            moodRating={moodRating} 
            setMoodRating={setMoodRating} 
            resources={resources} 
            user={user} 
          />
          
          <div>
            <AIWellbeingChat moodRating={moodRating} />
          </div>
          
          <div>
            <SelfAssessmentsSection filter="wellbeing" />
          </div>

          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 bg-white/50">
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="professional">Professional Help</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources">
              <ResourcesTab />
            </TabsContent>
            
            <TabsContent value="professional">
              <ProfessionalHelpTab />
            </TabsContent>
          </Tabs>
          
          <WellbeingCallToAction />
        </div>
      </div>
    </div>
  );
};

export default WellbeingPage;
